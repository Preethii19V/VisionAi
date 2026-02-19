import cv2
from detection.camera import get_frame, release_camera
from detection.detect import detect_plate

while True:
    frame = get_frame()

    if frame is None:
        print("No frame received")
        break

    frame = detect_plate(frame)

    cv2.imshow("Camera", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

release_camera()
