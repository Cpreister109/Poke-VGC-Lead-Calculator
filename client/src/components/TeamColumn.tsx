import { useMemo, type FC } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { activeSlotAtom, slotsAtom } from '../atoms';
import { MonSlot } from './MonSlot';

interface TeamColumnProps {
  title: string;
  startIndex: number;
  predictionData: any;
  onClear: () => void;
}

export const TeamColumn: FC<TeamColumnProps> = ({ title, startIndex, predictionData, onClear }) => {
  const setSlots = useSetAtom(slotsAtom);
  const setActiveSlot = useSetAtom(activeSlotAtom);
  const slots = useAtomValue(slotsAtom);

  const highlightOverrides = useMemo(() => {
    if (!predictionData) return {};

    const isP1 = startIndex < 6;
    const percentages = isP1 ? predictionData.p1_percentages : predictionData.p2_percentages;

    const slotValues = Array.from({ length: 6 }).map((_, idx) => {
      const actualIndex = startIndex + idx;
      const slot = slots[actualIndex];
      const val = slot && percentages ? percentages[slot.name] : -1;
      
      const numericVal = typeof val === 'number' ? val : -1;
      
      return { actualIndex, numericVal };
    });

    slotValues.sort((a, b) => b.numericVal - a.numericVal);

    const highlightMap: Record<number, 'green' | 'red'> = {};
    
    for (let i = 0; i < 4; i++) {
      if (slotValues[i].numericVal !== -1) {
        highlightMap[slotValues[i].actualIndex] = 'green';
      }
    }
    for (let i = 4; i < 6; i++) {
      if (slotValues[i].numericVal !== -1) {
        highlightMap[slotValues[i].actualIndex] = 'red';
      }
    }

    return highlightMap;
  }, [predictionData, startIndex, slots]);

  const handleClearTeam = () => {
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      for (let i = 0; i < 6; i++) {
        newSlots[startIndex + i] = null;
      }
      return newSlots;
    });

    onClear();
    setActiveSlot(null);
  };

  return (
    <ColumnContainer>
      <SectionHeading>{title}</SectionHeading>
      {Array.from({ length: 6 }).map((_, idx) => {
        const actualIndex = startIndex + idx;
        return (
          <MonSlot 
            key={`${title}-${idx}`} 
            index={actualIndex} 
            predictionData={predictionData} 
            highlightColor={highlightOverrides[actualIndex] || 'none'}
          />
        );
      })}
      <ClearButton onClick={handleClearTeam}>Clear Team</ClearButton>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const SectionHeading = styled.h3`
  font-weight: 700;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ClearButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  color: #4b5563;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
  }
`;