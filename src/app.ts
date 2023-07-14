/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
const app = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/route';

//Middleware
app.use(cors());

//Body parser
app.use(express.json());
app.use(express.urlencoded({}));
app.use('/api/v1/', router);

//Testing
app.get('/', (req, res, next) => {
  res.send('Server is running');
});
app.use(globalErrorHandler);
export default app;
