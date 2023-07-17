import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);
router.post('/create-review/:id', BookController.createReview);
router.get('/getReview/:id', BookController.getReview);
router.get('/getAllBooks', BookController.getAllBooks);
router.post('/updateSingleBooks/:id', BookController.updateSingleBook);
router.get('/getSingleBooks/:id', BookController.getSingleBook);
router.delete('/deleteABook/:id', BookController.deleteABook);

export const BookRoute = router;
