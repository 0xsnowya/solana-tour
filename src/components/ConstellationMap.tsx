import React from 'react';
import { motion } from 'framer-motion';
const courses = [
{
  id: 1,
  title: 'Solana 基础',
  x: 10,
  y: 80
},
{
  id: 2,
  title: '代币程序',
  x: 30,
  y: 50
},
{
  id: 3,
  title: 'NFT 开发',
  x: 50,
  y: 70
},
{
  id: 4,
  title: 'DeFi 架构',
  x: 70,
  y: 30
},
{
  id: 5,
  title: 'Solana 上的 AI 代理',
  x: 90,
  y: 50
}];

export function ConstellationMap() {
  return (
    <section
      id="learning-path"
      className="relative py-32 bg-[#0c0a2a] overflow-hidden">

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
          className="text-center mb-20">

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            你的{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
              学习路径
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            探索 Solana 开发的星际旅程。每颗星代表你通往精通之路的一个里程碑。
          </p>
        </motion.div>

        <div className="relative w-full h-[600px] md:h-[500px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Background Stars */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">

                <stop offset="0%" stopColor="#9945FF" />
                <stop offset="100%" stopColor="#14F195" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {courses.map((course, index) => {
              if (index === courses.length - 1) return null;
              const nextCourse = courses[index + 1];
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={`${course.x}%`}
                  y1={`${course.y}%`}
                  x2={`${nextCourse.x}%`}
                  y2={`${nextCourse.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{
                    pathLength: 0,
                    opacity: 0
                  }}
                  whileInView={{
                    pathLength: 1,
                    opacity: 0.6
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.3,
                    ease: 'easeInOut'
                  }} />);


            })}
          </svg>

          {/* Nodes */}
          {courses.map((course, index) =>
          <motion.div
            key={course.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${course.x}%`,
              top: `${course.y}%`
            }}
            initial={{
              scale: 0,
              opacity: 0
            }}
            whileInView={{
              scale: 1,
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.3 + 0.5
            }}>

              {/* Pulse Effect */}
              <div className="absolute inset-0 rounded-full bg-[#9945FF] opacity-30 animate-ping" />

              {/* Node Circle */}
              <div className="relative w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#0c0a2a] border-2 border-[#9945FF] group-hover:bg-[#9945FF] group-hover:border-white transition-colors duration-300 shadow-[0_0_15px_rgba(153,69,255,0.5)] z-10" />

              {/* Label */}
              <div
              className={`absolute whitespace-nowrap mt-4 ${index % 2 === 0 ? 'top-full' : 'bottom-full mb-8'} left-1/2 -translate-x-1/2`}>

                <motion.div
                className="px-4 py-2 rounded-lg bg-[#1a0533]/90 border border-[#9945FF]/30 backdrop-blur-md text-white text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{
                  y: 10,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: index * 0.3 + 0.8
                }}>

                  {course.title}
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}