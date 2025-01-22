'use client'

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
        console.error('Error fetching events:', error)
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        {error}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No events found for the selected date.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
