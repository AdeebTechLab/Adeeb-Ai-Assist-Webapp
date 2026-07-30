import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Hands({ vrm, speaking }) {
  const timer = useRef(0);

  useFrame((state, delta) => {
    if (!vrm) return;

    timer.current += delta;

    const leftArm =
      vrm.humanoid?.getNormalizedBoneNode("leftUpperArm");

    const rightArm =
      vrm.humanoid?.getNormalizedBoneNode("rightUpperArm");

    if (!leftArm || !rightArm) return;

    if (speaking) {
      leftArm.rotation.z =
        Math.sin(timer.current * 4) * 0.25;

      rightArm.rotation.z =
        -Math.sin(timer.current * 4) * 0.25;

      leftArm.rotation.x =
        Math.sin(timer.current * 2) * 0.08;

      rightArm.rotation.x =
        Math.sin(timer.current * 2) * 0.08;
    } else {
      leftArm.rotation.z *= 0.92;
      rightArm.rotation.z *= 0.92;

      leftArm.rotation.x *= 0.92;
      rightArm.rotation.x *= 0.92;
    }
  });

  return null;
}

export default Hands;