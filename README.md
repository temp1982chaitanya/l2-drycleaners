# L2 Dry Cleaners

A modern web application for a dry cleaning service built with Next.js, TypeScript, and Prisma.

## Features

- 🌟 Modern and responsive UI with Tailwind CSS
- 🔐 User authentication (Login/Register)
- 👥 Role-based access (Admin/Customer)
- 📦 Order management system
- 📱 Mobile-friendly design
- 🛠️ Admin dashboard
- 📍 Order tracking
- 💳 Service pricing
- 📞 Contact information

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Hooks
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ 
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/l2drycleaners.git
   cd l2drycleaners
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/l2drycleaners"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
l2drycleaners/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (routes)/         # App routes
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact:
- Phone: 9849565575
- Location: Office near Charlapally, Hyderabad, India 