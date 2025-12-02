# Momento Frontend

Frontend application for Momento Social Network, a modern social media platform built with Next.js, React, and TypeScript.

## Overview

Momento Frontend is a responsive web application that provides a complete social media experience including user authentication, content creation, social interactions, and external content integration. The application uses Next.js 16 with the App Router for optimal performance and developer experience.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (TanStack Query)** - Server state management and data fetching
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API server running (see momento-backend)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd momento-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_EXTERNAL_API_KEY=your-unsplash-api-key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
momento-frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication route group
│   │   ├── sign-in/      # Sign in page
│   │   └── sign-up/      # Sign up page
│   ├── (momento)/        # Main application route group
│   │   ├── page.tsx      # Home page
│   │   ├── explore/      # Search and explore page
│   │   ├── create-post/  # Create post page
│   │   ├── saved/        # Saved posts page
│   │   ├── posts/        # Post details pages
│   │   ├── profile/      # User profile pages
│   │   ├── details/      # External content details
│   │   ├── notifications/# Notifications page
│   │   ├── messages/     # Messaging pages
│   │   └── admin/        # Admin dashboard
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # Reusable React components
│   ├── shared/          # Shared components
│   ├── forms/           # Form components
│   ├── messages/        # Messaging components
│   └── ui/              # UI primitives
├── context/             # React Context providers
│   └── AuthContext.tsx  # Authentication context
├── lib/                 # Utility libraries
│   ├── api/            # API client
│   │   └── client.ts   # Centralized API functions
│   ├── react-query/    # React Query hooks
│   │   ├── queriesAndMutation.ts
│   │   └── queryKeys.ts
│   └── utils.ts        # Utility functions
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── public/             # Static assets
```

## Features

### Authentication

- User registration with role selection (USER, ADMIN)
- Email/password authentication
- Session-based authentication
- Protected routes
- Anonymous user support

### Content Management

- Create, edit, and delete posts
- Image uploads with preview
- Post likes and saves
- Post search functionality
- Infinite scroll pagination

### Social Features

- User profiles with customizable information
- Follow/unfollow users
- View followers and following lists
- Saved posts collection
- Liked posts collection

### External Content Integration

- Search Unsplash photos
- View external photo details
- Add reviews to external content
- Star ratings (1-5 stars)

### Reviews System

- Create reviews for posts and external content
- Edit and delete own reviews
- Star rating system
- View all reviews with user information

### Notifications

- Real-time notification updates
- Unread notification count
- Mark as read functionality
- Notification types: LIKE, FOLLOW, REVIEW

### Messaging

- AI assistant chat with OpenRouter integration (Momento AI)
- AI image generation capabilities
- User-to-user direct messaging
- Real-time message display with auto-refresh
- Message history and conversation threads
- Unread message count tracking
- Typing indicators
- Message feedback system (thumbs up/down)
- Conversation partner list
- Mark conversations as read

### Admin Dashboard

- View all users
- Delete users (except own account)
- View all posts
- Delete posts
- Role-based access control

## Architecture

The frontend follows a component-based architecture with clear separation of concerns:

1. **Pages** (`app/`) - Route handlers and page components
2. **Components** (`components/`) - Reusable UI components
3. **API Client** (`lib/api/client.ts`) - Centralized API communication
4. **State Management** - React Query for server state, React Context for auth
5. **Hooks** (`lib/react-query/`) - Custom hooks for data fetching and mutations

## State Management

The application uses React Query (TanStack Query) for server state management and data fetching. This provides:

- Automatic caching and background updates
- Optimistic updates
- Request deduplication
- Error handling and retry logic

Authentication state is managed through React Context (`AuthContext`) for global access across components.

## API Integration

All API calls are centralized in `lib/api/client.ts` using Axios with credentials enabled for session-based authentication. The client handles:

- Request/response transformation
- Error handling
- Session management
- Environment-based URL configuration

## Routing

The application uses Next.js App Router with route groups:

- `(auth)` - Authentication pages (sign-in, sign-up)
- `(momento)` - Main application pages

This allows for different layouts and authentication requirements per route group.

## Styling

The application uses Tailwind CSS for styling with:

- Responsive design (mobile-first approach)
- Custom color scheme (dark theme)
- Consistent spacing and typography
- Reusable utility classes

## Environment Variables

| Variable                       | Description             | Default                   |
| ------------------------------ | ----------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL`          | Backend API base URL    | http://localhost:4000/api |
| `NEXT_PUBLIC_EXTERNAL_API_KEY` | Unsplash API access key | Required for external API |

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Responsive Design

The application is fully responsive and optimized for:

- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Next.js automatic code splitting
- Image optimization with Next.js Image component
- React Query caching and background updates
- Lazy loading for components
- Optimistic UI updates

## Security

- Session-based authentication
- Protected routes for authenticated users
- Role-based access control
- Input validation with Zod
- XSS protection through React's built-in escaping

## Error Handling

The application includes comprehensive error handling:

- All API functions wrapped in try-catch blocks for proper error propagation
- API error responses with user-friendly messages
- Form validation errors with Zod schema validation
- Network error handling with retry logic via React Query
- Loading states for async operations
- Error boundaries for component-level error handling
- Graceful fallbacks for failed API calls

## License

ISC

## Contributing

This is a project for academic purposes. For questions or issues, please contact the development team.
