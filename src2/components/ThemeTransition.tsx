import { useTheme } from "@/contexts/ThemeContext";

const ThemeTransition = () => {
  const { theme, isTransitioning } = useTheme();
  // Show moon when transitioning TO dark mode, show sun when transitioning TO light mode
  const showMoon = isTransitioning && theme === "dark";
  const showSun = isTransitioning && theme === "light";

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          showMoon ? "bg-slate-900/50" : "bg-amber-100/50"
        }`}
        style={{ animation: "fadeInOut 1.6s ease-in-out" }}
      />
      
      {/* Moon Animation */}
      {showMoon && (
        <div className="relative animate-theme-celestial">
          {/* Moon glow */}
          <div className="absolute inset-0 -m-12 rounded-full bg-indigo-400/20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 -m-6 rounded-full bg-blue-300/30 blur-2xl animate-pulse" />
          
          {/* 3D Moon */}
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 30%, #6366f1 100%)",
                boxShadow: `
                  inset -20px -20px 40px rgba(99, 102, 241, 0.4),
                  inset 10px 10px 30px rgba(255, 255, 255, 0.2),
                  0 0 80px rgba(165, 180, 252, 0.6),
                  0 0 120px rgba(99, 102, 241, 0.3),
                  0 0 180px rgba(67, 56, 202, 0.15)
                `,
                transform: "perspective(500px) rotateY(-15deg) rotateX(10deg)",
                opacity: 0.75,
              }}
            />
            {/* Moon craters */}
            <div 
              className="absolute w-6 h-6 rounded-full bg-indigo-300/30"
              style={{ top: "20%", left: "25%", boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.15)" }}
            />
            <div 
              className="absolute w-4 h-4 rounded-full bg-indigo-300/25"
              style={{ top: "50%", left: "60%", boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.15)" }}
            />
            <div 
              className="absolute w-3 h-3 rounded-full bg-indigo-300/20"
              style={{ top: "70%", left: "35%", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)" }}
            />
            {/* Crescent shadow for half moon effect */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent 40%, rgba(30, 27, 75, 0.5) 100%)",
              }}
            />
          </div>
          
          {/* Stars around moon */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 200 - 50}px`,
                left: `${Math.random() * 200 - 50}px`,
                animationDelay: `${Math.random() * 0.5}s`,
                boxShadow: "0 0 6px #fff",
              }}
            />
          ))}
        </div>
      )}

      {/* Sun Animation */}
      {showSun && (
        <div className="relative animate-theme-celestial">
          {/* Sun glow */}
          <div className="absolute inset-0 -m-20 rounded-full bg-yellow-400/25 blur-3xl animate-pulse" />
          <div className="absolute inset-0 -m-12 rounded-full bg-orange-300/30 blur-2xl animate-pulse" />
          
          {/* 3D Sun */}
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #fef3c7 0%, #fcd34d 30%, #f59e0b 70%, #d97706 100%)",
                boxShadow: `
                  inset -15px -15px 30px rgba(217, 119, 6, 0.4),
                  inset 10px 10px 25px rgba(254, 243, 199, 0.3),
                  0 0 100px rgba(252, 211, 77, 0.7),
                  0 0 150px rgba(245, 158, 11, 0.4),
                  0 0 220px rgba(217, 119, 6, 0.2)
                `,
                transform: "perspective(500px) rotateY(15deg) rotateX(-10deg)",
                opacity: 0.75,
              }}
            />
            
            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-t from-yellow-400 to-transparent"
                style={{
                  width: "4px",
                  height: "30px",
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translateX(-50%) translateY(-100%) rotate(${i * 30}deg) translateY(-70px)`,
                  borderRadius: "2px",
                  opacity: 0.7,
                  animation: `rayPulse 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeTransition;
