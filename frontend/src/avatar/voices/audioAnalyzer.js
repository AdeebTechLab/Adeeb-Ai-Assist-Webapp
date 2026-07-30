let analyser;
let dataArray;
let audioContext;

export async function startAudioAnalyzer(stream) {
  audioContext = new AudioContext();

  const source =
    audioContext.createMediaStreamSource(stream);

  analyser = audioContext.createAnalyser();

  analyser.fftSize = 256;

  source.connect(analyser);

  dataArray = new Uint8Array(
    analyser.frequencyBinCount
  );
}

export function getAudioLevel() {
  if (!analyser) return 0;

  analyser.getByteFrequencyData(dataArray);

  let sum = 0;

  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }

  return sum / dataArray.length / 255;
}

export function stopAudioAnalyzer() {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  analyser = null;
}