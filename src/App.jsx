import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, CheckCircle, MessageSquare, Maximize2, Menu } from 'lucide-react';
import photo1 from './photos/photo1.jpg'
import photo2 from './photos/photo2.jpg'
import photo3 from './photos/photo3.jpg'
import photo4 from './photos/photo4.jpg'

const ServicePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const services = [
    { title: "Web Development", description: "Custom high-performance websites.", icon: <Globe className="w-8 h-8 text-blue-600" /> },
    { title: "Consulting", description: "Strategic advice to scale your business.", icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    { title: "Support", description: "24/7 dedicated maintenance.", icon: <MessageSquare className="w-8 h-8 text-blue-600" /> }
  ];

  const galleryItems = [
    { id: 1, title: "Kupatilo", category: "Keramika", img: photo1 },
    { id: 2, title: "Kupatilo", category: "Vodovod", img: photo2 },
    { id: 3, title: "Kupatilo", category: "Keramika", img: photo3 },
    { id: 4, title: "Kuhinja", category: "Keramika", img: photo4 },
  ];

  const nextImg = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
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
          
          {/* UPDATED NAV: Now all text links */}
          <div className="hidden md:flex items-center gap-10 font-medium text-gray-600">
            <a href="#services" className="hover:text-blue-600 transition">Usluge</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
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

      {/* Gallery Section */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Galerija</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5]"
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <p className="text-blue-400 text-sm font-bold uppercase mb-1">{item.category}</p>
                <h4 className="text-white text-xl font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- LIGHTBOX OVERLAY --- */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition" onClick={() => setSelectedIndex(null)}>
            <X size={48} />
          </button>
          <button className="absolute left-6 text-white hover:scale-110 transition" onClick={prevImg}>
            <ChevronLeft size={50} strokeWidth={1.5} />
          </button>
          <button className="absolute right-6 text-white hover:scale-110 transition" onClick={nextImg}>
            <ChevronRight size={50} strokeWidth={1.5} />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryItems[selectedIndex].img} 
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl" 
              alt="Expanded"
            />
            <div className="mt-8 text-center text-white">
              <h3 className="text-3xl font-bold">{galleryItems[selectedIndex].title}</h3>
              <p className="text-gray-400 mt-2 text-lg">{galleryItems[selectedIndex].category}</p>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400">
        <p>© 2026 VITKE MEDIA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicePage;