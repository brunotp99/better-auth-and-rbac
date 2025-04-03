# Express TS Better Auth and RBAC

A robust and modular Express.js application built with TypeScript, Prisma, and Better Auth, designed for secure user authentication and role-based access control. This project showcases a scalable architecture for building RESTful APIs with best practices.

## Key Features

- **Authentication**: Secure email/password authentication with email verification powered by Better Auth.
- **Role-Based Access Control**: Middleware to enforce user roles and permissions.
- **Prisma ORM**: Simplified database interactions with PostgreSQL.
- **TypeScript**: Strongly typed codebase for improved reliability and maintainability.
- **Centralized Error Handling**: Custom error classes for consistent error management.
- **Environment Configuration**: Easy setup with `.env` for environment variables.
- **Logging**: High-performance logging using Pino.
- **Request Validation**: Schema-based validation with Zod.

## Project Structure

```
.env
.gitignore
package.json
prisma/
    └── schema.prisma
src/
    ├── app.ts
    ├── controllers/
    │   └── user.controller.ts
    ├── errors/
    │   ├── api.error.ts
    │   └── not-found.error.ts
    ├── middlewares/
    │   ├── check-role.middleware.ts
    │   ├── error.middleware.ts
    │   ├── user-session.middleware.ts
    │   └── validate-schema.middleware.ts
    ├── repositories/
    │   ├── in-memory/
    │   └── prisma/
    │       └── user.repository.ts
    ├── routes/
    │   ├── main.route.ts
    │   └── user.route.ts
    ├── schemas/
    │   └── user.schema.ts
    ├── services/
    │   └── user.service.ts
    ├── utils/
    │   ├── auth.util.ts
    │   ├── env.util.ts
    │   ├── logger.util.ts
    │   ├── mailer.util.ts
    │   └── prismadb.util.ts
    └── server.ts
tests/
tsconfig.json
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Yarn or npm

## Installation

1. Clone the repository:

     ```bash
     git clone https://github.com/brunotp99/better-auth-and-rbac.git
     cd better-auth-and-rbac
     ```

2. Install dependencies:

     ```bash
     npm install
     ```

3. Configure environment variables:

     Create a `.env` file in the root directory and populate it based on the provided example.

4. Set up the database:

     ```bash
     npx prisma migrate dev
     npx prisma generate
     ```

## Running the Application

Start the development server:

```bash
npm run dev
```

The server will run on the port specified in your `.env` file (`SERVER_PORT`).

## API Endpoints

### Authentication
- **POST** `/api/auth/sign-in`: Authenticate using email and password.

### User Management
- **GET** `/api/user/:userId`: Retrieve user details (requires authentication and role validation).

### Health Check
- **GET** `/health-check`: Verify API availability.

## Middleware

- **userSession**: Validates user sessions.
- **checkRole**: Enforces role-based access control.
- **validateSchema**: Validates request payloads using Zod.
- **errorMiddleware**: Handles errors and sends appropriate responses.

## Technologies Used

- **Express.js**: Web framework.
- **TypeScript**: Type-safe JavaScript.
- **Prisma**: Database ORM.
- **Better Auth**: Authentication library.
- **Zod**: Schema validation.
- **Pino**: Logging.
- **Nodemailer**: Email handling.

## Development

### Running Tests

Tests are located in the `tests` directory. Run them with:

```bash
npm test
```
