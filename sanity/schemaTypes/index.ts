import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import order from './placeOrder/order'

  import items from './placeOrder/cartItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,order,items]
}


