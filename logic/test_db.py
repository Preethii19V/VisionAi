from logic.database import is_authorized

print(is_authorized("PY01BP3726"))   # True
print(is_authorized("TN81J8483"))    # True
print(is_authorized("AB1234"))      # False
