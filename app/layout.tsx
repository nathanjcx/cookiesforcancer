import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cookiesforcancer.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cookies for Cancer",
  description:
    "Help fight cancer with cookies. Most gifts go to the New York Cancer Foundation.",
  applicationName: "Cookies for Cancer",
  keywords: [
    "donate",
    "cancer",
    "cookies for cancer",
    "Apple Pay",
    "Google Pay",
    "charity",
  ],
  openGraph: {
    title: "Cookies for Cancer",
    description:
      "Help fight cancer with cookies. Most gifts go to the New York Cancer Foundation.",
    url: siteUrl,
    siteName: "Cookies for Cancer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cookies for Cancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies for Cancer",
    description:
      "Help fight cancer with cookies. Most gifts go to the New York Cancer Foundation.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/cookie.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6eee0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700&family=Lora:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
