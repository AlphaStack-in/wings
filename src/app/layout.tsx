import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getSiteSettings } from "@/lib/services/site-settings";

const headingFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.default_meta_title ?? settings.school_name,
      template: `%s | ${settings.school_name}`,
    },
    description: settings.default_meta_description ?? undefined,
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-cream font-body text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header settings={settings} />
        <main id="main-content" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer settings={settings} />
        <WhatsAppButton
          whatsappNumber={settings.whatsapp}
          context="general"
          floating
          className="hidden lg:inline-flex"
        />
      </body>
    </html>
  );
}
