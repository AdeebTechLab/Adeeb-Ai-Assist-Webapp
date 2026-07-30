import { useEffect } from "react";

function Blink({ vrm }) {
  useEffect(() => {
    if (!vrm) return;

    let timeout;

    function blink() {
      const expressionManager = vrm.expressionManager;

      if (!expressionManager) return;

      expressionManager.setValue("blink", 1);

      setTimeout(() => {
        expressionManager.setValue("blink", 0);
      }, 120);

      const nextBlink = 2500 + Math.random() * 3000;

      timeout = setTimeout(blink, nextBlink);
    }

    timeout = setTimeout(blink, 2000);

    return () => clearTimeout(timeout);
  }, [vrm]);

  return null;
}

export default Blink;