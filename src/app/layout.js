import './globals.css'
import { Archivo } from 'next/font/google'

export const metadata = {
  title: 'Kapan Tanggal Merah?',
  description: 'Situs untuk mengecek kapan tanggal merah terdekat di Indonesia.',
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
    </html>
  )
}
