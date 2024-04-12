import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/prismicio";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("settings");
  return {
    title: page.data.site_title || "Mobil-Diskoteker",
    description: page.data.meta_description || "Udforsk geografiske lister og find de bedste mobildiskoteker og DJ's i Danmark - perfekt til dit næste arrangement",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
