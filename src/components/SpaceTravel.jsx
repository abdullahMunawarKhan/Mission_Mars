import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Info, Globe, Shield, Zap } from "lucide-react";
import { cn } from "../utils/cn";

const SpaceTravel = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const planets = [
    {
      id: "moon",
      name: "The Moon",
      desc: "Earth's natural satellite. The final checkpoint before deep space travel.",
      color: "bg-gray-400",
      icon: <Globe className="text-white" />,
      style: "h-[100px] w-[100px] top-[10%] left-[20%]",
      parallax: [200, -200],
    },
    {
      id: "jupiter",
      name: "Jupiter",
      desc: "The largest planet. Its massive gravity assists our trajectory.",
      color: "bg-orange-600/60",
      icon: <Zap className="text-white" />,
      style: "h-[300px] w-[300px] top-[40%] right-[10%] opacity-80",
      parallax: [300, -300],
    },
    {
      id: "saturn",
      name: "Saturn",
      desc: "Famous for its stunning rings, Saturn's view is unparalleled.",
      color: "bg-yellow-600/60",
      icon: <Shield className="text-white" />,
      style: "h-[200px] w-[200px] top-[70%] left-[30%] opacity-70",
      parallax: [400, -400],
    },
  ];

  return (
    <section ref={containerRef} className="h-[300vh] w-full relative overflow-hidden flex flex-col items-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-center z-10 p-10 glass rounded-3xl"
        >
          <h2 className="text-6xl font-black text-glow uppercase tracking-tighter">Hyper-Space</h2>
          <p className="text-blue-400 font-mono mt-4 tracking-widest text-lg">CRUISING AT 0.8C</p>
        </motion.div>
      </div>

      {planets.map((planet) => (
        <PlanetItem
          key={planet.id}
          planet={planet}
          containerRef={containerRef}
          onHover={() => setHoveredPlanet(planet.id)}
          onLeave={() => setHoveredPlanet(null)}
          isHovered={hoveredPlanet === planet.id}
        />
      ))}
    </section>
  );
};

const PlanetItem = ({ planet, containerRef, onHover, onLeave, isHovered }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], planet.parallax);

  return (
    <motion.div
      style={{ y }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "absolute rounded-full transition-all duration-700 pointer-events-auto",
        planet.style,
        planet.color,
        isHovered ? "scale-110 shadow-[0_0_50px_rgba(255,255,255,0.3)]" : "scale-100"
      )}
    >
      <div className="absolute inset-0 bg-black/20 rounded-full blur-xl" />

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-[250px] glass p-6 rounded-2xl z-20 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className="p-2 bg-white/10 rounded-lg">{planet.icon}</div>
             <h3 className="text-xl font-bold">{planet.name}</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{planet.desc}</p>
          <div className="mt-4 flex items-center gap-2 text-blue-400 text-[10px] font-mono">
            <Info size={12} />
            <span>INTERACTIVE SCAN ACTIVE</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpaceTravel;
