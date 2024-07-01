import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WP Kindle - The Name of Trust & Professionalism",
  description: "The Name of Trust & Professionalism",
};

const BASE_URL = "https://app.chatwoot.com";

const scriptInnerHTML = `
  (function(d,t) {
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src="${BASE_URL}/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: '4ebe3BrLMjQYYfxnzJXNU6Fi',
        baseUrl: "${BASE_URL}"
      })
    }
  })(document,"script");
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Script
          defer
          async
          src="https://cdn.trustindex.io/loader-cert.js?fab0a62145895820b996f0cf302"
        />

        <script dangerouslySetInnerHTML={{ __html: scriptInnerHTML }} />
      </body>
    </html>
  );
}
