import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, CheckCircle, MessageSquare, Maximize2, Menu, Phone } from 'lucide-react';
import photo1 from './photos/photo1.jpg'
import photo2 from './photos/photo2.jpg'
import photo3 from './photos/photo3.jpg'
import photo4 from './photos/photo4.jpg'
import photo5 from './photos/photo5.jpg'
import photo6 from './photos/photo6.jpg'
import photo7 from './photos/photo7.jpg'
import photo8 from './photos/photo8.jpg'
import photo9 from './photos/photo9.jpg'
import photo10 from './photos/photo10.jpg'
import logo from './photos/logo.JPG';

const ServicePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carouselStart, setCarouselStart] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Unificirana klasa za naslove sekcija
  const sectionTitleStyle = "text-4xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6";

  const services = [
    { title: "Postavljanje pločica", description: "Postavljamo pločice u kuhinjama, hodnicima, kupatilima.", icon: <Globe className="w-8 h-8 text-blue-600" /> },
    { title: "Postavljanje sanitarija", description: "Postavljamo lavaboe, WC šolje i ostale sanitarije.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Zamena ventila, slavina i baterija", description: "Vršimo zamenu svih vrsta ventila, slavina i baterija.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Otpušavanje sudopere", description: "Brzo i efikasno otpušavamo sudopere.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Sečenje kade", description: "Sečemo i adaptiramo kade kako bi se obezbedilo lakše korišćenje iste starijim sugrađanima.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> },
    { title: "Zidanje tuš kabina", description: "Zidamo tuš kabine i postavljamo ulazni prag u kabinu po Vašoj želji.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> }
  ];

  const galleryItems = [
    { id: 1, title: "Kupatilo", category: "Keramika", img: photo1 },
    { id: 2, title: "Instalacije", category: "Vodovod", img: photo2 },
    { id: 3, title: "Kupatilo sa visokim stepenikom za tuš kapinu", category: "Keramika", img: photo3 },
    { id: 4, title: "Kuhinja", category: "Keramika", img: photo4 },
    { id: 5, title: "Kupatilo", category: "Keramika", img: photo5 },
    { id: 6, title: "Kupatilo", category: "Keramika", img: photo6 },
    { id: 7, title: "Kupatilo sa niskim stepenikom za tuš kapinu", category: "Keramika", img: photo7 },
    { id: 8, title: "Kupatilo", category: "Keramika", img: photo8 },
    { id: 9, title: "Kuhinja", category: "Keramika", img: photo9 },
    { id: 10, title: "Kupatilo", category: "Keramika", img: photo10 },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let start = null;
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, ease(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') nextImg();
        if (e.key === 'ArrowLeft') prevImg();
        if (e.key === 'Escape') setSelectedIndex(null);
      } else if (isFullGalleryOpen) {
        if (e.key === 'Escape') setIsFullGalleryOpen(false);
      }
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, isFullGalleryOpen]);

  const nextImg = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImg = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextCarousel = () => {
    setCarouselStart((prev) => (prev + 1) % galleryItems.length);
  };

  const prevCarousel = () => {
    setCarouselStart((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCarousel();
    } else if (isRightSwipe) {
      prevCarousel();
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: "'Roboto', sans-serif" }}>      {/* Google Fonts - Outfit */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        body { font-family: 'Roboto', sans-serif; }`}
      </style>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        {/* max-w-none removes all width limits, px-0 removes side space */}
        <div className="max-w-none w-full px-0 h-20 flex items-center justify-between">

          {/* LEVA STRANA: Logo i Tekst - absolute left */}
          <div className="flex items-center gap-2 cursor-pointer h-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-auto object-contain shrink-0"
            />
          </div>

          {/* DESNA STRANA: Meni i Dugme - absolute right */}
          <div className="flex items-center gap-4 h-full pr-4 md:pr-8">
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 mr-8">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition">O nama</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-blue-600 transition">Usluge</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-blue-600 transition">Galerija</a>
            </div>

            <a href="tel:0606160776" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition shrink-0">
              <Phone size={16} fill="currentColor" />
              <span className="hidden lg:inline">060 6160776</span>
            </a>

            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-gray-600 p-2">
              <Menu size={28} />
            </button>
          </div>

        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[100] ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[75%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out p-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-bold text-blue-600 uppercase tracking-widest">Meni</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-8 text-xl font-bold">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="flex items-center justify-between border-b pb-4 border-gray-50">O nama <ChevronRight size={20} className="text-gray-300" /></a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="flex items-center justify-between border-b pb-4 border-gray-50">Usluge <ChevronRight size={20} className="text-gray-300" /></a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="flex items-center justify-between border-b pb-4 border-gray-50">Galerija <ChevronRight size={20} className="text-gray-300" /></a>
            <a href="tel:0606160776" className="mt-4 flex items-center gap-3 bg-gray-900 text-white p-5 rounded-2xl justify-center shadow-xl">
              <Phone size={24} fill="currentColor" /> 060 6160776
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 text-center overflow-hidden bg-white">

        {/* POZADINSKA SLIKA - Pojačana vidljivost */}
        <div
          className="absolute inset-0 z-0 opacity-40 grayscale-[20%]"
          style={{
            backgroundImage: `url(${photo1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* OVERLAY - Gradijent koji čuva čitljivost teksta u sredini */}
        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px]"></div>

        {/* SADRŽAJ - Sa tvojim originalnim tekstom i senkom za čitljivost */}
        <div className="relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-gray-900 drop-shadow-sm font-roboto uppercase">
            Keramičar i vodoinstalater <br /><span className="text-blue-600">Beograd</span>
          </h1>

          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-10 font-bold drop-shadow-sm">
            Renoviranje kupatila i kuhinja? Zapušena sudopera? Curenje ventila i zamena slavina? Brzo i efikasno izvođenje radova.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0606160776" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg">
              <Phone size={20} /> Pozovite 0606160776
            </a>
            <button onClick={(e) => scrollToSection(e, 'projects')} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg">
              Pogledaj Galeriju
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white px-6 border-t border-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={sectionTitleStyle}>O nama</h2>
          <div className="w-full max-w-md h-[1.5px] bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-10"></div>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Ekipa sa iskustvom od preko 30 godina u poslovima keramike, vodovoda i izolacije. Vršimo radove na teritoriji grada Beograda.
          </p>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="pt-20 pb-32 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={sectionTitleStyle}>Naše usluge</h2>
          <div className="w-full max-w-md h-[1.5px] bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-10"></div>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(s.icon, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION WITH CORRECT CAROUSEL --- */}
      <section id="projects" className="pt-20 pb-32 px-0 max-w-full mx-auto overflow-hidden bg-white">
        <div className="text-center mb-16 px-6">
          <h2 className={sectionTitleStyle}>Galerija radova</h2>
          <div className="w-full max-w-md h-[1.5px] bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-10"></div>
          <p className="text-gray-500 text-lg font-medium">Prelistajte naše projekte. Kliknite na sliku za uvećan prikaz.</p>
        </div>

        <div className="relative group px-4 md:px-16">
          {/* Strelica LEVO - Ispravljena logika */}
          <button 
            onClick={() => setCarouselStart((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 bg-white/90 p-4 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-100"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Kontejner za slike sa Swipe podrškom */}
          <div 
            className="flex gap-4 md:gap-6 overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {[0, 1, 2, 3].map((offset) => {
              const itemIndex = (carouselStart + offset) % galleryItems.length;
              const item = galleryItems[itemIndex];

              return (
                <div 
                  key={`carousel-${item.id}-${offset}`} 
                  className={`
                    relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/5] shadow-lg transition-all duration-500 transform
                    ${offset === 0 ? 'w-full shrink-0' : 'hidden'} 
                    md:block md:w-1/4 md:shrink-0
                  `}
                  onClick={() => setSelectedIndex(itemIndex)}
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="h-full w-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-blue-400 text-xs font-bold uppercase mb-1 tracking-widest">{item.category}</p>
                    <h4 className="text-white text-lg font-bold leading-tight">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strelica DESNO */}
          <button 
            onClick={() => setCarouselStart((prev) => (prev + 1) % galleryItems.length)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 bg-white/90 p-4 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Indikatori (Tačkice) ispod carousela za lakšu navigaciju */}
        <div className="flex justify-center gap-2 mt-8">
          {galleryItems.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 transition-all duration-300 rounded-full ${carouselStart === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={() => setIsFullGalleryOpen(true)} className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full hover:bg-blue-600 transition-all duration-500 shadow-2xl">
            <Maximize2 size={22} className="group-hover:rotate-90 transition-transform duration-700" />
            <span className="font-bold uppercase tracking-widest text-sm">Prikaži celu galeriju ({galleryItems.length})</span>
          </button>
        </div>
      </section>

      {/* ... (Full Gallery i Lightbox ostaju isti, font se automatski primenjuje) ... */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-[110] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white/95 backdrop-blur-2xl z-20 px-6 py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Svi Radovi</h2>
                <p className="text-gray-500 font-medium">{galleryItems.length} fotografija</p>
              </div>
              <button onClick={() => setIsFullGalleryOpen(false)} className="p-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all">
                <X size={32} />
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto p-8 lg:p-20">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {galleryItems.map((item, index) => (
                <div key={`full-${item.id}`} className="break-inside-avoid rounded-3xl overflow-hidden cursor-zoom-in" onClick={() => { setSelectedIndex(index); setIsFullGalleryOpen(false); }}>
                  <img src={item.img} alt={item.title} className="w-full h-auto rounded-3xl shadow-xl border border-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white/80 backdrop-blur-3xl p-6" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-10 right-10 text-gray-400 hover:text-blue-600" onClick={() => setSelectedIndex(null)}><X size={48} /></button>
          <button className="absolute left-6 text-gray-300 hover:text-blue-600" onClick={prevImg}><ChevronLeft size={80} /></button>
          <button className="absolute right-6 text-gray-300 hover:text-blue-600" onClick={nextImg}><ChevronRight size={80} /></button>
          <div className="max-w-6xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={galleryItems[selectedIndex].img} className="max-h-[75vh] w-auto rounded-[3rem] shadow-2xl border-[12px] border-white" alt="View" />
            <div className="mt-10 text-center">
              <span className="text-blue-600 text-sm font-black uppercase tracking-widest">{galleryItems[selectedIndex].category}</span>
              <h3 className="text-5xl font-extrabold text-gray-900 mt-3">{galleryItems[selectedIndex].title}</h3>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-gray-400 font-medium">© 2026 Keramičar Beograd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicePage;