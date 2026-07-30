import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Head({
  vrm,
  speaking,
  listening,
}) {
  const timer = useRef(0);

  useFrame((state, delta) => {
    if (!vrm) return;

    timer.current += delta;

    const neck =
      vrm.humanoid?.getNormalizedBoneNode("neck");

    const head =
      vrm.humanoid?.getNormalizedBoneNode("head");

    if (!neck || !head) return;

    // ===========================
    // Listening Animation
    // ===========================
    if (listening) {
      neck.rotation.y =
        Math.sin(timer.current * 1.5) * 0.05;

      neck.rotation.x = -0.08;

      head.rotation.x =
        Math.sin(timer.current * 2) * 0.02;

      return;
    }

    // ===========================
    // Speaking Animation
    // ===========================
    if (speaking) {
      neck.rotation.y =
        Math.sin(timer.current * 1.2) * 0.12;

      neck.rotation.x =
        Math.sin(timer.current * 2) * 0.03;

      head.rotation.x =
        Math.sin(timer.current * 8) * 0.06;

      return;
    }

    // ===========================
    // Idle Animation
    // ===========================
    neck.rotation.y =
      Math.sin(timer.current * 0.5) * 0.08;

    neck.rotation.x =
      Math.sin(timer.current * 0.8) * 0.02;

    head.rotation.x *= 0.92;
  });

  return null;
}

export default Head;