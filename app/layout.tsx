import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://llm-system-lab.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "LLM System Lab",
    template: "%s | LLM System Lab",
  },
  description:
    "LLM 시스템의 전체 흐름을 개념 학습, 시스템 맵, 인터랙티브 실험으로 배우는 교육 플랫폼",
  keywords: [
    "LLM",
    "Transformer",
    "RAG",
    "Embedding",
    "Attention",
    "AI 교육",
    "시스템 아키텍처",
  ],
  authors: [{ name: "LLM System Lab" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "LLM System Lab",
    description:
      "LLM 시스템의 전체 흐름을 개념 학습, 시스템 맵, 인터랙티브 실험으로 배우는 교육 플랫폼",
    url: siteUrl,
    siteName: "LLM System Lab",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM System Lab",
    description:
      "LLM 시스템의 전체 흐름을 개념 학습, 시스템 맵, 인터랙티브 실험으로 배우는 교육 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t==null&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
