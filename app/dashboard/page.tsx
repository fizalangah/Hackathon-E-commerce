// "use client";
// import { client } from "@/sanity/lib/client";
// import { useState, useEffect } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import TruncateDescription from "@/components/globalComponents/truncateDescription";
// import Link from "next/link";
// import Image from "next/image";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   address: string;
//   role: string;
// }

// export default function UserInfo() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [users, setUsers] = useState<User[]>([]);

//   // Function to fetch users
//   async function getAllUsers() {
//     try {
//       const res = await fetch("/api/users");
//       const data = await res.json();
//       console.log("Fetched data:", data);

//       if (Array.isArray(data.users)) {
//         setUsers(data.users);
//       } else {
//         console.error("Unexpected data format:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   useEffect(() => {
//     const query = `*[_type == "product"]{
//       _id,
//       title,
//       description,
//       productImage{
//         asset->{
//           _id,
//           url
//         }
//       },
//       price,
//       tags,
//       dicountPercentage,
//       isNew
//     }`;

//     client
//       .fetch(query)
//       .then((data) => {
//         setProducts(data.slice(0, 4));
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const { data: session } = useSession();
//   const router = useRouter();

//   if (!session) {
//     return <div className="grid place-items-center h-screen">Loading...</div>;
//   }

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.push("/auth/sign-in");
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("chechoutRoute");
//     }
//   };

//   const user = users.find((user) => user.email === session.user?.email);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-yellow-700 text-white shadow-lg p-6">
//         <h2 className="text-3xl font-semibold text-center text-white mb-12">Dashboard</h2>
//         <div className="space-y-4">
//           <Link href="/dashboard" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Profile
//           </Link>
//           <Link href="/orders" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Order History
//           </Link>
//           <Link href="/security" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Security
//           </Link>
//           <Link href="/billing" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Billing Address
//           </Link>
//           <Link href="/payment" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Payment Methods
//           </Link>
//           <Link href="/templates" className="text-xl text-white hover:bg-yellow-600 px-4 py-2 rounded-md block">
//             Templates
//           </Link>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-10">
//         {/* Header */}
//         <div className="mb-12 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold text-gray-800">
//               Welcome, {session.user?.name || "Valued Customer"}
//             </h1>
//             <p className="text-xl text-gray-600 mt-2">Explore Our Latest Products and Offers</p>
//           </div>
//           <div>
//             <button
//               onClick={handleLogout}
//               className="bg-yellow-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-600 transition duration-300"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>

//         {/* Profile, Order History, Security, Billing, Payment, and Template Blocks */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
//           {/* Profile Section */}
//           <div className="bg-white p-8 shadow-xl rounded-2xl">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
//             <div className="text-lg text-gray-700">
//               <div><strong className="font-semibold text-gray-900">Name:</strong> {user?.name}</div>
//               <div><strong className="font-semibold text-gray-900">Email:</strong> {user?.email}</div>
//               <div><strong className="font-semibold text-gray-900">Phone:</strong> {user?.phoneNumber || "Not Provided"}</div>
//             </div>
//           </div>

//           {/* Order History Section */}
//           <div className="bg-white p-8 shadow-xl rounded-2xl">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Order History</h2>
//             <div className="text-lg text-gray-700">
//               <div className="mb-4"><div className="font-semibold">Order #12345</div><div className="text-gray-500">Status: Shipped</div><div className="text-gray-500">Total: $350</div></div>
//               <div className="mb-4"><div className="font-semibold">Order #12346</div><div className="text-gray-500">Status: Delivered</div><div className="text-gray-500">Total: $199</div></div>
//             </div>
//           </div>

//           {/* Security Section */}
//           <div className="bg-white p-8 shadow-xl rounded-2xl">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login & Security</h2>
//             <div className="text-lg text-gray-700">
//               <div><strong className="font-semibold text-gray-900">Change Password:</strong></div>
//               <button className="text-blue-600 hover:underline">Change Password</button>
//             </div>
//           </div>

//          {/* Addresses Section */}
//         <div className="bg-white p-8 shadow-xl rounded-2xl">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Addresses</h2>
//           <div className="text-lg text-gray-700">
//             <div className="mb-4">
//               <div className="font-semibold">Home Address</div>
//               <div className="text-gray-500">123 Main St, Springfield, IL 62701</div>
//             </div>
//             <div className="mb-4">
//               <div className="font-semibold">Work Address</div>
//               <div className="text-gray-500">456 Oak St, Springfield, IL 62702</div>
//             </div>
//             <div className="mb-4">
//               <div className="font-semibold">Vacation Home</div>
//               <div className="text-gray-500">789 Pine St, Miami, FL 33101</div>
//             </div>
//           </div>
//         </div>

//           {/* Payment Methods Section */}
//           <div className="bg-white p-8 shadow-xl rounded-2xl">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Payment Methods</h2>
//             <div className="text-lg text-gray-700">
//               <div><strong className="font-semibold text-gray-900">Credit Card:</strong> Ending in 1234</div>
//               <div><strong className="font-semibold text-gray-900">Paypal:</strong> Connected</div>
//               <button className="text-blue-600 hover:underline">Update Payment Methods</button>
//             </div>
//           </div>

//           {/* Templates Section */}
//           <div className="bg-white p-8 shadow-xl rounded-2xl">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Templates</h2>
//             <div className="text-lg text-gray-700">
//               <div><strong className="font-semibold text-gray-900">Current Template:</strong> Template A</div>
//               <div><strong className="font-semibold text-gray-900">Change Template:</strong></div>
//               <button className="text-blue-600 hover:underline">Select Template</button>
//             </div>
//           </div>
//         </div>

//         {/* Products & Offers Section */}
//         <div className="bg-white p-8 shadow-xl rounded-2xl w-full mb-10">
//           <h2 className="text-2xl text-yellow-600 font-bold text-center mb-8">Our Exclusive Offers</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition-all duration-300 ease-in-out">
//                   <div className="relative w-full h-60">
//                     <Image
//                       src={product.productImage?.asset?.url}
//                       alt={product.title}
//                       width={100}
//                       height={100}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white ${
//                       product.isNew ? "bg-green-500" : product.dicountPercentage ? "bg-red-500" : "bg-yellow-500"
//                     }`}>
//                       {product.isNew ? <span>New</span> : <span>{product.dicountPercentage}%</span>}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h3>
//                     <TruncateDescription description={product.description} lines={3} />
//                     <p className="text-xl font-semibold text-gray-800 mb-4">${product.price}</p>
//                   </div>
//                   <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center">
//                     <button className="py-2 px-4 bg-white text-yellow-600 rounded-lg hover:underline transition-colors mb-4">
//                       <Link href={`/products/${product._id}`}>View Product</Link>
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500">No products available at the moment.</div>
//             )}
//           </div>

//           <div className="text-center mt-14">
//             <Link
//               href="/products"
//               className="bg-yellow-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-600 transition duration-300"
//             >
//               Explore More Products
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { client } from  "../../sanity/lib/client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import User from "../models/schema";
// import TruncateDescription from "@/components/globalComponents/truncateDescription";
import Link from "next/link";
import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";
// import Loader from "@/components/loader/loader";
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export default function UserInfo() {
  const [products, setProducts] = useState<any[]>([]);
  console.log(products,"products");
  
  const [users, setUsers] = useState<User[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to fetch users
  async function getAllUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

 useEffect(() => {
     const fetchProducts = async () => {
       try {
         const products = await client.fetch(`
           *[_type == "products"]{
             _id,
             name,
             price,
             description,
             "imageUrl": image.asset->url,
             category,
             discountPercent,
             new,
             colors,
             sizes
           }
         `);
        setProducts(products.slice(4, 8));
         console.log(products,"data");
         
       } catch (error) {
         console.error("Error fetching products:", error);
       }
     };
 
     fetchProducts();
   }, []);

  

  const { data: session } = useSession();
  const router = useRouter();

//   if (!session) {
//     return <div className="grid place-items-center h-screen"><Loader/></div>;
//   }
console.log(products,"products");

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/sign-in");
    if (typeof window !== "undefined") {
      localStorage.removeItem("chechoutRoute");
    }
  };

  const user = users.find((user) => user.email === session?.user?.email);

  return (
    <div className="flex min-h-screen bg-gray-100">
    
     

      {/* Main content */}
      <div className="flex-1 ">
        {/* Mobile Menu Toggle Button */}
       
        {/* Header */}
        <div className="mb-20  mt-10 flex justify-center items-center text-center">
          <div>
          <h1 className="md:text-3xl text-2xl text-center  justify-center items-center font-semibold text-black">
              Welcome, {session?.user?.name || "Valued Customer"}
            </h1>
            <p className=" text-center md:text-start text-gray-400 mt-2">Explore Our Latest Products and Offers</p>
          </div>
         

          
        </div>

        <div className="flex flex-col gap-12 mb-10  justify-center items-center text-center">
          {/* Profile Section */}
          <div className="bg-white p-4 shadow-xl rounded-2xl h-[200px] lg:w-[500px] w-[300px]">
            <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Sales</h2>
            {/* <div className="text-sm text-gray-700">               <div><strong className="font-semibold text-gray-900">Name:</strong> {user?.name}</div>
               <div><strong className="font-semibold text-gray-900">Email:</strong> {user?.email}</div>
               <div><strong className="font-semibold text-gray-900">Phone:</strong> {user?.phoneNumber || "Not Provided"}</div>
             </div> */}
             <h2 className="font-bold text-2xl"><span className="text-yellow-500">15%</span><span className="text-red-600">Off</span></h2>
             <Link href={""}>go And get</Link>
           </div>
          

           {/* Order History Section */}
           <div className="bg-white  p-4 shadow-xl rounded-2xl h-[200px]  lg:w-[500px] w-[300px]">
             <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Explore New Brands</h2>
             {/* <div className="text-sm text-gray-700 flex gap-5">
               <div className="mb-2"><div className="font-semibold">Order #12345</div><div className="text-gray-500">Status: Shipped</div><div className="text-gray-500">Total: $350</div></div>
               <div className="mb-2"><div className="font-semibold">Order #12346</div><div className="text-gray-500">Status: Delivered</div><div className="text-gray-500">Total: $199</div></div>
             </div> */}
              <h2  className="text-xl font-bold ">eXplore nEw bRands hEre</h2>
           </div>

           {/* Security Section */}
           {/* <div className="bg-white p-4 shadow-xl rounded-2xl h-[200px]  w-[500px]">
             <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Login & Security</h2>
             <div className="text-sm text-gray-700">
               <div><strong className="font-semibold text-gray-900">Change Password:</strong></div>
               <button className="text-blue-600 hover:underline">Change Password</button>
             </div>
           </div> */}

          {/* Addresses Section */}
         {/* <div className="bg-white p-4 shadow-xl rounded-2xl h-[200px]  w-[500px]">
           <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Addresses</h2>
           <div className="text-sm text-gray-700 flex flex-row">
             <div className="mb-2">
               <div className="font-semibold">Home Address</div>
               <div className="text-gray-500">123 Main St, Springfield, IL 62701</div>
             </div>
             <div className="mb-2">
               <div className="font-semibold">Work Address</div>
               <div className="text-gray-500">456 Oak St, Springfield, IL 62702</div>
             </div>
             <div className="mb-2">
               <div className="font-semibold">Vacation Home</div>
               <div className="text-gray-500">789 Pine St, Miami, FL 33101</div>
             </div>
           </div>
         </div> */}

           {/* Payment Methods Section */}
           {/* <div className="bg-white p-4 shadow-xl rounded-2xl h-[200px]  w-[500px]">
             <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Payment Methods</h2>
             <div className="text-sm text-gray-700">
               <div><strong className="font-semibold text-gray-900">Credit Card:</strong> Ending in 1234</div>
               <div><strong className="font-semibold text-gray-900">Paypal:</strong> Connected</div>
               <button className="text-blue-600 hover:underline">Update Payment Methods</button>
             </div>
           </div> */}

           {/* Templates Section */}
           <div className="bg-white p-4 shadow-xl rounded-2xl h-[200px]  lg:w-[500px] w-[300px]">
             <h2 className="text-2xl font-bold text-center text-red-400 mb-6">Templates</h2>
             <div className="text-sm text-gray-700">
               <div><strong className="font-semibold text-gray-900">Current Template:</strong> Template A</div>
               <div><strong className="font-semibold text-gray-900">Change Template:</strong></div>
               <button className="text-blue-600 hover:underline">Select Template</button>
             </div>
           </div>
         </div>


        {/* Products & Offers Section */}
        <div className="bg-white p-4 shadow-xl rounded-2xl ">
          <h2 className="text-2xl text-black font-bold text-center mb-8">Our Exclusive Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                  <div className="relative w-full h-60">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                    {/* <div className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white ${product.isNew ? "bg-green-500" : product.dicountPercentage ? "bg-red-500" : "bg-yellow-500"}`}>
                      {product.isNew ? <span>New</span> : <span>{product.dicountPercentage}%</span>}
                    </div> */}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h3>
                    {/* <TruncateDescription description={product.description} lines={3} /> */}
                    <p className="text-xl font-semibold text-gray-800 mb-4">${product.price}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center">
                    <button className="py-2 px-4 bg-black text-white rounded-lg mb-4">
                    <Link href={`/category/${product._id}`}>product Detail</Link>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No products available at the moment.</div>
            )}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/category"
              className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-black transition duration-300"
            >
              Explore More 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
