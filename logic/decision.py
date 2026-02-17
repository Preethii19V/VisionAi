from logic.ocr import extract_text
from logic.normalize import normalize_plate
from logic.database import is_authorized

def check_plate(image_path):
    raw = extract_text(image_path)
    plate = normalize_plate(raw)

    if is_authorized(plate):
        return plate, "AUTHORIZED"
    else:
        return plate, "UNAUTHORIZED"
