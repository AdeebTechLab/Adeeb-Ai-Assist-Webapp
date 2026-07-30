from pprint import pprint

from backend.ai.process_meeting import process_meeting

result = process_meeting("backend/uploads/audio/sample.wav")

pprint(result)