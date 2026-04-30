### Instructions for running application locally:
---
API:
- clone this repo
- cd Poke-VGC-Lead-Calculator/api
- python3 -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt
- python3 -m uvicorn api:app

Client:
- Open a new terminal
- cd back to the root of the project
- cd client
- navigate to source/hooks/useLeadCalculator
- change line 35 to this -> const response = await fetch('http://127.0.0.1:8000/predict', {
- npm i
- npm run dev
- Navigate to http://localhost:5173

Model:
- This doesn't interact directly with the API or Client, only makes an .lp file to be moved to the API
- Open new terminal
- cd model
- python3 -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt
- python3 main.py
---
### Home:
<img width="1512" height="864" alt="Screenshot 2026-04-28 at 11 02 36 AM" src="https://github.com/user-attachments/assets/63b29eba-0dfb-4aa4-b624-7b1f28948398" />

### Calculator:
<img width="1512" height="865" alt="Screenshot 2026-04-28 at 11 05 43 AM" src="https://github.com/user-attachments/assets/d54ff662-9de6-4e5f-8812-8cb5d846af92" />

### Regulation:
<img width="1512" height="864" alt="Screenshot 2026-04-28 at 11 03 04 AM" src="https://github.com/user-attachments/assets/e8e83371-d27f-47e7-b133-f38fc2a0e1bd" />
