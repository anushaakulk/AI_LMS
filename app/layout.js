import localFont from "next/font/local";
import "./globals.css";
import {Outfit} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
export const metadata = {
};

const outfit = Outfit({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${outfit.variable} ${outfit.variable} antialiased`}
      >
        <Provider>
        {children}
        </Provider>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
