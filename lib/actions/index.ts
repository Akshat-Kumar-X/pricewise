"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return
    try {
        connectToDB()

        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        
        if (!scrapedProduct) return

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            }
        }   

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true },
        )

        revalidatePath(`/products/${newProduct._id}`)
        
    } catch (error: any) {
        throw new Error(`Failed to ceate/update product: ${error.message}`)
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB()

        const product = await Product.findOne({ _id: productId})

        if(!product) return null;

        return product
        
    } catch (error) {           
        
    }
}

export async function getAllProducts() {
    try {
        connectToDB()

        const products = await Product.find()
        return products;

    } catch (error) {
        console.log(error)
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        connectToDB()

        const currentProduct = await Product.findById(productId)

        if (!currentProduct) return null

        let similarProducts = await Product.find({
            category: currentProduct.category,
            _id: { $ne: productId },
        }).limit(4)

        if (similarProducts.length === 0) {
            similarProducts = await Product.find({
                _id: { $ne: productId },
            }).limit(4)
        }

        return similarProducts.length > 0 ? similarProducts : null;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch similar products');
    }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        const product = await Product.findById(productId)
    
        if(!product) return;
        
        const userExists = product.users.some((user: User) => user.email === userEmail)
        
        if(!userExists) {
            product.users.push({ email: userEmail });

            await product.save();

            const emailContent = await generateEmailBody(product, "WELCOME")

            await sendEmail(emailContent, [userEmail])
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProductHearts = async (productId: string, newHeartsCount: number) => {
    try {
      const product = await Product.findById({ _id: productId});
  
      product.hearts = newHeartsCount;
  
      await product.save();
  
    } catch (error) {
      console.error('Error updating product hearts:', error);
    }
  }