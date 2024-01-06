"use client"
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { updateProductHearts } from '@/lib/actions';
import toast from 'react-hot-toast';

interface Props {
  productId: string;
  productHearts: number;
}

const Heart = ({ productId, productHearts }: Props) => {
  const [heart, setHeart] = useState(productHearts);
  const [isHeart, setIsHeart] = useState(() => {
    const storedIsHeart = window.localStorage.getItem(`HEART_BUTTON_${productId}`);
    return storedIsHeart !== null ? JSON.parse(storedIsHeart) : false;
  });

  // Get the initial likes count from local storage
  useEffect(() => {
    const storedHeartCount = window.localStorage.getItem(`HEART_COUNT_${productId}`);
    if (storedHeartCount !== null) {
      setHeart(parseInt(storedHeartCount, 10));
    } else {
      setHeart(productHearts);
    }
  }, [productId, productHearts]);

  const handleLike = async () => {
    try {
      const newIsHeart = !isHeart;
      const newHeartCount = newIsHeart ? heart + 1 : heart - 1;
  
      // Update the product hearts count
      await updateProductHearts(productId, newHeartCount);
  
      // Update the local state and storage
      setHeart(newHeartCount);
      setIsHeart(newIsHeart);
  
      // Update the likes count in local storage
      if (newIsHeart) {
      window.localStorage.setItem(`HEART_BUTTON_${productId}`, JSON.stringify(newIsHeart));
      toast(' Added a Like', {
        icon: '💕',
        style: {
          borderRadius: '10px',
          background: '#FFF0F0',
          color: '#D3656E',
        },
        duration: 2000,
      });
    } else {
      // If unliking the product, remove the likes count from local storage
      window.localStorage.removeItem(`HEART_BUTTON_${productId}`);
    }
      window.localStorage.setItem(`HEART_COUNT_${productId}`, newHeartCount.toString());
    } catch (error) {
      console.error('Error updating hearts count:', error);
    }
  };

  return (  
    <div 
      className={"product-hearts bg-[#FFF0F0] text-xl text-[#d3656e] hover:cursor-pointer hover:shadow-sm"} 
      onClick={handleLike}
    >
      {isHeart ? <FaHeart /> : <FaRegHeart />}
      <p className="text-base font-semibold text-[#d3656e] min-w-4">
        {heart}
      </p>
    </div>
  );
};

export default Heart;
