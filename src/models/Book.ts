// responsabilidade deste arquivo: definir o formato no qual o dado é armazenado em algum lugar.

import BookSpecifications from './BookSpecifications';

class Book {
  id: number;

  name: string;

  price: number;

  specifications: BookSpecifications;

  constructor({ name, price, specifications }: Omit<Book, 'id'>) {
    this.id = Math.round(Math.random() * (1000 - 1) + 1); // apenas para colocar número aleatório na criação
    this.name = name;
    this.price = price;
    this.specifications = specifications;
  }
}

export default Book;
