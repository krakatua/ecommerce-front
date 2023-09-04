import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import {BsFillCartFill, BsFillPlusCircleFill} from 'react-icons/bs'
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }


  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }

`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 25px;
`;

function Featured({product}) {

  const {addProduct} = useContext(CartContext)
  function addFeaturedToCart() {
    addProduct(prev => [...prev, product._id]);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>
                {product?.description}
              </Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/products/${product?._id}`} 
                outline={1} white={1}>
                <BsFillPlusCircleFill/> Read More 
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                <BsFillCartFill/> Add to Cart 
                </Button>


              
              </ButtonsWrapper>
              
            </div>
          </Column>

          <Column>
            <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

export default Featured;
