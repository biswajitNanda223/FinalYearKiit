# Use base image
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including Vite locally + globally)
RUN npm install
# Copy rest of the frontend files
COPY . .

# Build Vite frontend
RUN npm run build

# Expose port for Vite preview server
EXPOSE 5173

# Start preview server
CMD ["npm", "run", "dev"]
