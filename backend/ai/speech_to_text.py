import whisper


# Whisper model sirf ek dafa load hoga
model = whisper.load_model("base")


def transcribe_audio(audio_path: str):
    """
    Audio file ko text me convert karta hai.
    """
    result = model.transcribe(audio_path)

    return result["text"]