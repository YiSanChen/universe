"use client";

import React, { useState, useMemo } from 'react';

// 1. 星座資料
const zodiacSigns = [
  { name: "牡羊座 (Aries)", date: "Mar 21 - Apr 19" },
  { name: "金牛座 (Taurus)", date: "Apr 20 - May 20" },
  { name: "雙子座 (Gemini)", date: "May 21 - Jun 20" },
  { name: "巨蟹座 (Cancer)", date: "Jun 21 - Jul 22" },
  { name: "獅子座 (Leo)", date: "Jul 23 - Aug 22" },
  { name: "處女座 (Virgo)", date: "Aug 23 - Sep 22" },
  { name: "天秤座 (Libra)", date: "Sep 23 - Oct 22" },
  { name: "天蠍座 (Scorpio)", date: "Oct 23 - Nov 21" },
  { name: "射手座 (Sagittarius)", date: "Nov 22 - Dec 21" },
  { name: "摩羯座 (Capricorn)", date: "Dec 22 - Jan 19" },
  { name: "水瓶座 (Aquarius)", date: "Jan 20 - Feb 18" },
  { name: "雙魚座 (Pisces)", date: "Feb 19 - Mar 20" },
];

// 2. 星星背景組件 (使用 JS 生成隨機 box-shadow 以避免 CSS 過長)
const StarBackground = () => {
  const generateStars = (count: number) => {
    let value = "";
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      value += `${x}px ${y}px #FFF, `;
    }
    return value.slice(0, -2); // 移除最後的逗號
  };

  // 使用 useMemo 避免每次 render 都重新計算星星位置
  const smallStars = useMemo(() => generateStars(700), []);
  const mediumStars = useMemo(() => generateStars(200), []);
  const largeStars = useMemo(() => generateStars(100), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[1px] h-[1px] bg-transparent animate-[animStar_50s_linear_infinite]" style={{ boxShadow: smallStars }} />
      <div className="absolute w-[2px] h-[2px] bg-transparent animate-[animStar_100s_linear_infinite]" style={{ boxShadow: mediumStars }} />
      <div className="absolute w-[3px] h-[3px] bg-transparent animate-[animStar_150s_linear_infinite]" style={{ boxShadow: largeStars }} />
      
      {/* 定義動畫 Keyframes (如果 globals.css 沒加，這裡用 style tag 注入) */}
      <style jsx global>{`
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  );
};

export default function CosmicPage() {
  const [activeSign, setActiveSign] = useState(zodiacSigns[0]);

  return (
    <main className="relative flex h-screen w-full text-white overflow-hidden">
      
      {/* --- 背景層 --- */}
      {/* 深藍色到黑色的漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] z-[-1]" />
      
      {/* 星星粒子效果 */}
      <StarBackground />

      {/* --- 前景佈局 (z-10 確保在星星之上) --- */}
      
      {/* 左側欄位 (30%) */}
      <aside className="w-[30%] h-full border-r border-white/10 bg-black/20 backdrop-blur-sm z-10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
            COSMOS
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Zodiac Archive</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {zodiacSigns.map((sign, index) => (
            <div
              key={index}
              onClick={() => setActiveSign(sign)}
              className={`
                group relative p-4 rounded-xl cursor-pointer transition-all duration-500
                border border-white/5 hover:border-cyan-400/50
                hover:bg-white/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
                ${activeSign.name === sign.name ? 'bg-white/10 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : ''}
              `}
            >
              {/* 發光效果的標題 */}
              <h3 className={`text-lg font-medium transition-colors duration-300 ${activeSign.name === sign.name ? 'text-cyan-300' : 'text-gray-200 group-hover:text-white'}`}>
                {sign.name}
              </h3>
              
              {/* 日期 */}
              <p className="text-sm text-gray-500 group-hover:text-cyan-200/70 transition-colors">
                {sign.date}
              </p>

              {/* 懸停時右側的小光點裝飾 */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 shadow-[0_0_8px_cyan] transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </aside>

      {/* 右側主顯示區 (70%) */}
      <section className="w-[70%] h-full relative z-10 flex flex-col items-center justify-center p-10">
        {/* 這裡展示選中的內容 */}
        <div className="max-w-2xl text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-cyan-300 text-sm tracking-[0.2em]">
            SELECTED CONSTELLATION
          </div>
          <h2 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {activeSign.name.split(' ')[0]}
          </h2>
          <p className="text-2xl text-cyan-200/80 font-light tracking-wide mb-8 border-t border-b border-white/10 py-4">
            {activeSign.date}
          </p>
          <div className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-gray-300 leading-relaxed">
            這裡可以放置關於 {activeSign.name} 的詳細神話故事、性格分析或是當日的運勢數據。
            背景的星星會持續緩慢移動，營造深邃的空間感。
          </div>
        </div>
      </section>
    </main>
  );
}
