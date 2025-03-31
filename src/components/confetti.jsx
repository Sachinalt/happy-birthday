import { useEffect, useRef } from "react";
import styles from "./confetti.module.css";

export default function FallingPaws() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const paws = [];
    const pawColors = ["#f4c2c2", "#ffb6c1", "#e57373", "#d96c6c"];
    const furColors = ["#ffcc99", "#d4a373", "#a67c52", "#604020"];
    const nailColor = "#e0dede";

    class Paw {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = (Math.random() * 30 + 30) / 2; // Decrease size by 50%
        this.weight = Math.random() * 1.5 + 0.5;
        this.directionX = Math.random() * 2 - 1;
        this.pawColor = pawColors[Math.floor(Math.random() * pawColors.length)];
        this.furColor = furColors[Math.floor(Math.random() * furColors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
      }

      update() {
        this.y += this.weight;
        this.x += this.directionX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.y = Math.random() * -canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // Draw the fur base
        ctx.fillStyle = this.furColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 1.6, this.size / 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw the main paw pad
        ctx.fillStyle = this.pawColor;
        ctx.beginPath();
        ctx.ellipse(0, this.size * 0.2, this.size / 2, this.size / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw toe pads (3 toes)
        const toeSize = this.size / 3;
        const toeOffset = this.size / 2.3;

        const toePositions = [
          [-toeOffset, -toeOffset], // Left toe
          [toeOffset, -toeOffset],  // Right toe
          [0, -toeOffset - toeSize / 2] // Center toe
        ];

        for (const [dx, dy] of toePositions) {
          ctx.beginPath();
          ctx.arc(dx, dy, toeSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw claws (reduced by 20% and adjusted outward)
        ctx.fillStyle = nailColor;
        const nailSize = (this.size / 5) * 0.8; // 20% smaller
        const nailOffset = this.size / 1.7; // Adjusted for positioning

        const nailPositions = [
          [-nailOffset, -nailOffset - nailSize], // Left claw
          [nailOffset, -nailOffset - nailSize],  // Right claw
          [0, -nailOffset - toeSize / 1.5 - nailSize] // Center claw
        ];

        for (const [dx, dy] of nailPositions) {
          ctx.save();
          ctx.translate(dx, dy);
          ctx.rotate(Math.PI); // Rotate 180 degrees

          ctx.beginPath();
          ctx.moveTo(0, nailSize / 2); // Base of the nail (flat side)
          ctx.lineTo(-nailSize / 2, -nailSize); // Left tip
          ctx.lineTo(nailSize / 2, -nailSize); // Right tip
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }

        ctx.restore();
      }
    }

    function createPaws() {
      for (let i = 0; i < 50; i++) { // Decreased count
        paws.push(new Paw());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < paws.length; i++) {
        paws[i].update();
        paws[i].draw();
      }

      requestAnimationFrame(animate);
    }

    createPaws();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.confettiCanvas}></canvas>;
}
