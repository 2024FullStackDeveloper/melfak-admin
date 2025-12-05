import "./globals.css";
import React from "react";
import localFont from "next/font/local";
import { GlobalLayoutProps } from "@/types/Core";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getServerLocaleOptions } from "@/lib/serverUtils";
import { ThemeProvider } from "@/contexts/themeContext";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import OverlayShow from "@/components/OverlayShow";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Footer from "@/components/core/Footer";

const tajwal = localFont({
  src: [
    {
      path: "../../../../public/fonts/Tajawal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Tajawal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Tajawal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tajwal",
  display: "swap",
});

export const metadata = {
  title: "عزانكو",
  description:
    "Azzanco Dashboard  ,  عزانكو خدمات  , إدارة عزانكو , Azzanco Admin ",
};

export default async function RootLayout({
  children,
  params,
}: GlobalLayoutProps<{ locale: string }>) {
  const { locale } = await params;
  const messages = await getMessages();
  const { dir, isRtl } = await getServerLocaleOptions();

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`min-h-screen w-full ${tajwal.className} antialiased overflow-x-hidden relative`}
      >
        <ThemeProvider defaultTheme="dark">
          <React.StrictMode>
            <ReactQueryProvider>
              <NextIntlClientProvider messages={messages}>
                <AuthProvider>
                  <div className="min-h-screen w-full relative">
                    <OverlayShow />
                    <main className="flex-2">
                      <div className="min-h-screen w-full">{children}</div>
                    </main>
                  </div>
                  <Toaster
                    richColors
                    theme="light"
                    closeButton
                    dir={isRtl ? "rtl" : "ltr"}
                    position={isRtl ? "top-right" : "top-left"}
                  />
                </AuthProvider>
              </NextIntlClientProvider>
            </ReactQueryProvider>
          </React.StrictMode>
        </ThemeProvider>
      </body>
    </html>
  );
}
