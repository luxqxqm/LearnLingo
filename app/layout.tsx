import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import AuthProvider from "../providers/AuthProvider";
import FavoritesProvider from "../providers/FavoritesProvider";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";

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
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                success: {
                  style: {
                    background: "#ffffff",
                    color: "#121417",
                    border: "1px solid #38cd3e",
                    borderRadius: "12px",
                  },
                },
              }}
            />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
