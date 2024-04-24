import styled from "styled-components";
import Center from "./Center";
import { BsFillCartFill, BsFillPlusCircleFill } from "react-icons/bs";
import ButtonLink from "./ButtonLink";
import FlyingBtn from "./FlyingBtn";
import { RevealWrapper } from "next-reveal";

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
  justify-content: center;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const CenterImg = styled.div`
  display: flex;
  justify-content: center;
`;

function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <RevealWrapper origin="left">
              <div>
                <Title>{product?.title}</Title>
                <Desc>{product?.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={`/products/${product?._id}`}
                    outline={1}
                    white={1}
                    header
                  >
                    <BsFillPlusCircleFill /> Read More
                  </ButtonLink>
                  <FlyingBtn
                    src={
                      "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png"
                    }
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
                    header
                  >
                    <BsFillCartFill /> Add to Cart
                  </FlyingBtn>
                </ButtonsWrapper>
              </div>
            </RevealWrapper>
          </Column>

          <Column>
            <RevealWrapper origin="right">
              <CenterImg className="">

              <img src={product.images?.[0]} />
              </CenterImg>
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

export default Featured;
