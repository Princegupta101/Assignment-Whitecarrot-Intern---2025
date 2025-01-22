import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import LoginButton from '@/components/auth/LoginButton'

export default async function Home() {
  const session = await getServerSession()
  
  if (session) {
    redirect('/calendar')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Calendar Events App
            </h1>
            <p className="text-gray-600 mb-8 ">
              Connect with Google Calendar to manage your schedule efficiently
            </p>
            <LoginButton />
          </div>
        </div>
      </div>
    </main>
  )
}