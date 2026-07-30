import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Eyes({ vrm }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (!vrm) return;

    const leftEye = vrm.humanoid?.getNormalizedBoneNode("leftEye");
    const rightEye = vrm.humanoid?.getNormalizedBoneNode("rightEye");

    if (!leftEye || !rightEye) return;

    // Smooth eye movement
    leftEye.rotation.y +=
      (mouse.current.x * 0.25 - leftEye.rotation.y) * 0.1;

    rightEye.rotation.y +=
      (mouse.current.x * 0.25 - rightEye.rotation.y) * 0.1;

    leftEye.rotation.x +=
      (-mouse.current.y * 0.12 - leftEye.rotation.x) * 0.1;

    rightEye.rotation.x +=
      (-mouse.current.y * 0.12 - rightEye.rotation.x) * 0.1;
  });

  return null;
}

export default Eyes;