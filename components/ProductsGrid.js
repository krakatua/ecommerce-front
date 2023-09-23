import React from "react";
import ProductBox from "./ProductBox";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.map((product, index) => (
        <RevealWrapper delay={index * 100} key={product?.id}>
          <ProductBox {...product} />
        </RevealWrapper>
      ))}
    </StyledProductsGrid>
  );
}
