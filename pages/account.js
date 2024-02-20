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
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin: 5px;
  }
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressloaded, setAddressLoaded] = useState(true);
  const [wishLoaded, setWishLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    if (!session) return;
    setAddressLoaded(false)
    setWishLoaded(false)
    setOrderLoaded(false)
    axios.get("/api/address").then((res) => {
        setTimeout(() => {
        const address = res.data;
        if (address) {
          setName(address.name);
          setEmail(address.email);
          setCity(address.city);
          setPostalCode(address.postalCode);
          setStreetAddress(address.streetAddress);
          setCountry(address.country);
          setAddressLoaded(true);
        }
      }, 500);
      });
    axios.get("/api/wishlist").then((res) => {
      setTimeout(() => {
        const wishlist = res.data;
        if (wishlist) {
          setWishlist(res?.data.map((item) => item.product) || []);
          setWishLoaded(true);
        }
      }, 500);
    
    })

    axios.get('/api/orders').then(res => {
      setOrders(res?.data);
      setOrderLoaded(true);
    })

    
  }, [session]);

  function removeFromWishList(id) {
      setWishlist(products => {
        return [...products.filter(p => p._id.toString() !== id)]
      });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <RevealWrapper delay={0}>
            <div>
              <WhiteBox>
                <Tabs tabs={['Orders','Wishlist']} active={activeTab}
                onChange={setActiveTab}
                />
                {activeTab === 'Wishlist' && 
                
                <WishedProductsGrid>
                  {!wishLoaded && <Spinner fullWidth={true} />}
                {wishlist.length > 0 && wishLoaded && wishlist.map(wp => (
                  <ProductBox key={wp?._id} {...wp} wished={true}
                  onRemoveFromWishList={removeFromWishList}
                  />
                ))}
                {
                  wishlist.length === 0 && wishLoaded && (
                    <>
                    {session ? <p>No products in your wishlist</p>
                    : <p>Login to see your wishlist</p>}
                    </>
                  )
                }
                </WishedProductsGrid>
                }
                {activeTab === 'Orders' && (
                  <>
                    {!orderLoaded && <Spinner fullWidth={true} />}
                    {orders.length > 0 && orderLoaded && orders.map(order => (
                     <SingleOrder {...order}/>
                    ))}
                    {orders.length === 0 && orderLoaded && (
                      <p>No orders found</p>
                    )}
                  </>
                
                )}
              </WhiteBox>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={0.5}>
            <div>
              <WhiteBox>
                <h2>{session ? 'Account Details' : 'Login'}</h2>
                {!addressloaded && <Spinner fullWidth={true} />}
                {addressloaded &&  session ? (
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
                    <Button black block onClick={saveAddress}>
                      Save
                    </Button>
                  </> 
                ) : (
                  <p>Login to see your account details</p>
                )}
                <br />
                {session && (
                  <Button primary onClick={logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary onClick={login}>
                    Login with Google
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
