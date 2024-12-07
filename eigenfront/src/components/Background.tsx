import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Background = () => {
  const [buttons, setButtons] = useState<Array<{ id: number; size: number; x: number; y: number }>>([]);

  useEffect(() => {
    const generateButtons = () => {
      const numButtons = 50; // Number of circles
      const generated = Array.from({ length: numButtons }, (_, index) => ({
        id: index,
        size: Math.random() * 40 + 20, // Random size between 20px to 60px
        x: Math.random() * window.innerWidth, // Random x position
        y: Math.random() * window.innerHeight, // Random y position
      }));
      setButtons(generated);
    };

    generateButtons();
    window.addEventListener("resize", generateButtons); // Regenerate on resize
    return () => window.removeEventListener("resize", generateButtons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      {buttons.map((btn) => (
        <motion.div
          key={btn.id}
          className="absolute rounded-full bg-gradient-to-r from-[#6896F9] to-[#2463EB]"
          style={{
            width: `${btn.size}px`,
            height: `${btn.size}px`,
            top: `${btn.y}px`,
            left: `${btn.x}px`,
            filter: "blur(4px)", // Initial blur
          }}
          animate={{
            y: [0, -btn.size * 1.5, 0], // Bounce height relative to size
            scale: [1, 1.2, 1], // Pulse effect
          }}
          whileHover={{
            filter: "blur(0px)", // Remove blur
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)", // Add glow
          }}
          transition={{
            duration: 2, // Total bounce duration
            repeat: Infinity, // Infinite looping
            ease: "easeInOut", // Smooth gravity-like effect
          }}
        />
      ))}
    </div>
  );
};

export default Background;
