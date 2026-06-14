import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export function Book() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-16 px-4 md:px-0 relative z-10">
      <section className="w-full max-w-[1000px] mx-auto text-center mt-12 md:mt-20">
        <motion.div 
          initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}
          className="mb-16"
        >
          <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-6">{t('book_badge')}</div>
          <h1 className="font-heading text-4xl md:text-6xl text-white tracking-tight mb-8">{t('book_title')}</h1>
          <p className="font-sans text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
            {t('book_desc')}
          </p>
        </motion.div>

        <motion.div 
          initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.2}}
          className="w-full bg-[#050505] border border-[#2a2a2a] rounded-3xl overflow-hidden p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[700px]"
        >
          <iframe 
            src="https://calendly.com/cianmadeit/30min?background_color=050505&text_color=ffffff&primary_color=ffffff"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling Page"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
}
