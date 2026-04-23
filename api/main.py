import requests
import json

API_URL = "http://127.0.0.1:8000/predict"

mock_payload = {
    "P1_Team": ["Charizard", "Pelipper", "Garchomp", "Incineroar", "Sneasler", "Aegislash"],
    "P2_Team": ["Tyranitar", "Excadrill", "Rotom-Wash", "Sylveon", "Arcanine", "Talonflame"]
}
headers = {
    "Content-Type": "application/json"
}

def make_mock_call():
    print(f"Sending Matchup Data to {API_URL}...")
    print(f"P1: {', '.join(mock_payload['P1_Team'])}")
    print(f"P2: {', '.join(mock_payload['P2_Team'])}\n")
    
    try:
        response = requests.post(API_URL, json=mock_payload, headers=headers)

        if response.status_code == 200:
            print("received predictions:\n")
            response_data = response.json()
            print(json.dumps(response_data, indent=4))
            
        else:
            print(f"failed with {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("connection error")

if __name__ == "__main__":
    make_mock_call()