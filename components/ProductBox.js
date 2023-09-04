import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { BsFillCartFill } from "react-icons/bs";
import Link from "next/link";
import { CartContext } from "./CartContext";

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
  
  const {addProduct} = useContext(CartContext);
  const url = '/products/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>

        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline onClick={() => addProduct(_id)}>
            {" "}
            <BsFillCartFill />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
