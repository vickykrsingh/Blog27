import Navbar from '../components/Navbar'
import React from 'react'

function MainLayout({children}) {
  return (
    <main className='bg-primary min-h-screen'>
        <Navbar/>
        {children}
    </main>
  )
}

export default MainLayout