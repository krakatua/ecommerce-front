import WhiteBox from "@/components/Box";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import React, { useState } from "react";
import styled from "styled-components";
import { CityHolder } from "./cart";
import axios from "axios";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  console.log(session);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    axios.put(`/api/address`, data);
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <RevealWrapper delay={0}>
            <div>
              <WhiteBox>
                <h2>Wishlist</h2>
              </WhiteBox>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={0.5}>
            <div>
              <WhiteBox>
                <h2>Account Details</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button black block onClick={saveAddress}>
                  Save
                </Button>
                <hr />

                {session && (
                  <Button primary onClick={logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary onClick={login}>
                    Login
                  </Button>
                )}
              </WhiteBox>
            </div>
          </RevealWrapper>
        </ColsWrapper>
      </Center>
    </>
  );
}
