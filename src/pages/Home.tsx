import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Counter, getWhatsappLink } from '../utils';
import { useLanguage } from '../LanguageContext';

export function Home() {
  const { t } = useLanguage();

  const stats = [
    { num: 120, label: t('leads_gen'), prefix: "+" }, 
    { num: 15, label: t('clients_acc'), prefix: "+" }, 
    { num: 94, label: t('satisfaction'), suffix: "%" }
  ];

  return (
    <div className="flex flex-col items-center w-full pb-16">
      
      {/* Hero Bento */}
      <section className="w-full max-w-[1400px] mx-auto flex flex-col md:border-x border-[#222]">
        <div className="flex flex-col mt-32 md:mt-0">
          <div className="flex flex-col items-center text-center justify-center px-6 md:px-16 py-16 md:py-32 relative">
            
            <h1 className="font-heading text-[3.5rem] md:text-6xl lg:text-[6rem] leading-[1.05] tracking-tight mb-10">
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="text-white">{t('hero_h1_1')}</motion.div>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="text-white italic">{t('hero_h1_2')}</motion.div>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}} className="text-white">{t('hero_h1_3')}</motion.div>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="text-white">{t('hero_h1_4')}</motion.div>
            </h1>
            
            <motion.p 
              initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.6}}
              className="text-[#a3a3a3] font-sans text-base md:text-lg leading-[1.8] max-w-2xl mb-12 relative z-20"
            >
              {t('hero_desc')}
            </motion.p>
            
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.7}} className="flex gap-8 items-center relative z-20">
              <Link to="/book" className="cta-button bg-white text-black px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.1em] font-bold hover:scale-105 transition-transform duration-300">
                {t('launch_system')}
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* STATS SECTION */}
        <div className="w-full flex flex-col relative z-0 border-t border-[#222]">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-40 divide-y md:divide-y-0 md:divide-x divide-[#222]">
            {stats.map((stat, i) => (
              <div key={i} className="flex-1 flex flex-col justify-center items-center py-12 md:py-0 w-full gap-3 hover:bg-[#050505] transition-colors relative z-0">
                <span className="font-heading text-5xl text-white">
                  {stat.prefix}<Counter target={stat.num} />{stat.suffix}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#888]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FLOATING TRUST SECTION */}
        <div className="w-full py-16 border-t border-[#222] flex justify-center bg-[#050505]">
          <motion.div 
            initial={{opacity: 0, y: 40}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
            className="mx-auto w-[90%] max-w-[800px] relative z-30 bg-[#0a0a0ae6] backdrop-blur-xl border border-[#333] rounded-[2rem] p-6 px-10 flex flex-wrap justify-center md:justify-between items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
               <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">G</div>
               <span className="font-sans uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#eee]">{t('g_certified')}</span>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
               <div className="w-6 h-6 flex items-center justify-center text-green-500 text-xl">★</div>
               <span className="font-sans uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#eee]">{t('t_verified')}</span>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
               <div className="w-6 h-6 flex items-center justify-center text-blue-600 font-serif italic text-lg font-bold">C</div>
               <span className="font-sans uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#eee]">{t('c_certified')}</span>
            </div>
          </motion.div>
        </div>

        {/* LE PROBLEME */}
        <div className="w-full border-t border-[#222] flex justify-center p-8 md:p-16">
          <motion.div 
            initial={{opacity: 0, scale: 0.98}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}}
            className="w-full max-w-[800px] flex flex-col justify-center border border-[#2a2a2a] px-6 md:px-16 py-16 rounded-3xl bg-gradient-to-br from-[#141414] to-[#050505] shadow-[inset_0_1px_rgba(255,255,255,0.05)]"
          >
            <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-12 text-center md:text-left">{t('problem_badge')}</div>
            
            <h2 className="font-heading text-2xl md:text-4xl text-white mb-10 pr-4 text-center md:text-left">{t('problem_title')}</h2>
            
            <div className="space-y-0 border-t border-[#2a2a2a]">
              {[t('problem_1'), t('problem_2'), t('problem_3')].map((text, i) => (
                <div key={i} className="problem-row group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#2a2a2a] hover:pl-2 transition-all cursor-default">
                  <span className="problem-number text-[11px] text-[#555] font-sans uppercase mb-2 md:mb-0" data-number={`0${i + 1}`}>00</span>
                  <span className="text-sm font-sans text-[#a3a3a3] group-hover:text-white transition-colors md:ml-6 flex-1">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </section>

      {/* MARQUEE */}
      <div className="w-full max-w-[1400px] border-x border-b border-[#222] bg-[#020202] overflow-hidden py-4 flex items-center md:mt-2">
        <div className="flex whitespace-nowrap gap-12 font-sans text-[11px] uppercase tracking-[0.2em] text-[#777] animate-marquee">
          <span>{t('marquee1')}</span>
          <span>{t('marquee1')}</span>
          <span>{t('marquee1')}</span>
        </div>
      </div>

      {/* FINAL CTA COMPACT */}
      <motion.section 
        initial={{opacity: 0, scale: 0.95}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}}
        className="w-[90%] md:w-full max-w-[1400px] mx-auto border border-[#2a2a2a] md:border-t-0 rounded-3xl md:rounded-none bg-gradient-to-br from-[#141414] to-[#050505] shadow-[inset_0_1px_rgba(255,255,255,0.05)] my-8 md:my-0 flex flex-col items-center text-center px-6 py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#666] to-transparent opacity-50"></div>
        <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">{t('cta_title')}</h2>
        <p className="font-sans text-[#a3a3a3] text-sm md:text-base mb-10 max-w-lg">{t('cta_desc')}</p>
        <Link to="/book" className="cta-button bg-white text-black px-10 py-4 rounded-full tracking-[0.15em] text-[11px] font-sans font-bold uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] relative z-20">
          {t('book_call')}
        </Link>
      </motion.section>

    </div>
  );
}
