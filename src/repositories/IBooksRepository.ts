/**
 * propósito deste arquivo: permitir que o repositório (responsável pelas operações no BD)
 * conte com métodos padronizados (nome, tipo e retorno), para que assim que se evite ao
 * máximo a necessidade de alterações em arquivos que utilizam o repositório (como routes).
 */

import Book from '../models/Book';

interface IBooksRepository {
  createBook(book: Book): Book;

  getAllBooks(): Book[];

  getBookById(id: number): Book | undefined;

  getBooksByName(name: string): Book[];

  getBooksByAuthor(author: string): Book[];

  getBooksByPrice(price: number): Book[];

  getBooksByGenre(genre: string): Book[];

  getBooksByIllustrator(illustrator: string): Book[];

  getBooksByAscendingPrice(): Book[];

  getBooksByDescendingPrice(): Book[];

  getBookDeliveryFee(id: number): Book | undefined;
}

export default IBooksRepository;
