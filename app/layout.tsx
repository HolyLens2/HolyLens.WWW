import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HolyLens | AI Medical Devices",
  description:
    "HolyLens combines artificial intelligence with medical imaging and acoustic technologies for earlier, more accessible health insights.",
  icons: {
    icon: "/assets/img/logos/logo_fav.jpg",
    shortcut: "/assets/img/logos/logo_fav.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
