import React, { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  height: 200px;
  max-height: 200px;
`;

const ImageBtns = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageBtn = styled.div`
  border: 2px solid #aaa;
  height: 50px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;

  ${(props) =>
    props.active
      ? `
        border-color: red;
    
    `
      : `
        border-color: transparent;
        opacity: .7
    `}
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageBtns>
        {images.map((img) => (
          <ImageBtn
            active={img === activeImage}
            onClick={() => setActiveImage(img)}
            key={img.id}
          >
            <Image src={img} />
          </ImageBtn>
        ))}
      </ImageBtns>
    </>
  );
}
