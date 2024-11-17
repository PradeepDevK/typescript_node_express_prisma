import express from 'express';

import authRouter from './routes/author.route';
import bookRouter from './routes/book.route';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/authors", authRouter);
app.use("/books", bookRouter);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});