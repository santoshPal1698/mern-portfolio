import axios from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../Api/Endpoints";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import ToastService from "../services/toastService";

/* ─── Global Styles ─────────────────────────────────────────── */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sky-deep:    #0a0f2e;
    --sky-mid:     #0d1f5c;
    --sky-accent:  #1a3a8f;
    --glass-bg:    rgba(255,255,255,0.06);
    --glass-border:rgba(255,255,255,0.14);
    --frost:       rgba(255,255,255,0.85);
    --gold:        #f5c842;
    --teal:        #38d9c0;
    --text-main:   #e8eeff;
    --text-sub:    rgba(232,238,255,0.55);
    --radius:      24px;
    --shadow:      0 8px 40px rgba(0,0,0,0.45);
  }
`;

/* ─── Keyframes ──────────────────────────────────────────────── */
const drift = keyframes`
  0%   { transform: translateY(0px) scale(1); }
  50%  { transform: translateY(-18px) scale(1.04); }
  100% { transform: translateY(0px) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: .6; transform: scale(1); }
  50%       { opacity: 1;  transform: scale(1.08); }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const orb = keyframes`
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(40px,-30px) scale(1.1); }
  66%      { transform: translate(-30px,20px) scale(.92); }
`;

/* ─── Layout ─────────────────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 20% 20%, #1a3a8f 0%, #0a0f2e 55%),
              radial-gradient(ellipse at 80% 80%, #0d2a6e 0%, #0a0f2e 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: ${orb} ${({ dur }) => dur || "10s"} ease-in-out infinite;
  pointer-events: none;

  &:nth-child(1) {
    width: 420px; height: 420px;
    background: rgba(56,217,192,0.12);
    top: -80px; left: -100px;
  }
  &:nth-child(2) {
    width: 340px; height: 340px;
    background: rgba(245,200,66,0.08);
    bottom: -60px; right: -80px;
    animation-delay: -4s;
  }
  &:nth-child(3) {
    width: 260px; height: 260px;
    background: rgba(26,58,143,0.25);
    top: 40%; left: 55%;
    animation-delay: -7s;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Glass Card ─────────────────────────────────────────────── */
const GlassCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: var(--radius);
  box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
`;

/* ─── Search Panel ───────────────────────────────────────────── */
const SearchPanel = styled(GlassCard)`
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeUp} .6s ease both;
`;

const PanelIcon = styled.div`
  font-size: 56px;
  animation: ${drift} 5s ease-in-out infinite;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 16px rgba(56,217,192,0.4));
`;

const PanelTitle = styled.h1`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  color: var(--text-main);
  letter-spacing: -0.5px;
  margin-bottom: 6px;
`;

const PanelSubtitle = styled.p`
  color: var(--text-sub);
  font-size: .875rem;
  font-weight: 300;
  margin-bottom: 28px;
`;

const InputWrap = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 16px;

  &::before {
    content: '🔍';
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    pointer-events: none;
  }
`;

const CityInput = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 14px;
  padding: 14px 16px 14px 42px;
  color: var(--text-main);
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  outline: none;
  transition: border-color .25s, background .25s, box-shadow .25s;

  &::placeholder { color: var(--text-sub); }

  &:focus {
    border-color: var(--teal);
    background: rgba(56,217,192,0.07);
    box-shadow: 0 0 0 4px rgba(56,217,192,0.12);
  }
`;

const SearchBtn = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--teal) 0%, #1a9ecf 100%);
  color: #0a0f2e;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: .3px;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s, filter .2s;
  box-shadow: 0 4px 20px rgba(56,217,192,0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(56,217,192,0.5);
    filter: brightness(1.07);
  }
  &:active { transform: translateY(0); }
  &:disabled { opacity: .55; cursor: not-allowed; transform: none; }
`;

/* ─── Weather Panel ──────────────────────────────────────────── */
const WeatherPanel = styled(GlassCard)`
  animation: ${fadeUp} .7s .1s ease both;
  display: flex;
  flex-direction: column;
`;

const WeatherHero = styled.div`
  padding: 36px 32px 24px;
  background: linear-gradient(160deg, rgba(56,217,192,0.08) 0%, transparent 60%);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 28px 20px 20px;
  }
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 20px rgba(56,217,192,0.6));
  animation: ${pulse} 3s ease-in-out infinite;
`;

const HeroText = styled.div`
  flex: 1;
`;

const CityName = styled.h2`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.9rem;
  color: var(--text-main);
  letter-spacing: -0.5px;
  margin-bottom: 2px;
`;

const WeatherDesc = styled.p`
  color: var(--teal);
  font-size: .875rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: .5px;
`;

const TempDisplay = styled.div`
  text-align: right;

  @media (max-width: 480px) { text-align: center; }
`;

const TempMain = styled.span`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 3.5rem;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -2px;
`;

const TempUnit = styled.span`
  font-family: 'Syne', sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  color: var(--text-sub);
  margin-left: 2px;
`;

/* ─── Stats Grid ─────────────────────────────────────────────── */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--glass-border);
  border-top: 1px solid var(--glass-border);

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCell = styled.div`
  padding: 20px 16px;
  background: var(--glass-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: background .2s;

  &:hover {
    background: rgba(56,217,192,0.06);
  }
`;

const StatIcon = styled.span`
  font-size: 1.4rem;
`;

const StatLabel = styled.p`
  font-size: .7rem;
  font-weight: 500;
  color: var(--text-sub);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.p`
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-main);
`;

/* ─── Loader ─────────────────────────────────────────────────── */
const LoaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 32px;
  flex: 1;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid rgba(56,217,192,0.15);
  border-top-color: var(--teal);
  border-radius: 50%;
  animation: ${spin} .9s linear infinite;
`;

const LoaderText = styled.p`
  color: var(--text-sub);
  font-size: .875rem;
  letter-spacing: .5px;

  &::after {
    content: '';
    display: inline-block;
    width: 80px;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(90deg, transparent 0%, var(--teal) 50%, transparent 100%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.5s infinite;
    vertical-align: middle;
    margin-left: 10px;
  }
`;

/* ─── Empty State ────────────────────────────────────────────── */
const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  gap: 12px;
  animation: ${fadeUp} .6s .2s ease both;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  opacity: .4;
  animation: ${drift} 6s ease-in-out infinite;
`;

const EmptyText = styled.p`
  color: var(--text-sub);
  font-size: .95rem;
  text-align: center;
  max-width: 200px;
  line-height: 1.6;
`;

/* ─── Component ──────────────────────────────────────────────── */
const Weather = () => {
  const [city, setCity] = useState("Indore");
  const [weatherData, newWetherData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllweather();
  }, []);

  const getAllweather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ENDPOINTS.ApiBaseUrl}${city}&units=metric&appid=${ENDPOINTS.WeatherKey}`
      );
      newWetherData(response.data);
      setLoading(false);
      ToastService.success(`📍 ${city}`, { style: { background: "#0d1f5c", color: "#e8eeff", border: "1px solid rgba(255,255,255,0.12)" } });
    } catch (error) {
      setError(error.response.data.message);
      ToastService.error(error.response.data.message, { style: { background: "#0d1f5c", color: "#e8eeff" } });
      setLoading(false);
    }
  };

  const hasData = Object.keys(weatherData).length > 0;

  const stats = hasData
    ? [
      { icon: "🌡️", label: "Feels Like", value: `${(weatherData?.main?.feels_like).toFixed(1)}°C` },
      { icon: "🔻", label: "Min Temp", value: `${(weatherData?.main?.temp_min).toFixed(1)}°C` },
      { icon: "🔺", label: "Max Temp", value: `${(weatherData?.main?.temp_max).toFixed(1)}°C` },
      { icon: "💧", label: "Humidity", value: `${weatherData?.main?.humidity}%` },
      { icon: "🌬️", label: "Wind Speed", value: `${weatherData?.wind?.speed} m/s` },
      { icon: "📊", label: "Pressure", value: `${weatherData?.main?.pressure} hPa` },
    ]
    : [];

  const weatherIcon = hasData
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`
    : null;


  return (
    <>
      <GlobalStyle />
      <Page>
        <Orb />
        <Orb />
        <Orb />

        <Wrapper>
          {/* ── Search Panel ── */}
          <SearchPanel>
            <PanelIcon onClick={() => navigate("/")}>🌤️</PanelIcon>
            <PanelTitle>Weather Now</PanelTitle>
            <PanelSubtitle>Search any city worldwide</PanelSubtitle>

            <InputWrap>
              <CityInput
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name…"
                onKeyDown={(e) => e.key === "Enter" && getAllweather()}
              />
            </InputWrap>

            <SearchBtn onClick={getAllweather} disabled={loading}>
              {loading ? "Fetching…" : "Get Weather →"}
            </SearchBtn>
          </SearchPanel>

          {/* ── Weather Panel ── */}
          <WeatherPanel>
            {loading ? (
              <LoaderWrap>
                <Spinner />
                <LoaderText>Fetching weather</LoaderText>
              </LoaderWrap>
            ) : hasData ? (
              <>
                <WeatherHero>
                  <WeatherIcon
                    src={weatherIcon}
                    alt={weatherData.weather[0]?.description}
                  />
                  <HeroText>
                    <CityName>{weatherData?.name}</CityName>
                    <WeatherDesc>
                      {weatherData.weather[0]?.description}
                    </WeatherDesc>
                  </HeroText>
                  <TempDisplay>
                    <TempMain>{(weatherData?.main?.temp).toFixed(1)}</TempMain>
                    <TempUnit>°C</TempUnit>
                  </TempDisplay>
                </WeatherHero>

                <StatsGrid>
                  {stats.map((s, i) => (
                    <StatCell key={i}>
                      <StatIcon>{s.icon}</StatIcon>
                      <StatLabel>{s.label}</StatLabel>
                      <StatValue>{s.value}</StatValue>
                    </StatCell>
                  ))}
                </StatsGrid>
              </>
            ) : (
              <EmptyState>
                <EmptyIcon>🌍</EmptyIcon>
                <EmptyText>Enter a city name and hit search to see live weather</EmptyText>
              </EmptyState>
            )}
          </WeatherPanel>
        </Wrapper>
      </Page>
    </>
  );
};

export default Weather;