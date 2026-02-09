import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConstellationMap } from './components/ConstellationMap';
import { FeaturesSection } from './components/FeaturesSection';
export function App() {
  return (
    <div className="min-h-screen bg-[#0c0a2a] text-white font-sans selection:bg-[#9945FF] selection:text-white">
      <Header />

      <main>
        <HeroSection />
        <ConstellationMap />
        <FeaturesSection />
      </main>

      <footer className="py-8 border-t border-white/10 bg-[#0c0a2a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 Solana AI Tour · 为未来而建
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm">

              隐私政策
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm">

              服务条款
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm">

              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>);

}