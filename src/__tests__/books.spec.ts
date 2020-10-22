import request from 'supertest';

import app from '../server';

describe('Books', () => {
  // Teste 1: Deve estar apto a criar um novo livro
  it('should be able to create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        name: 'Livro para teste',
        price: 999.4,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      });

    expect(response.body).toMatchObject({
      name: 'Livro para teste',
      price: 999.4,
      specifications: {
        originalPubDate: 'June 20, 2010',
        author: 'Gary Keller',
        pageCount: 213,
        illustrator: ['João Rabiscador', 'Pedro da Silva'],
        genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
      },
    });
  });

  // Teste 2: Deve estar apto a listar um livro cadastrado
  it('should be able to list a new book', async () => {
    const book = await request(app)
      .post('/books')
      .send({
        name: 'Livro para teste',
        price: 999.4,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      });

    const response = await request(app).get('/books');

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: book.body.id,
          name: 'Livro para teste',
          price: 999.4,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        },
      ]),
    );
  });

  // Teste 3: Deve estar apto a listar um livro através de seu ID
  it('should be able to get a book by id', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        name: 'Livro para teste',
        price: 999.4,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'Livro para teste',
        price: 999.4,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      }),
    );
  });

  // Teste 4: Deve estar apto a listar livros através de seu gênero
  it('should be able to get books by genre', async () => {
    const response = await Promise.all([
      request(app)
        .post('/books')
        .send({
          name: 'Livro teste 1',
          price: 99,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Suspense', 'terror'],
          },
        }),
      request(app)
        .post('/books')
        .send({
          name: 'Livro teste 2',
          price: 100,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Comédia'],
          },
        }),
      request(app)
        .post('/books')
        .send({
          name: 'Livro teste 3',
          price: 19.5,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Suspense', 'Drama'],
          },
        }),
    ]);

    const books = await request(app).post('/books/genre').send({
      genre: 'Suspense',
    });

    expect(books.body).toEqual(
      expect.arrayContaining([
        {
          id: response[0].body.id,
          name: 'Livro teste 1',
          price: 99,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Suspense', 'terror'],
          },
        },
        {
          id: response[2].body.id,
          name: 'Livro teste 3',
          price: 19.5,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Suspense', 'Drama'],
          },
        },
      ]),
    );
  });

  // Teste 5: Deve estar apto a listar livros através de ordem decrescente de seus preços
  it('should be able to get books by descending price order', async () => {
    const response = await Promise.all([
      request(app)
        .post('/books')
        .send({
          name: 'Livro para teste 1',
          price: 999.4,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        }),
      request(app)
        .post('/books')
        .send({
          name: 'Livro para teste 2',
          price: 100,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        }),
      request(app)
        .post('/books')
        .send({
          name: 'Livro para teste 3',
          price: 19.5,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        }),
    ]);

    const books = await request(app).get('/books/price/descending');

    expect(books.body).toEqual(
      expect.arrayContaining([
        {
          id: response[2].body.id,
          name: 'Livro para teste 3',
          price: 19.5,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        },
        {
          id: response[1].body.id,
          name: 'Livro para teste 2',
          price: 100,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        },
        {
          id: response[0].body.id,
          name: 'Livro para teste 1',
          price: 999.4,
          specifications: {
            originalPubDate: 'June 20, 2010',
            author: 'Gary Keller',
            pageCount: 213,
            illustrator: ['João Rabiscador', 'Pedro da Silva'],
            genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
          },
        },
      ]),
    );
  });

  // Teste 6: Deve estar apto a listar um livro através considerando o frete (+20%)
  it('should be able to get a book by id and calculate its delivery fee', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        name: 'Livro para teste',
        price: 100,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      });

    const book = await request(app).get(`/books/${response.body.id}/shipping`);

    expect(book.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'Livro para teste',
        price: 120,
        specifications: {
          originalPubDate: 'June 20, 2010',
          author: 'Gary Keller',
          pageCount: 213,
          illustrator: ['João Rabiscador', 'Pedro da Silva'],
          genres: ['Desenvolvimento pessoal', 'Finanças pessoais'],
        },
      }),
    );
  });
});
