import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import LoginButton from '@/components/auth/LoginButton'

export default async function Home() {
  const session = await getServerSession()
  
  if (session) {
    redirect('/calendar')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Calendar Events App
        </h1>
        <LoginButton />
      </div>
    </main>
  )
}