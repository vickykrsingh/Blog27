import Navbar from '../components/Navbar'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    <main className='bg-primary min-h-screen'>
        <Navbar/>
        {children}
        <ToastContainer position='bottom-right' autoClose={1000} />
    </main>
  )
}

export default MainLayout