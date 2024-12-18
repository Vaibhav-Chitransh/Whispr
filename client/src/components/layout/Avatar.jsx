import React from 'react'

const Avatar = ({src, alt}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-10 h-10 rounded-full border border-gray-300" 
    />
  )
}

export default Avatar
