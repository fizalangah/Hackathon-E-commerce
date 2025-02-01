// import Sidebar from "./_components/sidebar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className=" fixed top-32  bottom-32 mb-10 left-0 z-50 w-64 md:bg-gradient-to-r md:from-gray-500 md:to-black bg-transparent text-white h-screen p-6">
//   <Sidebar />
// </div>

  
//         {/* Main content */}
//         <div className="flex-1 md:ml-64 mt-16 p-4 overflow-y-auto">
//           {/* Children content */}
//           <div>{children}</div>
//         </div>
//       </div>
//     );
// }
import Footer from "../global-components/footer";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-32 left-0 h-[calc(100vh-4rem)] w-64 md:bg-gradient-to-r md:from-gray-500 md:to-black bg-transparent text-white p-6 z-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4 overflow-y-auto">
        {/* Children content */}
        <div>{children}</div>
      </div>

      {/* Footer */}
      <div className="lg:ml-64 p-4 bg-white z-40">
        <Footer/>
      </div>
       {/* Hide Root Footer */}
       {/* <style jsx global>{`
        .root-footer {
          display: none;
        }
      `}</style> */}
    </div>
  );
}