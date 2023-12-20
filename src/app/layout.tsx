import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Header2 from './components/Header2'
import '@fortawesome/fontawesome-free/css/all.min.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flight Aggrement Application',
  description: 'Flight Aggrement Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header><Header /></header>
        <header><Header2 /></header>
        <main>{children}</main>

      </body>
      
    </html>
  )
}
