"use client"
import Image from 'next/image'
import toast from 'react-hot-toast'

const BookMark = () => {
  const handleBookmarkClick = () => {

    toast.custom((t) => (
        <div
          className={`${
            
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Press <span className='font-mono text-red-400'>Ctrl</span> + <span className='font-serif text-red-400'>D</span> on Windows
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Press <span className='font-mono text-red-400'>Cmd</span> + <span className='font-serif text-red-400'>D</span> on Mac
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  For bookmarking this Product.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none  "
            >
              Close
            </button>
          </div>
        </div>
      ))
  }
  
  return (
    <div className="p-2 bg-white-200 rounded-10 hover:bg-blue-100 duration-150  hover:cursor-pointer hover:shadow-sm" onClick={handleBookmarkClick}>
        <Image 
            src="/assets/icons/bookmark.svg"
            alt="bookmark"
            width={20}
            height={20}
        />
    </div>
  )
}

export default BookMark;