import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Dense
from sklearn.preprocessing import MultiLabelBinarizer
from pokemon import REG_MA

def load_and_preprocess():
    try:
        df = pd.read_csv('vgc_training_data.csv')
    except FileNotFoundError:
        print("pokemon_battles.csv not found.")
        return []

    processed_data = []
    for _, row in df.iterrows():
        # parse strings
        p1_t = [pk.strip() for pk in str(row['P1_Team']).split(',')]
        p1_b = [pk.strip() for pk in str(row['P1_Brought']).split(',')]
        p2_t = [pk.strip() for pk in str(row['P2_Team']).split(',')]
        p2_b = [pk.strip() for pk in str(row['P2_Brought']).split(',')]

        processed_data.append({'team': p1_t, 'opp': p2_t, 'brought': p1_b})
        processed_data.append({'team': p2_t, 'opp': p1_t, 'brought': p2_b})
    return processed_data

def train_and_export_lp(data):
    mlb = MultiLabelBinarizer(classes=REG_MA)
    # context of 12 Pokemon (6 friendly, 6 enemy), the binarizer will create a row length the size of REG_MA
    
    lp_output = []
    lp_output.append("// POKEMON LEAD PREDICTION MODEL - REGULATION MA 2026")
    lp_output.append("// TARGET_PKMN | INTERCEPT | {PARTNER: COEFF, ...}")
    lp_output.append("-" * 50)

    for target_pkmn in REG_MA:
        X_raw = []
        y = []

        for entry in data:
            if target_pkmn in entry['team']:
                # context is union of both teams
                X_raw.append(entry['team'] + entry['opp'])
                y.append(1 if target_pkmn in entry['brought'] else 0)

        # only train there are enough samples in the brought and stayed classes
        if len(y) > 15 and len(np.unique(y)) > 1:
            X = mlb.fit_transform(X_raw)
            y = np.array(y)

            # single layer perceptron / logistic regression
            model = Sequential([
                Input(shape=(X.shape[1],)), 
                Dense(1, activation='sigmoid')
            ])
            model.compile(optimizer='adam', loss='binary_crossentropy')
            model.fit(X, y, epochs=30, verbose=0, batch_size=8)

            # extract weights
            weights, bias = model.layers[0].get_weights()
            intercept = float(bias[0])
            coeffs = weights.flatten()

            # .lp entry string
            coeff_strings = []
            for i, val in enumerate(coeffs):
                if abs(val) > 0.01:
                    coeff_strings.append(f"{REG_MA[i]}:{val:.4f}")
            
            lp_line = f"{target_pkmn}|{intercept:.4f}|{','.join(coeff_strings)}"
            lp_output.append(lp_line)
            print(f"Computed weights for {target_pkmn}")

    with open('pokemon_logic.lp', 'w') as f:
        f.write("\n".join(lp_output))