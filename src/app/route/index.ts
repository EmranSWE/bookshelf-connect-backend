import express from 'express';
import { UserRoutes } from '../auth/auth.route';
import { BookRoute } from '../books/book.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
