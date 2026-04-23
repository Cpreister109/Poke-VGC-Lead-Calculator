import { type FC, useMemo } from 'react';
import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import { MoonLoader } from 'react-spinners';
import { slotsAtom, activeSlotAtom, searchTermAtom } from '../atoms';
import { type PokemonData } from '../hooks/useRegulationMA';
import missedMons from '../data/missed-mons.json'; 

interface SearchPanelProps {
  pokemonList: PokemonData[];
  isLoading: boolean;
}

export const SearchPanel: FC<SearchPanelProps> = ({ pokemonList, isLoading }) => {
  const [slots, setSlots] = useAtom(slotsAtom);
  const [activeSlot, setActiveSlot] = useAtom(activeSlotAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonList;
    return pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pokemonList]);

  const handleSelectPokemon = (selectedPokemon: PokemonData) => {
    if (activeSlot === null) return; 

    const isTeam1 = activeSlot < 6;
    const startIndex = isTeam1 ? 0 : 6;
    const endIndex = isTeam1 ? 6 : 12;

    const currentTeam = slots.slice(startIndex, endIndex);

    const isDuplicate = currentTeam.some(
      (slot) => slot !== null && slot.name === selectedPokemon.name
    );

    if (isDuplicate) {
      alert(`${selectedPokemon.name} is already on this team!`);
      return; 
    }

    const newSlots = [...slots];
    newSlots[activeSlot] = selectedPokemon;
  
    setSlots(newSlots);
    setSearchTerm('');
  
    if (activeSlot < 11) {
      setActiveSlot(activeSlot + 1);
    } else {
      setActiveSlot(null);
    }
  };

  return (
    <PanelContainer>
      <SectionHeading>Select Pokémon</SectionHeading>
      
      {isLoading ? (
        <LoaderWrapper>
          <MoonLoader color="#FFFFFF" size={100} />
        </LoaderWrapper>
      ) : (
        <SelectionList>
          {filteredPokemon.map((p) => {
            const isDisabled = missedMons.includes(p.name);
            
            return (
              <SelectionItem 
                key={p.id} 
                isDisabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) handleSelectPokemon(p);
                }}
              >
                <SpriteSmall src={p.sprite} alt={p.name} isDisabled={isDisabled} />
                <span>{p.name}</span>
              </SelectionItem>
            );
          })}
          {filteredPokemon.length === 0 && (
            <EmptyText>No Pokémon found matching '{searchTerm}'.</EmptyText>
          )}
        </SelectionList>
      )}
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  max-height: 40vh;
  flex: 0 1 40rem; 
  gap: 1rem;
`;

const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SectionHeading = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const SelectionList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  align-content: start; 
  gap: 0.75rem;
  padding-right: 0.5rem;
`;

const SelectionItem = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.15s;
  font-weight: 600;

  background-color: ${(props) => props.isDisabled ? 'rgba(229, 231, 235, 0.4)' : 'rgba(255, 255, 255, 0.5)'};
  color: ${(props) => props.isDisabled ? '#9ca3af' : 'inherit'};
  cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background: ${(props) => props.isDisabled ? 'rgba(229, 231, 235, 0.4)' : 'rgba(255, 255, 255, 0.8)'};
    transform: ${(props) => props.isDisabled ? 'none' : 'translateY(-1px)'};
  }
`;

const SpriteSmall = styled.img<{ isDisabled: boolean }>`
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: ${(props) => props.isDisabled ? 'grayscale(100%) opacity(40%)' : 'none'};
`;

const EmptyText = styled.div`
  padding: 2rem;
  text-align: center;
  grid-column: 1 / -1;
`;