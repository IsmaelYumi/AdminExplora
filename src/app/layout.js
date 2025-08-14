import "./globals.css";


export const metadata = {
  title: 'Admin Explora',
  description: 'Admin panel for managing Explora content',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body >{children}</body>
    </html>
  )
}
