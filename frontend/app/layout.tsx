import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salão Delivery Maceió | Painel Admin',
  description: 'Painel administrativo para gestão de entregas e estoque',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased bg-[#0B0B0B] text-[#F9FAFB]">
        {children}
      </body>
    </html>
  )
}
