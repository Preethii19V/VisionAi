# logic/decision.py
from logic.ocr import extract_text
from logic.normalize import normalize_plate
from logic.database import is_authorized, add_plate
from logic.policy import evaluate_policy
from datetime import datetime

def log_event(plate, status):
    with open("logs.txt", "a") as f:
        time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"{time},{plate},{status}\n")

def check_plate(image_path, owner_name="Unknown"):
    raw_text = extract_text(image_path)
    plate = normalize_plate(raw_text)

    if is_authorized(plate):
        status = "AUTHORIZED"
        log_event(plate, status)
        return plate, status

    policy = evaluate_policy(plate)

    if policy == "SOFT_ALLOW":
        add_plate(plate, owner_name, "temporary")
        status = "AUTHORIZED (SOFT - ADDED)"
        log_event(plate, status)
        return plate, status
    else:
        status = "UNAUTHORIZED (DENIED)"
        log_event(plate, status)
        return plate, status
