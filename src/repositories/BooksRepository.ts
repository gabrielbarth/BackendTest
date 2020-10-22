/**
 * Propósito deste arquivo: separar responsabilidades entre Persistência <-> Repositório <-> Rota
 * Single Responsibility Principle. Reponsável apenas por fazer as operações no "banco de dados".
 * Trata-se do único arquivo que sabe a maneira como os dados sao armazenados.
 */

import Book from '../models/Book';
import BookSpecifications from '../models/BookSpecifications';

import IBooksRepository from './IBooksRepository';

// DTO -> Data Transfer Object. Padrão recomendado para transferir dados em OO.
interface ICreateBookDTO {
  name: string;
  price: number;
  specifications: BookSpecifications;
}

class BooksRepository implements IBooksRepository {
  private books: Book[];

  // inicializando com os dados do arquivo books.json
  constructor() {
    this.books = [
      {
        id: 1,
        name: 'Journey to the Center of the Earth',
        price: 10.0,
        specifications: {
          originalPubDate: 'November 25, 1864',
          author: 'Jules Verne',
          pageCount: 183,
          illustrator: ['Édouard Riou'],
          genres: ['Science Fiction', 'Adventure fiction'],
        },
      },
      {
        id: 2,
        name: '20,000 Leagues Under the Sea',
        price: 10.1,
        specifications: {
          originalPubDate: 'June 20, 1870',
          author: 'Jules Verne',
          pageCount: 213,
          illustrator: ['Édouard Riou', 'Alphonse-Marie-Adolphe de Neuville'],
          genres: ['Adventure fiction'],
        },
      },
      {
        id: 3,
        name: 'Harry Potter and the Goblet of Fire',
        price: 7.31,
        specifications: {
          originalPubDate: 'July 8, 2000',
          author: 'J. K. Rowling',
          pageCount: 636,
          illustrator: ['Cliff Wright', 'Mary GrandPré'],
          genres: [
            'Fantasy Fiction',
            'Drama',
            'Young adult fiction',
            'Mystery',
            'Thriller',
            'Bildungsroman',
          ],
        },
      },
      {
        id: 4,
        name:
          'Fantastic Beasts and Where to Find Them: The Original Screenplay',
        price: 11.15,
        specifications: {
          originalPubDate: 'November 18, 2016',
          author: 'J. K. Rowling',
          pageCount: 457,
          illustrator: ['Cliff Wright'],
          genres: ['Fantasy Fiction', 'Contemporary fantasy', 'Screenplay'],
        },
      },
      {
        id: 5,
        name: 'The Lord of the Rings',
        price: 6.15,
        specifications: {
          originalPubDate: 'July 29, 1954',
          author: 'J. R. R. Tolkien',
          pageCount: 715,
          illustrator: ['Alan Lee', 'Ted Nashmith', 'J. R. R. Tolkien'],
          genres: ['Fantasy Fiction', 'Adventure Fiction'],
        },
      },
    ];
  }

  // método para criar um novo livro
  public createBook({ name, price, specifications }: ICreateBookDTO): Book {
    const book = new Book({ name, price, specifications });

    this.books.push(book);

    return book;
  }

  public getAllBooks(): Book[] {
    return this.books;
  }

  public getBookById(id: number): Book | undefined {
    const book = this.books.find(singleBook => singleBook.id === id);
    return book;
  }

  public getBooksByName(name: string): Book[] {
    return this.books.filter(book => book.name === name);
  }

  public getBooksByAuthor(author: string): Book[] {
    return this.books.filter(book => book.specifications.author === author);
  }

  public getBooksByPrice(price: number): Book[] {
    return this.books.filter(book => book.price === price);
  }

  public getBooksByGenre(genre: string): Book[] {
    return this.books.filter(book =>
      book.specifications.genres.includes(genre),
    );
  }

  public getBooksByIllustrator(illustrator: string): Book[] {
    return this.books.filter(book =>
      book.specifications.illustrator.includes(illustrator),
    );
  }

  public getBooksByAscendingPrice(): Book[] {
    return this.books.sort((a, b) => a.price - b.price);
  }

  public getBooksByDescendingPrice(): Book[] {
    return this.books.sort((a, b) => b.price - a.price);
  }

  public getBookDeliveryFee(id: number): Book | undefined {
    const book = this.books.find(singleBook => singleBook.id === id);

    if (book) {
      const newBook = { ...book, price: 1.2 * book.price };
      return newBook;
    }
    return undefined;
  }
}

export default BooksRepository;
