import './globals.css'
import { Rubik } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  metadataBase: new URL(`${baseUrl}`),
  title: 'Cek Tanggal Merah',
  description: 'Kapan tanggal merah terdekat? Cek di sini!',
  keywords: ['liburan', 'holiday', 'tanggal', 'merah', 'kalender', 'indonesia'],
  openGraph: {
    title: 'Cek Tanggal Merah',
    description: 'Kapan tanggal merah terdekat? Cek di sini!',
    images: '/og.png',
    url: '/',
    siteName: 'Cek Tanggal Merah',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cek Tanggal Merah',
    description: 'Kapan tanggal merah terdekat? Cek di sini!',
    images: '/og.png'
  },
}

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  fallback: ['Segoe UI', 'Arial', 'sans-serif'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={rubik.className}>
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
