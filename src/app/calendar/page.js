'use client'

import { Calendar as CalendarIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import CalendarTable from '@/components/calendar/CalendarTable'
import DateFilter from '@/components/calendar/DateFilter'

export default function CalendarPage() {
  const { data: session, status } = useSession()
  const [dateFilter, setDateFilter] = useState('')

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="animate-spin text-blue-500 w-8 h-8" />
          <span className="text-lg text-gray-700 font-medium">Loading...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-white">
            <h1 className="text-2xl font-bold">My Calendar</h1>
            <DateFilter value={dateFilter} onChange={setDateFilter} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CalendarTable dateFilter={dateFilter} />
      </main>
    </div>
  )
}
