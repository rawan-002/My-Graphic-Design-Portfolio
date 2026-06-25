import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book from './Book';

// --- Assets ---
import mainLogo from '../assets/mainLogo.webp';
import logoVars from '../assets/logoVars.webp';
import TwoCups from '../assets/TwoCups.webp';
import RuknCoffee from '../assets/RuknCoffee.webp';
import visualMain from '../assets/Visual/main1.webp';
import visualRollup from '../assets/rollllllup.webp';
import rifaaPattern from '../assets/rifaaPattern.webp';

// Visual Identity booklet (exported page images)
import vbPage1 from '../assets/VisualBook/2.webp';
import vbPage2 from '../assets/VisualBook/3.webp';
import vbPage3 from '../assets/VisualBook/4.webp';
import vbPage4 from '../assets/VisualBook/5.webp';
import vbPage5 from '../assets/VisualBook/6.webp';

export default function VisualIdentitySections() {
  const [selectedImage, setSelectedImage] = useState(null);
  const mainGridRef = useRef(null);
  const boxRefs = useRef([]);
  const [boxPositions, setBoxPositions] = useState([]);
  const [currentBoxIndices, setCurrentBoxIndices] = useState([0, 1]);

  const [paletteColors, setPaletteColors] = useState([
    { id: 1, hex: '#a09991' },
    { id: 2, hex: '#4b3d35' },
    { id: 3, hex: '#ffffff' },
    { id: 4, hex: '#d1c8bc' }
  ]);

  const [palette2Colors, setPalette2Colors] = useState([
    { id: 1, hex: '#081627' },
    { id: 2, hex: '#25616f' },
    { id: 3, hex: '#449e78' },
    { id: 4, hex: '#57a1e6' }
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
    const moveInterval = setInterval(() => {
      setCurrentBoxIndices(prev => [
        (prev[0] + 1) % 4,
        (prev[1] + 1) % 4
      ]);
    }, 2800);

    const paletteInterval = setInterval(() => {
      setPaletteColors(prev => [...prev].sort(() => Math.random() - 0.5));
      setPalette2Colors(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 3500);

    return () => {
      clearInterval(moveInterval);
      clearInterval(paletteInterval);
    };
  }, []);

  const vbPagesList = [vbPage1, vbPage2, vbPage3, vbPage4, vbPage5].map((page, index) => (
    <div key={index} className="w-full h-full flex items-center justify-center">
      <img src={page} alt={`Booklet Page ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
    </div>
  ));

  return (
    <>
      {/* Visual Identity #1 */}
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

      {/* Visual Identity #2 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">Visual Identity</h2>
        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-3xl shadow-sm border border-gray-300 relative overflow-hidden">
          {/* Heritage pattern backdrop */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-50"
            style={{ backgroundImage: `url(${rifaaPattern})`, backgroundRepeat: 'repeat', backgroundSize: 'auto 36px' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">

            {/* Banner */}
            <div className="lg:col-span-6 bg-[#d1c8bc] h-[250px] md:h-[320px] rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <img
                src={visualMain}
                onClick={() => setSelectedImage(visualMain)}
                className="w-full h-full object-cover cursor-pointer z-20 hover:scale-105 transition-transform duration-500"
                alt="Visual Identity"
              />
            </div>

            {/* Poster (Roll Up) */}
            <div className="lg:col-span-6 bg-[#237676] h-[250px] md:h-[320px] rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{ backgroundImage: `url(${rifaaPattern})`, backgroundRepeat: 'repeat', backgroundSize: 'auto 32px' }}
              />
              <img
                src={visualRollup}
                onClick={() => setSelectedImage(visualRollup)}
                className="w-full h-full object-contain cursor-pointer z-20 hover:scale-105 transition-transform duration-500 p-4"
                alt="Roll Up"
              />
            </div>
          </div>

          {/* Brand color palette */}
          <div className="relative z-10 mt-4 md:mt-5 grid grid-cols-4 gap-2 md:gap-4 h-[60px] md:h-[70px]">
            {palette2Colors.map((color) => (
              <motion.div
                key={color.id}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ backgroundColor: color.hex }}
                className="rounded-xl shadow-inner border border-black/5"
              />
            ))}
          </div>

          {/* Booklet - full width below */}
          <div className="relative z-10 mt-5 md:mt-6 w-full flex justify-center py-4">
            <Book
              bleed
              size="stretch"
              cover={vbPage1}
              pages={vbPagesList.slice(1)}
              width={560}
              height={315}
              minWidth={300}
              maxWidth={560}
              minHeight={169}
              maxHeight={315}
            />
          </div>
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
    </>
  );
}
