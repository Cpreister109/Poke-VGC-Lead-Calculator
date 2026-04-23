from train import load_and_preprocess, train_and_export_lp

def main():
    print("Initializing training...")
    dataset = load_and_preprocess()
    if dataset:
        train_and_export_lp(dataset)
        print("pokemon_logic.lp generated")

if __name__ == "__main__":
    main()