import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Background = () => {
  const [buttons, setButtons] = useState<
    Array<{ id: number; size: number; x: number; y: number; isSpecial: boolean; image?: string }>
  >([]);

  useEffect(() => {
    const generateButtons = () => {
      const numButtons = 50; // Total circles
      const specialCount = 10; // Special circles with images
      const images = [
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      ];

      const generated = Array.from({ length: numButtons }, (_, index) => ({
        id: index,
        size: Math.random() * 40 + 20, // Random size between 20px to 60px
        x: Math.random() * window.innerWidth, // Random x position
        y: Math.random() * window.innerHeight, // Random y position
        isSpecial: index < specialCount, // First 10 are special
        image: index < specialCount ? images[index % images.length] : undefined,
      }));

      // Shuffle to randomize the placement of special circles
      setButtons(generated.sort(() => Math.random() - 0.5));
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
          className={`absolute rounded-full ${
            btn.isSpecial ? "" : "bg-gradient-to-r from-[#6896F9] to-[#2463EB]"
          }`}
          style={{
            width: `${btn.size}px`,
            height: `${btn.size}px`,
            top: `${btn.y}px`,
            left: `${btn.x}px`,
            filter: "blur(4px)", // Initial blur
            backgroundImage: btn.isSpecial && btn.image ? `url(${btn.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            y: [btn.y, btn.y - 50, btn.y], // Bouncing motion
          }}
          whileHover={{
            filter: "blur(0px)", // Clear blur on hover
            scale: 1.8, // Enlarge on hover
            zIndex: 10, // Bring to front
            boxShadow: btn.isSpecial
              ? "0px 0px 20px rgba(255, 255, 255, 0.8)" // Glow effect for special circles
              : "none",
          }}
          transition={{
            y: {
              duration: 2, // Bounce duration
              repeat: Infinity, // Infinite bounce
              ease: "easeInOut",
            },
            scale: { duration: 0.3 }, // Smooth hover effect
          }}
        />
      ))}
    </div>
  );
};

export default Background;
