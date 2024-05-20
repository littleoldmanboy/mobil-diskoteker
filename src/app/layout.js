import { Inter } from "next/font/google";
import "./globals.css";
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title || "Mobil-Diskoteker",
    description: settings.data.meta_description || "Udforsk geografiske lister og find de bedste mobildiskoteker og DJ's i Danmark - perfekt til dit næste arrangement",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <div className="fixed bg-darkGray inset-0 -z-10" />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
