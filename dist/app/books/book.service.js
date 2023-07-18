"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const book_interface_1 = require("./book.interface");
const book_model_1 = require("./book.model");
const mongodb_1 = require("mongodb");
const createBook = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, pub_date } = BookData;
    // Create a new user
    const newBook = new book_model_1.Book({ title, author, genre, pub_date });
    yield newBook.save();
    return newBook;
});
const getAllBooks = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_interface_1.bookSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort({ createdAt: 'desc' })
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const allBook = book_model_1.Book.findById({ _id: id });
    return allBook;
});
const createReview = (reviewData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = book_model_1.Book.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $push: { reviews: reviewData } }, { new: true });
    return newBook;
});
const updateSingleBook = (BookData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = book_model_1.Book.findByIdAndUpdate({ _id: id }, BookData, {
        new: true,
    });
    return newBook;
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const allReview = yield book_model_1.Book.findOne({ _id: id }, { _id: 0, reviews: 1 });
    return allReview;
});
const deleteABook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.Book.deleteOne({ _id: id });
    return deletedBook;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    getReview,
    createReview,
    deleteABook,
};
