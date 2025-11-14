# Momento Frontend

Frontend application for Momento Social Network built with Next.js, React, and TypeScript.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management (to be added)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_EXTERNAL_API_KEY=your-api-key
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
momento-frontend/
├── app/
│   ├── (auth)/        # Authentication pages
│   ├── (momento)/     # Main app pages
│   └── layout.tsx
├── components/        # Reusable components
├── lib/              # Utilities and API clients
├── store/            # Redux store (to be added)
└── types/            # TypeScript types
```

## License

ISC
