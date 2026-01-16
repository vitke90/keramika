import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, CheckCircle, MessageSquare, Maximize2, Menu } from 'lucide-react';
import photo1 from './photos/photo1.jpg'
import photo2 from './photos/photo2.jpg'
import photo3 from './photos/photo3.jpg'
import photo4 from './photos/photo4.jpg'
import photo5 from './photos/photo5.jpg'


const ServicePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);

  const services = [
    { title: "Web Development", description: "Custom high-performance websites.", icon: <Globe className="w-8 h-8 text-blue-600" /> },
    { title: "Consulting", description: "Strategic advice to scale your business.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Support", description: "24/7 dedicated maintenance.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> }
  ];

  const galleryItems = [
    { id: 1, title: "Moderno Kupatilo", category: "Keramika", img: photo1 },
    { id: 2, title: "Instalacije", category: "Vodovod", img: photo2 },
    { id: 3, title: "Podne Pločice", category: "Keramika", img: photo3 },
    { id: 4, title: "Kuhinjski Radovi", category: "Keramika", img: photo4 },
    { id: 5, title: "Moderno Kupatilo", category: "Keramika", img: photo5 },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
        if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
        if (e.key === 'Escape') setSelectedIndex(null);
      } else if (isFullGalleryOpen) {
        if (e.key === 'Escape') setIsFullGalleryOpen(false);
      }
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
    <div className="min-h-screen bg-white text-gray-900 font-sans scroll-smooth">

      {/* --- HEADER / NAVIGATION --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 uppercase">Keramika i Vodovod</span>
          </div>

          <div className="hidden md:flex items-center gap-10 font-medium text-gray-600">
            <a href="#services" className="hover:text-blue-600 transition">Usluge</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projekti</a>
            <a href="#about" className="hover:text-blue-600 transition">O nama</a>
          </div>
          <Menu className="md:hidden text-gray-600" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Modern Solutions for <br /><span className="text-blue-600">Digital Growth</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Helping businesses scale through expert web development and strategic consulting.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vitke Media is a dedicated digital agency focused on craftsmanship and performance.
            We believe that every project is a unique opportunity to combine design with
            cutting-edge technology to create memorable experiences.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Naše usluge</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- UPDATED GALLERY SECTION --- */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Naša Galerija</h2>
            <p className="text-gray-500 mt-2">Pogledajte rezultate našeg rada i preciznosti.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryItems.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gray-100 aspect-[4/5] shadow-sm"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <p className="text-blue-400 text-xs font-bold uppercase mb-1 tracking-widest">{item.category}</p>
                <h4 className="text-white text-xl font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FULL SCREEN GRID OVERLAY --- */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-[110] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
          <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-20 px-6 py-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Svi Radovi</h2>
                <p className="text-sm text-gray-500">{galleryItems.length} fotografija</p>
              </div>
              <button
                onClick={() => setIsFullGalleryOpen(false)}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
              >
                <X size={28} />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6 lg:p-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryItems.map((item, index) => (
                <div
                  key={`full-${item.id}`}
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in hover:ring-4 hover:ring-blue-500/20 transition-all duration-300"
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsFullGalleryOpen(false);
                  }}
                >
                  <img src={item.img} alt={item.title} className="w-full h-auto rounded-2xl shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODERN LIGHTBOX OVERLAY --- */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-white/70 backdrop-blur-3xl p-4 transition-all duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute top-8 right-8 text-gray-900/40 hover:text-blue-600 transition-colors" onClick={() => setSelectedIndex(null)}>
            <X size={40} />
          </button>

          <button className="absolute left-4 md:left-10 text-gray-900/20 hover:text-blue-600 hover:scale-110 transition-all" onClick={prevImg}>
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          <button className="absolute right-4 md:right-10 text-gray-900/20 hover:text-blue-600 hover:scale-110 transition-all" onClick={nextImg}>
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[selectedIndex].img}
              className="max-h-[70vh] w-auto rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-8 border-white"
              alt="Expanded View"
            />
            <div className="mt-8 text-center">
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em]">{galleryItems[selectedIndex].category}</span>
              <h3 className="text-4xl font-bold text-gray-900 mt-2">{galleryItems[selectedIndex].title}</h3>

              <div className="flex gap-2 justify-center mt-8">
                {galleryItems.map((_, i) => (
                  <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === selectedIndex ? 'w-10 bg-blue-600' : 'w-2 bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => setIsFullGalleryOpen(true)}
          className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-200"
        >
          <Maximize2 size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-semibold uppercase tracking-wider text-sm">Prikaži sve slike</span>
        </button>
      </div>

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400">
        <p>© 2026 VITKE MEDIA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicePage;