import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://melissa-cubillas-website-evan-projects2.vercel.app"),
  title: "Melissa Cubillas (MC) | International Psychic Medium",
  description:
    "Connect with Melissa Cubillas—international psychic medium, spiritual teacher and media personality—for private readings, live galleries, events and intuitive development.",
  openGraph: {
    title: "Melissa Cubillas (MC) | International Psychic Medium",
    description:
      "Messages from beyond. Clarity for the present. Connection to what matters most.",
    images: ["/melissa-headshot.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
