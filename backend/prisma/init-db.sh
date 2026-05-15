#!/bin/bash
# Database initialization script for Docker
# This script waits for PostgreSQL to be ready, then runs migrations and seeds

set -e

echo "Starting database initialization..."

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until nc -z db 5432; do
  echo "   PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up!"

# Wait a bit more for Prisma to be able to connect
sleep 2

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Migrations completed!"

# Run the seed script
echo "Running seed script..."
node prisma/seed.js

echo "Database initialization complete!"

# Start the application
echo "Starting the application..."
npm start
