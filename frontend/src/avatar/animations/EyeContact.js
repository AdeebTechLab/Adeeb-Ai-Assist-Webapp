import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function EyeContact({ vrm }) {
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  useFrame(() => {
    if (!vrm) return;

    const neck =
      vrm.humanoid?.getNormalizedBoneNode("neck");

    const head =
      vrm.humanoid?.getNormalizedBoneNode("head");

    if (!neck || !head) return;

    neck.rotation.y +=
      (mouse.current.x * 0.25 - neck.rotation.y) * 0.08;

    neck.rotation.x +=
      (-mouse.current.y * 0.15 - neck.rotation.x) * 0.08;
  });

  useFrame(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  return null;
}

export default EyeContact;