import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelpers';
import { IBook, bookSearchableFields } from './book.interface';
import { Book } from './book.model';
import { IBookFilters, IPaginationOptions } from '../../interface/pagination';
import { IGenericResponse } from '../../interface/common';

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

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
};
