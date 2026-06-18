import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Globe, ShoppingCart, Menu, X, ChevronUp, Lock } from 'lucide-react';
import gratinade1 from './assets/gallery/gratinade-1.jpg';
import gratinade2 from './assets/gallery/gratinade-2.jpg';
import gratinade3 from './assets/gallery/gratinade-3.jpg';
import gratinade4 from './assets/gallery/gratinade-4.jpg';

const INK = '#1a1a1a';
const CREAM = '#f8f4ec';
const BRASS = '#a9824c';

const LaGratinade = () => {
  const [language, setLanguage] = useState('fr');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);
  const wegemoRef = useRef(null);

  const translations = {
    fr: {
      brand: 'La Gratinade',
      subtitle: 'Cuisine Gourmande',
      tagline: 'Tacos savoureux, burgers gourmets et spécialités du moment.\nDes ingrédients premium, des saveurs authentiques, et une cuisine généreuse\npour ravir les papilles les plus exigeantes.',
      discover: 'COMMANDER MAINTENANT',
      qualities: [
        { title: 'Saveur', text: 'Ingrédients premium sélectionnés avec soin pour chaque création' },
        { title: 'Qualité', text: 'Bœuf boucherie, viandes de volaille, sauces maison généreuses' },
        { title: 'Générosité', text: 'Portions abondantes et préparées avec passion à chaque commande' }
      ],
      selection: 'NOTRE SÉLECTION',
      menu: 'MENU COMPLET',
      contact: 'NOUS CONTACTER',
      followUs: 'Retrouvez-nous sur les réseaux sociaux'
    },
    en: {
      brand: 'La Gratinade',
      subtitle: 'Gourmet Cuisine',
      tagline: 'Savory tacos, gourmet burgers and specialty dishes.\nPremium ingredients, authentic flavors, and generous portions\nto delight the most demanding palates.',
      discover: 'ORDER NOW',
      qualities: [
        { title: 'Flavor', text: 'Premium ingredients carefully selected for each creation' },
        { title: 'Quality', text: 'Butcher beef, poultry, and homemade generous sauces' },
        { title: 'Generosity', text: 'Abundant portions prepared with passion for each order' }
      ],
      selection: 'OUR SELECTION',
      menu: 'FULL MENU',
      contact: 'CONTACT US',
      followUs: 'Follow us on social media'
    },
    ar: {
      brand: 'لا جراتيناد',
      subtitle: 'مطبخ جورميه',
      tagline: 'التاكو اللذيذ والبرجر الفاخر والتخصصات من لحظتنا.\nمكونات ممتازة وأطعم حقيقي وأجزاء سخية.',
      discover: 'اطلب الآن',
      qualities: [
        { title: 'النكهة', text: 'مكونات ممتازة مختارة بعناية' },
        { title: 'الجودة', text: 'لحم البقر الجزار والدواجن' },
        { title: 'السخاء', text: 'حصص وفيرة مُحضرة بشغف' }
      ],
      selection: 'اختيارنا',
      menu: 'القائمة الكاملة',
      contact: 'اتصل بنا',
      followUs: 'تابعنا على وسائل التواصل'
    }
  };

  const t = translations[language];
  const isArabic = language === 'ar';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://agencywgm-arch.github.io/Test/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoaderFading(true), 1300);
    const removeTimer = setTimeout(() => setLoaderVisible(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    setShowMobileMenu(false);
  };

  // The Wegemo widget renders its own launcher button and opens its menu in a
  // separate full-screen modal, so we keep the real widget hidden off-screen
  // and forward the click from our decorative "unlock" button to it. The
  // unlock animation is momentary - the phone resets so it can be reopened
  // once the user closes the Wegemo modal (which gives us no close callback).
  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(() => {
      const el = wegemoRef.current;
      const trigger = el?.querySelector('button, a, [role="button"]') || el;
      trigger?.click();
    }, 550);
    setTimeout(() => setUnlocked(false), 900);
  };

  // Ribbon-style banner echoing the storefront sign's "CUISINE GOURMANDE" subtitle
  const Ribbon = ({ children, className = '' }) => (
    <div className={`flex items-center justify-center gap-3 md:gap-4 ${className}`}>
      <span className="h-px flex-1 max-w-[60px] md:max-w-[100px]" style={{ backgroundColor: INK }} />
      <span className="text-[11px] md:text-sm font-medium tracking-[0.3em] whitespace-nowrap" style={{ color: INK }}>
        {children}
      </span>
      <span className="h-px flex-1 max-w-[60px] md:max-w-[100px]" style={{ backgroundColor: INK }} />
    </div>
  );

  const Wordmark = ({ size = 'text-4xl md:text-6xl' }) => (
    <span
      className={`${size} leading-none`}
      style={{ fontFamily: isArabic ? "'Cormorant Garamond', serif" : "'Allura', cursive", color: INK }}
    >
      {t.brand}
    </span>
  );

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: CREAM, color: INK, fontFamily: "'Montserrat', sans-serif" }} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* LOADER */}
      {loaderVisible && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${loaderFading ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: CREAM }}
        >
          <div className="text-center">
            <span
              className="inline-block animate-pulse"
              style={{ fontFamily: "'Allura', cursive", fontSize: '4rem', color: INK }}
            >
              La Gratinade
            </span>
            <div className="mt-3 text-[10px] tracking-[0.35em]" style={{ color: 'rgba(26,26,26,0.5)' }}>
              {language === 'ar' ? 'جاري التحميل' : language === 'en' ? 'LOADING' : 'CHARGEMENT'}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 backdrop-blur border-b" style={{ backgroundColor: 'rgba(248,244,236,0.92)', borderColor: 'rgba(26,26,26,0.12)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <Wordmark size="text-2xl md:text-3xl" />

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 hover:bg-black/5 rounded transition flex items-center gap-2"
              >
                <Globe size={20} />
                <span className="text-sm font-medium tracking-wide">{language.toUpperCase()}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 rounded-lg overflow-hidden z-50 shadow-lg" style={{ backgroundColor: CREAM, border: '1px solid rgba(26,26,26,0.15)' }}>
                  {['fr', 'en', 'ar'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangMenu(false);
                      }}
                      className="w-full px-6 py-2 text-left hover:bg-black/5 transition text-sm"
                      style={{ color: language === lang ? BRASS : INK }}
                    >
                      {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'العربية'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={scrollToMenu} className="p-2 hover:bg-black/5 rounded transition">
              <ShoppingCart size={20} />
            </button>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-black/5 rounded"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t p-4 space-y-3" style={{ backgroundColor: CREAM, borderColor: 'rgba(26,26,26,0.12)' }}>
            <button
              onClick={() => {
                setLanguage(language === 'fr' ? 'en' : language === 'en' ? 'ar' : 'fr');
                setShowMobileMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-black/5 rounded text-sm"
              style={{ color: BRASS }}
            >
              🌍 {language === 'fr' ? 'Français' : language === 'en' ? 'English' : 'العربية'}
            </button>
            <button onClick={scrollToMenu} className="w-full px-4 py-2 text-left hover:bg-black/5 rounded text-sm">
              {t.discover}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: BRASS }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: INK }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
          <Wordmark size="text-6xl md:text-9xl mb-3 md:mb-4 inline-block" />
          <Ribbon className="mb-6 md:mb-8">{t.subtitle}</Ribbon>
          <p className="text-base md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto whitespace-pre-line" style={{ color: 'rgba(26,26,26,0.7)' }}>
            {t.tagline}
          </p>
          <button
            onClick={scrollToMenu}
            className="px-8 md:px-12 py-3 md:py-4 text-sm md:text-base font-medium tracking-[0.15em] transition-all hover:scale-105"
            style={{
              backgroundColor: INK,
              color: CREAM,
              border: `2px solid ${INK}`
            }}
          >
            {t.discover}
          </button>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {t.qualities.map((item, i) => (
            <div key={i} className="text-center border-t-2 pt-4 md:pt-6" style={{ borderColor: BRASS }}>
              <h3 className="text-lg md:text-xl font-medium tracking-wide mb-3 md:mb-4" style={{ color: INK }}>
                {item.title.toUpperCase()}
              </h3>
              <p className="text-sm md:text-base" style={{ color: 'rgba(26,26,26,0.65)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl tracking-tight" style={{ fontFamily: isArabic ? "'Cormorant Garamond', serif" : "'Allura', cursive", color: INK }}>
            {t.menu}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-md mx-auto mb-8 md:mb-12">
          {[gratinade1, gratinade2, gratinade3, gratinade4].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-md">
              <img src={src} alt={`La Gratinade ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-8 md:mb-12">
          <div
            className="relative transition-all duration-700 ease-in-out"
            style={{
              width: 'min(320px, 80vw)',
              aspectRatio: '9 / 19.5',
              opacity: unlocked ? 0 : 1,
              transform: unlocked ? 'scale(0.92)' : 'scale(1)',
              pointerEvents: unlocked ? 'none' : 'auto'
            }}
          >
            <div
              className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl"
              style={{ border: `10px solid ${INK}`, backgroundColor: CREAM }}
            >
              {/* notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 rounded-b-2xl z-30"
                style={{ backgroundColor: INK }}
              />

              {/* lock screen */}
              <div className="absolute inset-0 flex flex-col items-center justify-between pt-16 pb-8 px-6">
                <div className="text-center mt-6">
                  <span style={{ fontFamily: "'Allura', cursive", fontSize: '2.25rem', color: INK }}>
                    {t.brand}
                  </span>
                  <Ribbon className="mt-2">{t.subtitle}</Ribbon>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <ChevronUp size={18} className="animate-bounce" style={{ color: 'rgba(26,26,26,0.5)' }} />
                  <button
                    onClick={handleUnlock}
                    className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium tracking-[0.15em] transition-all hover:scale-105"
                    style={{ backgroundColor: INK, color: CREAM }}
                  >
                    <Lock size={14} />
                    {t.discover}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* real Wegemo widget, kept off-screen and triggered programmatically on unlock */}
          <div
            ref={wegemoRef}
            style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '320px', height: '600px' }}
          >
            <div
              data-wegemo="8d26d2e2-4f0d-41be-9743-634a677e7873"
              data-table="0"
              data-label="🛒 Commander"
              data-color={INK}
              data-name="Médina Tacos"
              style={{ minHeight: '600px', width: '100%' }}
            ></div>
          </div>
        </div>

        <div className="text-center p-4 md:p-6 rounded border" style={{ backgroundColor: '#fff', borderColor: 'rgba(26,26,26,0.12)' }}>
          <p className="text-sm md:text-base" style={{ color: 'rgba(26,26,26,0.7)' }}>
            {language === 'fr' && '📲 Commandez directement'}
            {language === 'en' && '📲 Order directly'}
            {language === 'ar' && '📲 اطلب مباشرة'}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto border-t" style={{ borderColor: 'rgba(26,26,26,0.12)' }}>
        <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-12" style={{ fontFamily: isArabic ? "'Cormorant Garamond', serif" : "'Allura', cursive", color: INK }}>
          {t.contact}
        </h2>
        <div className="text-center">
          <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 md:p-4 rounded-full border transition hover:bg-black/5"
              style={{ borderColor: 'rgba(26,26,26,0.2)' }}
            >
              <Instagram size={28} style={{ color: INK }} />
            </a>
          </div>
          <p className="text-sm md:text-lg" style={{ color: 'rgba(26,26,26,0.65)' }}>
            {t.followUs}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 px-4 md:px-6 text-center text-xs md:text-sm" style={{ borderColor: 'rgba(26,26,26,0.12)', color: 'rgba(26,26,26,0.5)' }}>
        <p>© 2024 La Gratinade — Cuisine Gourmande</p>
      </footer>
    </div>
  );
};

export default LaGratinade;
