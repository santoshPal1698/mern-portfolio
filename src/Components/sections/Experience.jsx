import React, { useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import ExperienceCard from "../cards/ExperienceCard";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  margin-top: 50px;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;


const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.045em;
  text-align: center;
`;

const Desc = styled.p`
  max-width: 760px;
  margin: 14px auto 0;
  color: ${({ theme }) => theme.text_secondary};
  font-size: clamp(15px, 2vw, 17px);
  font-weight: 500;
  line-height: 1.65;
  text-align: center;
`;

const Experience = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;
  
  return (
    <Container id="Experience">
      <Wrapper>
        <Title>Experience</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
         Software Engineer 💻 Experienced in working with diverse companies and projects, delivering innovative solutions across Multiple Domain
        </Desc>

        <VerticalTimeline>
          {experience.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </Wrapper>
    </Container>
  );
};

export default Experience;
