import TechOrbit, { DEFAULT_ORBIT_BADGES } from "../../utils/TechOrbit";
import Tilt from "react-parallax-tilt";
import styled, { keyframes } from "styled-components";
import { isSantoshPortfolio } from "../../services/AuthService";
import { useSelector } from "react-redux";

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border: 5px solid transparent;
  border-radius: 50%;
  outline: 1px solid ${({ theme }) => `${theme.white}55`};
  background: ${({ theme }) => theme.button};
  object-fit: cover;
  box-shadow: 0 25px 55px ${({ theme }) => `${theme.primary}3d`};
  position: relative;
  z-index: 2;
  @media (max-width: 640px) {
    border-width: 7px;
    border-radius: 25px;
    border-radius: 50%;
  }
`;

const AnimatedProfile = ({ profile_url }) => {
  const { loading, portfolioData } = useSelector((state) => state.root);

  return (
    <TechOrbit
      badges={isSantoshPortfolio(portfolioData) ? DEFAULT_ORBIT_BADGES : []}
    >
      {isSantoshPortfolio(portfolioData) ? (
        <Tilt
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          scale={1.05}
          transitionSpeed={3000}
          glareEnable={true}
          glareMaxOpacity={0.45}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Img src={profile_url} alt="Santosh Pal" />
        </Tilt>
      ) : (

        <Tilt
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          scale={1.05}
          transitionSpeed={3000}
          glareEnable={true}
          glareMaxOpacity={0.45}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Img src={profile_url} alt="Santosh Pal" />
        </Tilt>
      )}
    </TechOrbit>
  );
};

export default AnimatedProfile;
