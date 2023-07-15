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

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
};
