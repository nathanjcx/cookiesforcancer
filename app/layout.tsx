import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cookiesforcancer.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cookies for Cancer",
  description:
    "Help fight cancer with cookies. Gifts go to the American Cancer Society.",
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
      "Help fight cancer with cookies. Gifts go to the American Cancer Society.",
    url: siteUrl,
    siteName: "Cookies for Cancer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies for Cancer",
    description:
      "Help fight cancer with cookies. Gifts go to the American Cancer Society.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6eee0",
  width: "device-width",
  initialScale: 1,
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
