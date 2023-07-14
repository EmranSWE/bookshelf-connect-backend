import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    pub_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
