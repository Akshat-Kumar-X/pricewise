import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousel from "@/components/HeroCarousel"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {

  const allProducts = await getAllProducts()

  const last8Products = allProducts.slice(-8).reverse();

  return (
    <>
    <section className="px-6 md:px-20 py-12">
      <div className="flex max-lg:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="small-text">
            Smart Shopping Starts Here:
            <Image 
              src="/assets/icons/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </p>

          <h1 className="head-text">
            Unleash the Power of 
            <span className="text-primary"> PriceWise</span>
          </h1>

          <p className="mt-6">
            Powerful, self-serve product and gowth analytics to help serve you convert, engage, and retain more.
          </p>

          <Searchbar />

        </div>

        <HeroCarousel />
      </div>
    </section>
    <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16  justify-center  gap-10 mt-7 w-full">
          {last8Products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
} 

export default Home   