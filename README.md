# 🚀 Mission Mars: High-Fidelity Cinematic Experience

**Mission Mars** is a next-generation, high-fidelity web experience that takes users on a cinematic journey from Earth to the Red Planet. Built with **React 19**, **Three.js**, and **Framer Motion**, the application features a scroll-synchronized narrative that combines 3D environments with a futuristic HUD (Heads-Up Display) and realistic mission telemetry.

![Mission Overview](/public/assets/mars.png)

## 🌌 Key Highlights

- **Cinematic 3D Journey**: A dynamic Three.js background that evolves as you scroll, featuring procedural models of Earth, Jupiter, and Mars.
- **Procedural 3D Rocket**: A multi-stage 3D vehicle built with Three.js primitives, featuring live thruster fire and orientation shifts during flight.
- **Live HUD Telemetry**: Real-time velocity tracker (KM/H) and distance remaining (M KM) synchronized to scroll depth.
- **3D Surface Exploration**: A procedural Martian terrain generated with noise-driven vertex displacement for a rugged, immersive landing experience.
- **Anamorphic Visuals**: 8vh cinematic letterboxing and perspective-shifted UI panels for a "movie-like" presentation.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
src/
├── components/          # 3D and UI Stage Components
│   ├── Background.jsx   # Global 3D Scene Controller (Planets, Rocket, Stars)
│   ├── Hero.jsx         # Mission Briefing (HUD Overlay)
│   ├── Launch.jsx       # Earth Departure Sequence
│   ├── Exploration.jsx  # 3D Terrain Data Points
│   └── ...
├── hooks/
│   └── useScrollProgress.js # Main storytelling driver
├── utils/
│   ├── animations.js    # Standardized motion variants
│   └── cn.js            # Tailwind utility
└── App.jsx              # Mission Framework & Loader
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abdullahMunawarKhan/Mission_Mars.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the mission locally**:
   ```bash
   npm run dev
   ```

4. **Build for deployment**:
   ```bash
   npm run build
   ```

## 🧠 Design Philosophy

The project prioritizes **Performance & Immersion**. By using a single `scrollYProgress` source to drive both the DOM (Framer Motion) and the WebGL scene (Three.js), we achieve a seamless "Video-Narrative" feeling without the overhead of heavy video files. All 3D models and terrains are generated procedurally or with lightweight primitives for instant loading and 60FPS interaction.

---
**"Become a witness to the next step of human evolution."** 🌌🚀🔴
