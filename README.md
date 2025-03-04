# My App

## Getting Started

This guide will help you set up and run the project.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Yarn](https://yarnpkg.com/) (Ensure it's installed globally)

### Installation

1. Clone the repository:

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and configure it according to your setup.

### Database Setup

1. Run database migrations and generate Prisma client:

   ```sh
   yarn prisma:generate
   ```

2. (Optional) Seed the database:
   ```sh
   yarn seed
   ```

### Running the App

#### Development Mode

To start the app in development mode:

```sh
yarn dev
```

#### Production Mode

Build and start the app for production:

```sh
yarn build
yarn start
```

### Notes

- **`postinstall`** runs `patch-package` to apply necessary patches.
- **Prisma migrations** must be run before starting the app.

---

Now your app should be up and running!
