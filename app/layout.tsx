import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./global-components/header/head";
import Footer from "./global-components/footer";
import Navbar from "./global-components/header/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >  <Header/>
      <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
