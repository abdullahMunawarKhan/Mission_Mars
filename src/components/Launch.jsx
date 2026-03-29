import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Launch = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [400, -800]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] w-full relative flex items-center justify-center overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          style={{ y, scale, opacity }}
          className="relative group h-96 w-64 flex flex-col items-center justify-center"
        >
          {/* Telemetry Tracking Frame */}
          <div className="absolute inset-0 border-2 border-red-500/20 rounded-[50px] shadow-[0_0_50px_rgba(239,68,68,0.1)] p-10 flex flex-col justify-end gap-2 bg-red-500/5 backdrop-blur-[2px]">
             <span className="text-[10px] font-mono text-red-500/60 uppercase">STAGE 1: SEPARATION COMPLETE</span>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   animate={{ x: ["-100%", "100%"] }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
                   className="h-full w-1/3 bg-red-500" 
                />
             </div>
          </div>

          {/* Launch Smoke Particles */}
          <motion.div
             animate={{
               opacity: [0.2, 0.8, 0.2],
               scale: [0.8, 1.2, 0.8],
             }}
             transition={{
               duration: 2,
               repeat: Infinity,
               ease: "easeInOut",
             }}
             className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-24 h-48 bg-gradient-to-t from-orange-600/50 via-red-500/20 to-transparent blur-3xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 max-w-md glass p-8 rounded-3xl"
        >
          <h2 className="text-4xl font-black mb-4 uppercase text-glow">Ignition</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Falcon Heavy thrusters firing at 100% capacity. Escaping Earth's atmosphere. All systems green.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,1)]"
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-red-500">
              <span>THRUST CAP</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Launch;
