# db_setup.py
import sqlite3

conn = sqlite3.connect("vehicles.db")
cur = conn.cursor()

# Main vehicles table
cur.execute("""
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT UNIQUE,
    owner TEXT,
    type TEXT
)
""")

# Policy table (NEW)
cur.execute("""
CREATE TABLE IF NOT EXISTS policy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT UNIQUE,
    rule TEXT
)
""")

# Default authorized
cur.execute("INSERT OR IGNORE INTO vehicles VALUES (NULL, 'TN01AB1234', 'Admin', 'permanent')")
cur.execute("INSERT OR IGNORE INTO vehicles VALUES (NULL, 'KA05CD5678', 'Staff', 'permanent')")

# Soft allowed examples
cur.execute("INSERT OR IGNORE INTO policy VALUES (NULL, 'TN09XY9999', 'SOFT_ALLOW')")
cur.execute("INSERT OR IGNORE INTO policy VALUES (NULL, 'GUEST1234', 'SOFT_ALLOW')")

conn.commit()
conn.close()

print("Database & policy tables created!")
