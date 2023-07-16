import express from 'express';
import { BookRoute } from '../books/book.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
