"use client"
import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchAllProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products as any[]); // Type assertion here
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, []); // Empty dependency array to run the effect only once

  // Filter products based on the search term
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-5 px-6 md:px-20 py-14">
        <div className='bg-gray-100 p-10 rounded-2xl shadow-sm'>
            <h2 className="section-text mb-0 mt-3">Search Products</h2>
            <p className="small-text mt-1 pt-0 mb-6">
                Find any item you want here:
                <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
                />
            </p>
            <form>   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="default-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900  focus:outline-none  rounded-lg bg-white   " placeholder="Search Laptops, Mobiles..." required />
                    <button type="submit" disabled className="text-white absolute end-2.5 bottom-2.5 bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                </div>
            </form> 

        
      </div>
       
      <div className="flex flex-wrap gap-x-8 gap-y-16  justify-center  gap-10 mt-7 w-full">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsPage;
