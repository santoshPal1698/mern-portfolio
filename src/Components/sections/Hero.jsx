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
import { Email, LinkedIn } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkIcon from "@mui/icons-material/Work";
import DownloadIcon from "@mui/icons-material/Download";
import { isSantoshPortfolio } from "../../services/AuthService";
import ReadMoreText from "../sections/Admin/Redmore";

const SocialLink = styled.a`
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => `${theme.text_secondary}45`};
  border-radius: 14px;
  background: ${({ theme }) => `${theme.bg}8c`};
  color: ${({ theme }) => theme.text_primary};
  backdrop-filter: blur(10px);
  transition: transform .25s ease, border-color .25s ease, background .25s ease, color .25s ease;
  svg { font-size: 21px; }
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}1d`};
    color: ${({ theme }) => theme.primary};
  }
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(64px, 8vw, 110px) 30px;
  z-index: 1;

  &::before, &::after {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(18px);
  }
  &::before {
    width: 42vw; height: 42vw; min-width: 320px; min-height: 320px;
    top: -28vw; left: -14vw;
    background: ${({ theme }) => `${theme.primary}26`};
  }
  &::after {
    width: 34vw; height: 34vw; min-width: 260px; min-height: 260px;
    bottom: -25vw; right: -10vw;
    background: ${({ theme }) => `${theme.primary}20`};
  }
  @media (max-width: 960px) { padding: 66px 16px; }
  @media (max-width: 640px) { padding: 42px 16px 58px; }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
  align-items: center;
  gap: clamp(44px, 9vw, 110px);
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 660px;
    text-align: center;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  position: relative;
  z-index: 1;
  @media (max-width: 960px) {
    order: 2; margin-bottom: 0; display: flex; gap: 8px;
    flex-direction: column; align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
  @media (max-width: 960px) {
    order: 1; align-items: center; justify-content: center; margin-bottom: 0;
  }
`;

const Title = styled.div`
  max-width: 650px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
  font-size: clamp(42px, 5vw, 66px);
  letter-spacing: -0.055em;
  line-height: 1.04;
  &::before {
    content: "WELCOME TO MY PORTFOLIO";
    display: block;
    margin-bottom: 17px;
    color: ${({ theme }) => theme.primary};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .12em;
  }
  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 42px; }
`;

const TextLoop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-size: clamp(21px, 2.7vw, 30px);
  font-weight: 650;
  line-height: 1.35;
  @media (max-width: 960px) { justify-content: center; }
`;

const Span = styled.div`
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  max-width: 620px;
  margin: 22px 0 30px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 17px;
  line-height: 1.8;
  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 15px; line-height: 1.7; }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.button};
  box-shadow: ${({ theme }) => theme.buttonShadow};
  color: ${({ theme }) => theme.buttonText};
  text-decoration: none;
  font-weight: 750;
  font-size: 15px;
  transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
  svg { font-size: 20px; }
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.buttonShadowHover};
    filter: brightness(1.08);
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1;
  border: 10px solid transparent;
  border-radius: 32px;
  outline: 1px solid ${({ theme }) => `${theme.white}55`};
  background: ${({ theme }) => theme.button};
  object-fit: cover;
  box-shadow: 0 25px 55px ${({ theme }) => `${theme.primary}3d`};
  @media (max-width: 640px) { max-width: 280px; border-width: 7px; border-radius: 25px; }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  @media (max-width: 960px) { justify-content: center; }
`;

const Hero = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { name, description, roles, resume, profile_url, linkedin, github } = intro;

  return (
    <div id="About">
      {loading ? <Spin_loader /> : null}
      <HeroContainer>
        <HeroBg>
          {
            isSantoshPortfolio(portfolioData) && (
              <>
                <StarCanvas />
                <HeroBgAnimation />
              </>
            )
          }

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
                <SubTitle> 
                  <ReadMoreText text={description} maxLength={380} />
                  </SubTitle>
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
