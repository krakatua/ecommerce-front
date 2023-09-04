import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { BsJustify } from "react-icons/bs";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px 0;

    @media screen and (min-width: 768px) {
      
      padding: 0;
    }
`;

const StyledNav = styled.nav`
    display: block;
    gap: 20px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px 20px 20px;
    background-color: #222;

    ${props => props.mobileNavActive ? `
      display: block;
      z-index: 1;
    `: `
      display: none;
    `}

    @media screen and (min-width: 768px) {
      display: flex;
      position: static;
      padding: 0;
    }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px){
    display: none;
  }

`;


export default function Header() {

  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false)


  return (
    <StyledHeader>
      <Center>
        <Wrapper>

        <Logo href={`/`}>Ecommerce</Logo>

        <StyledNav mobileNavActive={mobileNavActive}>
          <NavLink href={`/`}>Home</NavLink>
          <NavLink href={`/products`}>All Products</NavLink>
          <NavLink href={`/categories`}>Categories</NavLink>
          <NavLink href={`/Account`}>Account</NavLink>
          <NavLink href={`/cart`}>Cart ({cartProducts.length})</NavLink>
        </StyledNav>
        <NavButton onClick={() => setMobileNavActive(prev => !prev)}> 
          <BsJustify/>
        </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
