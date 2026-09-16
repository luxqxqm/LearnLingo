import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import AuthProvider from "../providers/AuthProvider";
import FavoritesProvider from "../providers/FavoritesProvider";
import Header from "../components/Header/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Learn Lingo",
  description: "Learn Lingo",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
