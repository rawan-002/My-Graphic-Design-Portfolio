import { motion, AnimatePresence } from 'framer-motion'; 
import { Instagram, Mail, Linkedin, ExternalLink, Phone, ChevronRight, ChevronLeft } from 'lucide-react'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Logo from './assets/New Logo.webp';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import VisualIdentitySections from './components/VisualIdentitySections';
const About = lazy(() => import('./pages/About'));
const Digital = lazy(() => import('./pages/Digital'));
const PrintWorks = lazy(() => import('./pages/Print'));

import ThreeImg from './assets/3D.webp';
import PhoneImg from './assets/Digital/Phone.webp';
import AbiaImg from './assets/Digital/Abia2.webp';
import SheSaidThatMockUp from './assets/SheSaidThatMockUp.webp';


const ContactModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-2xl shadow-xl w-11/12 max-w-sm p-6 text-right"
        dir="rtl"
      >
        <button
          onClick={onClose}
          aria-label="اغلاق"
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-3">تواصل معي</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600">البريد الإلكتروني</p>
          <a
            href="mailto:Ra20awn@gmail.com"
            className="block text-black font-medium hover:underline"
          >
            Ra20awn@gmail.com
          </a>
        </div>
        <div>
          <p className="text-sm text-gray-600">رقم الهاتف</p>
          <a
            href="tel:+966542951386"
            className="block text-black font-medium hover:underline"
          >
            +966542951386
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onContactOpen }) => {
  return (
    <>
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Logo" decoding="async" className="h-10 w-auto md:h-12" />
            <span className="text-lg font-bold text-gray-900">Rawan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/works/digital" className="text-sm font-medium hover:underline">أعمالي</Link>
            <Link to="/about" className="text-sm font-medium hover:underline">من أنا</Link>
            <button
              onClick={(e) => { e.preventDefault(); onContactOpen(true); }}
              className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              تواصل معي
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

const Footer = ({ onContactOpen }) => {
  return (
    <footer className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">لنبنِ شيئاً مميزاً معاً</h2>
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={(e) => { e.preventDefault(); onContactOpen(true); }}
            className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"
            aria-label="اتصل هاتفي"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onContactOpen(true); }}
            className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"
            aria-label="ارسال ايميل"
          >
            <Mail size={20} />
          </button>
        </div>
        <p className="text-gray-500 text-sm">© 2025 جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

const Layout = () => {
  const [showContact, setShowContact] = useState(false);
  const openContact = () => setShowContact(true);
  const closeContact = () => setShowContact(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white">
      <Navbar onContactOpen={openContact} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onContactOpen={openContact} />
      <ContactModal open={showContact} onClose={closeContact} />
    </div>
  );
};

const ThreeScene = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const spotLight = new THREE.SpotLight(0xa855f7, 4);
    spotLight.position.set(-5, 5, -5);
    scene.add(spotLight);
    let myModel = null;
    const loader = new GLTFLoader();
    loader.load(`${import.meta.env.BASE_URL}aesthetic.glb`, (gltf) => {
        myModel = gltf.scene;
        myModel.scale.set(0.6, 0.6, 0.6);
        myModel.position.set(0, 0, 0);
        scene.add(myModel);
    }, undefined, (error) => {
        console.error('خطأ في تحميل المجسم:', error);
    });
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotX = mouseY * 0.5;
      targetRotY = mouseX * 0.5;
    };
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (myModel) {
        myModel.rotation.x += (targetRotX - myModel.rotation.x) * 0.1;
        myModel.rotation.y += (targetRotY - myModel.rotation.y) * 0.1;
        myModel.rotation.z += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v && typeof v.dispose === 'function') v.dispose();
            });
            m.dispose();
          });
        }
      });
      renderer.dispose();
    };
  }, []);
  return (
    <div 
        ref={containerRef} 
        className="w-full h-[500px] overflow-hidden select-none relative"
    />
  );
};

const Home = () => {
  
  const showcaseWorks = [
    {
      id: 0,
      image: SheSaidThatMockUp,
      title: 'She Said That',
      desc: 'مشروع تصميم Mockup مميز.'
    },
    {
      id: 1,
      image: PhoneImg,
      title: 'تصميم واجهات للتطبيق',
      desc: ''
    },
    {
      id: 2,
      image: ThreeImg,
      title: 'تصميم بوستر',
      desc: ''
    },
    {
      id: 3,
      image: AbiaImg,
      title: 'تصميم بوستر إعلان',
      desc: ''
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = (e) => {
    e.preventDefault(); 
    setCurrentSlide((prev) => (prev + 1) % showcaseWorks.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev === 0 ? showcaseWorks.length - 1 : prev - 1));
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) setCurrentSlide((prev) => (prev + 1) % showcaseWorks.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, showcaseWorks.length]);

  return (
    <>
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-right" dir="rtl">
        <motion.div
          className="md:flex md:flex-row md:items-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl md:w-1/2 text-right">
            <span className="text-gray-500 text-sm tracking-widest uppercase mb-4 block">Graphic Designer & Visual Artist</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              هويتك البصرية مو شكل<br /> هي <span className="text-transparent bg-clip-text bg-gradient-to-l from-gray-900 to-gray-500"> أول انطباع…</span>
            </h1>
          </div>
          <div className="w-full md:w-1/2 flex justify-end md:pl-6 mt-8 md:mt-0">
            <div className="w-full">
              <ThreeScene />
            </div>
          </div>
        </motion.div>
      </header>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6" dir="rtl">
          
          <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold">معرض الأعمال</h2>
                <span className="text-sm text-gray-400">Digital Artworks & Designs</span>
            </div>
            <Link to="/works/digital" className="hidden md:inline-flex items-center text-sm font-medium hover:underline gap-1">
                عرض الكل <ChevronLeft size={16} />
            </Link>
          </div>

          <div
            className="relative w-full aspect-square md:aspect-auto md:h-[600px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            tabIndex={0}
          >
            
            <AnimatePresence mode='wait'>
                <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <img 
                      src={showcaseWorks[currentSlide].image} 
                      alt={showcaseWorks[currentSlide].title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover slider-image optimized-img is-loading"
                      onLoad={(e) => e.currentTarget.classList.remove('is-loading')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 right-0 p-4 md:p-8 lg:p-12 z-10 text-white w-full">
                <motion.h3 
                    key={`title-${currentSlide}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xl md:text-3xl lg:text-4xl font-bold mb-2"
                >
                    {showcaseWorks[currentSlide].title}
                </motion.h3>
                <motion.p 
                    key={`desc-${currentSlide}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-200 text-sm md:text-lg mb-4 md:mb-6"
                >
                    {showcaseWorks[currentSlide].desc}
                </motion.p>
                
                <Link to="/works/digital">
                    <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full text-sm md:text-base font-medium hover:bg-gray-200 transition-colors">
                        استعرض الأعمال
                    </button>
                </Link>
            </div>

            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex gap-2 md:gap-3 z-20">
                <button 
                    onClick={prevSlide} 
                    className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all border border-white/20"
                >
                    <ChevronRight size={20} className="md:hidden" />
                    <ChevronRight size={24} className="hidden md:block" />
                </button>
                
                <button 
                    onClick={nextSlide} 
                    className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all border border-white/20"
                >
                    <ChevronLeft size={20} className="md:hidden" />
                    <ChevronLeft size={24} className="hidden md:block" />
                </button>
            </div>

            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2 z-20">
                {showcaseWorks.map((_, index) => (
                    <div 
                        key={index}
                        className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 md:w-8 bg-white' : 'w-1.5 md:w-2 bg-white/40'}`}
                    />
                ))}
            </div>

          </div>
          
          <div className="mt-6 text-center md:hidden">
            <Link to="/works/digital" className="inline-flex items-center text-sm font-medium hover:underline gap-1">
                عرض جميع الأعمال <ChevronLeft size={16} />
            </Link>
          </div>

          {/* Full Visual Identity boxes */}
          <div className="mt-16" dir="ltr">
            <VisualIdentitySections />
          </div>

        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">خدماتي</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right" dir="rtl">
          <div className="p-10 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <h3 className="text-xl font-bold mb-3">هوية بصرية</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              أشتغل على بناء شكل واضح لهويتك من اسم، ألوان، ونمط يعكس صورة مشروعك قدّام الناس.
            </p>
          </div>
          <div className="p-10 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <h3 className="text-xl font-bold mb-3"> Social Media</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              أرتّب لك التصاميم المطلوبة للحساب بحيث تكون مناسبة للمحتوى وسهلة للعين وتخدم طريقتك في العرض.
            </p>
          </div>
          <div className="p-10 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <h3 className="text-xl font-bold mb-3">تصميم مطبوعات</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              أجهّز لك ملفات جاهزة للطباعة بجودة مناسبة وتنسيق صحيح حسب نوع المطبوعات اللي تحتاجها.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works/digital" element={<Digital />} />
          <Route path="/works/print" element={<PrintWorks />} /> 
        </Route>
      </Routes>
    </Suspense>
  );
}