import requests
import json
import csv
import os
import time

def fetch_battle_data():
    url = 'https://replay.pokemonshowdown.com/search.json?format=gen9championsvgc2026regma'
    response = requests.get(url)
    raw_text = response.text.lstrip(']')
    battle_list = json.loads(raw_text)

    return battle_list

def parse_battle_log(log_text):
    p1_team = []
    p2_team = []

    p1_brought = set()
    p2_brought = set()

    for line in log_text.split('\n'):
        if line.startswith('|poke|p1|'):
            species = line.split('|')[3].split(',')[0].strip()
            p1_team.append(species)
        elif line.startswith('|poke|p2|'):
            species = line.split('|')[3].split(',')[0].strip()
            p2_team.append(species)

        elif line.startswith('|switch|p1') or line.startswith('|drag|p1'):
            species = line.split('|')[3].split(',')[0].strip()
            species = species.replace('-Mega-Y', '').replace('-Mega-X', '').replace('-Mega', '') # clean up mega evos
            p1_brought.add(species)
            
        elif line.startswith('|switch|p2') or line.startswith('|drag|p2'):
            species = line.split('|')[3].split(',')[0].strip()
            species = species.replace('-Mega-Y', '').replace('-Mega-X', '').replace('-Mega', '') # clean up mega evos
            p2_brought.add(species)

    return p1_team, p2_team, list(p1_brought), list(p2_brought)

def harvest_data():
    print("Checking for new matches...")
    
    # loads memory of seen battles
    seen_file = 'seen_battles.json'
    seen_battles = set()
    
    if os.path.exists(seen_file):
        try:
            with open(seen_file, 'r') as f:
                seen_battles = set(json.load(f))
        except json.JSONDecodeError:
            print("adding empty set to seen_battles.json")
            seen_battles = set()

    # fetch last 50
    battle_list = fetch_battle_data()
    new_matches_found = 0

    with open('vgc_training_data.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        if os.path.getsize('vgc_training_data.csv') == 0:
            writer.writerow(['Battle_ID', 'P1_Team', 'P2_Team', 'P1_Brought', 'P2_Brought'])

        for battle in battle_list:
            battle_id = battle.get('id')
            
            # skip if battle already parsed
            if battle_id in seen_battles:
                continue
                
            full_replay_url = f"https://replay.pokemonshowdown.com/{battle_id}.json"
            
            try:
                match_response = requests.get(full_replay_url)
                data = match_response.json()
            except Exception as e:
                print(f"{battle_id} skipped")
                continue

            if 'log' in data:
                p1_team, p2_team, p1_brought, p2_brought = parse_battle_log(data['log'])
                
                # write P1/2 rows to the csv
                writer.writerow([
                    battle_id, 
                    ','.join(p1_team), 
                    ','.join(p2_team), 
                    ','.join(p1_brought), 
                    ','.join(p2_brought)
                ])
                
                # save ID
                seen_battles.add(battle_id)
                new_matches_found += 1

    # add unseen battles to seen JSON file
    with open(seen_file, 'w') as f:
        json.dump(list(seen_battles), f, indent=4)
        
    print(f"Harvest complete. Added {new_matches_found} new matches. Total unique matches tracked: {len(seen_battles)}")

if __name__ == "__main__":
    print("Starting VGC Showdown Harvester...")
    print("Press Ctrl+C to stop the script.\n")

    try:
        while True:
            harvest_data()
            print("Sleeping for 10 minutes...\n")
            time.sleep(600)
    except KeyboardInterrupt:
        print("\nHarvester stopped safely.")