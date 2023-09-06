import React from 'react'
import ProductBox from './ProductBox';
import styled from 'styled-components';

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export default function ProductsGrid({products}) {
    console.log(products)
  return (
    <StyledProductsGrid>
        {products?.map((product) => (
            <ProductBox key={product?.id} {...product}/>
        ))}
    </StyledProductsGrid>
  )
}
