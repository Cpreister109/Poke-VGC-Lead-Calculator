from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from comparison import calculate_matchup

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchupRequest(BaseModel):
    P1_Team: list[str]
    P2_Team: list[str]

@app.post("/predict")
async def get_predictions(request: MatchupRequest):
    results = calculate_matchup(request.P1_Team, request.P2_Team)

    return {
        "message": "Predictions calculated successfully",
        "data": results
    }