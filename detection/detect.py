import cv2
from ultralytics import YOLO

# IMPORTANT: Check this path carefully
model = YOLO(r"D:\re_loop\runs\detect\train3\weights\best.pt")


def detect_plate(frame):
    results = model(frame)

    for r in results:
        boxes = r.boxes

        if boxes is not None and len(boxes) > 0:
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])

                if conf > 0.3:  # confidence threshold
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame,
                                f"Plate {conf:.2f}",
                                (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.6,
                                (0, 255, 0),
                                2)

    return frame
