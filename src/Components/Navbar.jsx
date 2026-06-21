import React, { useState } from "react";
import { Link as LinkR, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { MenuRounded } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NightlightIcon from '@mui/icons-material/Nightlight';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 50px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${({ theme }) => theme.button};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.buttonText};
  transition: all 0.35s ease;
  box-shadow: ${({ theme }) => theme.buttonShadow};

  svg {
    font-size: 22px;
  }

  &:hover {
    transform: translateY(-6px) scale(1.1);
    background: ${({ theme }) => theme.buttonHover};
    box-shadow: ${({ theme }) => theme.buttonShadowHover};
  }
`;

const DarkLightmodeBtn = styled.a`
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 100%;
  width: 41px;
  height: 41px !important;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  background: ${({ theme }) => theme.bgLightDark};
  color: ${({ theme }) => (theme === "light" ? "#f5a623" : "#f5f5f5")};
   @media (max-width: 768px) {
    position: absolute;
    top: -57px !important;
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.bgLight + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  
`;

const Navbar = ({ theme, toggleThemeControl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logo = {
    color: "#854CE6",
  };

  const handleUserClick = () => {
    window.open("/login", "_blank");
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <span style={logo}>S</span>
          {theme === "light" ? (
            <span className="text-dark">.P</span>
          ) : (
            <span className="text-white">.P</span>
          )}
        </NavLogo>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">
              Home{" "}
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">
              Skills
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">
              Experience
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">
              Projects
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">
              Education
            </NavLink>
            <GithubButton className="mx-2" onClick={handleUserClick}>
              <AccountCircleIcon />
            </GithubButton>

            <DarkLightmodeBtn className="mx-2" onClick={toggleThemeControl}>
              {theme === "light" ? <NightlightIcon /> : <Brightness4Icon />}
            </DarkLightmodeBtn>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton className="mx-2" onClick={handleUserClick}>
            <AccountCircleIcon />
          </GithubButton>
          <DarkLightmodeBtn className="mx-2" onClick={toggleThemeControl}>
            {theme === "light" ? <NightlightIcon /> : <Brightness4Icon />}
          </DarkLightmodeBtn>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
