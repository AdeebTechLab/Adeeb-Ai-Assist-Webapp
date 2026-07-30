from backend.ai.speech_to_text import transcribe_audio

audio = "backend/uploads/audio/sample.wav"

text = transcribe_audio(audio)

print(text)