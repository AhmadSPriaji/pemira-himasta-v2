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
  metadataBase: new URL("https://pemira-himasta.netlify.app"),
  title: {
    default: "Pemira Himasta UGM",
    template: "%s | Pemira Himasta UGM",
  },
  description: "Pemilihan Raya Himpunan Mahasiswa Statistika UGM (Pemira Himasta) untuk memilih Ketua Himpunan dan perwakilan mahasiswa terbaik.",
  keywords: ["Pemira", "Himasta", "UGM", "Statistika", "Pemilihan Raya", "Himasta UGM"],
  authors: [{ name: "HIMASTA UGM" }],
  creator: "HIMASTA UGM",
  publisher: "HIMASTA UGM",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pemira-himasta.netlify.app",
    title: "Pemira Himasta UGM",
    description: "Pemilihan Raya Himpunan Mahasiswa Statistika UGM (Pemira Himasta) untuk memilih Ketua Himpunan dan perwakilan mahasiswa terbaik.",
    siteName: "Pemira Himasta UGM",
    images: [
      {
        url: "/landing/Himasta Warna.png",
        width: 800,
        height: 800,
        alt: "Logo Himasta UGM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pemira Himasta UGM",
    description: "Pemilihan Raya Himpunan Mahasiswa Statistika UGM (Pemira Himasta) untuk memilih Ketua Himpunan dan perwakilan mahasiswa terbaik.",
    images: ["/landing/Himasta Warna.png"],
  },
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
