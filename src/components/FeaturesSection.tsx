import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Terminal, Award, Users } from 'lucide-react';
const features = [
{
  icon: Brain,
  title: 'AI 导师',
  description:
  '个性化 AI 指导，根据你的学习节奏自适应调整，实时解答问题并讲解复杂概念。',
  color: 'from-purple-500 to-indigo-500'
},
{
  icon: Terminal,
  title: '交互式实验室',
  description:
  '在浏览器中直接编写、编译和部署 Solana 程序，使用我们先进的 Web3 IDE 环境。',
  color: 'from-blue-500 to-cyan-500'
},
{
  icon: Award,
  title: '链上证书',
  description:
  '每完成一门课程即可获得可验证的 NFT 凭证，自动构建你的链上简历。',
  color: 'from-green-400 to-emerald-500'
},
{
  icon: Users,
  title: '开发者社区',
  description: '与数千名开发者交流，寻找黑客松队友，获取项目反馈与支持。',
  color: 'from-orange-400 to-pink-500'
}];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#0c0a2a] relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#9945FF]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#14F195]/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            平台{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">
              特色
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            从零到主网所需的一切，由先进的 AI 和 Solana 区块链驱动。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) =>
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.2
              }
            }}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-colors">

              {/* Hover Gradient Background */}
              <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />


              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}