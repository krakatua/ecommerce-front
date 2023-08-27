import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import CartLogo from "@/constant";
import {BsFillCartFill, BsFillPlusCircleFill} from 'react-icons/bs'
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;

  img {
    max-width: 100%;
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
  console.log(product)
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
                <ButtonLink href={`/products/`+ product?.id} 
                outline={1} white={1}>
                <BsFillPlusCircleFill/> Read More 
                </ButtonLink>
                <ButtonLink href={``} primary={1}>
                <BsFillCartFill/> Add to Cart 
                </ButtonLink>


              
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
