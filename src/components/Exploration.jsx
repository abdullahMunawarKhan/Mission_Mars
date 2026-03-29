import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Search, MapPin, Droplets, Mountain } from "lucide-react";
import { cn } from "../utils/cn";

const Exploration = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  const dataPoints = [
    {
      id: "rover",
      title: "Perseverance Rover",
      desc: "Checking life signatures and organic compounds in Jezero Crater.",
      icon: <Search className="text-white" />,
      color: "bg-blue-600",
      top: "40%",
      left: "15%",
    },
    {
      id: "water",
      title: "Ice Deposit",
      desc: "Subsurface frozen water discovered. Vital for future human colonization.",
      icon: <Droplets className="text-white" />,
      color: "bg-cyan-500",
      top: "60%",
      left: "45%",
    },
    {
      id: "colony",
      title: "Alpha Base",
      desc: "First modular human habitat. Pressurized living areas and hydroponic farms.",
      icon: <Mountain className="text-white" />,
      color: "bg-orange-700",
      top: "30%",
      left: "75%",
    },
  ];

  const [activePoint, setActivePoint] = useState(null);

  return (
    <section ref={containerRef} className="h-[400vh] w-full relative bg-[#1a0f0f]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute top-10 left-10 md:left-20 max-w-lg z-10 glass p-8 rounded-3xl">
           <h2 className="text-4xl font-black uppercase tracking-tighter text-glow">Surface Exploration</h2>
           <p className="text-gray-400 mt-4 leading-relaxed">
             Join the discovery of ancient secrets buried under the Martian soil.
           </p>
           <div className="mt-8 flex items-center gap-4 text-xs font-mono">
              <span className="p-2 bg-red-600/20 text-red-500 rounded border border-red-500/30">SCAN ACTIVE</span>
              <span className="p-2 bg-white/5 text-gray-400 rounded">TARGETS: 3</span>
           </div>
        </div>

        <motion.div style={{ x }} className="flex h-screen w-[300%] items-center relative gap-[10%] px-[5%]">
            {/* Exploration Framework 1 */}
            <div className="w-screen h-[70vh] rounded-[100px] border border-white/5 flex items-center justify-center relative shadow-2xl overflow-hidden glass-strong bg-red-950/5">
               <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-600/10 to-transparent z-0" />
               <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 text-[8px] font-mono uppercase">
                  <span>Structural Integrity: 100%</span>
                  <span>Atmospheric Pressure: 0.6 kPa</span>
               </div>
            </div>

            {/* Exploration Framework 2 */}
            <div className="w-screen h-[70vh] rounded-[100px] border border-white/5 flex items-center justify-center relative shadow-2xl overflow-hidden glass-strong bg-red-950/5">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-600/10 to-transparent z-0" />
                <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 text-[8px] font-mono uppercase">
                  <span>Radiation: 0.1 mSv/day</span>
                  <span>Gravity: 3.71 m/s²</span>
               </div>
            </div>

            {/* Exploration Framework 3 */}
            <div className="w-screen h-[70vh] rounded-[100px] border border-white/5 flex items-center justify-center relative shadow-2xl overflow-hidden glass-strong bg-red-950/5">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-600/10 to-transparent z-0" />
                <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 text-[8px] font-mono uppercase">
                  <span>Target: Olympus Mons Sector</span>
                  <span>Distance: 452 KM</span>
               </div>
            </div>

            {/* Interactive Points */}
            {dataPoints.map((point) => (
              <motion.div
                key={point.id}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                style={{ top: point.top, left: point.left }}
                className={cn(
                  "absolute z-20 cursor-pointer pointer-events-auto",
                   activePoint === point.id ? "scale-125 z-30" : "scale-100"
                )}
              >
                  <div className={cn("p-4 rounded-full border-4 border-white/20 transition-all duration-300", point.color, activePoint === point.id ? "shadow-[0_0_40px_rgba(255,255,255,0.4)]" : "shadow-xl")}>
                     {point.icon}
                  </div>

                  {activePoint === point.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-[300px] glass p-6 rounded-3xl"
                    >
                       <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                          <MapPin size={18} className="text-red-500" />
                          {point.title}
                       </h3>
                       <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">{point.desc}</p>
                       <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono tracking-widest uppercase transition-all">Retrieve Data</button>
                    </motion.div>
                  )}
              </motion.div>
            ))}
        </motion.div>

        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-red-500 font-mono text-xs max-w-xs text-right opacity-50">
           <span>COORDINATES: 18.45°N 77.45°E</span>
           <span>LATENCY: 54.2MS</span>
        </div>
      </div>
    </section>
  );
};

export default Exploration;
