import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BookService } from './book.service';
import pick from '../../shared/pick';
import { bookFilterableFields } from './book.interface';
import { paginationFields } from '../constant/pagination';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const book = req.body;
    console.log('Im inside the create book', book);
    const result = await BookService.createBook(book);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  }
);

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookService.getAllBooks(paginationOptions, filters);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books fetch successfully',
      data: result,
    });
  }
);
const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BookService.getSingleBook(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetch successfully',
      data: result,
    });
  }
);
const updateSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const book = req.body;
    const result = await BookService.updateSingleBook(book, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  }
);

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const book = req.body.review;
    const result = await BookService.createReview(book, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  }
);

const getReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getReview(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books fetch successfully',
      data: result,
    });
  }
);

const deleteABook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.deleteABook(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books Deleted successfully',
      data: result,
    });
  }
);
export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  createReview,
  deleteABook,
  getReview,
};
