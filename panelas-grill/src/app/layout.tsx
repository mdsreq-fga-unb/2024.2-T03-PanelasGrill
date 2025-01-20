"use client";

import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import "./globals.css";

const mainFontFamily = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const metadata = {
  title: "Panelas Grill",
  description: "Sistema de gerenciamento de restaurante",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="pt-br">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={mainFontFamily.className}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
