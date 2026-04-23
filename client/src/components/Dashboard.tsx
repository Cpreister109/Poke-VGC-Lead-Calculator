import { type FC } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";

export const Dashboard: FC = () => {
    return (
      <Container>
        <NavBar />
        <Outlet /> 
      </Container>
    );
}

const pcBoxScroll = keyframes`
  0% {
    background-position: 0px 0px, 0px 0px, 30px 30px;
  }
  100% {
    background-position: 0px 0px, 60px 60px, 90px 90px;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #08CBD4; 
  background-image: 
    linear-gradient(to bottom right, #08CBD4 10%, rgba(10, 142, 158, 0) 90%),
    radial-gradient(#4dd4da 15%, transparent 16%),
    radial-gradient(#4dd4da 15%, transparent 16%);
  background-size: 100% 100%, 30px 30px, 30px 30px;
  animation: ${pcBoxScroll} 6s linear infinite;
`;