import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB, connectPostgres } from './config/database';
import authRoutes from './routes/authRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import queryRoutes from './routes/queryRoutes';
import llmRoutes from './routes/llmRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hint', llmRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('CipherSQLStudio API is running');
});

const startServer = async () => {
  await connectMongoDB();
  await connectPostgres();
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startServer();
