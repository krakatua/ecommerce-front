import WhiteBox from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/modals/Product";
import React, { useContext } from "react";
import { BsFillCartFill } from "react-icons/bs";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
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

export default function ProductPage({ product}) {

  const {addProduct} = useContext(CartContext);

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
                <Button primary
                onClick={() => addProduct(product?._id)}>
                  <BsFillCartFill />
                  Add to Cart
                </Button>
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
