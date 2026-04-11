import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "মা ফার্নিচার | মানসম্পন্ন আসবাবপত্র",
  description: "মা ফার্নিচার - মানসম্পন্ন এবং আধুনিক ডিজাইনের আসবাবপত্র",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${hindSiliguri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
