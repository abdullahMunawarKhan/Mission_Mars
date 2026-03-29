import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const MarsLanding = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rocketY = useTransform(scrollYProgress, [0.2, 0.8], [-200, 400]);
  const rocketScale = useTransform(scrollYProgress, [0.2, 0.8], [0.5, 3]);
  const rocketOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] w-full relative bg-gradient-to-b from-transparent via-red-900/30 to-orange-950/80 overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden glass-strong bg-red-950/10">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent opacity-50 z-0" />
          {/* Surface Dust effect */}
           <motion.div
             animate={{
               opacity: [0.1, 0.3, 0.1],
               x: [-10, 10, -10],
             }}
             transition={{
               duration: 5,
               repeat: Infinity,
               ease: "linear",
             }}
             className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-orange-900/50 to-transparent blur-3xl"
           />
        </div>

        <motion.div style={{ y: rocketY, scale: rocketScale, opacity: rocketOpacity }} className="relative z-10 flex flex-col items-center">
          <ArrowDown className="text-red-500 w-16 h-16 animate-bounce" />
          <div className="mt-4 p-4 glass rounded-2xl flex flex-col items-center">
             <span className="text-4xl font-black text-red-100 tracking-tighter">DESCENT</span>
             <span className="text-xs font-mono text-red-400">TOUCHDOWN IN T-MINUS 12S</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute bottom-20 max-w-2xl px-10 text-center"
        >
          <h2 className="text-5xl font-black text-white mt-4 uppercase">The Red Planet</h2>
          <p className="text-gray-400 mt-6 text-xl leading-relaxed">
            Atmospheric entry complete. Deploying heat shield. Parachutes deployed. Engine cut-off. Landing gear confirmed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MarsLanding;
