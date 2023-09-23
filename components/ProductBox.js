import React from "react";
import styled from "styled-components";
import { BsFillCartFill } from "react-icons/bs";
import Link from "next/link";
import FlyingBtn from "./FlyingBtn";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const WhiteBoxImg = styled.div`
  transition: all 300ms ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Price = styled.div`
  font-size: 1.5em;
  font-weight: 600;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/products/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <WhiteBoxImg>
          <img src={images?.[0]} />
        </WhiteBoxImg>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>

        <PriceRow>
          <Price>${price}</Price>
          <FlyingBtn
            src={images?.[0]}
            targetTop={"5%"}
            targetLeft={"75%"}
            flyingItemStyling={{
              width: "auto",
              height: "auto",
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "0",
            }}
            _id={_id}
            outline
            primary
          >
            <BsFillCartFill />
          </FlyingBtn>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
