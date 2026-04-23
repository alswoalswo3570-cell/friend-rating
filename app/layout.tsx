import type { Metadata, Viewport } from "next";
import "./globals.css";
import ToastHost from "@/components/Toast";
import { strings } from "@/lib/strings";

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
      </head>
      <body className="font-sans">
        <div className="mobile-shell">{children}</div>
        <ToastHost />
      </body>
    </html>
  );
}
