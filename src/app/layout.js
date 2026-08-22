import "./globals.css"
import Providers from "@/components/Providers"

export const metadata = {
  title: "HRMS",
  description: "Human Resource Management System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
