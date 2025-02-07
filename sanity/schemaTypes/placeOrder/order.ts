export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'fullName', type: 'string', title: 'Full Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'address', type: 'string', title: 'Address' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'state', type: 'string', title: 'State' },
    { name: 'postalCode', type: 'string', title: 'Postal Code' },
    { name: 'phoneNumber', type: 'string', title: 'Phone Number' },
    { name: 'paymentMethod', type: 'string', title: 'Payment Method' },
    {
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array',
      of: [{ type: 'cartItem' }], // Use 'cartItem' as an object type
    },
  ],
};