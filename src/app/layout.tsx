import "../app/globals.css";
import Sidebar from "../app/sidebar/page";
import Navbar from "../app/navbar/page";
import RightSidebar from "./right-sidebar/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

    <div className="bg-[#ffffff]">
      <body className="bg-[#FFFFFF] min-h-screen text-[#1A1817] flex flex-col">
        {/* Full-width Navbar */}
        <Navbar />

        {/* Content Area containing Left Sidebar, Main Page, and Right Sidebar */}
        <div className="flex flex-1 relative max-w-8xl mx-auto w-full">
          {/* Left persistent sidebar */}
          <Sidebar />

          {/* Center Main Content */}
          <main className="flex-1 lg:pl-24 pb-20 lg:pb-8 min-w-0 border borderleft-[#EFE8DF]">
            {children}
          </main>

<div className="bg-[#ffffff]">          <RightSidebar />
</div>
        </div>
      </body>
      </div>
    </html>
  );
}