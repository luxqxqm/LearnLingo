# Learn Lingo

Learn Lingo is a web application for finding English teachers and booking trial lessons.

Users can browse teachers, filter them by language, level and price, add teachers to favorites, and book a trial lesson.

## Features

- User registration and login with Firebase Authentication
- User logout
- Teachers list loaded from Firebase Realtime Database
- Pagination with "Load more"
- Filter teachers by:
  - Language
  - Student level
  - Price per hour
- Add and remove teachers from favorites
- Favorites persist after page reload
- Private Favorites page for authenticated users
- Teacher details with "Read more"
- Teacher reviews and experience information
- Trial lesson booking form
- Form validation with React Hook Form and Yup
- Modal closing with:
  - Close button
  - Backdrop click
  - Escape key
- Responsive interface

## Technologies

- Next.js
- React
- TypeScript
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup
- @hookform/resolvers
- Next Image
- ESLint

## Project Structure

```text
learn-lingo/
├── app/
│   ├── favorites/
│   │   └── page.tsx
│   ├── teachers/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AuthModal/
│   ├── BookingModal/
│   ├── Filters/
│   ├── Header/
│   ├── TeacherCard/
│   └── TeacherList/
│
├── hooks/
│   ├── useAuth.ts
│   └── useTeachers.ts
│
├── lib/
│   ├── firebase.ts
│   ├── filterTeachers.ts
│   └── teachers.ts
│
├── providers/
│   ├── AuthProvider.tsx
│   └── FavoritesProvider.tsx
│
├── schemas/
│   ├── authSchema.ts
│   └── bookingSchema.ts
│
├── types/
│   ├── auth.ts
│   ├── booking.ts
│   ├── filters.ts
│   └── teacher.ts
│
├── public/
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```
