import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "My Little Prison",
  description: "Created out of my boredom, explore Daffa Athalla's codes showcased in a mini-game experience.",
  authors: [{ name: "The Promised Desire" }],
  keywords: ["Daffa Athallah", "Daffa'Athallah", "Muhammad Daffa Athallah' Rifqi", "My Little Prison Daffa", "My Little Prison"],
  creator: "Daffa' Athallah",
  themeColor: "#333333",
  verification: { google: "QxUv0RTXoyXKd6Q5sk7z4hXvYEbaFzpk0s_gOD0HI_M" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth no-scrollbar ${poppins.variable}`} style={{ height: "100%" }}>
      <body style={{ backgroundColor: "black" }}>{children}</body>
    </html>
  )
}
