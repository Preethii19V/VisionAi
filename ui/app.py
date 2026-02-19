from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Database path
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "vehicles.db")


# -------------------------
# ADD VEHICLE
# -------------------------
@app.route("/add", methods=["POST"])
def add_vehicle():
    data = request.get_json()
    vehicle_number = data.get("vehicle_number")

    if not vehicle_number:
        return jsonify({"error": "Vehicle number required"}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_number TEXT UNIQUE
        )
    """)

    try:
        cursor.execute("INSERT INTO vehicles (vehicle_number) VALUES (?)", (vehicle_number,))
        conn.commit()
        response = {
            "plate": vehicle_number,
            "status": "Added",
            "confidence": 1.0
        }
    except sqlite3.IntegrityError:
        response = {
            "plate": vehicle_number,
            "status": "Already Exists",
            "confidence": 1.0
        }

    conn.close()
    return jsonify(response)


# -------------------------
# DETECT VEHICLE
# -------------------------
@app.route("/detect", methods=["POST"])
def detect_vehicle():
    data = request.get_json()
    vehicle_number = data.get("vehicle_number")

    if not vehicle_number:
        return jsonify({"error": "Vehicle number required"}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM vehicles WHERE vehicle_number=?", (vehicle_number,))
    vehicle = cursor.fetchone()
    conn.close()

    if vehicle:
        return jsonify({
            "plate": vehicle_number,
            "status": "Authorized",
            "confidence": 0.98
        })
    else:
        return jsonify({
            "plate": vehicle_number,
            "status": "Denied",
            "confidence": 0.95
        })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
