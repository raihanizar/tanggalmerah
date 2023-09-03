import './globals.css'
import { Archivo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: 'Cek Tanggal Merah',
  description: 'Kapan tanggal merah terdekat? Cek di sini!',
  keywords: ['liburan', 'holiday', 'tanggal', 'merah', 'kalender', 'indonesia'],
  openGraph: {
    title: 'Cek Tanggal Merah',
    description: 'Kapan tanggal merah terdekat? Cek di sini!',
    images: [`${baseUrl}/og.png`],
    url: baseUrl,
    siteName: 'Cek Tanggal Merah',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cek Tanggal Merah',
    description: 'Kapan tanggal merah terdekat? Cek di sini!',
    images: [`${baseUrl}/og.png`]
  },
}

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  fallback: ['Segoe UI', 'Arial', 'sans-serif'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={archivo.className}>
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
