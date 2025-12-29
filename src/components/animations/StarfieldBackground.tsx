'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Star {
  left: string;
  top: string;
  width: string;
  height: string;
}

export default function StarfieldBackground() {
  const [stars, setStars] = useState<Star[]>([]); // Empty on server

  useEffect(() => {
    // Generate random stars only on client
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) { // Adjust count as needed
        newStars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`, // e.g., 1-4px
          height: `${Math.random() * 3 + 1}px`,
        });
      }
      return newStars;
    };

    setStars(generateStars());
  }, []); // Run once on mount

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-foreground/50"
          style={star}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.01 }}
        />
      ))}
    </div>
  );
}