// app.js
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import indexRouter from './routes/index.route.js';
const app = express(); // Create Express application

app.disable('x-powered-by'); // Disable the 'X-Powered-By' header
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable CORS
app.use(compression()); // Use compression to decrease the size of the response body
app.use(helmet()); // Use helmet to set security-related HTTP headers

app.use('/api', indexRouter);

export default app;
