// pages/payment-methods.tsx

import { FC } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from 'react-icons/fa'; // Import icons from React Icons

const PaymentMethods: FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Payment Methods</h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Choose your preferred payment method from the following options:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Credit Card Option */}
        <div className="bg-slate-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200">
          <FaCreditCard className="text-4xl text-blue-800 mb-6 mx-auto" />
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Credit/Debit Card</h2>
          <p className="text-center text-gray-500">
            Secure payments via Visa, MasterCard, and more.
          </p>
        </div>

        {/* PayPal Option */}
        <div className="bg-slate-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200">
          <FaPaypal className="text-4xl text-green-800 mb-6 mx-auto" />
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">PayPal</h2>
          <p className="text-center text-gray-500">
            Use your PayPal account for fast and secure transactions.
          </p>
        </div>

        {/* Cash on Delivery Option */}
        <div className="bg-slate-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200">
          <FaMoneyBillWave className="text-4xl text-gray-800 mb-6 mx-auto" />
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Cash on Delivery</h2>
          <p className="text-center text-gray-500">
            Pay for your order with cash when it arrives at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
