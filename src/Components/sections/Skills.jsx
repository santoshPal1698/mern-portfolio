import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import DataNotFound from "./DataNotFound";


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

export const SliderWrapper = styled.div`
  width: 100%;
  padding: 30px 0 50px;
  position: relative;

  .swiper {
    max-width: 1180px;
    padding: 18px 58px 50px;
  }

  .swiper-slide {
    height: auto;
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    background: ${({ theme }) => theme.text_secondary};
    opacity: .35;
  }

  .swiper-pagination-bullet-active {
    width: 24px;
    border-radius: 6px;
    background: ${({ theme }) => theme.primary};
    opacity: 1;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 42px;
    height: 42px;
    border: 1px solid ${({ theme }) => `${theme.text_secondary}3d`};
    border-radius: 12px;
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 8px 20px ${({ theme }) => `${theme.black}18`};
    transition: transform .2s ease, border-color .2s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primary};
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 15px;
    font-weight: 800;
  }

  @media (max-width: 640px) {
    .swiper { padding: 12px 18px 46px; }
    .swiper-button-next, .swiper-button-prev { display: none; }
  }
`;

export const SkillCard = styled.article`
  width: 100%;
  min-height: 292px;
  padding: 28px;
  border: 1px solid ${({ theme }) => `${theme.text_secondary}2f`};
  border-radius: 20px;
  background: linear-gradient(145deg, ${({ theme }) => theme.card}, ${({ theme }) => theme.bgLight});
  box-shadow: 0 16px 36px ${({ theme }) => `${theme.black}18`};
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;

  &:hover {
    transform: translateY(-7px);
    border-color: ${({ theme }) => `${theme.primary}70`};
    box-shadow: 0 22px 44px ${({ theme }) => `${theme.primary}22`};
  }

  @media (max-width: 640px) {
    min-height: 0;
    padding: 22px 18px;
  }
`;

export const SkillTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 22px;
  color: ${({ theme }) => theme.text_primary};
  font-size: clamp(21px, 3vw, 25px);
  font-weight: 750;
  letter-spacing: -0.025em;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 5px ${({ theme }) => `${theme.primary}18`};
  }
`;

export const SkillList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillItem = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
  padding: 10px 11px;
  border: 1px solid ${({ theme }) => `${theme.text_secondary}28`};
  border-radius: 11px;
  background: ${({ theme }) => `${theme.bg}55`};
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  font-weight: 650;
  line-height: 1.2;
  transition: background .2s ease, border-color .2s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}12`};
  }
`;

export const SkillImage = styled.img`
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  padding: 4px;
  border-radius: 7px;
  background: ${({ theme }) => theme.bgLight};
  object-fit: contain;
`;

const Skills = () => {

  const { loading, portfolioData } = useSelector((state) => state.root);
  const { skills } = portfolioData;

  return (
    <>
      <Title id="Skills"> Skills</Title>
      <Desc
        style={{
          marginBottom: "40px",
        }}
      >
        Full Stack Developer 🌊 Skilled in Angular, React, TypeScript, and Micro Frontend Architecture | Over 5 years of hands-on experience
      </Desc>

      <SliderWrapper >
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          spaceBetween={30}
          // ✅ RESPONSIVE
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}

          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}

          pagination={{ clickable: true }}
          navigation={true}

          autoplay={{
            delay: 2000,              // 2 seconds
            disableOnInteraction: false, // continue after click
            pauseOnMouseEnter: true,     // pause on hover
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        >
    {skills.length === 0 ? (
        <DataNotFound
          message="No skills added yet"
          subText="Add your skills to showcase your expertise."
          imgWidth= "40%"
        />
      ) : (
        <>
          {skills.map((skill, index) => (
            <SwiperSlide key={index}>
              <SkillCard>
                <SkillTitle>{skill?.title}</SkillTitle>

                <SkillList>
                  {skill.skills.map((item, index_x) => (
                    <SkillItem key={index_x}>
                      <SkillImage src={item?.image} />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillCard>
            </SwiperSlide>
          ))}
        </>
      )}


        </Swiper>
      </SliderWrapper>
    </>


  );
};

export default Skills;
