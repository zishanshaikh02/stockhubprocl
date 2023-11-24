import { Inter } from 'next/font/google'
import './globals.css'
// import { AuthProviders } from '@/Provider/TokenProvider'
 import { AuthProviders } from './Provider/TokenProvider'
 import Header from './components/header/Header'
 import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StockBoxPro',
  description: 'StockBoxPro app',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader/>
      <AuthProviders>
        {/* <Header/> */}
        <Header />
        {children}
      </AuthProviders>
      </body>
    </html>
  )
}
