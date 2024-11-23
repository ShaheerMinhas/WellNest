import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import organizationRoutes from './routes/organizationRoutes'; // Import the organization routes

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies or authorization headers
  })
);

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api', emailRoutes); // Email-related routes
app.use('/api', organizationRoutes); // Organization-related routes

export default app;
