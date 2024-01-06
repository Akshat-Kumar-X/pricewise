import { getProductById, getSimilarProducts } from "@/lib/actions"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"
import PriceInfoCard from "@/components/PriceInfoCard"
import ProductCard from "@/components/ProductCard"
import Modal from "@/components/Modal"
import Heart from "@/components/Prouduct/Heart"
import BookMark from "@/components/Prouduct/BookMark"
import CopyUrlButton from "@/components/Prouduct/CopyUrlButton"

type Props = {
  params: { id: string }
}


const ProductDetails = async ( { params: { id } }: Props ) => {
  const product = await getProductById(id)

  if (!product) redirect('/')

  const similarProducts = await getSimilarProducts(id)

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <div className="text-base text-black opacity-50">
                <Link 
                  href={product.url}
                  target="_blank"
                  className="hover:opacity-80"
                >
                  Visit Product
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Heart productId={id} productHearts={product.hearts}/>

              <BookMark />

              <CopyUrlButton/>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through font-bold">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="product-stars">
                  <Image 
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || '25' }
                  </p>
                </div>

                <Link 
                      href={`${product.url}#customerReviews`}
                      target="_blank"
                    >
                      <div className="product-reviews hover:px-5 hover:ms-3 hover:me-3 hover:bg-blue-100 duration-300">
                      
                        <Image 
                          src="/assets/icons/comment.svg"
                          alt="comment"
                          width={16}
                          height={16}
                        />
                        <p className="text-sm text-secondary font-semibold">
                          
                            {formatNumber(product.reviewsCount)} Reviews
                        </p>
                      </div>
                </Link>

              </div>
              <p className="text-sm text-gray-400 ">
                <span className="text-green-500 font-semibold text-lg ">{product.discountRate}% </span>
                 Discount on this Product.
              </p>

            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard 
                title= "Current Price"
                iconSrc= "/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceInfoCard 
                title= "Average Price"
                iconSrc= "/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceInfoCard 
                title= "Highest Price"
                iconSrc= "/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard 
                title= "Lowest Price"
                iconSrc= "/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
              
            </div>
          </div>
          <Modal productId={id}/>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary text-semibold">
            Product Description
          </h3>
          <div className="flex flex-col gap-4">
          {product?.description?.split('\n').slice(0, 30)}
           . . .</div>
        </div>
        <button className="btn w-fit mx-auto flex item-center justify-center min-w-[200px]">
          <Image 
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />
          <Link href={product.url} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails