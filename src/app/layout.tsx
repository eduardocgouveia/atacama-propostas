import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Atacama Propostas",
  description: "Plataforma de propostas comerciais da Atacama Digital",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${interTight.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-black text-white font-[family-name:var(--font-inter-tight)]">
        {children}
      </body>
    </html>
  )
}
