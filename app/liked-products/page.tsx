"use client"
import React, { useEffect, useState } from 'react';
import { getProductById } from '@/lib/actions';
import ProductCard from '@/components/ProductCard'; // Import your ProductCard component
import Image from 'next/image';

const Heartpage = () => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [likedProductDetails, setLikedProductDetails] = useState<any[]>([]);

  useEffect(() => {
    // Fetch liked product IDs from local storage
    const likedProductIds = Object.keys(localStorage)
      .filter((key) => key.startsWith('HEART_BUTTON_'))
      .map((key) => key.replace('HEART_BUTTON_', ''));

    setLikedProducts(likedProductIds);
  }, []);

  useEffect(() => {
    // Fetch product details for each liked product
    const fetchProductDetails = async () => {
      const products = await Promise.all(
        likedProducts.map(async (productId) => {
          return await getProductById(productId);
        })
      );
      setLikedProductDetails(products);
    };

    fetchProductDetails();
  }, [likedProducts]);

  return (
    <section className="flex flex-col gap-5 px-6 md:px-20 py-14 ">
      <h2 className="section-text mb-0 pt-0">Liked Items</h2>
      <p className="small-text mt-0 pt-0">
        All your liked items will display here:
        <Image 
          src="/assets/icons/arrow-right.svg"
          alt="arrow-right"
          width={16}
          height={16}
        />
      </p>
      <div className="flex flex-wrap gap-10 mt-7 gap-x-8 gap-y-16 w-full min-[600px]:justify-center">
        {likedProductDetails.map((product) => (
          product && <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Heartpage;
