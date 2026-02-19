import cv2

phone_ip = "192.168.1.107:8080"   # change if needed
url = f"http://{phone_ip}/video"

cap = cv2.VideoCapture(url)


def get_frame():
    ret, frame = cap.read()
    if not ret:
        return None
    return frame


def release_camera():
    cap.release()
    cv2.destroyAllWindows()
