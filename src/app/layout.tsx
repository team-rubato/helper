import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helper",
  description: "소윤이 일 돕기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>{children}</body>
    </html>
  );
}
