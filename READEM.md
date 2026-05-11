# AI-Driven Learning Platform (Mini MVP)

A full-stack AI-powered learning platform that allows users to generate personalized lessons based on selected categories and prompts, using OpenAI API integration. The system stores user learning history.

## Project Overview

This project is a mini learning platform designed as a production-style full stack application. Users can:

* Select a learning category and sub-category
* Submit a prompt (e.g. "Teach me about black holes")
* Receive AI-generated lesson content
* View their full learning history

## Tech Stack

Backend:

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* dotenv

Frontend:

* React
* Vite
* Tailwind CSS
* React Router
* Axios

DevOps:

* Docker Compose (for database setup)

## Architecture

The project follows a modular layered architecture:

* routes – API route definitions
* controllers – request handling logic
* services – business logic including AI integration
* models – database schema via Prisma
* config – environment and configuration setup

## AI Integration

The platform integrates with OpenAI API to generate educational content based on user prompts.

Flow:

1. User selects category and sub-category
2. User submits a prompt
3. Backend sends request to OpenAI
4. AI returns a structured lesson response
5. Response is stored in database

## Database Schema

Main entities:

* users: id, name, phone
* categories: id, name
* sub_categories: id, name, category_id
* prompts: id, user_id, category_id, sub_category_id, prompt, response, created_at

Relationships:

* One user to many prompts
* One category to many sub-categories
* Each prompt stores AI response history

## Setup Instructions

1. Clone repository

```bash
git clone <repo-url>
cd project
```

2. Backend setup

```bash
cd backend
npm install
```

Create .env file:

```env
PORT=5000
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_api_key
```

Run backend:

```bash
npm run dev
```

3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

4. Database (Docker)

```bash
docker-compose up -d
```

## Project Structure

project/

* backend/
* frontend/
* docker-compose.yml
* .gitignore
* README.md

## Features

* AI-generated personalized lessons
* Category-based learning flow
* User learning history tracking
* Clean modular backend architecture

## Future Improvements (Optional)

* JWT authentication
* Pagination and filtering
* Swagger API documentation
* Deployment (Vercel / Render / Heroku)

## Notes

This project was built as a mini production-grade system focusing on architecture, scalability, and clean code organization.
