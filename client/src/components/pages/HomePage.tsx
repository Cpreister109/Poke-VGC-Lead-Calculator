import { type FC } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const HomePage: FC = () => {
  return (
    <PageContainer>
      <HeaderSection>
        <AppTitle>Regulation M-A VGC Lead Calculator</AppTitle>
      </HeaderSection>

      <AnimationStage>
        <PokeballWrapper>
          <PokeballSvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='50' cy='50' r='48' stroke='#1f2937' strokeWidth='4' fill='white' />
            <path d='M2,50 a48,48 0 0,1 96,0 Z' fill='#ef4444' stroke='#1f2937' strokeWidth='4' />
            <line x1='2' y1='50' x2='98' y2='50' stroke='#1f2937' strokeWidth='4' />
            <circle cx='50' cy='50' r='12' fill='white' stroke='#1f2937' strokeWidth='4' />
            <PokeballButton cx='50' cy='50' r='6' fill='#f9fafb' stroke='#9ca3af' strokeWidth='2' />
          </PokeballSvg>
          <PokeballShadow />
        </PokeballWrapper>
      </AnimationStage>

      <InfoSection>
        <GitHubLink href='https://github.com/Cpreister109/Poke-VGC-Lead-Calculator' target='_blank' rel='noopener noreferrer'>
          <GithubIcon viewBox='0 0 24 24'>
            <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
          </GithubIcon>
          Source Code
        </GitHubLink>
      </InfoSection>
    </PageContainer>
  );
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-25px); }
  100% { transform: translateY(0px); }
`;

const shadowPulse = keyframes`
  0% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.2); opacity: 0.1; }
  100% { transform: scale(1); opacity: 0.2; }
`;

const buttonPulse = keyframes`
  0% { fill: #f9fafb; stroke: #9ca3af; }
  50% { fill: #ffcccc; stroke: #ef4444; box-shadow: 0 0 10px #ef4444; }
  100% { fill: #f9fafb; stroke: #9ca3af; }
`;

const PageContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  text-align: center;
  box-sizing: border-box;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0;
  font-style: italic;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const AnimationStage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

const PokeballWrapper = styled.div`
  position: relative;
  width: 200px; /* Increased from 120px */
  height: 200px; /* Increased from 120px */
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${float} 4s ease-in-out infinite;
`;

const PokeballSvg = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
`;

const PokeballButton = styled.circle`
  animation: ${buttonPulse} 2s infinite;
`;

const PokeballShadow = styled.div`
  position: absolute;
  bottom: -40px;
  width: 140px;
  height: 20px;
  background: black;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(6px);
  animation: ${shadowPulse} 4s ease-in-out infinite;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  text-decoration: none;
  color: black;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black;
    color: #ffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const GithubIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor; 
  transition: fill 0.2s ease;
`;