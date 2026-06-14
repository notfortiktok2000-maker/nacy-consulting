import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getWhatsappLink } from '../utils';
import { useLanguage } from '../LanguageContext';

export function Services() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [videoCount, setVideoCount] = useState(4);
  
  // Calculate dynamic pricing logic for AI Content
  const basePrice = 1500;
  const unitPrice = basePrice - (videoCount * 25);
  const totalPrice = videoCount * unitPrice;

  const tabs = [
    { title: t('tab1_title'), label: t('tab1_label') },
    { title: t('tab2_title'), label: t('tab2_label') },
    { title: t('tab3_title'), label: t('tab3_label') }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-16 px-4 md:px-0">
      
      <section className="w-full max-w-[1000px] mx-auto z-10 relative">
        <motion.div 
          initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}
          className="text-center mb-16"
        >
          <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-6">{t('serv_badge')}</div>
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tight mb-8">{t('serv_title')}</h1>
          <p className="font-sans text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
            {t('serv_desc')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-2 justify-center mb-10 w-full">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 px-6 py-4 rounded-xl md:rounded-full border transition-all duration-300 flex flex-col items-center justify-center ${activeTab === i ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-[#0a0a0a] border-[#222] text-[#999] hover:bg-[#111] hover:border-[#333]'}`}
            >
              <span className="font-bold font-sans text-sm">{tab.title}</span>
              <span className={`text-[10px] uppercase tracking-wider mt-1 ${activeTab === i ? 'text-[#555]' : 'text-[#444]'}`}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 0 && (
              <motion.div
                key="tab0"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="w-full bg-gradient-to-br from-[#111] to-[#050505] border border-[#333] p-8 md:p-12 rounded-3xl"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <h2 className="font-heading text-4xl text-white mb-4">{t('tab1_h2')} <span className="text-[#666] italic font-normal">{t('tab1_span')}</span></h2>
                    <p className="text-[#a3a3a3] font-sans text-base leading-relaxed mb-8">
                      {t('tab1_p')}
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {[
                        t('tab1_li1'),
                        t('tab1_li2'),
                        t('tab1_li3'),
                        t('tab1_li4')
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#ccc] text-sm font-sans">
                          <div className="min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#000] border border-[#222] p-8 rounded-2xl w-full md:w-auto md:min-w-[300px] flex flex-col items-center text-center">
                    <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-4">{t('on_quote')}</div>
                    <div className="font-heading text-3xl text-white mb-8">{t('custom')}</div>
                    <a href={getWhatsappLink("Bonjour, je souhaite un devis personnalisé pour l'offre complète Génération de Leads.")} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.1em] font-bold hover:scale-105 transition-transform duration-300">
                      {t('ask_quote')}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="tab1"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="w-full bg-gradient-to-br from-[#111] to-[#050505] border border-[#333] p-8 md:p-12 rounded-3xl"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <h2 className="font-heading text-4xl text-white mb-4">{t('tab2_h2')} <span className="text-[#666] italic font-normal">{t('tab2_span')}</span></h2>
                    <p className="text-[#a3a3a3] font-sans text-base leading-relaxed mb-8">
                      {t('tab2_p')}
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {[
                        t('tab2_li1'),
                        t('tab2_li2'),
                        t('tab2_li3'),
                        t('tab2_li4'),
                        t('tab2_li5')
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#ccc] text-sm font-sans">
                          <div className="min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#000] border border-[#222] p-8 rounded-2xl w-full md:w-auto md:min-w-[300px] flex flex-col items-center text-center">
                    <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-4">{t('from')}</div>
                    <div className="font-heading text-3xl text-white mb-8">{t('on_quote')}</div>
                    <a href={getWhatsappLink("Bonjour, je souhaite un devis pour la création de mon site web/landing page orienté conversion.")} target="_blank" rel="noopener noreferrer" className="w-full border border-white text-white px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.1em] font-bold hover:bg-white hover:text-black transition-colors duration-300">
                      {t('discuss_proj')}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="tab2"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="w-full bg-gradient-to-br from-[#111] to-[#050505] border border-[#333] p-8 md:p-12 rounded-3xl flex flex-col"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                  <div className="flex-1">
                    <h2 className="font-heading text-4xl text-white mb-4">{t('tab3_h2')} <span className="text-[#666] italic font-normal">{t('tab3_span')}</span></h2>
                    <p className="text-[#a3a3a3] font-sans text-base leading-relaxed mb-4">
                      {t('tab3_p1')}
                    </p>
                    <p className="text-[#888] font-sans text-sm italic">{t('tab3_p2')}</p>
                  </div>
                </div>

                <div className="bg-[#000] border border-[#222] rounded-2xl p-8 flex flex-col w-full">
                   <div className="mb-6 flex justify-between items-end">
                      <label className="font-sans text-white text-lg font-bold">{t('select_vol')}</label>
                      <div className="font-heading text-4xl text-white">{videoCount} <span className="text-xl text-[#666]">{t('videos')}</span></div>
                   </div>
                   
                   <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="1"
                      value={videoCount} 
                      onChange={(e) => setVideoCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-white mb-8"
                   />
                   
                   <div className="flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border border-[#333] p-6 rounded-xl gap-6">
                      <div className="flex flex-col text-center md:text-left w-full md:w-auto">
                        <span className="text-[11px] font-sans uppercase tracking-[0.1em] text-[#888] mb-1">{t('unit_price')}</span>
                        <span className="text-2xl font-sans font-bold text-[#eee]">{unitPrice} MAD <span className="text-sm font-normal text-[#555]">{t('per_vid')}</span></span>
                      </div>
                      
                      <div className="hidden md:block w-px h-12 bg-[#333]"></div>
                      
                      <div className="flex flex-col text-center md:text-left w-full md:w-auto">
                        <span className="text-[11px] font-sans uppercase tracking-[0.1em] text-[#888] mb-1">{t('total_inv')}</span>
                        <span className="text-3xl font-heading font-bold text-white">{totalPrice} MAD</span>
                      </div>

                      <a href={getWhatsappLink(`Bonjour, je suis intéressé par le Pack Contenus IA pour environ ${videoCount} vidéos. Pouvons-nous en discuter ?`)} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-white text-black px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.1em] font-bold hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                        {t('order_pack')}
                      </a>
                   </div>
                   <div className="mt-4 text-center text-[#555] text-xs font-sans italic">
                      {t('asterisk')}
                   </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </section>
    </div>
  );
}
