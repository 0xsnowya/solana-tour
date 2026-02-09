import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
export function Header({ onStartLearning }: { onStartLearning: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    {
      name: '学习路径',
      href: '#learning-path'
    },
    {
      name: '平台特色',
      href: '#features'
    },
    {
      name: '社区',
      href: '#community'
    }];

  return (
    <motion.header
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0c0a2a]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tighter group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195] group-hover:opacity-80 transition-opacity">
            Solana AI Tour
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors">

              {link.name}
            </a>
          )}
          <button
            onClick={onStartLearning}
            className="px-5 py-2 rounded-full bg-[#9945FF] hover:bg-[#7e37d8] text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(153,69,255,0.3)] hover:shadow-[0_0_25px_rgba(153,69,255,0.5)]">
            开始学习
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen &&
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
            className="md:hidden bg-[#0c0a2a] border-b border-white/10 overflow-hidden">

            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) =>
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}>

                  {link.name}
                </a>
              )}
              <button className="w-full py-3 rounded-lg bg-[#9945FF] text-white font-semibold">
                开始学习
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.header>);

}