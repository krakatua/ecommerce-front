import WhiteBox from "@/components/Box";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CityHolder } from "./cart";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [addresses, setAddresses] = useState({})

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

  function addAddress () {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    console.log(data)
    axios.post(`/api/address`, data)
  }

  useEffect(() => {
    setTimeout(() => {
      if (!session) return;

      axios.get("/api/address").then((res) => {
        const address = res.data;
        console.log(address)
        if (address) {
          setAddresses(address)
        }
      });

      console.log(addresses)
    }, 2000);
  }, []);

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
                <h2>Shipping Details</h2>
                {!loaded && <Spinner fullWidth  />}
                {loaded && (
                  <>
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
                    <BtnsWrapper>

                    <Button black  onClick={saveAddress}>
                      Save
                    </Button>
                    <Button black  onClick={addAddress}>
                      Add
                    </Button>
                    </BtnsWrapper>
                  </>
                )}
                <br />
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
          {
            addresses.map((addr) => (
              <WhiteBox>
                <h3>{addr?.name}</h3>
              </WhiteBox>
            ))
          }
          </RevealWrapper>
        </ColsWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  return {
    props: {

    }
  }

}