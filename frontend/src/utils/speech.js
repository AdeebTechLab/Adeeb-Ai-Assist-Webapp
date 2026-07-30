export function speak(text, language = "en-US") {
  if (!window.speechSynthesis || !text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = language;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const voice = voices.find(v =>
    v.lang.toLowerCase().startsWith(language.toLowerCase().split("-")[0])
  );

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}