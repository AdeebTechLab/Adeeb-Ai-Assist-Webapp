import { useEffect } from "react";

function Emotion({
  vrm,
  speaking,
}) {
  useEffect(() => {
    if (!vrm) return;

    const exp = vrm.expressionManager;

    if (!exp) return;

    // Reset
    exp.setValue("happy", 0);
    exp.setValue("relaxed", 0);
    exp.setValue("surprised", 0);

    if (speaking) {
      // Speaking
      exp.setValue("happy", 0.35);
    } else {
      // Listening
      exp.setValue("relaxed", 0.30);
    }

    return () => {
      exp.setValue("happy", 0);
      exp.setValue("relaxed", 0);
      exp.setValue("surprised", 0);
    };
  }, [vrm, speaking]);

  return null;
}

export default Emotion;