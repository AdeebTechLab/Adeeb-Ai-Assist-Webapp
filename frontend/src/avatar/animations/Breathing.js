import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Breathing({ vrm }) {
  const timer = useRef(0);

  useFrame((state, delta) => {
    if (!vrm) return;

    timer.current += delta;

    const chest =
      vrm.humanoid?.getNormalizedBoneNode("chest");

    const spine =
      vrm.humanoid?.getNormalizedBoneNode("spine");

    if (!chest || !spine) return;

    const breathe =
      Math.sin(timer.current * 1.8) * 0.015;

    chest.rotation.x = breathe;
    spine.rotation.x = breathe * 0.5;
  });

  return null;
}

export default Breathing;