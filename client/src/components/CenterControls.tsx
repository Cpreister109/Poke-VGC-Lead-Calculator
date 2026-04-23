import { type FC } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import styled from '@emotion/styled';
import { activeSlotAtom, slotsAtom } from '../atoms';

interface CenterControlsProps {
  predictLoading: boolean;
  pokemonLoading: boolean;
  calculateMatchup: (myTeam: string[], opponentTeam: string[]) => void;
}

export const CenterControls: FC<CenterControlsProps> = ({ predictLoading, pokemonLoading, calculateMatchup }) => {
  const slots = useAtomValue(slotsAtom);
  const setActiveSlot = useSetAtom(activeSlotAtom);

  const myTeam = slots.slice(0, 6).map((slot) => slot?.name || '');
  const opponentTeam = slots.slice(6, 12).map((slot) => slot?.name || '');

  const handlePredictClick = () => {
    calculateMatchup(myTeam, opponentTeam);
    setActiveSlot(null);
  };

  const isDisabled = predictLoading || pokemonLoading || myTeam.includes('') || opponentTeam.includes('');

  return (
    <ControlsContainer>
      <VsText>VS</VsText>
      <PredictButton onClick={handlePredictClick} disabled={isDisabled}>
        {predictLoading ? '...' : 'Predict Leads'}
      </PredictButton>
    </ControlsContainer>
  );
};

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  padding-top: 7rem;
  margin-bottom: 4rem;
`;

const VsText = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  margin: 0;
  font-style: italic;
`;

const PredictButton = styled.button`
  padding: 1rem 2rem;
  background-color: rgba(255, 0, 0, 0.8);
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.125rem;
  transition: all 0.2s ease;

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: rgba(255, 0, 0, 0.75);
    transform: translateY(-2px);
  }

  text-shadow: 
    -1px -1px 0 #ffffff,  
     1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
     1px  1px 0 #ffffff,
     0px -1px 0 #ffffff,
     0px  1px 0 #ffffff,
    -1px  0px 0 #ffffff,
     1px  0px 0 #ffffff;
`;