import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseLiveProject } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";
import { useSelector } from "react-redux";
import { isSantoshPortfolio } from "../../services/AuthService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  margin-top: 50px;
  padding: 0px 16px;
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
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
font-weight 500;
margin: 22px 0;
@media (max-width: 768px){
    font-size: 12px;
}
`;
const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
`;
const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const Projects = () => {
  const [currentPage, setCurrentPage] = useState("");

  const handleButtonClick = (url) => {
    setCurrentPage(url);
    window.open(url, "_blank");
  };
  const [toggle, setToggle] = useState("all");
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>

        {
          isSantoshPortfolio(portfolioData) && (
            <>
              <div className="button-container">
                {baseLiveProject.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(page.url)}
                    className="styled-button"
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            </>
          )
        }
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Versatile Developer 🚀 Worked on diverse projects including LMS-MSM
          Unify, GCON, Naukari Job Portal, and E-commerce platforms
        </Desc>

        <CardContainer>
          {toggle === "all" &&
            projects.map((project) => <ProjectCard project={project} />)}
          {projects
            .filter((item) => item.category === toggle)
            .map((project) => (
              <ProjectCard project={project} />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
