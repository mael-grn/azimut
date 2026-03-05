import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";

const PoppinsFont = Poppins({
    weight: "500",
    variable: "--font-poppins"
});



export const metadata: Metadata = {
  title: "Azimut - login to maelg's lab projects",
  description: "Login to maelg's lab projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${PoppinsFont.variable} antialiased min-h-screen flex flex-col`}>
    <NavBar/>

    <main className="flex-1 flex flex-col pt-32 pb-32 px-12">
        {children}
    </main>
    </body>
    </html>
  );
}
