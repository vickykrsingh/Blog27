import React from 'react'
import { FaGoogle } from 'react-icons/fa'

function GoogleLogin() {
  return (
    <>
    <button className="w-full bg-white py-2 font-semibold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-200 duration-300"><span>Sign in with</span> <span><FaGoogle/></span></button>
    </>
  )
}

export default GoogleLogin