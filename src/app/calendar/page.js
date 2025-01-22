'use client'

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/')
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Calendar Events</h1>
      <div className="mb-4">
        <DateFilter value={dateFilter} onChange={setDateFilter} />
      </div>
      <CalendarTable dateFilter={dateFilter} />
    </main>
  )
}