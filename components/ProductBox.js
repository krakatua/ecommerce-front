import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCartFill } from "react-icons/bs";
import Link from "next/link";
import FlyingBtn from "./FlyingBtn";
import axios from "axios";
import HeartSolidIcon from "./UI/HeartSolidIcon";
import HeartOutlineIcon from "./UI/HeartOutlineIcon";

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
  position: relative;

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

const WishlistBtn = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  transition: all 300ms ease;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
    color:red;
  `
      : `
    color:black;
  `}
  svg {
    width: 16px;
  }
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished,
}) {
  const url = "/products/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishList(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    const nextValue = !isWished;

    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then((res) => {
        "Item Wished", res;
      });

    setIsWished(nextValue);
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <WhiteBoxImg>
          <img src={images?.[0]} />
        </WhiteBoxImg>
        <WishlistBtn wished={isWished} onClick={addToWishList}>
          {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
        </WishlistBtn>
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
