
  # Halal Munchies Franchise Portal

  This is a code bundle for Halal Munchies Franchise Portal. The original project is available at https://www.figma.com/design/zIE60nGymxs7lhn2QvDwYJ/Halal-Munchies-Franchise-Portal.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Backend API

A TypeScript/Express API lives in the `server/` directory to power ordering, inventory, inspections, training, and user management.

### Setup

1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env` and adjust values as needed
4. (Optional) `npm run seed` to populate the SQLite database with demo data
5. `npm run dev` to start the API on <http://localhost:4000>

The frontend expects the API at `http://localhost:4000/api`. To point the client elsewhere, create a `.env` file in the project root and set `VITE_API_BASE_URL`.

### Useful scripts

- `npm run build` (in `server/`) – compile TypeScript to JavaScript
- `npm start` (in `server/`) – run the compiled server in production mode
- `npm run seed` (in `server/`) – reset the database and load demo data
  
