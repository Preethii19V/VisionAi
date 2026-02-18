from logic.database import add_plate
from logic.normalize import normalize_plate

raw_plates = [
"PY 01 BP 3726",
"PY 01 BY 7627",
"PY 01 CV 9634",
"PY 05 S 4332",
"PY 01 AT 5938",
"PY 01 BD 4978",
"PY 05 E 8250",
"PY 05 K 2863",
"PY 05 E 2373",
"PY 05 AA 4863",
"PY 01 CT 1947",
"PY 01 CR 2601",
"PY 01 DD 2327",
"TN 81 J 8483",
"PY 05 S 4384",
"TN 36 AC 2671",
"PY 01 CS 5440",
"PY 05 A 7270",
"TN 32 AM 4017",
"PY 01 DE 9104",
"PY 05 F 1697",
"PY 01 AQ 6478",
"PY 01 CL 5836",
"PY 01 BS 3556",
"PY 05 K 8181",
"TN 88 AZ 6844",
"PY 0 5 VF 9688",
"PY 05 A 0110",
"PY05M1622",
"PY 05  S 3952",
"PY 05 T 9760",
"PY 01 AL 2053",
"PY 01 DD 7499",
"PY 05 P 9487",
"PY 01 DD 1886",
"PY 01 CX 6240",
"Py 01 BH 4493",
"PY O1 DB 2499",
"PY 05 W 2399",
"Py 01 DC 1008",
"PY 01 CC 9489",
"PY 05 Y 2005",
"PY 05 AA 5895",
"PY 05 S 4332",
"PY 05 k 4597",
"PY 01 DD 6972",
"PY 01 BC 0399"
]

for plate in raw_plates:
    clean = normalize_plate(plate)
    add_plate(clean, owner="Campus", vtype="permanent")
    print("Added:", clean)

print("All plates inserted into database!")
