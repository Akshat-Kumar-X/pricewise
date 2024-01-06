import Link from 'next/link'
import Image from 'next/image'


const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href='/' className='flex ites-center gap-1'>
                <Image 
                    src="/assets/icons/logo.svg" 
                    width={35}
                    height={35}
                    alt="logo"
                />

                <p className="nav-logo">
                    Price<span className="text-primary">Wise</span>
                </p>
            </Link>
            <div  className="flex items-center justify-center gap-5">
            <Link href="/all-products" className="hover:scale-125 transition-transform duration-300">
                    <Image
                    src="/assets/icons/search.svg"
                    alt="search"
                    width={34}
                    height={34}
                    className="object-contain"
                    />
                </Link>

                <Link href="/liked-products" className="hover:scale-125 transition-transform duration-300 ">
                    <Image
                    src="/assets/icons/black-heart.svg"
                    alt="heart"
                    width={34}
                    height={34}
                    className="object-contain transition-colors duration-300 text-gray-500 hover:text-red-500"
                    />
                </Link>

                <Link href="/" className="hover:scale-125 transition-transform duration-300">
                    <Image
                    src="/assets/icons/user.svg"
                    alt="user"
                    width={34}
                    height={34}
                    className="object-contain"
                    />
                </Link>
            </div>
            <div className=" items-center justify-center gap-5 hidden md:flex">
                <div className='flex gap-2'>
                    <Link href='https://github.com/Akshat-Kumar-X' target='_blank'>
                        <button 
                            type='button' 
                            className='rounded-full font-semibold border-[#1e1e1e] border-2 bg-[#323232] py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black'
                        >
                            GitHub
                        </button>
                    </Link>
                    <Link href='https://www.linkedin.com/in/akshat-kumar-86203224a/' target='_blank'>
                        <button 
                            type='button' 
                            className='rounded-full font-semibold border-[#0A66C2] border-2 bg-[#0A66C2] py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-[#0A66C2]'
                        >
                            Linkedin
                        </button>
                    </Link>
                </div>
            </div>
            

        </nav>
    </header>
  )
}

export default Navbar