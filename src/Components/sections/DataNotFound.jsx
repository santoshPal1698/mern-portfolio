import React from "react";
import styled from "styled-components";

const defaultNotFoundImg ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJD2poO0YG2NcQP4_YuOofw0DugXFC6nBsJT-CT2gMQ&s=10";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: ${({ $padding }) => $padding || "20px 20px"};
  min-height: ${({ $minHeight }) => $minHeight || "200px"};
`;

const ImageWrapper = styled.div`
  width: ${({ $imgWidth }) => $imgWidth || "160px"};
  max-width: 100%;
  margin-bottom: 16px;
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius:15px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: coral;
  margin: 0 0 6px 0;
  font-weight:bold;
  text-transform: capitalize;
`;

const SubText = styled.p`
  font-size: 13px;
  color: #888888;
  margin: 0;
  max-width: 320px;
`;

const DataNotFound = ({
  message = "No data found",
  subText,
  image,
  imgWidth,
  minHeight,
  padding,
}) => {
  return (
    <Wrapper $minHeight={minHeight} $padding={padding}>
      <ImageWrapper $imgWidth={imgWidth}>
        <img src={image || defaultNotFoundImg} alt={message} />
      </ImageWrapper>
      <Title>{message}</Title>
      {subText && <SubText>{subText}</SubText>}
    </Wrapper>
  );
};

export default DataNotFound;
