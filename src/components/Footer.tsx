import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full flex flex-col pt-4 mt-auto z-10 relative">
      <div className="w-full max-w-[1400px] mx-auto border-x border-[#1a1a1a] bg-black">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 border-t border-b border-[#222] gap-6 text-[10px] uppercase tracking-[0.15em] text-[#777]">
          <div className="flex items-end font-sans">
            <span className="font-bold mr-[2px] text-[#eee]">NACY .</span> CONSULTING
          </div>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors duration-200">{t('home')}</Link>
            <Link to="/services" className="hover:text-white transition-colors duration-200">{t('services')}</Link>
            <Link to="/portfolio" className="hover:text-white transition-colors duration-200">{t('portfolio')}</Link>
          </div>
          <div className="text-[#777]">Tanger, Maroc</div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-8 text-[10px] uppercase tracking-[0.1em]">
          <div className="text-[#777]">© 2025 NACY. CONSULTING</div>
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/nacyconsulting" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Suivez NACY. Consulting sur Instagram"
              className="hover:text-white transition-colors duration-200"
              style={{ color: '#888', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
