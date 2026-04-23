import math

# holds models in memory
MODEL_DATA = {}

def load_models(filepath="pokemon_logic.lp"):
    global MODEL_DATA
    try:
        with open(filepath, 'r') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('//') or line.startswith('-'):
                    continue
                
                parts = line.split('|')
                if len(parts) == 3:
                    pkmn = parts[0]
                    intercept = float(parts[1])
                    coeffs = {}
                    
                    # parse coefficients
                    if parts[2]: 
                        for pair in parts[2].split(','):
                            k, v = pair.split(':')
                            coeffs[k] = float(v)
                    
                    MODEL_DATA[pkmn] = {
                        "intercept": intercept,
                        "coeffs": coeffs
                    }
        print(f"Loaded {len(MODEL_DATA)} Pokemon models into memory.")
    except FileNotFoundError:
        print(f"{filepath} not found")

def sigmoid(z):
    # prevent extreme numbers
    z = max(-709, min(709, z))
    return 1 / (1 + math.exp(-z))

def predict_bring_probability(target_pokemon, all_12_pokemon):
    if target_pokemon not in MODEL_DATA:
        return None # skipped if not inlcuded in training
    
    model = MODEL_DATA[target_pokemon]
    z = model["intercept"]
    
    # add the weights of pokemon on the field
    for pkmn in all_12_pokemon:
        if pkmn in model["coeffs"]:
            z += model["coeffs"][pkmn]
            
    return sigmoid(z)

def calculate_matchup(p1_team, p2_team):
    all_12 = p1_team + p2_team
    
    p1_predictions = {}
    for pkmn in p1_team:
        prob = predict_bring_probability(pkmn, all_12)
        p1_predictions[pkmn] = round(prob * 100, 2) if prob is not None else "N/A"
        
    p2_predictions = {}
    for pkmn in p2_team:
        prob = predict_bring_probability(pkmn, all_12)
        p2_predictions[pkmn] = round(prob * 100, 2) if prob is not None else "N/A"
        
    return {
        "p1_percentages": p1_predictions,
        "p2_percentages": p2_predictions
    }

load_models()