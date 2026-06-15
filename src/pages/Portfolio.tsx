import { motion } from 'motion/react';
import { getWhatsappLink } from '../utils';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function Portfolio() {
  const { t } = useLanguage();

  const testimonials = [
    { quote: "En six semaines, on est passé de zéro présence en ligne à trente demandes par mois.", author: "Dr. Sara M.", role: "Clinique, Tanger", result: "0 → 30 leads/mois" },
    { quote: "Des réservations via le site dès la première semaine. Résultat immédiat.", author: "Youssef A.", role: "Restaurateur, Tanger", result: "+40 réservations/mois" },
    { quote: "L'investissement le plus rentable qu'on ait fait pour notre agence immobilière.", author: "Fatima K.", role: "Immobilier, Casa", result: "×3 prospects qualifiés" },
    { quote: "Notre équipe commerciale a enfin des contacts chauds tous les matins au lieu de faire du démarchage à froid.", author: "Karim B.", role: "B2B Services", result: "+150% de closing" }
  ];

  const portfolioSites = [
    { name: "Atlas Immo Prestige", role: "Site Web Immobilier", url: "#", tags: ["Lead Gen", "SEO"] },
    { name: "Cabinet Dentaire Dr T.", role: "Réservation de Consultations", url: "#", tags: ["Landing Page", "Google Ads"] },
    { name: "Bistro La Marina", role: "Restaurant Gastronomique", url: "#", tags: ["Vitrine", "UI/UX"] },
    { name: "LogisTransport SARL", role: "Logistique Internationale", url: "#", tags: ["Corporate", "Multilingue"] },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-16 px-4 md:px-0">
      
      <section className="w-full max-w-[1200px] mx-auto z-10 relative">
        <motion.div 
          initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}
          className="text-center mb-20"
        >
          <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#888] mb-6">{t('port_badge')}</div>
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tight mb-8">{t('port_title')}</h1>
          <p className="font-sans text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
            {t('port_desc')}
          </p>
        </motion.div>

        {/* PORTFOLIO GRID */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-heading text-3xl text-white">{t('recent_sites')}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#222] to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioSites.map((site, i) => (
              <motion.a 
                href={site.url}
                key={i}
                initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.1 * i}}
                whileHover={{ scale: 1.015 }}
                className="group bg-[#080808] border border-[#2a2a2a] rounded-3xl overflow-hidden flex flex-col hover:border-[#666] transition-all relative block block-a"
              >
                <div className="aspect-[16/10] bg-[#111] w-full border-b border-[#2a2a2a] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <span className="font-heading text-4xl text-[#333] group-hover:scale-110 transition-transform duration-500 opacity-30 italic">{site.name.charAt(0)}</span>
                </div>
                <div className="p-8 flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-bold text-xl text-white mb-2">{site.name}</h3>
                    <div className="font-sans text-sm text-[#777] mb-6">{site.role}</div>
                    <div className="flex gap-2">
                       {site.tags.map(tag => (
                          <span key={tag} className="text-[9px] uppercase tracking-[0.1em] font-sans px-3 py-1 bg-[#222] text-[#aaa] rounded-full">{tag}</span>
                       ))}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#666] group-hover:bg-white group-hover:text-black transition-colors">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS GRID */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-heading text-3xl text-white">{t('testimonials')}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#222] to-transparent"></div>
          </div>

          <div className="testimonials-container overflow-hidden w-full h-[500px] relative pb-6">
            <div className="testimonials-wrapper flex gap-6 absolute top-0 left-0 h-full w-max">
              {testimonials.map((t, i) => (
                <div 
                  key={i}
                  className="testimonial-card bg-[#050505] border border-[#2a2a2a] p-10 md:p-12 rounded-3xl flex flex-col justify-between w-[90vw] md:w-[600px] h-[450px]"
                >
                  <div className="font-heading text-[4rem] h-12 leading-none text-[#666] mb-4">"</div>
                  <div className="font-heading italic text-xl md:text-2xl text-[#ececec] mb-12 leading-relaxed">
                    {t.quote}
                  </div>
                  
                  <div className="flex items-end justify-between border-t border-[#2a2a2a] pt-6 mt-auto">
                     <div>
                        <div className="font-sans text-sm font-bold text-white mb-1">{t.author}</div>
                        <div className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#666]">{t.role}</div>
                     </div>
                     <div className="font-sans text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-md bg-[#111] text-white border border-[#333]">
                        {t.result}
                     </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#222]">
               <div className="testimonial-progress h-[1px] bg-white w-0"></div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
          className="mt-24 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-transparent to-[#0a0a0a] border border-[#222] rounded-3xl"
        >
          <div className="font-sans text-sm text-[#a3a3a3] mb-6">{t('want_similar')}</div>
          <a href={getWhatsappLink("Bonjour, je souhaite voir comment vous pouvez répliquer ces résultats pour mon entreprise.")} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-10 py-4 rounded-full tracking-[0.1em] text-[11px] font-sans font-bold uppercase hover:scale-105 transition-transform duration-300">
            {t('discuss_proj_cap')}
          </a>
        </motion.div>

      </section>

    </div>
  );
}
