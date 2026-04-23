import { type FC } from 'react';
import styled from '@emotion/styled';
import { useRegulationMA } from '../../hooks/useRegulationMA';
import { MoonLoader } from 'react-spinners';

export const RegulationPage: FC = () => {
    const { pokemon, loading, error } = useRegulationMA();

    if (loading) {
        return (
            <LoaderContainer>
                <MoonLoader color="#FFFFFF" size={100} />
            </LoaderContainer>
        );
    }   

    if (error) {
        return <PageContainer>Error: {error}</PageContainer>;
    }

    return (
        <PageContainer>
            <Title>Regulation M-A</Title>
            <ScrollableGrid>
                {pokemon.map((p) => (
                    <Card key={p.id}>
                    {p.sprite ? (
                        <Sprite src={p.sprite} alt={p.name} className="sprite" />
                    ) : (
                        <SpriteFallback className="sprite" />
                    )}
                        <NameLabel className="name-label">{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</NameLabel>
                    </Card>
                ))}
            </ScrollableGrid>
        </PageContainer>
    );
};

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
`;

const PageContainer = styled.div`
    padding: 20px;
    width: 80%;
    margin-bottom: 0;
    textAlign: center;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

const ScrollableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    padding-bottom: 40px;
    gap: 16px;

    max-height: 70vh;
    overflow-y: auto;

    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
`;

const Sprite = styled.img`
    width: 80px; 
    height: 80px;
    image-rendering: pixelated;

    transition: transform 0.2s ease-in-out;
`;

const SpriteFallback = styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto;
    background-color: #f0f0f0;

    transition: transform 0.2s ease-in-out;
`;

const NameLabel = styled.div`
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    z-index: 10;

    pointer-events: none; 

    opacity: 0;
    visibility: hidden;
`;

const Card = styled.div`
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    background-color: rgba(255, 255, 255, 0.3);

    position: relative; 

    &:hover .name-label {
        opacity: 1;
        visibility: visible;
    }

    &:hover .sprite {
        transform: translateY(-2px);
    }
`;