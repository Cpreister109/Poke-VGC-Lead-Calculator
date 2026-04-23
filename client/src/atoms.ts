import { atom } from 'jotai';
import { type PokemonData } from './hooks/useRegulationMA';
import type { PrimitiveAtom } from 'jotai/vanilla';

export const slotsAtom: PrimitiveAtom<(PokemonData | null)[]> = atom(Array(12).fill(null));
export const activeSlotAtom: PrimitiveAtom<number | null> = atom(null as number);
export const searchTermAtom: PrimitiveAtom<string> = atom('');