import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/modals/Category";
import { Product } from "@/modals/Product";
import React, { useState } from "react";
import styled from "styled-components";

const CateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: space-between;

  h1 {
    font-size: 2em;
    font-weight: 700;
  }
`;

const FilterWrapp = styled.div`
  display: flex;
  gap: 30px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  color: #444;

  select {
    background-color: transparent;
    border: 1px solid #ddd;
    outline: 0px;
    font-size: inherit;
    color: #444;
  }
`;

export default function CategoryPage({ category, products }) {

    const [filterVal, setFilterVal] = useState(
        category.properties.map(p => ({name: p.name, value: 'all'}))
    );

    

  return (
    <>
      <Header />
      <Center>
        <CateHeader>
          <h1>{category.name}</h1>
          <FilterWrapp>
            {category.properties.map((prop) => (
              <Filter key={prop}>
                <span>{prop.name}:</span>
                <select 
                onChange={() => {}}
                value={filterVal.find(f => f.name === prop.name).value}>
                    <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FilterWrapp>
        </CateHeader>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
