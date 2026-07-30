import { useEffect } from "react";
import { getAudioLevel } from "../voices/audioAnalyzer";

function Mouth({ vrm, speaking }) {
  useEffect(() => {
    if (!vrm) return;

    const expressionManager = vrm.expressionManager;

    if (!expressionManager) return;

    let interval;

    if (speaking) {
      interval = setInterval(() => {
        const value = Math.random() * 0.9;

        // Mouth Open
        expressionManager.setValue("aa", value);

        // Slight Smile
        expressionManager.setValue("happy", 0.25);

        setTimeout(() => {
          expressionManager.setValue("aa", 0);
        }, 80);
      }, 120);
    } else {
      expressionManager.setValue("aa", 0);
      expressionManager.setValue("happy", 0);
    }

    return () => {
      clearInterval(interval);

      expressionManager.setValue("aa", 0);
      expressionManager.setValue("happy", 0);
    };
  }, [vrm, speaking]);

  return null;
}

export default Mouth;