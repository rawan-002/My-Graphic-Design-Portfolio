import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import Book from '../components/Book';

// --- Assets Imports ---
import mlImg from '../assets/Digital/ML.png'; 
import gamesImg from '../assets/Digital/Games.png';
import threeDImg from '../assets/Digital/3DD.png';
import collageImg from '../assets/Digital/Collage.png';
import adAbsherImg from '../assets/ADAbsher.png';
import patternImg from '../assets/Pattern.png';
import abiaImg from '../assets/Digital/Abia.png'; 
import sheSaidThatImg from '../assets/Digital/SheSaidThat3.png';
import waqfImg from '../assets/Waqf.png';
import derieahImg from '../assets/Derieah.png';
import litrixImg from '../assets/Digital/LitrixLogo.png';
import BannerGreenIMG from '../assets/Digital/RollUpGreen.png';
import print05Img from '../assets/05.png';
import logoVars from '../assets/logoVars.png';
import mainLogo from '../assets/mainLogo.png';
import TwoCups from '../assets/TwoCups.png';
import RuknCoffee from '../assets/RuknCoffee.png';

// Book Pages
import bookPage1 from '../assets/Digital/book_pages/1.png';
import bookPage2 from '../assets/Digital/book_pages/2.png';
import bookPage3 from '../assets/Digital/book_pages/3.png';
import bookPage4 from '../assets/Digital/book_pages/4.png';
import bookPage5 from '../assets/Digital/book_pages/5.png';
import bookPage6 from '../assets/Digital/book_pages/6.png';
import bookPage7 from '../assets/Digital/book_pages/7.png';
import bookPage8 from '../assets/Digital/book_pages/8.png';
import bookPage9 from '../assets/Digital/book_pages/9.png';
import bookPage10 from '../assets/Digital/book_pages/10.png';
import bookPage11 from '../assets/Digital/book_pages/11.png';
import bookPage12 from '../assets/Digital/book_pages/12.png';
import bookPage13 from '../assets/Digital/book_pages/13.png';

export default function Digital() {
  const [selectedImage, setSelectedImage] = useState(null);
  const mainGridRef = useRef(null);
  const boxRefs = useRef([]);
  const [boxPositions, setBoxPositions] = useState([]);
  
  // البداية: الصورة الأولى في المربع 0 والثانية في المربع 1 عشان يمرون بكل المربعات باللحاق
  const [currentBoxIndices, setCurrentBoxIndices] = useState([0, 1]); 

  const [paletteColors, setPaletteColors] = useState([
    { id: 1, hex: '#a09991' },
    { id: 2, hex: '#4b3d35' },
    { id: 3, hex: '#ffffff' },
    { id: 4, hex: '#d1c8bc' }
  ]);

  const measurePositions = () => {
    if (!mainGridRef.current) return;
    const gridRect = mainGridRef.current.getBoundingClientRect();
    const positions = boxRefs.current.map((boxRef) => {
      if (!boxRef) return null;
      const boxRect = boxRef.getBoundingClientRect();
      return {
        x: boxRect.left - gridRect.left,
        y: boxRect.top - gridRect.top,
        width: boxRect.width,
        height: boxRect.height,
      };
    }).filter(Boolean);
    if (positions.length === 4) setBoxPositions(positions);
  };

  useLayoutEffect(() => {
    measurePositions();
    const timer = setTimeout(measurePositions, 200);
    window.addEventListener('resize', measurePositions);
    return () => {
      window.removeEventListener('resize', measurePositions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // التحريك المستمر على كل المربعات (0, 1, 2, 3)
    const moveInterval = setInterval(() => {
      setCurrentBoxIndices(prev => [
        (prev[0] + 1) % 4,
        (prev[1] + 1) % 4
      ]);
    }, 2800);

    const paletteInterval = setInterval(() => {
      setPaletteColors(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 3500);

    return () => {
      clearInterval(moveInterval);
      clearInterval(paletteInterval);
    };
  }, []);

  const advertisements = [
    { id: 1, title: 'Abia Advertisement', image: abiaImg, description: 'تصميم إعلاني لـ Abia.' },
    { id: 2, title: 'She Said That', image: sheSaidThatImg, description: 'تصميم إعلاني لـ She Said That.' }
  ];

  const posters = [
    { id: 1, title: 'Machine Learning', image: mlImg, description: 'بوستر ورشة عن الذكاء الاصطناعي' },
    { id: 3, title: '3D Modeling', image: threeDImg, description: 'Thumbnail ثريد على منصة إكس' },
    { id: 4, title: 'collage', image: collageImg, description: 'هذا الكولاج يبين كيف القيم ما تنبني لحالها.' },
    { id: 5, title: 'Absher Advertisement', image: adAbsherImg, description: 'تصميم إعلاني لأبشر' }
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

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Visual Identity</h2>
        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-3xl shadow-sm border border-gray-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col gap-4 md:gap-5">
              <div className="bg-[#d1c8bc] h-[250px] md:h-[320px] rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <img src={mainLogo} onClick={() => setSelectedImage(mainLogo)} className="w-full h-full object-contain cursor-pointer z-20 hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Moving Color Palette */}
              <div className="grid grid-cols-4 gap-2 md:gap-4 h-[60px] md:h-[70px]">
                {paletteColors.map((color) => (
                  <motion.div
                    key={color.id}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ backgroundColor: color.hex }}
                    className="rounded-xl shadow-inner border border-black/5"
                  />
                ))}
              </div>

              <div className="bg-[#e6e1ce] h-[180px] md:h-[233px] rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <img src={logoVars} onClick={() => setSelectedImage(logoVars)} className="w-full h-full object-contain cursor-pointer z-20 hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Right Column (The All-Square Motion) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative min-h-[450px]" ref={mainGridRef}>
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  ref={el => boxRefs.current[i] = el} 
                  className={`h-full min-h-[210px] rounded-2xl border-2 border-dashed border-gray-400 bg-[#d9d9d9] flex items-center justify-center transition-all duration-700 ${
                    currentBoxIndices.includes(i) ? 'opacity-0' : 'opacity-40 animate-pulse'
                  }`}
                />
              ))}
              
              {boxPositions.length === 4 && (
                <>
                  <motion.div
                    className="absolute overflow-hidden cursor-pointer shadow-2xl rounded-2xl z-30"
                    animate={{ 
                      x: boxPositions[currentBoxIndices[0]]?.x || 0, 
                      y: boxPositions[currentBoxIndices[0]]?.y || 0, 
                      width: boxPositions[currentBoxIndices[0]]?.width || 0, 
                      height: boxPositions[currentBoxIndices[0]]?.height || 0
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                    onClick={() => setSelectedImage(TwoCups)}
                  >
                    <img src={TwoCups} className="w-full h-full object-cover" alt="Mockup 1" />
                  </motion.div>

                  <motion.div
                    className="absolute overflow-hidden cursor-pointer shadow-2xl rounded-2xl z-30"
                    animate={{ 
                      x: boxPositions[currentBoxIndices[1]]?.x || 0, 
                      y: boxPositions[currentBoxIndices[1]]?.y || 0, 
                      width: boxPositions[currentBoxIndices[1]]?.width || 0, 
                      height: boxPositions[currentBoxIndices[1]]?.height || 0
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                    onClick={() => setSelectedImage(RuknCoffee)}
                  >
                    <img src={RuknCoffee} className="w-full h-full object-cover" alt="Mockup 2" />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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

      <div className="mb-16 -mx-6 px-6 py-12 relative">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '40%', top: '30%', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}></div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3 self-start">Brochures & Guides</h2>
          <Book pages={bookPagesList.slice(1)} width={600} height={420} animationDuration={600} enableFlip={true} />
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