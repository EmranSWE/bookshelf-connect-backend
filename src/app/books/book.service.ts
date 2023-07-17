import { SortOrder, UpdateResult } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelpers';
import { IBook, bookSearchableFields } from './book.interface';
import { Book } from './book.model';
import { IBookFilters, IPaginationOptions } from '../../interface/pagination';
import { IGenericResponse } from '../../interface/common';
import { ObjectId } from 'mongodb';

const createBook = async (BookData: IBook): Promise<IBook | null> => {
  const { title, author, genre, pub_date } = BookData;
  // Create a new user
  const newBook = new Book({ title, author, genre, pub_date });
  await newBook.save();
  return newBook;
};

const getAllBooks = async (
  paginationOptions: IPaginationOptions,
  filters: IBookFilters
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const allBook = Book.findById({ _id: id });
  return allBook;
};

const createReview = async (
  reviewData: IBook[],
  id: string
): UpdateResult<Document> => {
  const newBook = Book.updateOne(
    { _id: new ObjectId(id) },
    { $push: { reviews: reviewData } },
    { new: true }
  );
  return newBook;
};
const updateSingleBook = async (
  BookData: IBook,
  id: string
): Promise<IBook | null> => {
  const newBook = Book.findByIdAndUpdate({ _id: id }, BookData, {
    new: true,
  });
  return newBook;
};

const getReview = async (id: string) => {
  const allReview = await Book.findOne({ _id: id }, { _id: 0, reviews: 1 });
  return allReview;
};

const deleteABook = async (id: string) => {
  const deletedBook = await Book.deleteOne({ _id: id });
  return deletedBook;
};
export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  getReview,
  createReview,
  deleteABook,
};
