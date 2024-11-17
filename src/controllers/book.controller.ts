import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const bookClient = new PrismaClient().book;

// getAllBooks
export const getAllBooks = async (req, res) => {
    try {
        const getAllBooks = await bookClient.findMany();

        res.status(200).json({ data: getAllBooks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching books", error });
    }
};

// getBookById
export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookClient.findUnique({
            where: {
                id: bookId,
            }
        });

        if (!book) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json({ data: book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching book by id", error });
    }
};

// createBook
export const createBook = async (req, res) => {
    try {
        const bookData = req.body;
        const book = await bookClient.create({
            data: {
                title: bookData.title,
                author: {
                    connect: {id: bookData.authorId}
                }
            }
        });

        res.status(200).json({ data: book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error creating book", error });
    }
};

// updateBook
export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;
        const book = await bookClient.update({
            where: {
                id: bookId
            },
            data: bookData
        });

        res.status(200).json({ data: book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error updating book", error });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        await bookClient.delete({
            where: {
                id: bookId
            }
        });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error deleting book", error });
    }
};