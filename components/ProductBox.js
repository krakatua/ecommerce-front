import React from 'react'
import styled from 'styled-components';
import Button from './Button';
import CartLogo from '@/constant';
import {BsFillCartFill} from 'react-icons/bs'


const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
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

const Title = styled.h2`
    font-weight: normal;
    font-size: 0.9rem;
    margin: 0;
`;

const ProductInfoBox = styled.div``;

export default function ProductBox({
    _id, title, description, price, images
}) {
  return (
    <ProductWrapper>

    <WhiteBox>
        <div>

        <img src={images[0]}/>
        </div>
    </WhiteBox>
       <Title>{title}</Title> 
       <Button primary> <BsFillCartFill/></Button>
    </ProductWrapper>
  )
}
