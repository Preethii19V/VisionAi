# logic/policy.py

# Example soft rules:
# person can have 2 vehicles
# temporary pass list
soft_allowed = [
    "TN09XY9999",   # example second bike
    "GUEST1234"
]

def evaluate_policy(plate):
    if plate in soft_allowed:
        return "SOFT_ALLOW"
    else:
        return "HARD_DENY"# logic/policy.py
import sqlite3

DB_PATH = "vehicles.db"

def evaluate_policy(plate):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT rule FROM policy WHERE plate=?", (plate,))
    result = cur.fetchone()
    conn.close()

    if result:
        return result[0]   # SOFT_ALLOW
    else:
        return "HARD_DENY"

