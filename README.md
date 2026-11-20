<<<<<<< HEAD
# healthcare-centre-management
Healthcare Centre Management System
=======
# Healthcare Centre Management System

A healthcare-centre management project with a web frontend and a Node.js/Express backend.

## Project structure

- `index.html` — frontend entry page
- `healthcare-backend/` — Express backend, routes, controllers, models and configuration
- `package.json` — frontend/project dependencies

## Setup

1. Install Node.js (LTS).
2. Install frontend dependencies from the project root:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd healthcare-backend
   npm install
   ```
4. Create `healthcare-backend/.env` using `.env.example` and fill in your own local credentials.
5. Configure your database and Firebase credentials locally before running the app.

## Security

Never commit `.env`, Firebase service-account JSON files, database passwords, API keys, or real patient information. The repository intentionally excludes these files. Use your own development credentials and rotate any credentials that may already have been shared.
>>>>>>> b73530d (Initial commit: Healthcare Centre Management System)
