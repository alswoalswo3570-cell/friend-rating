import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ToastHost from "@/components/Toast";
import { strings } from "@/lib/strings";
import { LocaleProvider } from "@/lib/locale";

const GA_ID = ""; // TODO: Friend-Rating GA4 ID 등록 후 채우기

export const metadata: Metadata = {
  title: strings["meta.title"].ko,
  description: strings["meta.description"].ko,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF6EC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Google AdSense — head에 위치해야 크롤러가 인식 */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8066414354831218"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans">
        <LocaleProvider>
          <div className="mobile-shell">{children}</div>
        </LocaleProvider>
        <ToastHost />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* Kakao AdFit */}
        <Script
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
