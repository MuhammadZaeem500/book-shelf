import type { Metadata } from "next";
import ClientLayout from "@/src/app/clientlayout";

export const metadata: Metadata = {
  title: "Book Shelf",
  description: "Track, review, and discover books with Book Shelf.",
  icons: {
    icon: "/vercel.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}