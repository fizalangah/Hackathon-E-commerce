import React from 'react'
import Header from './global-components/header/head'
import Homepage from './home/page'
import CategoryPage from './category/page'
import CartPage from './cart/page'

function Mainpage() {
  return (
    <div>

  <Homepage/>
  <CategoryPage/>
  <CartPage/>
        
    </div>
  )
}

export default Mainpage