/**
 * Propósito deste arquivo: receber requisição, chamar outro arquivo (neste caso,
 * BooksRepository) e devolver resposta.
 */
import { Router } from 'express';

import BooksRepository from '../repositories/BooksRepository';

const booksRouter = Router();
const booksRepository = new BooksRepository();

// POST - http://localhost:5000/books
booksRouter.post('/', (request, response) => {
  const { name, price, specifications } = request.body;

  const book = booksRepository.createBook({ name, price, specifications });

  return response.json(book);
});

// GET - http://localhost:5000/books
booksRouter.get('/', (request, response) => {
  const books = booksRepository.getAllBooks();

  return response.json(books);
});

// GET - http://localhost:5000/books/{id}
booksRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const bookId = parseInt(id, 10);

  const book = booksRepository.getBookById(bookId);

  return response.json(book);
});

// POST - http://localhost:5000/books/name
booksRouter.post('/name', (request, response) => {
  const { name } = request.body;

  const books = booksRepository.getBooksByName(name);

  return response.json(books);
});

// POST - http://localhost:5000/books/author
booksRouter.post('/author', (request, response) => {
  const { author } = request.body;

  const books = booksRepository.getBooksByAuthor(author);

  return response.json(books);
});

// POST - http://localhost:5000/books/price
booksRouter.post('/price', (request, response) => {
  const { price } = request.body;

  const books = booksRepository.getBooksByPrice(price);

  return response.json(books);
});

// POST - http://localhost:5000/books/genre
booksRouter.post('/genre', (request, response) => {
  const { genre } = request.body;

  const books = booksRepository.getBooksByGenre(genre);

  return response.json(books);
});

// POST - http://localhost:5000/books/illustrator
booksRouter.post('/illustrator', (request, response) => {
  const { illustrator } = request.body;

  const books = booksRepository.getBooksByIllustrator(illustrator);

  return response.json(books);
});

// GET - http://localhost:5000/books/price/ascending
booksRouter.get('/price/ascending', (request, response) => {
  const books = booksRepository.getBooksByAscendingPrice();

  return response.json(books);
});

// GET - http://localhost:5000/books/price/descending
booksRouter.get('/price/descending', (request, response) => {
  const books = booksRepository.getBooksByDescendingPrice();

  return response.json(books);
});

// GET - http://localhost:5000/books/{id}/shipping
booksRouter.get('/:id/shipping', (request, response) => {
  const { id } = request.params;

  const bookId = parseInt(id, 10);
  const book = booksRepository.getBookDeliveryFee(bookId);

  return response.json(book);
});

export default booksRouter;
