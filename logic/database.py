import sqlite3

DB_PATH = "vehicles.db"

def is_authorized(plate):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT * FROM vehicles WHERE plate=?", (plate,))
    result = cur.fetchone()
    conn.close()
    return result is not None

def add_plate(plate, owner="Guest", vtype="guest"):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        "INSERT OR IGNORE INTO vehicles (plate, owner, type) VALUES (?, ?, ?)",
        (plate, owner, vtype)
    )
    conn.commit()
    conn.close()
