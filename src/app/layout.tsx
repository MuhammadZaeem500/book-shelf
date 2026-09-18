import type { Metadata } from "next";
import ClientLayout from "@/src/app/clientlayout";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/src/app/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}