"use client";

import React, { useRef, useState, MouseEvent } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3DTilt({ children, className = "" }: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative position inside the card from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Max rotation angles (degrees)
  const maxRotateX = 10;
  const maxRotateY = 10;

  const rotateX = -coords.y * maxRotateX;
  const rotateY = coords.x * maxRotateY;

  // Glare position
  const glareX = (coords.x + 0.5) * 100;
  const glareY = (coords.y + 0.5) * 100;

  const cardStyle: React.CSSProperties = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)` 
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    transformStyle: 'preserve-3d',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative overflow-hidden cursor-pointer rounded-2xl border border-border/80 bg-card p-6 shadow-md transition-shadow duration-300 hover:shadow-2xl hover:border-primary/45 ${className}`}
    >
      {/* Glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`
          }}
        />
      )}
      
      {/* Content wrapper with translateZ for parallax look */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
