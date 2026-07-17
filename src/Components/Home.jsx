import styled, { ThemeProvider } from "styled-components";
import React, { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
// import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useSelector } from "react-redux";
import Spin_loader from "./Spin-loader";
import AIChatbot from "./AI/AIChatbot";
import Navbar from "./Navbar";
import { darkTheme, lightTheme } from "../utils/Themes";
import WhatsAppWidget from "./WhatsAppWidget";
import { isSantoshPortfolio } from "../services/AuthService";


const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background:
    linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const THEME_KEY = "DarkLigthMode";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "dark";
}

const Home = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  console.log(portfolioData)
  const [theme, setTheme] = useState(getInitialTheme);

  const themeToggler = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Navbar theme={theme} toggleThemeControl={themeToggler} />
        {loading ? <Spin_loader /> : null}
        {
          portfolioData && (
            <div>
              {
                isSantoshPortfolio(portfolioData) && (
                  <>
                    <AIChatbot />
                    <WhatsAppWidget />
                  </>
                )
              }
              <Body>
                <Hero />
                <Wrapper>
                  <Skills />
                  <Experience />
                </Wrapper>
                <Projects />
                <Wrapper>
                  <Education />
                  {/* <Contact /> */}
                </Wrapper>
                <Footer />
              </Body>
            </div>
          )}
      </ThemeProvider>
    </>
  );
};

export default Home;
