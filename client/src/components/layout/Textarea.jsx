import { MessageCircleMore } from 'lucide-react'
import React from 'react'

const Textarea = () => {
  return (
    <div className="text-area flex flex-col items-center justify-center h-full w-3/4 bg-white">
      <MessageCircleMore size={72} className="animate-bounce" />
      <h1 className='font-bold text-3xl m-2'>Welcome to Whispr!</h1>
      <p className="text-gray-500 text-center">
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  )
}

export default Textarea
