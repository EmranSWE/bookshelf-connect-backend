import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  pub_date: Date;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
