export function speak(text, language = "en-US") {
  if (!("speechSynthesis" in window) || !text) return;

  // Stop previous speech only if speaking
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = language;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  if (voices.length > 0) {
    const voice = voices.find(
      (v) => v.lang.toLowerCase().startsWith(language.split("-")[0].toLowerCase())
    );

    if (voice) {
      utterance.voice = voice;
    }
  }

  utterance.onstart = () => {
    console.log("🔊 Speech Started");
  };

  utterance.onend = () => {
    console.log("✅ Speech Finished");
  };

  utterance.onerror = (e) => {
    console.error("❌ Speech Error:", e);
  };

  window.speechSynthesis.speak(utterance);
}