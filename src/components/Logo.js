"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logo() {
  const videoRef = useRef(null);
  const reverseIntervalRef = useRef(null);
  const [isReversing, setIsReversing] = useState(false);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <a
      href="/#home"
      className="py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isSmallScreen ? (
        // Render a different logo for smaller screens
        <img
          src="/small-logo.png"
          alt="Logo"
          className="cursor-pointer"
          style={{ width: "auto", height: "20px" }}
        />
      ) : (
        // Render the video logo for larger screens
        <video
          className="cursor-pointer"
          ref={videoRef}
          width="300"
          height="300"
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
          muted
          preload="auto"
          style={{ width: "auto", height: "20px" }}
        >
          <source src="/logo-animation.mp4" type="video/mp4" />
          Logo animation (your browser does not support the video tag)
        </video>
      )}
    </a>
  );
}
