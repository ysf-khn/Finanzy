import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// const inter = Inter({ subsets: ["latin"] });
const lato = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Finanzy | Personalized Expense Management",
  description:
    "Finanzy helps you personalize your budget, completely your way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "bg-green-500 hover:bg-green-600",
          footerActionLink: "text-green-500 hover:text-green-600",
        },
      }}
    >
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
