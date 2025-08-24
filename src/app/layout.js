import { Inter } from "next/font/google";
import "./globals.css";
import Transitionprovider from "./components/transitionprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rishab Jain",
  description: "Rishab Jain- Portfolio",
  icons: {
    icon: "/favicon.ico",  // or "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Transitionprovider>{children}</Transitionprovider>
        </body>
    </html>
  );
}
