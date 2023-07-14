import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);
router.get('/getAllBooks', BookController.getAllBooks);
router.get('/getSingleBooks/:id', BookController.getSingleBook);

export const BookRoute = router;
