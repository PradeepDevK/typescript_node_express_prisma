import { Router } from "express";

import { 
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "../controllers/author.controller";

const authRouter = Router();

authRouter.get('/', getAllAuthors);
authRouter.get('/:id', getAuthorById);
authRouter.post('/', createAuthor);
authRouter.put('/:id', updateAuthor);
authRouter.delete('/:id', deleteAuthor);

export default authRouter;