import React, { useRef, useState } from 'react';
import Logo from '../assets/New Logo.png';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Video from '../assets/Video.mp4';
import VideoPoster from '../assets/video-poster.jpg';
import AffinityLogo from '../assets/AffinityLogo.png';
import AlightMotionLogo from '../assets/AlightMotionLogo.png';
import CanvaLogo from '../assets/CanvaLogo.png';
import IilustratorLogo from '../assets/IilustratorLogo.png';
import MainLayout from '../App';
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
const Navbar = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Logo" loading="lazy" decoding="async" className="h-10 w-auto md:h-12 is-loading" onLoad={(e) => e.currentTarget.classList.remove('is-loading')} />
            <span className="text-lg font-bold text-gray-900">Rawan</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/works/digital" className="text-sm font-medium hover:underline">أعمالي</Link>
            <Link to="/about" className="text-sm font-medium hover:underline">من أنا</Link>

            <button
              onClick={(e) => { e.preventDefault(); setShowContact(true); }}
              className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              تواصل معي
            </button>
          </div>
        </div>
      </nav>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
};

export default function About() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(scrollYProgress, [0.2, 0.5], ["#ffffff", "#050505"]);
  const textColor = useTransform(scrollYProgress, [0.2, 0.5], ["#111111", "#ffffff"]);
  const subTextColor = useTransform(scrollYProgress, [0.2, 0.5], ["#4b5563", "#9ca3af"]);
  const lineColor = useTransform(scrollYProgress, [0.2, 0.5], ["#e5e7eb", "#333333"]);

const timelineData = [
  { 
    year: "2017 - 2022", 
    title: "البداية والشغف",  
    description: "استكشاف عالم التصميم والتركيز على المونتاج والأنيميشن والموشن جرافيك، مع تعلم أساسيات تطبيقات أدوبي وتطبيق المشاريع الصغيرة لبناء المهارات العملية." 
  },
  { 
    year: "2022", 
    title: "أول مشروع هوية", 
    description: "تنفيذ أول مشروع متكامل لإنشاء هوية بصرية لعميل محلي، شمل اختيار الألوان، الخطوط، وتنسيق العناصر لضمان هوية متناسقة وواضحة." 
  },

  { 
    year: "2023 - 2025", 
    title: "Design Team Leader - GDSCBU", 
    description: "قيادة فريق التصميم، توزيع المهام، مراجعة الأعمال، وضمان تناسق وجودة المخرجات البصرية. الإشراف على جميع المشاريع والتأكد من أن الهوية الرقمية للنادي مطبقة بشكل صحيح واحترافي، مع تحسين طريقة العمل بين الفريق وتنظيم الملفات والتسليمات." 
  },

  { 
    year: "2026", 
    title: "الآن", 
    description: "صناعة تجارب بصرية فريدة، تقديم استشارات في الهوية الرقمية، والإشراف على مشاريع تصميمية متنوعة لضمان النتائج." 
  },
];


  return (
    
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full overflow-hidden" 
      dir="rtl"
    >
      
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            style={{ color: textColor }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right space-y-6"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase opacity-60">About Me</h2>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              فوضى مُنظمة <br/> تُنتج <span className="italic font-light">جمالاً.</span>
            </h1>
            <p className="text-xl leading-relaxed font-light max-w-lg" dir="rtl">
  أنا روان، مصممة جرافيك و احيانًا مبرمجة.. متخصّصة في بناء الهويات البصرية. أتعامل مع التصميم كأداة تعكس هوية العلامة وتبرزها بشكل واضح وثابت، وأشتغل بدقة الـ 
  <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px', letterSpacing: '0.06em' }}> PIXEL </span>
  مع حس فني يعطي لكل عنصر قيمته.
</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 border border-gray-200 dark:border-gray-800 z-10 translate-x-4 translate-y-4 transition-all duration-500"></div>
              
              <video 
                src={Video}
                poster={VideoPoster}
                preload="auto"
                autoPlay 
                muted 
                loop 
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                controls={false}
                disablePictureInPicture
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out z-20 relative shadow-2xl" 
                style={{ backgroundColor: '#000' }}
                onLoadedMetadata={(e) => {
                  e.currentTarget.play().catch(() => {
                    console.log('Video autoplay prevented');
                  });
                }}
              >
                <img src={VideoPoster} alt="About" className="w-full h-full object-cover grayscale" />
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="min-h-screen px-6 py-10 flex flex-col items-center justify-center">
        <motion.div 
          style={{ color: textColor }}
          className="max-w-4xl w-full mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">أدوات التصميم</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-2xl mx-auto text-center">
              أستخدم مجموعة من أدوات التصميم لإنشاء أعمالي الإبداعية، بما في ذلك Affinity للتصميم الجرافيكي، Canva للتصاميم البسيطة والسريعة، و Alight Motion للمونتاج والأنيميشن.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 mb-24">
              <motion.img
                src={AffinityLogo}
                alt="Affinity"
                className="h-14 w-auto object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                whileHover={{ scale: 1.08, y: -4 }}
              />
              <motion.img
                src={CanvaLogo}
                alt="Canva"
                className="h-14 w-auto object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.2 }}
                whileHover={{ scale: 1.08, y: -4 }}
              />
              <motion.img
                src={AlightMotionLogo}
                alt="Alight Motion"
                className="h-16 w-auto object-contain"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.4 }}
                whileHover={{ scale: 1.08, y: -4 }}
              />
              <motion.img
                src={IilustratorLogo}
                alt="Illustrator"
                className="h-16 w-auto object-contain"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.6 }}
                whileHover={{ scale: 1.08, y: -4 }}
              />
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mt-12 mb-24 text-center border-b border-gray-800 pb-4 inline-block mx-auto w-full"
          >
            رحلتي الإبداعية
          </motion.h2>

          <div className="relative border-r border-gray-800 pr-8 space-y-12">
            <motion.div style={{ backgroundColor: lineColor }} className="absolute top-0 right-0 w-[1px] h-full origin-top" />

            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <span className="absolute -right-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black ring-1 ring-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                </span>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-xl font-bold font-mono opacity-50 w-24 shrink-0">{item.year}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

    </motion.div>
  );
}