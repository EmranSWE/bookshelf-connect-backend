import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (BookData: IBook): Promise<IBook | null> => {
  const { title, author, genre, pub_date } = BookData;
  // Create a new user
  const newBook = new Book({ title, author, genre, pub_date });
  await newBook.save();
  return newBook;
};

const getAllBooks = async () => {
  const allBook = Book.find({});
  return allBook;
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
