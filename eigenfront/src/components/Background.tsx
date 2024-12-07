import React, { useState, useEffect, useRef } from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  isSpecial: boolean;
  isYellow: boolean;
  image?: string;
}

const Background = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateCircles = () => {
      const numCircles = 50;
      const specialCount = 10;
      const yellowCount = 5; 
      const images = [
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      ];

      const generatedCircles: Circle[] = Array.from({ length: numCircles }, (_, index) => ({
        id: index,
        size: Math.random() * 40 + 20, 
        x: Math.random() * window.innerWidth, 
        y: Math.random() * window.innerHeight, 
        dx: Math.random() * 0.5 - 0.25, 
        dy: Math.random() * 0.5 - 0.25, 
        isSpecial: index < specialCount,
        isYellow: index >= specialCount && index < specialCount + yellowCount,
        image: index < specialCount ? images[index % images.length] : undefined,
      }));

     
      setCircles(generatedCircles.sort(() => Math.random() - 0.5));
    };

    generateCircles();
    window.addEventListener("resize", generateCircles);
    return () => window.removeEventListener("resize", generateCircles);
  }, []);

  useEffect(() => {
    const moveCircles = () => {
      setCircles((prevCircles) => {
        const updatedCircles = [...prevCircles];

        for (let i = 0; i < updatedCircles.length; i++) {
          const circle = updatedCircles[i];

        
          circle.x += circle.dx;
          circle.y += circle.dy;

          if (circle.x <= 0 || circle.x + circle.size >= window.innerWidth) {
            circle.dx *= -1; 
          }
          if (circle.y <= 0 || circle.y + circle.size >= window.innerHeight) {
            circle.dy *= -1; 
          }

          for (let j = i + 1; j < updatedCircles.length; j++) {
            const otherCircle = updatedCircles[j];
            const dist = Math.hypot(
              circle.x + circle.size / 2 - (otherCircle.x + otherCircle.size / 2),
              circle.y + circle.size / 2 - (otherCircle.y + otherCircle.size / 2)
            );

            if (dist < (circle.size + otherCircle.size) / 2) {
              [circle.dx, otherCircle.dx] = [otherCircle.dx, circle.dx];
              [circle.dy, otherCircle.dy] = [otherCircle.dy, circle.dy];
            }
          }
        }

        return updatedCircles;
      });

      requestAnimationFrame(moveCircles);
    };

    moveCircles();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-white">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`absolute rounded-full ${
            circle.isSpecial
              ? ""
              : circle.isYellow
              ? "bg-blue-200"
              : "bg-gradient-to-r from-[#6896F9] to-[#2463EB]"
          }`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            filter: circle.isSpecial || circle.isYellow ? "blur(4px)" : "blur(4px)", 
            backgroundImage: circle.isSpecial && circle.image ? `url(${circle.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => {
            setCircles((prevCircles) =>
              prevCircles.map((c) =>
                c.id === circle.id
                  ? { ...c, size: circle.size * 1.5, dx: circle.dx * 1.1, dy: circle.dy * 1.1 }
                  : c
              )
            );
          }}
          onMouseLeave={() => {
            setCircles((prevCircles) =>
              prevCircles.map((c) =>
                c.id === circle.id
                  ? { ...c, size: circle.size / 1.5, dx: circle.dx / 1.1, dy: circle.dy / 1.1 }
                  : c
              )
            );
          }}
        ></div>
      ))}
    </div>
  );
};

export default Background;
