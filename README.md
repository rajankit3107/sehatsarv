# SehatSarv

SehatSarv is a modern healthcare management system built with Next.js, TypeScript, and Prisma. This application provides a comprehensive solution for hospital management, including patient management, inventory tracking, OPD management, and bed management.

## Features

- 🏥 Hospital Management
- 👥 Patient Management
- 📦 Inventory Management
- 🏥 OPD Management
- 🛏️ Bed Management
- 📱 Modern and Responsive UI
- 🔒 Secure Authentication
- 📊 Real-time Data Management

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- PostgreSQL (or your preferred database)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sehatsarv.git
   cd sehatsarv
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your environment variables:

   ```
   DATABASE_URL="your_database_url"
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

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
sehatsarv/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── hospital/          # Hospital management
│   ├── onboard/           # Onboarding
│   ├── AddPatient/        # Patient management
│   ├── Inventory/         # Inventory management
│   ├── beds/             # Bed management
│   └── opd/              # OPD management
├── components/            # Reusable components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
