import React from 'react'

const Avatar = ({src, alt}) => {
  const defaultImg = '/default_image.avif';

  return (
    <img 
      src={src || defaultImg} 
      alt={alt} 
      className="w-10 h-10 rounded-full border border-gray-300" 
    />
  )
}

export default Avatar;
