import { type FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { activeSlotAtom, searchTermAtom, slotsAtom } from '../atoms';

interface MonSlotProps {
  index: number;
  predictionData: any; 
  highlightColor: 'green' | 'red' | 'none';
}

export const MonSlot: FC<MonSlotProps> = ({ index, predictionData, highlightColor = 'none' }) => {
  const slots = useAtomValue(slotsAtom);
  const [activeSlot, setActiveSlot] = useAtom(activeSlotAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  const slot = slots[index];
  const isActive = activeSlot === index;
  const hasPredictions = !!predictionData;

  const getPercentageForSlot = (idx: number, name: string) => {
    if (!predictionData || !name) return null;
    const isP1 = idx < 6;
    const percentages = isP1 ? predictionData.p1_percentages : predictionData.p2_percentages;
    return percentages[name] || null;
  };

  const percentage = slot ? getPercentageForSlot(index, slot.name) : null;

  const handleSlotClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (hasPredictions) return;

    if (isActive) {
      setActiveSlot(null);
    } else {
      setActiveSlot(index);
    }
  };

  return (
    <SlotBox 
      isActive={isActive} 
      isDisabled={hasPredictions} 
      highlightColor={highlightColor}
      onClick={handleSlotClick}
    >
      {isActive ? (
        <SearchInput
          autoFocus
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      ) : slot ? (
        <SlotContent>
          <Sprite src={slot.sprite} alt={slot.name} />
          <PokemonDetails>
            <PokemonName>{slot.name}</PokemonName>
            <TypesContainer>
              {slot.types.map((type) => (
                <TypeBadge key={type} type={type}>
                  {type}
                </TypeBadge>
              ))}
            </TypesContainer>
          </PokemonDetails>
          {percentage !== null && <Percentage value={percentage}>{percentage}%</Percentage>}
        </SlotContent>
      ) : (
        <EmptySlotText>Empty Slot</EmptySlotText>
      )}
    </SlotBox>
  );
};

const getSmoothColor = (percent: number | string | null) => {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  const hue = (safePercent / 100) * 120;
  return `hsl(${hue}, 80%, 85%)`;
};

const SlotBox = styled.div<{ isActive: boolean; isDisabled: boolean; highlightColor: 'green' | 'red' | 'none' }>`
  height: 65px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  transition: all 0.2s;
  overflow: hidden;

  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  background: ${(props) => {
    if (props.highlightColor === 'green') return 'rgba(209, 250, 229, 0.9)';
    if (props.highlightColor === 'red') return 'rgba(254, 226, 226, 0.9)';
    return props.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.7)';
  }};

  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.isActive ? 'rgba(255, 255, 255, 0.5);' : 'transparent')};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    border-color: ${(props) => (props.isDisabled ? 'transparent' : props.isActive ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #1f2937;
`;

const SlotContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem; 
`;

const Sprite = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  flex-shrink: 0;
`;

const PokemonDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
`;

const PokemonName = styled.span`
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.125rem;
  overflow: hidden;
`;

const TypeBadge = styled.span<{ type: string }>`
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: 0.025em;

  background: ${(props) => {
    switch (props.type.toLowerCase()) {
      case 'normal': return '#B8B8A8';
      case 'fire': return '#FF8844';
      case 'water': return '#5599FF';
      case 'electric': return '#FFDD22';
      case 'grass': return '#77DD66';
      case 'ice': return '#77EEDD';
      case 'fighting': return '#EE5544';
      case 'poison': return '#BB55BB';
      case 'ground': return '#EECC55';
      case 'flying': return '#88AAFF';
      case 'psychic': return '#FF6699';
      case 'bug': return '#BBDD22';
      case 'rock': return '#DDBB55';
      case 'ghost': return '#8866BB';
      case 'dragon': return '#8855FF';
      case 'dark': return '#775544';
      case 'steel': return '#AAAABB';
      case 'fairy': return '#FFAAFF';
      default: return '#e5e7eb';
    }
  }};
  
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const Percentage = styled.span<{ value: number | string | null }>`
  font-family: monospace;
  font-weight: bold;
  background: ${(props) => getSmoothColor(props.value)};
  padding: 0.35rem 0.6rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
  margin-left: auto;
`;

const EmptySlotText = styled.span`
  font-style: italic;
`;