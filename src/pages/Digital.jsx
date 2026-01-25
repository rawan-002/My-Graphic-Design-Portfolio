import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

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

  const advertisements = [
    { id: 1, title: 'Abia Advertisement', image: abiaImg, description: 'تصميم إعلاني لـ Abia.' },
    { id: 2, title: 'She Said That', image: sheSaidThatImg, description: 'تصميم إعلاني لـ She Said That.' }

  ];

  const posters = [
    { id: 1, title: 'Machine Learning', image: mlImg, description: 'بوستر ورشة عن الذكاء الاصطناعي' },
    { id: 3, title: '3D Modeling', image: threeDImg, description: 'Thumbnail ثريد على منصة إكس' },
    { id: 4, title: 'collage', image: collageImg, description: ' هذا الكولاج يبين كيف القيم ما تنبني لحالها، نبنيها مع بعض، يد بيد، وكل واحد فينا يكمّل الثاني عشان تطلع الصورة كاملة' },
    { id: 5, title: 'Absher Advertisement', image: adAbsherImg, description: 'تصميم إعلاني لأبشر' }

  ];

  const Prints = [
    { id: 1, title: 'GDG Roll Up', image: BannerGreenIMG, description: 'تصميم لافتة (Roll Up) لمؤتمر GDG.' },
    { id: 2, title: 'Print Design', image: print05Img, description: 'تصميم مطبوع' }
  ];
  const bookPages = [
    bookPage1, bookPage2, bookPage3, bookPage4, bookPage5, bookPage6, bookPage7, 
    bookPage8, bookPage9, bookPage10, bookPage11, bookPage12, bookPage13
  ].map((page, index) => (
    <div 
      key={index}
      className="w-full h-full flex items-center justify-center"
    >
      <img
        src={page}
        alt={`صفحة ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain is-loading"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
        onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
      />
    </div>
  ));

  const logos = [
    { id: 1, title: 'Waqf Logo', image: waqfImg, description: 'تصميم شعار لتطبيق كُن معي لهاكثون وقف.' },
    { id: 2, title: 'Derieah Logo', image: derieahImg, description: 'هوية بصرية وشعار مستوحاة من منطقة الباحة.' },
    { id: 3, title: 'Litrix Logo', image: litrixImg, description: 'تصميم شعار تقني لمنصة Litrix.' }
  ];

  const closeLightbox = () => {
    setSelectedImage(null);
  };

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
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">
          Advertisements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              
              <div className="aspect-square w-full overflow-hidden bg-gray-50 group flex items-center justify-center relative">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setSelectedImage(ad.image)} 
                  className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-500 absolute inset-0 optimized-img is-loading"
                  onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
                />
              </div>

              <div className="p-4"> 
                <h3 className="text-lg font-bold mb-1 text-gray-800">{ad.title}</h3>
                <p className="text-gray-600 text-xs">{ad.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">
          Posters & Art
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
          {posters.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden bg-gray-100 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setSelectedImage(project.image)} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer optimized-img is-loading"
                  onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">
          Prints
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
          {Prints.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden bg-gray-100 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setSelectedImage(project.image)} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer optimized-img is-loading"
                  onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 -mx-6 px-6 py-12 relative">
        <div className="absolute inset-0 opacity-60" style={{ 
          backgroundImage: `url(${patternImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center', 
          backgroundRepeat: 'no-repeat', 
          height: '40%', 
          top: '30%', 
          bottom: 'auto',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}></div>
        <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">
          Brochures & Guides
        </h2>
        
        <div className="w-full flex flex-col items-center mb-8">
          <Book 
            pages={bookPages.slice(1)}
            width={600}
            height={420}
            animationDuration={600}
            enableFlip={true}
          />

          <div className="max-w-2xl text-center mt-6" dir="rtl">
            <p className="text-gray-700 text-base font-medium mb-2">
              دليل الأمن الرقمي لعائلتك - 13 صفحة
            </p>
            <p className="text-gray-500 text-sm">
              استخدم الأزرار أو اسحب الصفحات أو استخدم الأسهم (← →) للتنقل
            </p>
          </div>
        </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black-700 border-l-4 border-black-700 pl-3">
          Logos & Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden bg-gray-50 group flex items-center justify-center p-4">
                <img 
                  src={logo.image} 
                  alt={logo.title}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setSelectedImage(logo.image)} 
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-500 cursor-pointer optimized-img is-loading"
                  onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{logo.title}</h3>
                <p className="text-gray-600 text-sm">{logo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-gray-300 focus:outline-none z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center pb-1"
            >
                &times;
            </button>

            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              loading="lazy"
              decoding="async"
              className="max-h-[85vh] max-w-full object-contain rounded shadow-2xl optimized-img is-loading"
              onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
            />
          </div>
        </div>
      )}

    </div>
  );
}