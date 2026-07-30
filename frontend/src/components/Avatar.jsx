import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Avatar({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const [blink, setBlink] = useState(false);

  // Blink every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);

      setTimeout(() => {
        setBlink(false);
      }, 180);

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Speak whenever text changes
  useEffect(() => {
    if (!text || text.trim() === "") return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);

  }, [text]);

  return (
    <div className="flex justify-center mb-8">

      <motion.div
        animate={{
          rotate: speaking ? [0, -3, 3, -2, 2, 0] : 0,
          y: speaking ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: speaking ? Infinity : 0,
        }}
        className="relative w-56 h-56 bg-blue-100 rounded-full shadow-2xl flex items-center justify-center"
      >
        {/* Face */}

        <div className="absolute w-44 h-44 rounded-full bg-yellow-200">

          {/* Eyes */}

          <div className="flex justify-center gap-12 mt-14">

            <motion.div
              animate={{
                scaleY: blink ? 0.05 : 1,
              }}
              className="w-5 h-5 bg-black rounded-full"
            />

            <motion.div
              animate={{
                scaleY: blink ? 0.05 : 1,
              }}
              className="w-5 h-5 bg-black rounded-full"
            />

          </div>

          {/* Mouth */}

          <motion.div
            animate={{
              height: speaking ? [8, 18, 8, 16, 8] : 8,
            }}
            transition={{
              duration: 0.25,
              repeat: speaking ? Infinity : 0,
            }}
            className="bg-red-600 rounded-full w-12 mx-auto mt-12"
          />

        </div>

      </motion.div>

    </div>
  );
}

export default Avatar;