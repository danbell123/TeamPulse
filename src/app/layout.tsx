import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeamPulse",
  description: "Using SurveyJS and AG Charts/Grids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/survey-core/survey-core.min.css" type="text/css" rel="stylesheet"></link>
        <script type="text/javascript" src="https://unpkg.com/survey-core/survey.core.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/survey-core/themes/contrast-dark.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/survey-core/themes/contrast-light.min.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
