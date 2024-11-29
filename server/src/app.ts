import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import organizationRoutes from './routes/organizationRoutes'; // Import the organization routes
import authRoutes from './routes/authRoutes'; // Import the auth routes

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
app.use('/api/email', emailRoutes); // Email-related routes
app.use('/api/organization', organizationRoutes); // Organization-related routes
app.use('/api/auth', authRoutes); // Authentication routes (register, login)

export default app;
