import { useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";

import Blink from "./animations/Blink";
import Mouth from "./animations/Mouth";
import Head from "./animations/Head";
import Eyes from "./animations/Eyes";
import Breathing from "./animations/Breathing";
import Hands from "./animations/Hands";
import Emotion from "./animations/Emotion";
import EyeContact from "./animations/EyeContact";

function AvatarModel({
  text,
  speaking,
  listening,
}) {
  const vrmRef = useRef();
  const { scene } = useThree();

  console.log("Loading Avatar...");

  // Load VRM
  const gltf = useLoader(
    GLTFLoader,
    "/avatar/assistant.vrm",
    (loader) => {
      loader.register((parser) => new VRMLoaderPlugin(parser));
    }
  );

  // Setup VRM
  useEffect(() => {
    console.log("GLTF:", gltf);
    console.log("VRM:", gltf.userData.vrm);

    const vrm = gltf.userData.vrm;

    if (!vrm) {
      console.log("❌ VRM not found");
      return;
    }

    VRMUtils.removeUnnecessaryVertices(gltf.scene);
    VRMUtils.removeUnnecessaryJoints(gltf.scene);

    vrm.scene.rotation.y = Math.PI;
    vrm.scene.position.set(0, -1.2, 0);

    scene.add(vrm.scene);

    vrmRef.current = vrm;

    console.log("✅ VRM Loaded");

    return () => {
      scene.remove(vrm.scene);
    };
  }, [gltf, scene]);

  // Idle Animation
  useFrame(({ clock }) => {
    if (!vrmRef.current) return;

    const t = clock.getElapsedTime();

    vrmRef.current.scene.rotation.y =
      Math.PI + Math.sin(t * 0.5) * 0.08;

    vrmRef.current.scene.position.y =
      -1.2 + Math.sin(t * 2) * 0.02;

    vrmRef.current.update(clock.getDelta());
  });

  if (!vrmRef.current) return null;

  return (
   <>
  <Blink vrm={vrmRef.current} />

  <Eyes vrm={vrmRef.current} />

  <Mouth
  vrm={vrmRef.current}
/>
  <Head
    vrm={vrmRef.current}
    speaking={speaking}
    listening={listening}
  />

  <Breathing
    vrm={vrmRef.current}
  />

  <Hands
    vrm={vrmRef.current}
    speaking={speaking}
  />
  <Emotion
  vrm={vrmRef.current}
  speaking={speaking}
/>
<EyeContact
  vrm={vrmRef.current}
/>
</>
  );
}

export default AvatarModel;