import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.accessToken) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const dateFilter = searchParams.get('date')

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events${
        dateFilter ? `?timeMin=${dateFilter}T00:00:00Z&timeMax=${dateFilter}T23:59:59Z` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data.items || [])
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}