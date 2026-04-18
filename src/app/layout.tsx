import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/store/Providers";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
