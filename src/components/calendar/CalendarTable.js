'use client'

import { AlertTriangle, CheckCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import EventRow from './EventRow'

export default function CalendarTable({ dateFilter }) {
  const { data: session } = useSession()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEvents() {
      if (!session?.accessToken) return

      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/calendar?date=${dateFilter || ''}`)
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        setError('Failed to load calendar events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [session, dateFilter])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-red-600">
        <AlertTriangle className="w-10 h-10 mb-3" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-500">
        <CheckCircle className="w-10 h-10 mb-3 text-gray-300" />
        <p className="text-lg font-medium">No events found for the selected date.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Event Name</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Time</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
