import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/modals/Category";
import { Product } from "@/modals/Product";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { all } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/modals/WishedProducts";

const CategoryGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 0;
  align-items: center;
  gap: 20px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  text-decoration: none;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts=[] }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Categories</Title>
        {mainCategories?.map((cat, _) => (
          <CategoryWrapper key={_}>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/category/" + cat._id}>Show All</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p, index) => (
                <RevealWrapper key={p} delay={index * 50}>
                  <ProductBox {...p}  wished={wishedProducts.includes(p?._id)}/>
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProducts[cat._id].length * 50}>
                <ShowAllSquare href={"/category/" + cat._id}>
                  Show All &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c?.parent);
  const categoriesProducts = {}; //cat Id => [products]
  const allFetchedProductsId =  [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c?._id?.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map(p => p?._id?.toString()));
    categoriesProducts[mainCat._id] = products;
  }
  
  
  console.log(allFetchedProductsId)

  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const wishedProducts = session?.user ? await WishedProduct.find({
    userEmail:  session?.user?.email,
    product: allFetchedProductsId,
  }) : (
    []
  )
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map(i => i?.product?.toString()),
    },
  };
}
