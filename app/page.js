import React from 'react';
import GlobalApi from './_utils/GlobalApi';
import CategoryList from './_components/CategoryList';
import ProductList from './_components/ProductList';

export default async function Home() {
  let categoryList = [];
  let productList = [];

  try {
    categoryList = await GlobalApi.getCategoryList();
    productList = await GlobalApi.getAllProduct();
    console.log('Category List:', categoryList);
  } catch (error) {
    console.error('Error fetching category list:', error);
  }

  return (
    <div className="p-10 px-16">
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
    </div>
  );
}
