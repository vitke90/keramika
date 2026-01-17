import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, CheckCircle, MessageSquare, Maximize2, Menu, Phone } from 'lucide-react';
import photo1 from './photos/photo1.jpg'
import photo2 from './photos/photo2.jpg'
import photo3 from './photos/photo3.jpg'
import photo4 from './photos/photo4.jpg'
import photo5 from './photos/photo5.jpg'

const ServicePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stanje za mobilni meni

  const services = [
    { title: "Postavljanje pločica", description: "Postavljamo pločice u kuhinjama, hodnicima, kupatilima.", icon: <Globe className="w-8 h-8 text-blue-600" /> },
    { title: "Postavljanje sanitarija", description: "Postavljamo lavaboe, WC šolje i ostale sanitarije.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Zamena ventila, slavina i baterija", description: "Vršimo zamenu svih vrsta ventila, slavina i baterija.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Otpušavanje sudopere", description: "Brzo i efikasno otpušavamo sudopere.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Sečenje kade", description: "Sečemo i adaptiramo kade kako bi se obezbedilo lakše korišćenje iste starijim sugrađanima.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> },
    { title: "Zidanje tuš kabina", description: "Zidamo tuš kabine i postavljamo ulazni prag u kabinu po Vašoj želji.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> }
  ];

  const galleryItems = [
    { id: 1, title: "Moderno Kupatilo", category: "Keramika", img: photo1 },
    { id: 2, title: "Instalacije", category: "Vodovod", img: photo2 },
    { id: 3, title: "Podne Pločice", category: "Keramika", img: photo3 },
    { id: 4, title: "Kuhinjski Radovi", category: "Keramika", img: photo4 },
    { id: 5, title: "Moderno Kupatilo", category: "Keramika", img: photo5 },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false); // Zatvori meni nakon klika na link
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* --- HEADER / NAVIGATION --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900 uppercase">Keramičar i Vodoinstalater</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition">O nama</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-blue-600 transition">Usluge</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-blue-600 transition">Galerija</a>
            </div>

            <a href="tel:0606160776" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md">
              <Phone size={16} fill="currentColor" />
              <span className="hidden lg:inline">060 6160776</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-gray-600 p-2">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR MENU --- */}
      <div className={`fixed inset-0 z-[100] transition-visibility duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Dark Overlay (clickable to close) */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-[65%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out p-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
            <a href="tel:0606160776" className="mt-4 flex items-center gap-3 bg-gray-900 text-white p-5 rounded-2xl justify-center shadow-xl shadow-gray-200">
              <Phone size={24} fill="currentColor" />
              060 6160776
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Keramičar i vodoinstalater <br /><span className="text-blue-600">Beograd</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
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
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white px-6 border-t border-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">O nama</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ekipa sa iskustvom od preko 30 godina u poslovima keramike, vodovoda i izolacije. Vršimo radove na teritoriji grada Beograda.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-20 pb-32 bg-gray-50 px-6"> {/* Promenjeno py-32 u pt-20 pb-32 */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16 uppercase tracking-widest text-gray-400">Naše usluge</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="projects" className="pt-20 pb-32 px-6 max-w-7xl mx-auto"> {/* Promenjeno py-32 u pt-20 pb-32 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Galerija</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 text-lg">Pogledajte neke od naših radova.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {galleryItems.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/5] shadow-lg"
              onClick={() => setSelectedIndex(index)}
            >
              <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <p className="text-blue-400 text-xs font-bold uppercase mb-2 tracking-[0.2em]">{item.category}</p>
                <h4 className="text-white text-2xl font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full hover:bg-blue-600 transition-all duration-500 shadow-2xl hover:shadow-blue-300 transform hover:-translate-y-1"
          >
            <Maximize2 size={22} className="group-hover:rotate-90 transition-transform duration-700" />
            <span className="font-bold uppercase tracking-widest text-sm">Prikaži sve slike</span>
          </button>
        </div>
      </section>

      {/* Full Gallery Overlay */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-[110] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-700 ease-out">
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
                <div key={`full-${item.id}`} className="break-inside-avoid rounded-3xl overflow-hidden cursor-zoom-in transition-all duration-500" onClick={() => { setSelectedIndex(index); setIsFullGalleryOpen(false); }}>
                  <img src={item.img} alt={item.title} className="w-full h-auto rounded-3xl shadow-xl border border-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white/80 backdrop-blur-3xl p-6 transition-all duration-500 animate-in fade-in" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-10 right-10 text-gray-400 hover:text-blue-600" onClick={() => setSelectedIndex(null)}><X size={48} /></button>
          <button className="absolute left-6 text-gray-300 hover:text-blue-600" onClick={prevImg}><ChevronLeft size={80} /></button>
          <button className="absolute right-6 text-gray-300 hover:text-blue-600" onClick={nextImg}><ChevronRight size={80} /></button>
          <div className="max-w-6xl w-full flex flex-col items-center animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <img src={galleryItems[selectedIndex].img} className="max-h-[75vh] w-auto rounded-[3rem] shadow-2xl border-[12px] border-white" alt="View" />
            <div className="mt-10 text-center">
              <span className="text-blue-600 text-sm font-black uppercase tracking-widest">{galleryItems[selectedIndex].category}</span>
              <h3 className="text-5xl font-extrabold text-gray-900 mt-3">{galleryItems[selectedIndex].title}</h3>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-gray-400 font-medium">© 2026 VITKE MEDIA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicePage;