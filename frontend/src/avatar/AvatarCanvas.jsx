import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import AvatarModel from "./AvatarModel";
import AvatarLoader from "./AvatarLoader";
import AvatarErrorBoundary from "./AvatarErrorBoundary";

function AvatarCanvas({
  text,
  speaking,
  listening,
}) {
  return (
    <div className="w-full h-[650px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 via-blue-100 to-indigo-100 shadow-2xl">

      <AvatarErrorBoundary>

        <Canvas
          shadows
          dpr={[1, 2]}
          frameloop="always"
          camera={{
            position: [0, 1.45, 2.2],
            fov: 32,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Ambient Light */}
          <ambientLight intensity={1.4} />

          {/* Main Light */}
          <directionalLight
            castShadow
            position={[5, 8, 5]}
            intensity={2.5}
          />

          {/* Fill Light */}
          <pointLight
            position={[-4, 3, 4]}
            intensity={1}
          />

          {/* Back Light */}
          <pointLight
            position={[0, 5, -5]}
            intensity={0.5}
          />

          {/* Avatar */}
          <Suspense fallback={<AvatarLoader />}>
            <AvatarModel
              text={text}
              speaking={speaking}
              listening={listening}
            />
          </Suspense>

          {/* Floor Shadow */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.5}
            scale={12}
            blur={2.5}
            far={8}
            resolution={1024}
          />

          {/* HDR Environment */}
          <Environment
            preset="city"
            background={false}
          />

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.4}
            minDistance={2.2}
            maxDistance={2.2}
            minPolarAngle={1.2}
            maxPolarAngle={1.8}
          />
        </Canvas>

      </AvatarErrorBoundary>

    </div>
  );
}

export default AvatarCanvas;