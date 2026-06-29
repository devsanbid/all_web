# Simple base image for Node.js apps
FROM oven/bun:1.2-alpine

# App directory inside container
WORKDIR /app

# Install dependencies first (better Docker cache)
COPY package*.json bun.lock* ./

# Copy source code
COPY . .

# Production mode
ENV NODE_ENV=production

# like .env we can export environment variables here, for example PORT
ENV PORT=8088

# App port
EXPOSE 8088

# Start app from bun
CMD ["bun", "run", "dev"]
