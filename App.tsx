import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import GameWorld from "./components/game/GameWorld";
import GameUI from "./components/game/GameUI";
import SoundManager from "./components/game/SoundManager";
import "@fontsource/inter";

// Define control keys for the game
enum Controls {
  forward = 'forward',
  backward = 'backward',
  leftward = 'leftward',
  rightward = 'rightward',
  interact = 'interact',
  inventory = 'inventory',
  jump = 'jump',
}

const controls = [
  { name: Controls.forward, keys: ["KeyW", "ArrowUp"] },
  { name: Controls.backward, keys: ["KeyS", "ArrowDown"] },
  { name: Controls.leftward, keys: ["KeyA", "ArrowLeft"] },
  { name: Controls.rightward, keys: ["KeyD", "ArrowRight"] },
  { name: Controls.interact, keys: ["KeyE", "Space"] },
  { name: Controls.inventory, keys: ["KeyI", "Tab"] },
  { name: Controls.jump, keys: ["Space"] },
];

function App() {
  const { phase } = useGame();
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setShowCanvas(true);
  }, []);

  if (!showCanvas) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Enchanted Puzzle World</h1>
          <div className="animate-pulse">Loading magical realm...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controls}>
        <Canvas
          shadows
          camera={{
            position: [0, 8, 12],
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          
          {/* Ambient lighting for the enchanted world */}
          <ambientLight intensity={0.3} color="#4a90e2" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            color="#fff8dc"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          
          {/* Magical atmosphere lighting */}
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#ff6b6b" />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4ecdc4" />

          <Suspense fallback={null}>
            <GameWorld />
          </Suspense>
        </Canvas>
        
        <GameUI />
        <SoundManager />
      </KeyboardControls>
    </div>
  );
}

export default App;
