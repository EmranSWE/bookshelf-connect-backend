import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  pub_date: Date;
};

export const bookFilterableFields = ['title', 'author', 'genre', 'searchTerm'];
export const bookSearchableFields = ['title', 'author', 'genre'];
export type BookModel = Model<IBook, Record<string, unknown>>;
