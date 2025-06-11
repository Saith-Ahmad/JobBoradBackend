// app/layout.tsx or app/RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localfont from "next/font/local"
import "./globals.css";

const Roca = localfont(
  {
    src: [
      { path: '../public/fonts/rocabold.ttf', weight: "700" }, 
    ],
    variable: '--font-roca',
  }
);

const RocaLight = localfont(
  {
    src: [
      { path: '../public/fonts/rocathin.ttf', weight: "800" }, 
    ],
    variable: '--font-rocathin',
  }
);

// Load Inter font with all weights
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



export const metadata: Metadata = {
  title: "Beyondhut",
  description: "Top Choice for Remote Talent Hiring and Management",
}




export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className={`${inter.variable} ${Roca.variable} ${RocaLight.variable} antialiased bg-white`}>
          
          {children}
        </body>
      </html>
  );
}
