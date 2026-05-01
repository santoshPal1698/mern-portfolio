import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Email,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
`;
const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;
const Logo = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;
const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;
const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.35s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);

  svg {
    font-size: 22px;
  }

  &:hover {
    transform: translateY(-6px) scale(1.1);
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    box-shadow: 0 15px 35px rgba(37, 117, 252, 0.6);
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

const Footer = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { name, github, insta, linkedin } = intro;
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>{name}</Logo>
        <Nav>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon
            href="https://mail.google.com/mail/?view=cm&fs=1&to=santoshpal9816@gmail.com&su=Contact&body=Hello Santosh"
            target="_blank"
          >
            <Email />
          </SocialMediaIcon>

          <SocialMediaIcon href={github} target="display">
            <GitHubIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href={linkedin} target="display">
            <LinkedIn />
          </SocialMediaIcon>
          <SocialMediaIcon href={insta} target="display">
            <Instagram />
          </SocialMediaIcon>
          <SocialMediaIcon onClick={() => navigate("/weather")}>
            <WbSunnyIcon />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          © 2026 {name} All rights reserved. For inquiries, Contact 📧
          santoshpal9816@gmail.com
        </Copyright>
      </FooterWrapper>

    </FooterContainer>
  );
};

export default Footer;
