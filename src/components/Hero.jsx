import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Perspective Tilt effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={ref} className="relative w-full h-screen mx-auto flex flex-col items-center justify-center p-6 text-center perspective-1000">
      <motion.div
        style={{ y, opacity, scale, rotateX }}
        className="flex flex-col items-center gap-6 z-20"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="p-4 glass rounded-3xl border-red-500/20 mb-4"
        >
           <span className="text-red-500 text-xs font-mono tracking-[10px] uppercase">Expedition #01</span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mask-text">
          Mars <span className="text-red-600 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">2026</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light italic opacity-80">
          "The first step towards becoming a multi-planetary species."
        </p>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-12 group relative"
        >
          {/* Tracking UI for 3D Rocket */}
          <div className="w-64 h-64 border-2 border-dashed border-red-500/20 rounded-full animate-spin-slow flex items-center justify-center">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 px-4 py-1 glass rounded-full text-[10px] font-mono text-red-500 whitespace-nowrap">
                TARGET ACQUIRED: SLS MISSION 01
             </div>
             <div className="p-10 border border-white/5 bg-red-500/5 rounded-full blur-xl" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-red-500/40">
           <span>00.32'N</span>
           <div className="w-10 h-[1px] bg-red-500/20" />
           <span>45.12'E</span>
        </div>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-16 bg-gradient-to-b from-red-600 to-transparent rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scroll to Launch</span>
      </motion.div>

      {/* Decorative HUD corners */}
      <div className="absolute inset-20 border border-white/5 rounded-[50px] pointer-events-none opacity-20" />
    </section>
  );
};

export default Hero;
