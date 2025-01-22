# Calendar Events App

A Next.js application that displays Google Calendar events with filtering capabilities.

## VIDEO 

https://youtu.be/46swQchnQtw

## Features

- Google SSO Authentication
- Calendar events display
- Date filtering
- Responsive design
- Error handling
- Loading states

## Setup

1. Clone the repository
```bash
git@github.com:Princegupta101/Assignment-Whitecarrot-Intern---2025.git
```
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 13+ (App Router)
- React
- NextAuth.js
- Tailwind CSS
- Google Calendar API

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # React components
├── lib/               # Configuration files
└── utils/             # Utility functions
```

