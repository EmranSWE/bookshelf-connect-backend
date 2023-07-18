"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create-book', book_controller_1.BookController.createBook);
router.post('/create-review/:id', book_controller_1.BookController.createReview);
router.get('/getReview/:id', book_controller_1.BookController.getReview);
router.get('/getAllBooks', book_controller_1.BookController.getAllBooks);
router.post('/updateSingleBooks/:id', book_controller_1.BookController.updateSingleBook);
router.get('/getSingleBooks/:id', book_controller_1.BookController.getSingleBook);
router.delete('/deleteABook/:id', book_controller_1.BookController.deleteABook);
exports.BookRoute = router;
