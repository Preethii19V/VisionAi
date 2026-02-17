import easyocr

reader = easyocr.Reader(['en'])

def extract_text(image_path):
    result = reader.readtext(image_path)
    texts = [res[1] for res in result]
    return " ".join(texts)
