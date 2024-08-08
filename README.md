# Appointment Scheduler

## Getting Started

Create .env.local file in the root directory and add the content of .env.example file to it.

Then, run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features:

- User can register and login
- User can search and view another user
- User can book an appointment with another user
- User can optionally upload a recording file while booking an appointment
- User can view all appointments
- User can filter appointments by ''Upcoming'' and ''Past''
- User can accept/decline/cancel/delete an appointment
- User can switch from light mode to dark mode theme

## Tech Stack:

- Next.js
- Tailwind CSS
- NextAuth.js
- React Hook Form
- Redux, RTK Query
- Firebase Firestore, Authentication, and Storage
- React Testing Library, Jest

## Demo URL

[https://foys-appointment-scheduler.vercel.app/](https://foys-appointment-scheduler.vercel.app/)
