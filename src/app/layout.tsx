import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import {Providers} from "./providers";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"]});

export const metadata: Metadata = {
  title: "XYZ Corp.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {/* <Providers> */}
          <main className="max-w-4xl mx-auto p-4">
            <Header />
            {children}
          </main>
        {/* </Providers> */}
      </body>
    </html>
  );
}
