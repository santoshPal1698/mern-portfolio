import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

/* ---------------------------------- */
/* Animations                          */
/* ---------------------------------- */
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.9); opacity: 0.6; }
  70% { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1.4); opacity: 0; }
`;

/* ---------------------------------- */
/* Styled Components                   */
/* ---------------------------------- */
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at 20% 20%, ${({ $accent }) => $accent}22, transparent 45%),
    radial-gradient(circle at 80% 80%, ${({ $accent }) => $accent}18, transparent 40%),
    linear-gradient(135deg, #0b1220, #0f172a 60%, #111827);
  color: #fff;
  text-align: center;
  overflow: hidden;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  animation: ${fadeUp} 0.6s ease-out both;
`;

const IllustrationWrap = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 4.5s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid ${({ $accent }) => $accent}55;
    animation: ${pulseRing} 2.4s ease-out infinite;
  }
`;

const Code = styled.h1`
  font-size: clamp(72px, 14vw, 120px);
  line-height: 1;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: ${({ $accent }) => css`linear-gradient(135deg, #fff, ${$accent})`};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.h2`
  margin: 6px 0 4px;
  font-size: 24px;
  font-weight: 700;
  color: #f1f5f9;
`;

const Text = styled.p`
  margin: 0 0 28px;
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
  max-width: 360px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background: ${({ $accent }) => `linear-gradient(135deg, ${$accent}, #6a11cb)`};
  color: #fff;
  box-shadow: 0 8px 20px ${({ $accent }) => $accent}44;
`;

const GhostButton = styled(Button)`
  background: transparent;
  color: #cbd5f5;
  border: 1px solid #334155;

  &:hover {
    border-color: ${({ $accent }) => $accent};
    color: #fff;
  }
`;

/* ---------------------------------- */
/* Illustrations (inline SVG)          */
/* ---------------------------------- */
const NotFoundIllustration = ({ accent }) => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
    <circle cx="75" cy="75" r="60" fill={`${accent}1a`} />
    <path d="M45 60 L65 90 M65 60 L45 90" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    <circle cx="95" cy="75" r="14" stroke={accent} strokeWidth="5" />
    <path d="M105 85 L118 98" stroke={accent} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const UserNotFoundIllustration = ({ accent }) => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
    <circle cx="75" cy="75" r="60" fill={`${accent}1a`} />
    <circle cx="75" cy="60" r="20" stroke={accent} strokeWidth="6" />
    <path d="M40 108c6-18 20-27 35-27s29 9 35 27" stroke={accent} strokeWidth="6" strokeLinecap="round" fill="none" />
    <text x="75" y="70" textAnchor="middle" fontSize="20" fontWeight="700" fill={accent}>?</text>
  </svg>
);

const NoAccessIllustration = ({ accent }) => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
    <circle cx="75" cy="75" r="60" fill={`${accent}1a`} />
    <path
      d="M75 35 L105 47 V75 C105 95 92 108 75 115 C58 108 45 95 45 75 V47 Z"
      stroke={accent}
      strokeWidth="6"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M63 76 l9 9 18-18" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0,0) scale(1)" opacity="0" />
    <path d="M75 60 v14" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    <circle cx="75" cy="84" r="3.5" fill={accent} />
  </svg>
);

/* ---------------------------------- */
/* Case configuration                  */
/* ---------------------------------- */
const CASES = {
  404: {
    code: "404",
    subtitle: "Page Not Found",
    text: "The page you're looking for doesn't exist or may have been moved.",
    accent: "#2575fc",
    Illustration: NotFoundIllustration,
    primaryLabel: "Go Home",
  },
  429: {
    code: "404",
    subtitle: "User Not Found",
    text: "We couldn't find an account matching this request. Please check the link or try again.",
    accent: "#f59e0b",
    Illustration: UserNotFoundIllustration,
    primaryLabel: "Go Home",
  },
  "not-access": {
    code: "403",
    subtitle: "Access Restricted",
    text: "This page is limited to Super Admin accounts. Please contact your Super Admin if you believe you should have access.",
    accent: "#ef4444",
    Illustration: NoAccessIllustration,
    primaryLabel: "Go Home",
    secondaryLabel: "Contact Super Admin",
  },
};

const ROUTE_KEY_MAP = {
  "/429": "429",
  "/not-access": "not-access",
};

const PageNotFound = ({ type, supportEmail = "santoshpal9816@gmail.com" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const key = type || ROUTE_KEY_MAP[location.pathname] || "404";
  const config = CASES[key] || CASES["404"];
  const { code, subtitle, text, accent, Illustration, primaryLabel, secondaryLabel } = config;

  return (
    <Container $accent={accent}>
      <Card>
        <IllustrationWrap $accent={accent}>
          <Illustration accent={accent} />
        </IllustrationWrap>

        <Code $accent={accent}>{code}</Code>
        <Subtitle>{subtitle}</Subtitle>
        <Text>{text}</Text>

        <Actions>
          <PrimaryButton $accent={accent} onClick={() => navigate("/")}>
            {primaryLabel}
          </PrimaryButton>

          {secondaryLabel && (
            <GhostButton $accent={accent} onClick={() => (window.location.href = `mailto:${supportEmail}`)}>
              {secondaryLabel}
            </GhostButton>
          )}
        </Actions>
      </Card>
    </Container>
  );
};

export default PageNotFound;