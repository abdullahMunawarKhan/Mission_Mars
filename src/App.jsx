import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import Launch from "./components/Launch";
import SpaceTravel from "./components/SpaceTravel";
import MarsLanding from "./components/MarsLanding";
import Exploration from "./components/Exploration";
import Conclusion from "./components/Conclusion";
import Background from "./components/Background";
import { Hammer, Rocket, Volume2, VolumeX, Shield, Zap, Search, MapPin } from "lucide-react";

// Loader Component
const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] p-10 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-24 h-24 text-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
        </motion.div>

        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-glow text-center">Preparing Mission...</h2>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
               <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
               />
            </div>
            <div className="flex justify-between font-mono text-xs text-red-500/60 uppercase tracking-widest">
               <span>Loading {progress}%</span>
               <span>Status: GO FOR LAUNCH</span>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-center opacity-40">
           <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Optimizing Cinematic Shaders</span>
           <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">Syncing 3D Scene Controls</span>
        </div>
      </div>
    </motion.div>
  );
};

// Navbar Component
const Navbar = () => {
    const [audioEnabled, setAudioEnabled] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[80] px-10 py-8 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col pointer-events-auto cursor-pointer group">
                <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-red-500 transition-all duration-500">Mars Expedition <span className="text-red-600">01</span></span>
                <div className="flex items-center gap-2">
                   <span className="w-12 h-[1px] bg-red-600" />
                   <span className="text-[10px] font-mono tracking-[4px] text-gray-500 uppercase">Live Telemetry</span>
                </div>
            </div>

            <div className="flex items-center gap-6 pointer-events-auto">
                <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="p-4 glass rounded-2xl hover:bg-white/10 transition-all border border-white/5 shadow-2xl group"
                >
                    {audioEnabled ? <Volume2 size={24} className="text-red-500" /> : <VolumeX size={24} className="text-gray-500" />}
                </button>
                <div className="h-12 w-[1px] bg-white/10" />
                <button className="px-8 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-[4px] border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 transition-all text-white/80">
                    Access Grid
                </button>
            </div>
        </nav>
    );
};

// Cinematic Letterboxing
const CinematicBars = () => {
    return (
       <div className="fixed inset-0 pointer-events-none z-[90]">
          <div className="absolute top-0 w-full h-[8vh] bg-[#020202] border-b border-white/5 shadow-2xl" />
          <div className="absolute bottom-0 w-full h-[8vh] bg-[#020202] border-t border-white/5 shadow-2xl" />
       </div>
    );
};

// Dynamic counter for HUD data
const DigitalCounter = ({ value, formatter = (v) => Math.round(v) }) => {
    const [display, setDisplay] = useState(0);
    
    useEffect(() => {
        const unsubscribe = value.on("change", (latest) => {
            setDisplay(formatter(latest));
        });
        // Initial value set
        setDisplay(formatter(value.get()));
        return () => unsubscribe();
    }, [value, formatter]);

    return <span>{display}</span>;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Smooth reactive value for speedometer
  const velocity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 28400, 35000, 15000, 0]);
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 30 });
  const distance = useTransform(scrollYProgress, [0, 1], [225, 0]);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 4000); // 4 seconds of loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative selection:bg-red-600 selection:text-white bg-[#020202] overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10"
        >
          <Navbar />
          <CinematicBars />
          <Background />

          <Hero />
          <Launch />
          <SpaceTravel />
          <MarsLanding />
          <Exploration />
          <Conclusion />

          {/* HUD Speedometer */}
          <div className="fixed bottom-12 right-12 z-[80] flex flex-col items-end gap-2 text-right">
             <span className="text-[10px] font-mono tracking-widest text-red-500/60 uppercase">Relative Velocity</span>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter text-white tabular-nums">
                   <DigitalCounter value={smoothVelocity} />
                </span>
                <span className="text-xs font-mono text-gray-500">KM/H</span>
             </div>
             <motion.div 
                style={{ width: progressBarWidth }}
                className="h-[2px] bg-red-600 mt-2" 
             />
          </div>

          {/* Mission Timer / Distance */}
          <div className="fixed bottom-12 left-12 z-[80] flex flex-col items-start gap-2">
             <span className="text-[10px] font-mono tracking-widest text-blue-500/60 uppercase">Distance to Destination</span>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter text-white tabular-nums">
                   <DigitalCounter value={distance} />
                </span>
                <span className="text-xs font-mono text-gray-500">M KM</span>
             </div>
          </div>
        </motion.main>
      )}
    </div>
  );
};

export default App;
