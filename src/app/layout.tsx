import "../app/globals.css";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import RightSidebar from "./components/home/HomePageSideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] min-h-screen text-[#1A1817] flex flex-col">
        <Navbar />

        <div className="flex flex-1 relative max-w-8xl mx-auto w-full">
          <Sidebar />

          <main className="flex-1  min-w-0 border borderleft-[#EFE8DF]">
            {children}
          </main>

          <div className="bg-[#F2EDE5]">
            {" "}
            <RightSidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
