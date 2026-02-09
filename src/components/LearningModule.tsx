import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Code, Cpu, Wallet, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface Level {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Solana 基础",
    description: "创建你的第一个光速钱包",
    icon: <Wallet className="w-6 h-6" />
  },
  {
    id: 2,
    title: "AI 助手",
    description: "使用 AI 生成智能合约",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    id: 3,
    title: "部署应用",
    description: "将程序发布到区块链",
    icon: <Code className="w-6 h-6" />
  }
];

export function LearningModule({ onBack }: { onBack: () => void }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Level 1 State
  const [walletCreated, setWalletCreated] = useState(false);

  // Level 2 State
  const [prompt, setPrompt] = useState("");
  const [codeGenerated, setCodeGenerated] = useState(false);

  // Level 3 State
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleNextLevel = () => {
    if (currentLevel < 3) {
      setCompletedLevels([...completedLevels, currentLevel]);
      setCurrentLevel(currentLevel + 1);
      setShowSuccess(false);
    } else {
      setCompletedLevels([...completedLevels, currentLevel]);
      setShowSuccess(true);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setCompletedLevels([]);
    setShowSuccess(false);
    setWalletCreated(false);
    setPrompt("");
    setCodeGenerated(false);
    setIsDeploying(false);
    setIsDeployed(false);
  };

  const renderLevelContent = () => {
    switch (currentLevel) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">任务：创建 Solana 钱包</h3>
              <p className="text-white/70 mb-6">
                Solana 是一个高性能区块链。要与其交互，你需要一个钱包来存储资产和签署交易。
                <br />
                <span className="text-[#14F195] text-sm mt-2 block">知识点：Solana 拥有极快的交易速度（TPS）和极低的费用。</span>
              </p>

              {!walletCreated ? (
                <button
                  onClick={() => setWalletCreated(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Wallet /> 点击生成钱包
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#14F195]/20 border border-[#14F195]/50 p-4 rounded-lg text-center"
                >
                  <CheckCircle className="w-8 h-8 text-[#14F195] mx-auto mb-2" />
                  <p className="text-[#14F195] font-bold">钱包创建成功！</p>
                  <p className="text-white/60 text-sm font-mono mt-2">地址: 8xzt...3kL9</p>
                </motion.div>
              )}
            </div>
            {walletCreated && (
              <button
                onClick={handleNextLevel}
                className="float-right px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex items-center gap-2"
              >
                下一关 <ArrowRight size={16} />
              </button>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">任务：AI 辅助编程</h3>
              <p className="text-white/70 mb-6">
                编写区块链程序（Smart Contracts）可能很复杂。但有了 AI，我们可以用自然语言生成代码。
                <br />
                <span className="text-[#14F195] text-sm mt-2 block">知识点：Solana 程序通常使用 Rust 语言编写。</span>
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="输入指令，例如：创建一个代币转账程序..."
                  className="w-full bg-[#0c0a2a] border border-white/20 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:border-[#9945FF]"
                />

                {!codeGenerated ? (
                  <button
                    onClick={() => setCodeGenerated(true)}
                    disabled={!prompt}
                    className="w-full py-3 bg-[#9945FF] disabled:opacity-50 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Cpu /> 生成代码
                  </button>
                ) : (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-[#0c0a2a] p-4 rounded-lg border border-white/10 font-mono text-sm text-left overflow-hidden"
                  >
                    <p className="text-[#14F195]">// AI Generated Solana Program</p>
                    <p className="text-blue-400">pub fn</p> <p className="text-yellow-300 inline">process_instruction</p>(
                    <br />&nbsp;&nbsp;program_id: &Pubkey,
                    <br />&nbsp;&nbsp;accounts: &[AccountInfo],
                    <br />&nbsp;&nbsp;_instruction_data: &[u8]
                    <br />) -&gt; ProgramResult &#123;
                    <br />&nbsp;&nbsp;<span className="text-gray-500">// Logic here...</span>
                    <br />&nbsp;&nbsp;Ok(())
                    <br />&#125;
                  </motion.div>
                )}
              </div>
            </div>
            {codeGenerated && (
              <button
                onClick={handleNextLevel}
                className="float-right px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex items-center gap-2"
              >
                下一关 <ArrowRight size={16} />
              </button>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">任务：部署上线</h3>
              <p className="text-white/70 mb-6">
                代码准备好了，现在我们需要将其部署到 Solana 网络上，让全世界都能访问。
                <br />
                <span className="text-[#14F195] text-sm mt-2 block">知识点：部署需要消耗少量的 SOL 作为租金。</span>
              </p>

              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                {!isDeployed ? (
                  <button
                    onClick={() => {
                      setIsDeploying(true);
                      setTimeout(() => {
                        setIsDeploying(false);
                        setIsDeployed(true);
                      }, 2000);
                    }}
                    disabled={isDeploying}
                    className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform"
                  >
                    {isDeploying ? (
                      <RefreshCw className="w-12 h-12 text-white animate-spin" />
                    ) : (
                      <Zap className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                    )}
                    <span className="absolute -bottom-8 text-white font-bold">
                      {isDeploying ? "部署中..." : "点击部署"}
                    </span>
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 bg-[#14F195] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-[#0c0a2a]" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">部署成功！</h4>
                    <p className="text-white/60">你的第一个 Solana 程序已上线。</p>
                  </motion.div>
                )}
              </div>
            </div>
            {isDeployed && (
              <button
                onClick={handleNextLevel}
                className="float-right px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex items-center gap-2"
              >
                完成挑战 <ArrowRight size={16} />
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0c0a2a] text-white pt-24 pb-12 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(20,241,149,0.3)]">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">恭喜你！</h2>
          <p className="text-xl text-white/70 mb-8">
            你已经完成了 Solana + AI 的入门之旅。这只是一个开始。
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              返回主页
            </button>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-[#9945FF] hover:bg-[#883ddb] rounded-full font-semibold transition-colors"
            >
              再玩一次
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0a2a] text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-white/50 hover:text-white transition-colors flex items-center gap-2"
        >
          ← 返回首页
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/5 rounded-xl border border-white/10 p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 text-white/90">学习进度</h2>
              <div className="space-y-6">
                {levels.map((level, index) => (
                  <div key={level.id} className="relative pl-8">
                    {/* Connecting Line */}
                    {index !== levels.length - 1 && (
                      <div className={`absolute left-[11px] top-8 w-0.5 h-12 ${completedLevels.includes(level.id) ? 'bg-[#14F195]' : 'bg-white/10'
                        }`} />
                    )}

                    {/* Dot */}
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${completedLevels.includes(level.id)
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
                      <p className="text-xs text-white/40 mt-1">{level.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="md:col-span-2">
            <motion.div
              key={currentLevel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[400px]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#9945FF]/20 rounded-lg text-[#9945FF]">
                  {levels[currentLevel - 1].icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{levels[currentLevel - 1].title}</h2>
                  <p className="text-white/60">Level {currentLevel}</p>
                </div>
              </div>

              {renderLevelContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
