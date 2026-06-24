import React, { useRef } from 'react'
import HTMLFlipBook from "react-pageflip";
import coverImage from '../assets/Digital/book_pages/1.webp'
import flipSound from '../assets/Digital/sound.m4a'
import './Book.css'

function Book({
  pages = [],
  cover = coverImage,
  width = 370,
  height = 500,
  bleed = false,
  size = 'fixed',
  minWidth = 0,
  maxWidth = 0,
  minHeight = 0,
  maxHeight = 0,
}) {
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
      width={width}
      height={height}
      size={size}
      minWidth={minWidth || width}
      maxWidth={maxWidth || width}
      minHeight={minHeight || height}
      maxHeight={maxHeight || height}
      maxShadowOpacity={0.8}
      drawShadow={true}
      showCover={false}
      onFlip={playFlipSound}
    >
      <div className="page cover-page">
        <div className="page-content cover">
          <img src={cover} alt="Book Cover" loading="lazy" decoding="async" className="optimized-img is-loading" onLoad={(e) => e.currentTarget.classList.remove('is-loading')} />
        </div>
      </div>

      {allPages.map((page, index) => (
        <div className="page" key={index}>
          <div className={`page-content${bleed ? ' bleed' : ''}`}>
            {page}
          </div>
        </div>
      ))}
    </HTMLFlipBook>
    </>
  );
}

export default Book;
