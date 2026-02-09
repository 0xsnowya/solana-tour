import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
export function HeroSection() {
  // Generate random particles
  const particles = Array.from({
    length: 30
  }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0c0a2a]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#0c0a2a] to-[#1a0533] opacity-90" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
            'radial-gradient(circle at 50% 50%, #9945FF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #14F195 0%, transparent 30%)',
            filter: 'blur(60px)',
            animation: 'pulse-glow 10s ease-in-out infinite alternate'
          }} />

        <style>{`
          @keyframes pulse-glow {
            0% { transform: scale(1); opacity: 0.4; }
            100% { transform: scale(1.2); opacity: 0.6; }
          }
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(10px) translateX(-10px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
        `}</style>
      </div>

      {/* Particles */}
      {particles.map((p) =>
      <div
        key={p.id}
        className="absolute rounded-full bg-white opacity-20"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.left}%`,
          top: `${p.top}%`,
          animation: `float ${p.duration}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`
        }} />

      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut'
          }}>

          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#14F195] text-sm font-medium mb-6 backdrop-blur-md">
            Web3 学习的未来
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
              AI 驱动的
            </span>
            <br />
            Solana 学习之旅
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            通过 AI 引导课程、交互式实验室和链上凭证，掌握 Solana
            开发。立即开始构建未来。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="px-8 py-4 rounded-full bg-[#9945FF] hover:bg-[#8a37e8] text-white font-bold text-lg shadow-[0_0_20px_rgba(153,69,255,0.4)] transition-all flex items-center gap-2 group">

              开始学习
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
              whileTap={{
                scale: 0.95
              }}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg backdrop-blur-md transition-all flex items-center gap-2">

              <Play className="w-5 h-5 fill-current" />
              观看演示
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.5,
          duration: 1
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">

        <span className="text-white/40 text-xs uppercase tracking-widest">
          向下滚动探索
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#9945FF] to-transparent" />
      </motion.div>
    </section>);

}