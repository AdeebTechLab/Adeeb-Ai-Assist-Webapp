export function speak(text, onStart, onEnd) {
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();

  const englishVoice = voices.find(
    (voice) =>
      voice.lang.startsWith("en") &&
      voice.name.toLowerCase().includes("female")
  );

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  speechSynthesis.speak(utterance);
}