import Footer from "../global-components/footer";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="fixed top-32 left-0 h-[calc(100vh-4rem)] w-64 md:bg-gradient-to-r md:from-gray-500 md:to-black bg-transparent text-white p-6 z-50 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4 overflow-y-auto mt-16">
        {/* Children content */}
        <div>{children}</div>
      </div>

      {/* Footer */}
      <div className="md:ml-64 p-4 bg-white z-40">
        <Footer />
      </div>
    </div>
  );
}