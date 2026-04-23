import { type FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const NavBar: FC = () => {
    return (
      <Navbar>
        <NavContent>
          <NavItem>
            <Link to='/'>
              <NavButton>Home</NavButton>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/pokélead-calculator'>
              <NavButton>Calculator</NavButton>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/regulation-ma'>
              <NavButton>Regulation</NavButton>
            </Link>
          </NavItem>
        </NavContent>
      </Navbar>
    );
}

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavContent = styled.div`
  background: rgba(0, 150, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 255, 0.3);
  padding: 15px 40px;
  border-radius: 0 0 100px 100px;
  display: flex;
  width: 600px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 255, 255, 0.1);
`;

const NavItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    text-decoration: none;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #8cefff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    transform: translateY(2px);
  }
`;