import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/modals/Category";
import { Product } from "@/modals/Product";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function CategoryPage({
  category,
  subCategories,
  products: cateProducts,
}) {
  const [products, setProducts] = useState(cateProducts);
  const defaultFilterVal = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));
  const defaultSorting = "_id-desc";
  const [filterVal, setFilterVal] = useState(defaultFilterVal);

  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filsterStatus, setFilterStatus] = useState(false);

  function handlerFilterStatus(filterName, filvalue) {
    setFilterVal((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filvalue : p.value,
      }));
    });
    setFilterStatus(true);
  }

  useEffect(() => {
    if (!filsterStatus) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);

    filterVal.forEach((fil) => {
      if (fil.value !== "all") {
        params.set(fil.name, fil.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res?.data);

      setTimeout(() => {
        setLoadingProducts(false);
      }, 1000);
    });
  }, [filterVal, sort, filsterStatus]);

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
                  onChange={(ev) => {
                    handlerFilterStatus(prop.name, ev.target.value);
                  }}
                  value={filterVal.find((f) => f.name === prop.name).value}
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setFilterStatus(true);
                }}
              >
                <option value="price-asc">Price Ascending</option>
                <option value="price-desc">Price Descending</option>
                <option value="_id-desc">newest First</option>
                <option value="_id-asc">oldest First</option>
              </select>
            </Filter>
          </FilterWrapp>
        </CateHeader>
        {loadingProducts && <Spinner fullWidth />}
        {!loadingProducts && (
          <div>
            {products.length > 0 && <ProductsGrid products={products} />}
            {products.length === 0 && <div>Sorry, No Products</div>}
          </div>
        )}
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
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
