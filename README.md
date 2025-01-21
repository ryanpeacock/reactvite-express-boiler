# React Vite Express Boilerplate

A boilerplate project for building a React Single Page Application (SPA) using [Vite](https://vitejs.dev/) for fast builds and [Express.js](https://expressjs.com/) as a backend server. The Express server also functions as a Backend for Frontend (BFF) proxy for third-party APIs, ensuring secure and efficient API requests.

## Features

- ⚡ **Vite** for lightning-fast development and optimized production builds.
- ⚛️ **React** for building an interactive SPA.
- 🌐 **Express.js** backend for serving the application and handling API proxying.
- 🔒 **BFF Proxy** to securely handle third-party API calls from the server.
- 🛠️ Example frontend integration with **React Query Builder** and **React Select**.
- 🎥 Integration with the **OMDb API** to fetch movie data as a sample third-party API.
- 📂 Well-structured codebase for easy scalability and maintenance.
- 🛠️ Ready for deployment with minimal configuration.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ryanpeacock/reactvite-express-boiler.git
   cd reactvite-express-boiler
   ```

2. Install dependencies:
   ```bash
   # With npm
   npm install

   # Or with yarn
   yarn install
   ```

3. Obtain an API key for the **OMDb API**:
   - Visit the [OMDb API website](https://www.omdbapi.com/apikey.aspx) to register for a free or paid API key.

4. Create a `.env` file in the root directory by copying `.env.copy`:
   ```bash
   cp .env.copy .env
   ```
   Add your OMDb API key to the `.env` file:
   ```plaintext
   OMDB_API_KEY=your_api_key_here
   ```

### Running the Application

#### Development Mode

Run both the frontend and backend in development mode:
```bash
npm run dev
```
This starts:
- The Vite dev server for the React SPA
- The Express backend server

Access the app at `http://localhost:5173` by default.

#### Production Mode

Build the React SPA and serve it with the Express server:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the backend:
   ```bash
   npm start
   ```

---

## Project Structure

```plaintext
reactvite-express-boiler/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── src/                    # Backend (Express.js)
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middleware
│   ├── server.js           # Main server entry point
├── .env                    # Environment variables
├── .env.copy               # Example environment variables file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## API Proxy Configuration

The Express server can act as a BFF proxy in multiple ways. Below are two example configurations:

### 1. Proxying to a Third-Party API (OMDb API)

This example demonstrates how to handle requests to the OMDb API through the Express server. It uses the API key from your `.env` file:

```javascript
app.get('/api/movies', async (req, res) => {
  const { title } = req.query;
  const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`);
  const data = await response.json();
  res.json(data);
});
```

### 2. General Proxying Logic

This example shows how to create a reusable proxy route for multiple third-party APIs. The base URL and headers can be customized dynamically:

```javascript
app.get('/api/proxy', async (req, res) => {
  const { endpoint } = req.query; // e.g., `/data`
  const response = await fetch(`https://third-party-api.com${endpoint}`, {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
  });
  const data = await response.json();
  res.json(data);
});
```

---

## Sample Component: React Query Builder + React Select + OMDb API

This boilerplate includes an example test component demonstrating the usage of **React Query Builder** and **React Select** to interact with the **OMDb API**. The example allows you to:

1. Build a query to search for movies.
2. Use dropdown selections (powered by **React Select**) to filter or refine searches.
3. Fetch movie data from the OMDb API using the query builder.

### Using the Sample Component

1. Ensure you have set up your `.env` file with a valid `OMDB_API_KEY` as described above.
2. Navigate to the test component route in your application (check the codebase for the specific path).
3. Use the query builder and dropdowns to search for movies and view the results fetched from the OMDb API.

---

## Scripts

| Script              | Description                           |
|---------------------|---------------------------------------|
| `npm run dev`       | Run the app in development mode       |
| `npm run build`     | Build the React app for production    |
| `npm start`         | Start the Express server in production|

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue to discuss them first.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [OMDb API](https://www.omdbapi.com/)

---
