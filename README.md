# globetrotter - Location Quiz Game

A fun and educational geography quiz game that challenges players to guess locations from clues. Built with a modern tech stack including Next.js, NestJS, Tailwind CSS, and MongoDB.

## Features

- **Diverse Location Database**: Hundreds of locations worldwide, including famous cities, landmarks, and cultural spots
- **Fun Facts & Trivia**: Learn interesting information about each location after guessing
- **Responsive Design**: Play seamlessly across desktop, tablet, and mobile devices
- **Score Tracking**: Monitor your progress and compare with friends

## Tech Stack

### Frontend

- **Next.js**: React framework providing server-side rendering and static site generation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Backend

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications
- **MongoDB**: NoSQL database for storing location data, user profiles, and game statistics
- **Mongoose**: MongoDB object modeling tool for data validation and management
- **RESTful API**: Clean API architecture for frontend-backend communication

## Installation

### Prerequisites

- Node.js (v22 or higher)
- pnpm
- MongoDB (local instance or MongoDB Atlas)

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/monster-anshu/globetrotter.git
   cd globetrotter
   ```

2. Install dependencies for both frontend and backend

   ```bash
   cd data-mining
   pnpm install

   cd ../globetrotter-backend
   pnpm install

   cd ../globetrotter-frontend
   pnpm install
   ```

3. Set up environment variables

   - Create `.env` files

   - Data mining `.env` example:
     ```
     MONGODB_URI=mongodb://localhost:27017/globetrotter
     GEMINI_API_KEY=api_key
     ```
   - Backend `.env` example:
     ```
     MONGODB_URI=mongodb://localhost:27017/geoquiz
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend `.env.local` example:
     ```
     API_URL=http://localhost:3000
     NEXT_PUBLIC_APP_URL=http://localhost:3001
     ```

4. Start the development servers

   ```bash
   # Create data with AI
   cd data-mining
   pnpm ai

   # Start backend server
   cd ../globetrotter-backend
   pnpm run start:dev

   # In a new terminal, start frontend server
   cd globetrotter-frontend
   pnpm run dev
   ```

5. Access the application at `http://localhost:3001`

## Game Data Structure

Each location in the database follows this structure:

```javascript
{
  name: "Paris",              // City name
  alias: "dst123",            // Unique identifier
  clues: [                    // Progressive hints
    "I am the capital of a European country",
    "I am known as the 'City of Light'",
    "I have a famous tower named after an engineer"
  ],
  funFacts: [                 // Interesting information
    "I host one of the world's largest art museums",
    "My subway system is over 100 years old",
    "I was originally a Celtic settlement called Lutetia"
  ],
  trivia: [                   // Less known facts
    "I have a lesser-known replica of the Statue of Liberty on an island in the Seine",
    "My city limits were formally established in 1860",
    "I have over 470 parks and gardens within my borders"
  ]
}
```

## Deployment

### Backend

- I have deployed the backend using Docker in a VPS and it can be deployed to any cloud platform supporting Docker.

### Frontend

- Frontend of the application is deployed on the Vercel.
