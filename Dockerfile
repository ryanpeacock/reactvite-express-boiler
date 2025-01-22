# Use Node.js 20-alpine as the base image
FROM node:22 AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for both backend and frontend
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies for backend and frontend
RUN npm install && npm install --prefix ./client

# Copy all project files
COPY . .

# Stage for development
FROM base AS development

# Set environment variable for development
ENV NODE_ENV=development

# Expose ports for backend (5000) and frontend (5173)
EXPOSE 5000 5173

# Command to run both backend and frontend concurrently in dev mode
CMD ["npm", "run", "dev"]

# Stage for production
FROM base AS production

# Set environment variable for production
ENV NODE_ENV=production

# Build the server and client
RUN npm run serverbuild && npm run clientbuild

# Expose port for the backend
EXPOSE 5000

# Command to start the production server
CMD ["npm", "start"]
