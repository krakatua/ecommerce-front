import styled from "styled-components"
import Center from "./Center"


const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;


`;

const Desc = styled.p`
color: #aaa;
font-size: .8rem;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;

    img {
        max-width: 100%;
    }

`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

function Featured() {
  return (
    <Bg>
        <Center>
        <Wrapper>
            <Column>
            <div>


        <Title>Pro anywhere!</Title>
        <Desc>Lorem iDescsum dolor 
            sit amet, consectetur 
            adipisicing elit. Beatae 
            dolore omnis, repudiandae iste cumque,
             reiciendis ratione soluta, veritatis vero 
             distinctio dolores dolorem 
            atque. Natus, at fugiat? Autem ipsum provident totam.
            </Desc>
            </div>

            </Column>

            <Column>
                <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png"/>
            </Column>

        </Wrapper>
        </Center>

    </Bg>
  )
}

export default Featured