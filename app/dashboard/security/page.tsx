import { FC } from 'react';
import { FaKey, FaLock, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa'; // React Icons

const SecurityPage: FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Account Security</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your security settings below to protect your account</p>
        </div>

        {/* Security Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Two-Factor Authentication */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaShieldAlt className="text-4xl text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Two-Factor Authentication</h3>
                <p className="text-gray-500">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition-all">Enable 2FA</button>
          </div>

          {/* Password Management */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaLock className="text-4xl text-green-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
                <p className="text-gray-500">Update your password for added protection.</p>
              </div>
            </div>
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-green-700 transition-all">Change Password</button>
          </div>

          {/* Login History */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaKey className="text-4xl text-orange-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Login History</h3>
                <p className="text-gray-500">View your recent login activities and sessions.</p>
              </div>
            </div>
            <button className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-md w-full hover:bg-orange-700 transition-all">View History</button>
          </div>

          {/* Account Recovery */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaKey className="text-4xl text-purple-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Account Recovery</h3>
                <p className="text-gray-500">Set up security questions for recovery.</p>
              </div>
            </div>
            <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition-all">Set Up Recovery</button>
          </div>

          {/* Email & Phone Verification */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaShieldAlt className="text-4xl text-yellow-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Email & Phone Verification</h3>
                <p className="text-gray-500">Verify your email and phone number for security.</p>
              </div>
            </div>
            <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-md w-full hover:bg-yellow-700 transition-all">Verify Now</button>
          </div>

          {/* Secure Logout */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaSignOutAlt className="text-4xl text-red-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Secure Logout</h3>
                <p className="text-gray-500">Log out from all active sessions to secure your account.</p>
              </div>
            </div>
            <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700 transition-all">Log Out Everywhere</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
