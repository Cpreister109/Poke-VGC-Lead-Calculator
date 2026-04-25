import { useState, useEffect } from 'react';
import pokemonList from '../data/regulation-ma.json';

export interface PokemonData {
    name: string;
    id: number;
    types: string[];
    sprite: string;
}

const POKEAPI_MAP: Record<string, string> = {
    'tauros-paldea': 'tauros-paldea-combat-breed',
    'tauros-paldea-aqua': 'tauros-paldea-aqua-breed',
    'tauros-paldea-blaze': 'tauros-paldea-blaze-breed',
    'meowstic': 'meowstic-male',
    'meowstic-f': 'meowstic-female',
    'basculegion': 'basculegion-male',
    'basculegion-f': 'basculegion-female',
    'aegislash': 'aegislash-shield',
    'gourgeist': 'gourgeist-average',
    'lycanroc': 'lycanroc-midday',
    'mimikyu': 'mimikyu-disguised',
    'morpeko': 'morpeko-full-belly',
    'maushold': 'maushold-family-of-four',
    'palafin': 'palafin-zero',
};

export const useRegulationMA = () => {
    const [pokemon, setPokemon] = useState<PokemonData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPokemon = async () => {
            const cachedData = sessionStorage.getItem('reg_ma_pokemon');
            if (cachedData) {
                setPokemon(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const fetchedResults: PokemonData[] = [];
                const BATCH_SIZE = 20;

                for (let i = 0; i < pokemonList.length; i += BATCH_SIZE) {
                    const batch = pokemonList.slice(i, i + BATCH_SIZE);

                    const batchPromises = batch.map(async (originalName) => {
                        let change = originalName
                            .toLowerCase()
                            .replace('mr. ', 'mr-')
                            .replace('. ', '-')
                            .replace(' ', '-')
                            .replace(/[^\w-]/g, '');

                        if (POKEAPI_MAP[change]) {
                            change = POKEAPI_MAP[change];
                        }

                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${change}`);
                        if (!response.ok) throw new Error(`Not found: ${change}`);

                        const data = await response.json();

                        return {
                            name: originalName,
                            id: data.id,
                            types: data.types.map((t: any) => t.type.name),
                            sprite: data.sprites.front_default
                        };
                    });

                    const results = await Promise.all(
                        batchPromises.map(p => p.catch(e => {
                            console.warn(e.message);
                            return null;
                        }))
                    );

                    fetchedResults.push(...results.filter((p): p is PokemonData => p !== null));
                }

                if (isMounted) {
                    setPokemon(fetchedResults);
                    setError(null);
                    sessionStorage.setItem('reg_ma_pokemon', JSON.stringify(fetchedResults));
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || 'Failed to fetch Pokémon');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, []);

    return { pokemon, loading, error };
};