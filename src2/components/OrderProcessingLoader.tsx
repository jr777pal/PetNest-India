import { useEffect, useRef } from "react";

const OrderProcessingLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    let rotation = 0;

    const drawCube = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      rotation += 0.02;

      const size = 60;
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size],
      ];

      const rotatedVertices = vertices.map((v) => {
        let [x, y, z] = v;
        
        // Rotate around Y axis
        let tempX = x * Math.cos(rotation) - z * Math.sin(rotation);
        let tempZ = x * Math.sin(rotation) + z * Math.cos(rotation);
        x = tempX;
        z = tempZ;
        
        // Rotate around X axis
        let tempY = y * Math.cos(rotation * 0.7) - z * Math.sin(rotation * 0.7);
        tempZ = y * Math.sin(rotation * 0.7) + z * Math.cos(rotation * 0.7);
        y = tempY;
        z = tempZ;

        return [x, y, z];
      });

      const faces = [
        [0, 1, 2, 3], // front
        [1, 5, 6, 2], // right
        [5, 4, 7, 6], // back
        [4, 0, 3, 7], // left
        [3, 2, 6, 7], // top
        [4, 5, 1, 0], // bottom
      ];

      const faceColors = [
        "rgba(139, 92, 246, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(192, 132, 252, 0.8)",
        "rgba(216, 180, 254, 0.8)",
        "rgba(233, 213, 255, 0.8)",
        "rgba(250, 245, 255, 0.8)",
      ];

      faces.forEach((face, i) => {
        ctx.beginPath();
        face.forEach((vertexIndex, j) => {
          const [x, y] = rotatedVertices[vertexIndex];
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.fillStyle = faceColors[i];
        ctx.fill();
        ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();
      requestAnimationFrame(drawCube);
    };

    drawCube();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-8">
        <canvas ref={canvasRef} className="animate-fade-in" />
        
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold animate-fade-in">
            Processing your order
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in">
            Please wait while we confirm your adoption
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingLoader;
