import WhiteBox from "@/components/Box";
import Center from "@/components/Center";
import FlyingBtn from "@/components/FlyingBtn";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/modals/Product";
import React from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const BtnSpan = styled.span`
  width: 100%;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <WhiteBox>
            <ProductImages images={product?.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <FlyingBtn
                  src={product?.images?.[0]}
                  targetTop={"5%"}
                  targetLeft={"75%"}
                  flyingItemStyling={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "0",
                  }}
                  _id={product?._id}
                  primary
                  outline
                >
                  add to Cart!
                </FlyingBtn>
              </div>
            </PriceRow>
          </div>
        </ColumnWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
