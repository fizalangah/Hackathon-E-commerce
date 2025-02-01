import React from 'react'
import Header from './global-components/header/head'
import Homepage from './home/page'
import CategoryPage from './category/page'
import CartPage from './cart/page'


import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Footer from './global-components/footer'
// import { authOptions } from './api/[...nextauth]/route'
// import LoginForm from '../components/Loginform'
// import Loginpage from './login/page'

export default function Mainpage() {
  // const session = getServerSession(authOptions);
  // if (session) redirect("/")
    
  
  return (
    <div>
          <Homepage/>
          {/* <CategoryPage/>
          <CartPage/>
          <Footer />  */}

          {/* <Loginpage/> */}
        
    </div>
  )
}
