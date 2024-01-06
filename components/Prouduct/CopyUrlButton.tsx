
"use client"

import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast';

const CopyUrlButton = () => {

  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Url copied to clipboard')
      }).catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
    } else {
      console.warn('Clipboard API not supported');
    }
  };

  return (
    <div className="p-2 bg-white-200 rounded-10 hover:bg-blue-100 duration-150  hover:cursor-pointer hover:shadow-sm" onClick={handleClick}>
      <Image 
        src="/assets/icons/share.svg"
        alt="bookmark"
        width={20}
        height={20}
      />
    </div>
  )
}

export default CopyUrlButton