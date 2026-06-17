import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "БілімЖол — Мектепке даярлық платформасы",
  description: "5-10 сынып оқушыларына арналған интерактивті оқу платформасы",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk">
      <body style={{ margin: 0, minHeight: '100vh' }}>{children}</body>
    </html>
  );
}
