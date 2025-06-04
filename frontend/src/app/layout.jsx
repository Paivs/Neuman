import { UserProvider } from "@/core/UserContext";
import ThemeProvider from "@/core/ThemeProvider"
import { Toaster, toast } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RedirectProvider } from "@/lib/redirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neuman",
  description: "Seus documentos, sua gerência",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <RedirectProvider/>
            <Toaster />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
