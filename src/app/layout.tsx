import type { Metadata } from "next";
import ClientLayout from "@/src/app/clientlayout";

export const metadata: Metadata = {
  title: "Book Shelf",
  description: "Track, review, and discover books with Book Shelf.",

  icons: {
    icon: "/vercel.svg",
  },

  openGraph: {
    title: "Book Shelf",
    description: "Track, review, and discover books with Book Shelf.",
    url: "/vercel.svg",
    siteName: "Book Shelf",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Book Shelf - Track, review, and discover books",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Shelf",
    description: "Track, review, and discover books with Book Shelf.",
    images: ["/vercel.svg"],
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