import { type FC } from 'react';
import styled from '@emotion/styled';
import { TeamColumn } from '../TeamColumn';
import { CenterControls } from '../CenterControls';
import { SearchPanel } from '../SearchPanel';
import { useRegulationMA } from '../../hooks/useRegulationMA';
import { useLeadCalculator } from '../../hooks/useLeadCalculator'; 

export const CalculatorPage: FC = () => {
  const { pokemon = [], loading: pokemonLoading } = useRegulationMA();
  const { data: predictionData, loading: predictLoading, calculateMatchup, clearData } = useLeadCalculator();

  return (
    <PageContainer>
      <MainLayout>
        <ColumnWrapper>
          <TeamColumn
            title="Your Team"
            startIndex={0}
            predictionData={predictionData}
            onClear={clearData}
          />
        </ColumnWrapper>
        
        <CenterSection>
          <CenterControls 
            predictLoading={predictLoading} 
            pokemonLoading={pokemonLoading} 
            calculateMatchup={calculateMatchup} 
          />
          <SearchPanel pokemonList={pokemon} isLoading={pokemonLoading} />
        </CenterSection>

        <ColumnWrapper>
          <TeamColumn
            title="Opponent"
            startIndex={6}
            predictionData={predictionData}
            onClear={clearData}
          />
        </ColumnWrapper>
      </MainLayout>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  text-align: center;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 5rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const ColumnWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1.2;
  min-width: 40rem;
  width: 100%;
  gap: 1.5rem;

  @media (max-width: 768px) {
    order: -1; 
  }
`;
