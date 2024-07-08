import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Questify - Waitlist",
  description: "Questify is an app that uses ai to help people pursue their hobby.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<Toaster /></body>
    </html>
  );
}
