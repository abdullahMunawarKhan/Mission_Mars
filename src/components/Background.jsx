import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Float, PerspectiveCamera, Preload, Cylinder, Cone, Box, Plane, MeshDistortMaterial, Shadow } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random";

// 3D Mars Surface Terrain
const Terrain3D = ({ scroll }) => {
  const mesh = useRef();
  
  // Create displacement map from simple noise or procedural geometry
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(100, 100, 128, 128);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) / 10;
        const y = pos.getY(i) / 10;
        // Simple noise approximation
        const z = (Math.sin(x) * Math.cos(y)) + (Math.sin(x * 2.5) * 0.5) + (Math.cos(y * 1.8) * 0.3);
        pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state) => {
    // Only visible and active during exploration (0.7 to 1.0)
    if (scroll > 0.65) {
       mesh.current.visible = true;
       const progress = (scroll - 0.65) / 0.35;
       mesh.current.position.z = -20 + progress * 50;
       mesh.current.position.y = -5;
    } else {
       mesh.current.visible = false;
    }
  });

  return (
    <mesh ref={mesh} geometry={geom} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
       <meshStandardMaterial 
          color="#8b2c15" 
          roughness={1} 
          metalness={0.1} 
          flatShading={false}
       />
    </mesh>
  );
};

// Realistic 3D Rocket Component
const Rocket3D = ({ scroll }) => {
  const group = useRef();
  const fireRef = useRef();

  useFrame((state, delta) => {
    if (scroll < 0.3) {
      group.current.position.y = -10 + scroll * 100;
      group.current.rotation.x = 0;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.01;
    } else if (scroll < 0.7) {
      const t = (scroll - 0.3) / 0.4;
      group.current.position.y = 20 - t * 10;
      group.current.position.x = t * 20;
      group.current.rotation.z = THREE.MathUtils.lerp(0, -Math.PI / 2.5, t);
    } else {
      const t = (scroll - 0.7) / 0.3;
      group.current.position.x = 20 - t * 20;
      group.current.position.y = 10 - t * 25;
      group.current.rotation.z = THREE.MathUtils.lerp(-Math.PI / 2.5, -Math.PI, t);
    }
    
    if (fireRef.current) {
        fireRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.5;
        fireRef.current.visible = scroll > 0.05 && scroll < 0.95;
    }
  });

  return (
    <group ref={group} scale={0.5}>
      <Cylinder args={[1.5, 1.5, 10, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f0f0f0" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[1.2, 1.5, 8, 32]} position={[0, 9, 0]}>
        <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cone args={[1.2, 4, 32]} position={[0, 15, 0]}>
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
      </Cone>
      {[0, 90, 180, 270].map((angle, i) => (
        <group key={i} rotation={[0, THREE.MathUtils.degToRad(angle), 0]}>
          <Box args={[0.2, 4, 2]} position={[1.6, -3, 0]}>
            <meshStandardMaterial color="#333333" />
          </Box>
        </group>
      ))}
      <group position={[0, -5, 0]}>
         <Cylinder args={[0.8, 1, 1, 16]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#222" />
         </Cylinder>
         <mesh ref={fireRef} position={[0, -3, 0]} rotation={[Math.PI, 0, 0]}>
            <Cone args={[0.8, 6, 16]}>
               <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={5} transparent opacity={0.8} />
            </Cone>
         </mesh>
      </group>
    </group>
  );
};

const Starfield = ({ scroll }) => {
  const ref = useRef();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(5000), { radius: 100 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 60;
    ref.current.rotation.y -= delta / 40;
    const targetZ = scroll * 50;
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.05);
    ref.current.scale.z = 1 + scroll * 2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Planet = ({ position, color, emis, radius, visibleRange, scroll, direction = 1 }) => {
  const ref = useRef();
  const materialRef = useRef();

  useFrame(() => {
    const s = scroll;
    const [start, end] = visibleRange;
    if (s >= start && s <= end) {
      ref.current.visible = true;
      const progress = (s - start) / (end - start);
      ref.current.position.z = -80 + progress * 150;
      ref.current.position.x = position[0] - progress * 40 * direction;
      ref.current.position.y = position[1] + Math.sin(progress * Math.PI) * 10;
      ref.current.rotation.y += 0.005;
      materialRef.current.opacity = Math.sin(progress * Math.PI);
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
       <Sphere ref={ref} args={[radius, 64, 64]} position={position} visible={false}>
          <meshStandardMaterial ref={materialRef} color={color} emissive={emis} emissiveIntensity={1.2} transparent roughness={0.8} metalness={0.4} />
       </Sphere>
    </Float>
  );
};

const SceneControls = ({ scroll }) => {
  const { camera } = useThree();
  useFrame((state) => {
    const lookAtX = Math.sin(scroll * Math.PI * 2) * 20;
    const lookAtY = Math.cos(scroll * Math.PI) * 10;
    camera.lookAt(lookAtX, lookAtY, -100);
    if (scroll > 0.1 && scroll < 0.25) {
        state.camera.position.x += (Math.random() - 0.5) * 0.05;
        state.camera.position.y += (Math.random() - 0.5) * 0.05;
    }
  });
  return null;
}

const Background = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';
      setScroll((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020202] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }} shadows>
        <Suspense fallback={null}>
          <SceneControls scroll={scroll} />
          <ambientLight intensity={0.5} />
          <pointLight position={[20, 20, 20]} intensity={2} color="#ffffff" castShadow />
          <pointLight position={[-20, -20, -20]} intensity={1.5} color="#ff3333" />
          
          <Starfield scroll={scroll} />
          <Rocket3D scroll={scroll} />
          <Terrain3D scroll={scroll} />
          
          <Planet position={[-20, 0, -20]} color="#1e40af" emis="#1e40af" radius={8} visibleRange={[0, 0.4]} scroll={scroll} direction={1.5} />
          <Planet position={[30, -10, -50]} color="#ea580c" emis="#9a3412" radius={15} visibleRange={[0.3, 0.7]} scroll={scroll} direction={-1.2} />
          <Planet position={[15, 5, -30]} color="#b91c1c" emis="#b91c1c" radius={6} visibleRange={[0.7, 1.0]} scroll={scroll} direction={0.8} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background;
