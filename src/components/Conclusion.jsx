import { motion } from "framer-motion";
import { Globe, Heart, Rocket } from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const Conclusion = () => {
  const scrollProgress = useScrollProgress();

  return (
    <section className="h-screen w-full relative flex items-center justify-center p-10 mt-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-4xl w-full glass p-16 rounded-[40px] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
           <Globe className="w-64 h-64 text-red-500 animate-spin-slow" />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h2 className="text-6xl md:text-8xl font-black uppercase text-glow tracking-tighter mb-8 max-w-2xl mx-auto">
            Future of <span className="text-red-500">Humanity</span>
          </h2>
        </motion.div>

        <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
          Our destination is set. Our purpose is clear. We are the first generation of multi-planetary explorers.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="btn-primary flex items-center gap-3 group"
          >
            <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
            RESTART MISSION
          </button>

          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold border border-white/10 transition-all flex items-center gap-3">
             <Heart size={20} className="text-red-500" />
             SUPPORT EXPLORATION
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
           <div className="flex flex-col gap-2 text-left">
              <span className="text-xs font-mono tracking-widest text-red-500">MISSION STATUS</span>
              <span className="text-sm font-bold uppercase tracking-widest">SUCCESSFUL COMPLETION</span>
           </div>

           <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-xs font-mono tracking-widest text-blue-500">MARS ARRIVAL</span>
              <span className="text-sm font-bold uppercase tracking-widest">2026 MISSION #01</span>
           </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Conclusion;
