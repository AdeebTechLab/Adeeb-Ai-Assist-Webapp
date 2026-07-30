import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function Avatar() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#4F8EF7" />
    </mesh>
  );
}

export default function VRMAvatar() {
  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden bg-slate-900">
      <Canvas camera={{ position: [0, 1.4, 3] }}>

        <ambientLight intensity={1} />

        <directionalLight
          position={[3, 3, 3]}
          intensity={2}
        />

        <Avatar />

        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={5}
        />

      </Canvas>
    </div>
  );
}