import { Router } from 'express';
import booksRouter from './books.routes';

const routes = Router();

// permite incluir "/books" para todas rotas
routes.use('/books', booksRouter);

export default routes;
