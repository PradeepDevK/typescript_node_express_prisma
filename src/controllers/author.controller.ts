import { PrismaClient } from "@prisma/client";

const authorClient = new PrismaClient().author;

// getAllAuthors
export const getAllAuthors = async (req, res) => {
    try {
        const allAuthors = await authorClient.findMany({
            include: {
                book: true
            }
        });

        res.status(200).json({ data: allAuthors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching authors", error });
    }
};

// getAuthorById
export const getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = await authorClient.findUnique({
        where: {
            id: authorId,
        },
        include: {
            book: true,
        },
        });

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching author by id", error });
    }
};

export const createAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const author = await authorClient.create({
            data: authorData
        });

        res.status(200).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error creating author", error });
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authorData = req.body;
        const author = await authorClient.update({
            where: {
                id: authorId
            },
            data: authorData
        });

        res.status(200).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error updating author", error });
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        await authorClient.delete({
            where: {
                id: authorId
            }
        });
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error deleting author", error });
    }
};