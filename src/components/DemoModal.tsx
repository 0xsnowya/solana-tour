import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Code, Cpu, Wallet, ArrowRight, Zap, RefreshCw, X, MousePointer2 } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const levels = [
  { id: 1, title: "Solana 基础", icon: <Wallet className="w-6 h-6" /> },
  { id: 2, title: "AI 助手", icon: <Cpu className="w-6 h-6" /> },
  { id: 3, title: "部署应用", icon: <Code className="w-6 h-6" /> }
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [walletCreated, setWalletCreated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);

  // Auto-run demo logic
  useEffect(() => {
    if (!isOpen) return;

    // Reset state on open
    setCurrentLevel(1);
    setCompletedLevels([]);
    setWalletCreated(false);
    setPrompt("");
    setCodeGenerated(false);
    setIsDeploying(false);
    setIsDeployed(false);

    let timeouts: NodeJS.Timeout[] = [];

    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(fn, delay));
    };

    // Level 1 Sequence
    schedule(() => moveCursor(50, 60), 1000); // Move to button
    schedule(() => click(), 2000); // Click create wallet
    schedule(() => setWalletCreated(true), 2100);
    schedule(() => moveCursor(90, 80), 3000); // Move to next
    schedule(() => click(), 3800);
    schedule(() => {
      setCompletedLevels([1]);
      setCurrentLevel(2);
    }, 3900);

    // Level 2 Sequence
    schedule(() => moveCursor(50, 40), 5000); // Move to input
    schedule(() => typePrompt("创建一个代币转账程序..."), 5500);
    schedule(() => moveCursor(50, 60), 7500); // Move to generate button
    schedule(() => click(), 8000);
    schedule(() => setCodeGenerated(true), 8100);
    schedule(() => moveCursor(90, 80), 9500); // Move to next
    schedule(() => click(), 10000);
    schedule(() => {
      setCompletedLevels([1, 2]);
      setCurrentLevel(3);
    }, 10100);

    // Level 3 Sequence
    schedule(() => moveCursor(50, 50), 11500); // Move to deploy button
    schedule(() => click(), 12000);
    schedule(() => setIsDeploying(true), 12100);
    schedule(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 14100);
    schedule(() => moveCursor(90, 80), 15000); // Move to finish
    schedule(() => click(), 15500);
    schedule(() => onClose(), 16500); // End demo

    return () => timeouts.forEach(clearTimeout);
  }, [isOpen]);

  const moveCursor = (x: number, y: number) => {
    setCursorPos({ x, y });
  };

  const click = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);
  };

  const typePrompt = (text: string) => {
    let currentText = "";
    text.split('').forEach((char, i) => {
      setTimeout(() => {
        currentText += char;
        setPrompt(currentText);
      }, i * 50);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#0c0a2a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-mono text-white/70">AUTO-DEMO MODE</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Demo Content Area */}
          <div className="flex-1 p-8 relative overflow-hidden">
            <div className="grid md:grid-cols-3 gap-8 h-full">
              {/* Sidebar */}
              <div className="md:col-span-1 border-r border-white/10 pr-8">
                <div className="space-y-6">
                  {levels.map((level, index) => (
                    <div key={level.id} className="relative pl-8">
                      {index !== levels.length - 1 && (
                        <div className={`absolute left-[11px] top-8 w-0.5 h-12 ${
                          completedLevels.includes(level.id) ? 'bg-[#14F195]' : 'bg-white/10'
                        }`} />
                      )}
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        completedLevels.includes(level.id) 
                          ? 'bg-[#14F195] border-[#14F195] text-[#0c0a2a]' 
                          : currentLevel === level.id 
                            ? 'border-[#9945FF] text-[#9945FF] bg-[#9945FF]/20'
                            : 'border-white/20 text-white/20'
                      }`}>
                        {completedLevels.includes(level.id) ? <CheckCircle size={14} /> : <span>{level.id}</span>}
                      </div>
                      <div>
                        <h4 className={`font-medium ${currentLevel === level.id ? 'text-white' : 'text-white/50'}`}>
                          {level.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2 relative">
                {currentLevel === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">任务：创建 Solana 钱包</h3>
                    {!walletCreated ? (
                      <button className="w-full py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-bold flex items-center justify-center gap-2">
                        <Wallet /> 点击生成钱包
                      </button>
                    ) : (
                      <div className="bg-[#14F195]/20 border border-[#14F195]/50 p-4 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 text-[#14F195] mx-auto mb-2" />
                        <p className="text-[#14F195] font-bold">钱包创建成功！</p>
                      </div>
                    )}
                    {walletCreated && (
                      <button className="float-right px-6 py-2 bg-white/10 rounded-full text-white flex items-center gap-2">
                        下一关 <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                )}

                {currentLevel === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">任务：AI 辅助编程</h3>
                    <input 
                      type="text" 
                      value={prompt}
                      readOnly
                      placeholder="输入指令..."
                      className="w-full bg-[#0c0a2a] border border-white/20 rounded-lg p-4 text-white"
                    />
                    {!codeGenerated ? (
                      <button className="w-full py-3 bg-[#9945FF] rounded-lg text-white font-bold flex items-center justify-center gap-2">
                        <Cpu /> 生成代码
                      </button>
                    ) : (
                      <div className="bg-[#0c0a2a] p-4 rounded-lg border border-white/10 font-mono text-sm">
                        <p className="text-[#14F195]">// AI Generated Solana Program</p>
                        <p>pub fn process_instruction()...</p>
                      </div>
                    )}
                    {codeGenerated && (
                      <button className="float-right px-6 py-2 bg-white/10 rounded-full text-white flex items-center gap-2">
                        下一关 <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                )}

                {currentLevel === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">任务：部署上线</h3>
                    <div className="flex flex-col items-center justify-center py-8 space-y-6">
                      {!isDeployed ? (
                        <button className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
                          {isDeploying ? (
                            <RefreshCw className="w-12 h-12 text-white animate-spin" />
                          ) : (
                            <Zap className="w-12 h-12 text-white" />
                          )}
                        </button>
                      ) : (
                        <div className="text-center">
                          <h4 className="text-2xl font-bold text-white mb-2">部署成功！</h4>
                        </div>
                      )}
                    </div>
                    {isDeployed && (
                      <button className="float-right px-6 py-2 bg-white/10 rounded-full text-white flex items-center gap-2">
                        完成挑战 <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                )}
                
                {/* Fake Cursor */}
                <motion.div
                  animate={{ 
                    left: `${cursorPos.x}%`, 
                    top: `${cursorPos.y}%`,
                    scale: isClicking ? 0.8 : 1
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="absolute pointer-events-none z-50"
                  style={{ marginLeft: '-12px', marginTop: '-12px' }}
                >
                  <div className="relative">
                    <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-lg" />
                    {isClicking && (
                      <span className="absolute -top-2 -left-2 w-12 h-12 bg-white/30 rounded-full animate-ping" />
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
