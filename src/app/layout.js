import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
export const metadata = {
  title: 'Admin Explora',
  description: 'Admin panel for managing Explora content',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
