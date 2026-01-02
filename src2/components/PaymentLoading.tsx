import { useEffect, useRef } from "react";

const PaymentLoading = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    let rotation = 0;
    let scale = 1;
    let scaleDirection = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update values
      rotation += 0.02;
      scale += 0.01 * scaleDirection;
      if (scale > 1.2 || scale < 0.8) scaleDirection *= -1;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      // Draw 3D cube effect
      const size = 60;
      
      // Front face
      ctx.fillStyle = "hsl(var(--primary))";
      ctx.fillRect(-size / 2, -size / 2, size, size);
      
      // Right face (3D effect)
      ctx.fillStyle = "hsl(var(--primary) / 0.7)";
      ctx.beginPath();
      ctx.moveTo(size / 2, -size / 2);
      ctx.lineTo(size / 2 + 30, -size / 2 - 30);
      ctx.lineTo(size / 2 + 30, size / 2 - 30);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.fill();
      
      // Top face (3D effect)
      ctx.fillStyle = "hsl(var(--primary) / 0.5)";
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(-size / 2 + 30, -size / 2 - 30);
      ctx.lineTo(size / 2 + 30, -size / 2 - 30);
      ctx.lineTo(size / 2, -size / 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Draw orbiting circles
      for (let i = 0; i < 3; i++) {
        const angle = rotation * 2 + (i * Math.PI * 2) / 3;
        const orbitRadius = 80;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        
        ctx.fillStyle = `hsl(var(--primary) / ${0.8 - i * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <canvas ref={canvasRef} className="drop-shadow-lg" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Processing Payment</h2>
          <p className="text-muted-foreground">Redirecting to payment gateway...</p>
          <div className="flex gap-2 justify-center mt-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoading;
