# LearnLingo

LearnLingo is a language learning platform where users can find teachers, filter them by different criteria, add teachers to favorites and book a trial lesson.

## Features

- User registration and login
- Firebase Authentication
- Display current user's name
- Logout
- Browse language teachers
- Filter teachers by:
  - Language
  - Student level
  - Price per hour
- Load more teachers
- Expand teacher cards to view additional information and reviews
- Add and remove teachers from favorites
- Favorites are saved for each authenticated user
- Favorites persist after page reload
- Book a trial lesson
- Form validation with React Hook Form and Yup
- Modal windows with:
  - Close button
  - Backdrop click
  - Escape key
- Loading states
- Empty states for teachers and favorites

## Technologies

- Next.js
- React
- TypeScript
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup
- React Hot Toast
- CSS Modules
- Next.js Image
- ESLint

## Project Structure

```text
learn-lingo/
├── app/
│   ├── favorites/
│   ├── teachers/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Advantages/
│   ├── AuthModal/
│   ├── BookingModal/
│   ├── Container/
│   ├── Filters/
│   ├── Header/
│   ├── Hero/
│   ├── Icon/
│   ├── Loader/
│   ├── TeacherCard/
│   └── TeacherList/
│
├── hooks/
├── lib/
├── providers/
├── schemas/
├── types/
├── public/
│   ├── icons/
│   └── images/
│
├── .env.local
├── package.json
└── README.md
```

## Firebase

The project uses Firebase for authentication and teacher data.

### Authentication

Firebase Authentication is used for:

- Registration
- Login
- Logout
- Tracking the current authenticated user

Email and password authentication are used.

### Realtime Database

Teacher information is stored in Firebase Realtime Database.

Each teacher contains:

- Name
- Surname
- Languages
- Student levels
- Rating
- Reviews
- Price per hour
- Lessons completed
- Avatar
- Lesson information
- Conditions
- Experience

## Environment Variables

Create a `.env.local` file in the root of the project and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase project configuration.

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd learn-lingo
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and add your Firebase configuration.

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Pages

### Home

The home page introduces the LearnLingo platform and provides information about its benefits.

### Teachers

The teachers page allows users to browse teachers and filter them by language, level and price.

### Favorites

Authenticated users can view their favorite teachers on a separate page.

## Authentication Flow

Users can:

1. Register an account
2. Log in
3. View their name in the header
4. Add teachers to favorites
5. Book a trial lesson
6. Log out

Users who are not authenticated are asked to log in when they try to use functionality that requires authentication.

## Favorites

Favorites are stored separately for each authenticated user.

When a user adds or removes a teacher from favorites, the state is updated immediately and persists after page reload.

## Forms

Forms are implemented using:

- React Hook Form
- Yup

Validation is applied to:

- Login
- Registration
- Trial lesson booking

All required fields are validated before submission.

## UI

The project uses CSS Modules for component-level styling.

The interface includes:

- Responsive components
- Loading indicators
- Empty states
- Modal windows
- Interactive teacher cards
- Favorite buttons
- Custom filters

## Deployment

The application can be deployed using platforms that support Next.js, such as Vercel.

Before deployment, make sure that all required Firebase environment variables are configured in the deployment environment.
