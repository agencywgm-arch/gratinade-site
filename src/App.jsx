import React, { useState, useEffect } from 'react';
import { Instagram, Globe, ShoppingCart, Menu, X } from 'lucide-react';

const LaGratinade = () => {
  const [language, setLanguage] = useState('fr');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const translations = {
    fr: {
      brand: 'LA GRATINADE',
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
      brand: 'LA GRATINADE',
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

  const scrollToMenu = () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-serif tracking-wider" style={{ color: '#d4af37' }}>
            {t.brand}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 hover:bg-white/10 rounded transition flex items-center gap-2"
              >
                <Globe size={20} />
                <span className="text-sm font-serif">{language.toUpperCase()}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-black border border-white/20 rounded-lg overflow-hidden z-50">
                  {['fr', 'en', 'ar'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangMenu(false);
                      }}
                      className="w-full px-6 py-2 text-left hover:bg-white/10 transition text-sm"
                      style={{ color: language === lang ? '#d4af37' : '#fff' }}
                    >
                      {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'العربية'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={scrollToMenu} className="p-2 hover:bg-white/10 rounded transition">
              <ShoppingCart size={20} />
            </button>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-white/10 rounded"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-black/95 border-t border-white/10 p-4 space-y-3">
            <button
              onClick={() => {
                setLanguage(language === 'fr' ? 'en' : language === 'en' ? 'ar' : 'fr');
                setShowMobileMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-white/10 rounded text-sm"
              style={{ color: '#d4af37' }}
            >
              🌍 {language === 'fr' ? 'Français' : language === 'en' ? 'English' : 'العربية'}
            </button>
            <button onClick={scrollToMenu} className="w-full px-4 py-2 text-left hover:bg-white/10 rounded text-sm">
              {t.discover}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#d4af37' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#722c2c' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-8xl font-serif mb-4 md:mb-6 tracking-tight" style={{ color: '#d4af37' }}>
            {t.brand}
          </h1>
          <p className="text-xl md:text-3xl mb-6 md:mb-8 font-light tracking-wide">
            {t.subtitle}
          </p>
          <p className="text-base md:text-xl mb-8 md:mb-12 leading-relaxed text-gray-300 max-w-2xl mx-auto whitespace-pre-line">
            {t.tagline}
          </p>
          <button
            onClick={scrollToMenu}
            className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-serif tracking-wider transition-all hover:scale-105"
            style={{
              backgroundColor: '#d4af37',
              color: '#000',
              border: '2px solid #d4af37'
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
            <div key={i} className="text-center border-t-2" style={{ borderColor: '#d4af37' }}>
              <h3 className="text-lg md:text-xl font-serif mt-4 md:mt-6 mb-3 md:mb-4" style={{ color: '#d4af37' }}>
                {item.title.toUpperCase()}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-8 md:mb-16 tracking-tight" style={{ color: '#d4af37' }}>
          {t.menu}
        </h2>

        <div className="bg-white/5 rounded-lg border border-white/10 p-4 md:p-8 mb-8 md:mb-12">
          <div className="flex justify-center">
            <div
              data-wegemo="8d26d2e2-4f0d-41be-9743-634a677e7873"
              data-table="0"
              data-label="🛒 Commander"
              data-color="#d4af37"
              data-name="Médina Tacos"
              style={{ minHeight: '600px', width: '100%' }}
            ></div>
          </div>
        </div>

        <div className="text-center p-4 md:p-6 bg-white/5 rounded border border-white/10">
          <p className="text-gray-300 text-sm md:text-base">
            {language === 'fr' && '📲 Commandez directement'}
            {language === 'en' && '📲 Order directly'}
            {language === 'ar' && '📲 اطلب مباشرة'}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-serif text-center mb-8 md:mb-12" style={{ color: '#d4af37' }}>
          {t.contact}
        </h2>
        <div className="text-center">
          <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 md:p-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
            >
              <Instagram size={28} style={{ color: '#d4af37' }} />
            </a>
          </div>
          <p className="text-gray-400 text-sm md:text-lg">
            {t.followUs}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-4 md:px-6 text-center text-gray-500 text-xs md:text-sm">
        <p>© 2024 LA GRATINADE - Cuisine Gourmande</p>
      </footer>
    </div>
  );
};

export default LaGratinade;
