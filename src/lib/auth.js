import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig = {
    providers: [],
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken
        return session
      },
    },
    pages: {
      signIn: '/',
    },
  }

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/',
  },
}
  export async function getGoogleCalendarEvents(accessToken, dateFilter) {
    const timeMin = dateFilter ? `${dateFilter}T00:00:00Z` : new Date().toISOString()
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}`
    
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch calendar events')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }