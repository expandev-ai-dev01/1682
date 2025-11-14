# AutoClean Backend API

Backend API for AutoClean - File management system for identifying and removing temporary files.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- SQL Server database integration
- Multi-tenancy support
- Comprehensive error handling
- Request validation with Zod

## Prerequisites

- Node.js 18+ 
- SQL Server 2019+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure your environment variables

4. Run database migrations (after database setup)

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Documentation

### Health Check
```
GET /health
```

### API Endpoints

All API endpoints are versioned and prefixed with `/api/v1`

- External (public) endpoints: `/api/v1/external/...`
- Internal (authenticated) endpoints: `/api/v1/internal/...`

## Project Structure

```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── constants/        # Application constants
├── instances/        # Service instances
├── tests/            # Test utilities
├── config/           # Configuration
└── server.ts         # Application entry point
```

## License

ISC