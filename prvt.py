import binascii
import json

with open("../tushar.json", "r") as f:
    data = json.load(f)  # Use json.load() to parse JSON file

if isinstance(data, list):
    hex_string = binascii.hexlify(bytes(data)).decode("utf-8")
    print("Hex String:", hex_string)
else:
    hex_string = binascii.hexlify(bytes(data)).decode("utf-8")
    print("Hex String:", hex_string)
