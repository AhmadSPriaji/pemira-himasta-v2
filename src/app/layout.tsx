import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avenue = localFont({
  display: "swap",
  src: "../../public/fonts/Avenue.otf",
  variable: "--font-avenue",
});

const futura = localFont({
  display: "swap",
  src: "../../public/fonts/Futura.ttf",
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: "Pemira Himasta",
  description: "Pemilihan Raya Himpunan Mahasiswa Statistika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${avenue.variable} ${futura.variable} h-full antialiased font-sans`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
