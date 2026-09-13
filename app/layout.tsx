import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melissa Cubillas | Psychic Medium & Spiritual Teacher",
  description:
    "Connect, heal, and discover what lies beyond with international psychic medium and spiritual teacher Melissa Cubillas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
