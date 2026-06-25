import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Book from '../components/Book';
import VisualIdentitySections from '../components/VisualIdentitySections';

// --- Assets Imports ---
import mlImg from '../assets/Digital/ML.webp';
import threeDImg from '../assets/Digital/3DD.webp';
import collageImg from '../assets/Digital/Collage.webp';
import adAbsherImg from '../assets/ADAbsher.webp';
import patternImg from '../assets/Pattern.webp';
import abiaImg from '../assets/Digital/Abia.webp';
import sheSaidThatImg from '../assets/Digital/SheSaidThat3.webp';
import waqfImg from '../assets/Waqf.webp';
import derieahImg from '../assets/Derieah.webp';
import litrixImg from '../assets/Digital/LitrixLogo.webp';
import BannerGreenIMG from '../assets/Digital/RollUpGreen.webp';
import print05Img from '../assets/05.webp';
import cyberPoster from '../assets/CybersecurityPoster.webp';

// Book Pages
import bookPage1 from '../assets/Digital/book_pages/1.webp';
import bookPage2 from '../assets/Digital/book_pages/2.webp';
import bookPage3 from '../assets/Digital/book_pages/3.webp';
import bookPage4 from '../assets/Digital/book_pages/4.webp';
import bookPage5 from '../assets/Digital/book_pages/5.webp';
import bookPage6 from '../assets/Digital/book_pages/6.webp';
import bookPage7 from '../assets/Digital/book_pages/7.webp';
import bookPage8 from '../assets/Digital/book_pages/8.webp';
import bookPage9 from '../assets/Digital/book_pages/9.webp';
import bookPage10 from '../assets/Digital/book_pages/10.webp';
import bookPage11 from '../assets/Digital/book_pages/11.webp';
import bookPage12 from '../assets/Digital/book_pages/12.webp';
import bookPage13 from '../assets/Digital/book_pages/13.webp';

export default function Digital() {
  const [selectedImage, setSelectedImage] = useState(null);

  const advertisements = [
    { id: 1, title: 'Abia Advertisement', image: abiaImg, description: 'تصميم إعلاني لـ Abia.' },
    { id: 2, title: 'She Said That', image: sheSaidThatImg, description: 'تصميم إعلاني لـ She Said That.' }
  ];

  const posters = [
    { id: 1, title: 'Machine Learning', image: mlImg, description: 'بوستر ورشة عن الذكاء الاصطناعي' },
    { id: 3, title: '3D Modeling', image: threeDImg, description: 'Thumbnail ثريد على منصة إكس' },
    { id: 4, title: 'collage', image: collageImg, description: 'هذا الكولاج يبين كيف القيم ما تنبني لحالها.' },
    { id: 5, title: 'Absher Advertisement', image: adAbsherImg, description: 'تصميم إعلاني لأبشر' },
    { id: 6, title: 'Cybersecurity Workshop', image: cyberPoster, description: 'بوستر ورشة عن الأمن السيبراني' }
  ];

  const Prints = [
    { id: 1, title: 'GDG Roll Up', image: BannerGreenIMG, description: 'تصميم لافتة (Roll Up) لمؤتمر GDG.' },
    { id: 2, title: 'Print Design', image: print05Img, description: 'تصميم مطبوع' }
  ];

  const logos = [
    { id: 1, title: 'Waqf Logo', image: waqfImg, description: 'تصميم شعار لتطبيق كُن معي.' },
    { id: 2, title: 'Derieah Logo', image: derieahImg, description: 'هوية بصرية مستوحاة من منطقة الباحة.' },
    { id: 3, title: 'Litrix Logo', image: litrixImg, description: 'تصميم شعار تقني لمنصة Litrix.' }
  ];

  const bookPagesList = [
    bookPage1, bookPage2, bookPage3, bookPage4, bookPage5, bookPage6, bookPage7,
    bookPage8, bookPage9, bookPage10, bookPage11, bookPage12, bookPage13
  ].map((page, index) => (
    <div key={index} className="w-full h-full flex items-center justify-center">
      <img src={page} alt={`Page ${index + 1}`} className="w-full h-full object-contain pointer-events-none" />
    </div>
  ));

  return (
    <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto" dir="ltr">
      
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
          <span className="mr-2 text-xl">←</span> Back to Home
        </Link>
      </div>

      <div className="mb-12 border-b pb-4">
        <h1 className="text-4xl font-bold text-gray-800">Digital Works</h1>
        <p className="text-gray-500 mt-2">مجموعة من الأعمال الرقمية وتصاميم الهوية والإعلانات.</p>
      </div>

      <VisualIdentitySections />

      {/* بقية الأقسام */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Advertisements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl border border-gray-100">
              <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <img src={ad.image} alt={ad.title} onClick={() => setSelectedImage(ad.image)} className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
                <p className="text-gray-600 text-xs">{ad.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Posters & Art</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img src={p.image} alt={p.title} onClick={() => setSelectedImage(p.image)} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Prints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Prints.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img src={project.image} alt={project.title} onClick={() => setSelectedImage(project.image)} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 -mx-6 px-6 py-12 relative">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '40%', top: '30%', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}></div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3 self-start">Brochures & Guides</h2>
          <Book pages={bookPagesList.slice(1)} />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Logos & Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                <img src={logo.image} alt={logo.title} onClick={() => setSelectedImage(logo.image)} className="w-full h-full object-contain cursor-pointer hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">{logo.title}</h3>
                <p className="text-gray-600 text-sm">{logo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" 
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white text-4xl">&times;</button>
              <img src={selectedImage} alt="Full view" className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}