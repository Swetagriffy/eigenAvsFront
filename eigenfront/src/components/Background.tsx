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
      const yellowCount = 5; // Number of yellow circles
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
        size: Math.random() * 40 + 20, // Size between 20px to 60px
        x: Math.random() * window.innerWidth, // Random X position
        y: Math.random() * window.innerHeight, // Random Y position
        dx: Math.random() * 0.5 - 0.25, // Slower random X velocity (-0.25 to 0.25)
        dy: Math.random() * 0.5 - 0.25, // Slower random Y velocity (-0.25 to 0.25)
        isSpecial: index < specialCount,
        isYellow: index >= specialCount && index < specialCount + yellowCount,
        image: index < specialCount ? images[index % images.length] : undefined,
      }));

      // Shuffle to randomize the placement of special and yellow circles
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

          // Update position
          circle.x += circle.dx;
          circle.y += circle.dy;

          // Check for collisions with container boundaries
          if (circle.x <= 0 || circle.x + circle.size >= window.innerWidth) {
            circle.dx *= -1; // Reverse X direction
          }
          if (circle.y <= 0 || circle.y + circle.size >= window.innerHeight) {
            circle.dy *= -1; // Reverse Y direction
          }

          // Check for collisions with other circles
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
              ? "bg-yellow-200"
              : "bg-gradient-to-r from-[#6896F9] to-[#2463EB]"
          }`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            filter: circle.isSpecial || circle.isYellow ? "blur(4px)" : "blur(4px)", // Blur effect
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
