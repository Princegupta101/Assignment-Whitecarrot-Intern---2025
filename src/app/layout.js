import { getServerSession } from 'next-auth'
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from 'next/headers'

import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/auth/SessionProvider'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Calendar Events App',
  description: 'View and filter your Google Calendar events',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}