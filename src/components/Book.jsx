import React, { useRef } from 'react'
import HTMLFlipBook from "react-pageflip";
import coverImage from '../assets/Digital/book_pages/1.png'
import flipSound from '../assets/Digital/sound.m4a'
import './Book.css'

function Book({ pages = [] }) {
  const audioRef = useRef(null);

  const allPages = [...pages];
  if (allPages.length % 2 !== 0) {
    allPages.push(<div className="page empty-page"></div>);
  }

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 2.3;
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  return (
    <>
    <audio ref={audioRef} preload="auto">
      <source src={flipSound} type="audio/mp4" />
    </audio>
    <HTMLFlipBook 
      width={370} 
      height={500}
      maxShadowOpacity={0.8}
      drawShadow={true}
      showCover={false}
      size='fixed'
      onFlip={playFlipSound}
    >
      <div className="page cover-page">
        <div className="page-content cover">
          <img src={coverImage} alt="Book Cover" loading="lazy" decoding="async" className="optimized-img is-loading" onLoad={(e) => e.currentTarget.classList.remove('is-loading')} />
        </div>
      </div>

      {allPages.map((page, index) => (
        <div className="page" key={index}>
          <div className="page-content">
            {page}
          </div>
        </div>
      ))}
    </HTMLFlipBook>
    </>
  );
}

export default Book;
