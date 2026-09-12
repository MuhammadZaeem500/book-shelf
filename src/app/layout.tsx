import type { Metadata } from "next";
import ClientLayout from "@/src/app/clientlayout";
import { ThemeProvider } from "@/src/app/providers/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
        <ClientLayout>{children}</ClientLayout></ThemeProvider>
      </body>
    </html>
  );
}