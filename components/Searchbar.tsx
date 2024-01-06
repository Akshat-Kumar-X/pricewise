"use client"
import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url)
        const hostname = parsedURL.hostname

        if (
            hostname.includes('amazon.com') ||
            hostname.includes('amazom.') ||
            hostname.includes('amazon')
        ) {
            return true
        }
    } catch (error) {
            return false
    }
}

const Searchbar = () => {

  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidLink = isValidAmazonProductURL(searchPrompt)
    
    if (!isValidLink) return toast.error("Please provide a valid Amazon link")
    
    try {
        setIsLoading(true)

        // Scrape the Product page
        const productLink = await scrapeAndStoreProduct(searchPrompt)
        
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
        
    }
  }  

  return (
    <form 
        className="flex flex-wrap gap-4 mt-12"
        onSubmit={handleSubmit}
    >
        <input 
            type="text" 
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder="Enter Product Link"
            className="searchbar-input"
        />
        <button 
            type="submit" 
            className="searchbar-btn"
        >
            {isLoading? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar