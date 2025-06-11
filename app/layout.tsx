// app/layout.tsx or app/RootLayout.tsx
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Beyondhut",
  description: "Top Choice for Remote Talent Hiring and Management",
}




export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className={`antialiased bg-white`}>
          
          {children}
        </body>
      </html>
  );
}
