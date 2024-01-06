import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: Product;
}

const ProductCard = ( { product } : Props ) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card p-5 shadow-md hover:shadow-xl duration-200">
        <div className="product-card-img-container flex flex-col items-center">
            <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="product-card-img"
            />

        </div>
        <div className="flex flex-col gap-3">
            <h3 className="product-title"> { product.title } </h3>
        
            <div className="flex justify-between">
                <p className="text-black opacity-50 text-lg capitalize">
                    { product.category }
                </p>

                <p className="text-black text-lg font-semibold">
                    <span>{product?.currency}</span>
                    <span>{formatNumber(product.currentPrice)}</span>
                </p>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard