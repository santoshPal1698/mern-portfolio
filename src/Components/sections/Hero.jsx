import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import HeroBgAnimation from "../HeroBgAnimation";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";
import { useSelector } from "react-redux";
import Spin_loader from "../Spin-loader";
import { Email,LinkedIn} from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkIcon from "@mui/icons-material/Work";
import DownloadIcon from "@mui/icons-material/Download";

const SocialLink = styled.a`
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

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;
const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;
const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 45px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 60px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#f5a623" : "#8A2BE2")};
  text-transform: uppercase;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 130px;
  text-align: center;
  padding: 6px 0;
  background: ${({ theme }) => theme.button};
  color:white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;

     &:hover {
        transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow: ${({ theme }) => theme.buttonShadow};
    filter: brightness(1);
    }    
    
    
    @media (max-width: 640px) {
        padding: 12px 0;
        font-size: 18px;
    } 
    color: white;
`;

const Img = styled.img`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.white};

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Hero = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { name, description, roles, resume, profile_url,linkedin,github } = intro;

  return (
    <div id="About">
      {loading ? <Spin_loader /> : null}
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {name || "NA"}
                </Title>
                <TextLoop>
                  <Span>
                    <Typewriter
                      options={{
                        strings: roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{description || "NA"}</SubTitle>
              </motion.div>

              <ResumeButton href={resume} target="_blank">
                <DownloadIcon /> Resume
              </ResumeButton>
            </HeroLeftContainer>

            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                  <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} 
                  scale={1.05} transitionSpeed={3000} glareEnable={true} glareMaxOpacity={0.45}>
                    <Img src={profile_url} alt="Santosh Pal" />
                  </Tilt>
                
                <SocialIcons>
                <SocialLink
                  href={linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </SocialLink>

                <SocialLink
                  href="https://www.naukri.com/mnjuser/homepage"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <WorkIcon />
                </SocialLink>

                <SocialLink
                  href={github}
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </SocialLink>

                <SocialLink
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=santoshpal9816@gmail.com&su=Contact&body=Hello Santosh"
                  target="_blank"
                >
                  <Email />
                </SocialLink>
              </SocialIcons>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
      
    </div>
  );
};

export default Hero;
