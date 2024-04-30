'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Logo() {
  const videoRef = useRef(null);
  const reverseIntervalRef = useRef(null);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(reverseIntervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current && !isReversing) {
      setIsReversing(true);
      videoRef.current.pause();
      if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
      reverseIntervalRef.current = setInterval(() => {
        if (videoRef.current.currentTime <= 0.03) {
          videoRef.current.pause();
          clearInterval(reverseIntervalRef.current);
          setIsReversing(false);
        } else {
          videoRef.current.currentTime -= 0.05;
        }
      }, 30);
    }
  };

  const handleMouseLeave = () => {
    if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
    setIsReversing(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <a href='/' className='py-4'>
      <video
        className='cursor-pointer'
        ref={videoRef}
        width="300"
        height="300"
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        muted
        preload="auto"
        style={{ width: 'auto', height: '20px' }}
      >
        <source src="/logo-animation.mp4" type="video/mp4" />
        Logo animation (your browser does not support the video tag)
      </video>
    </a>
  );
}
