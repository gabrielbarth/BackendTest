class BookSpecifications {
  originalPubDate: string;

  author: string;

  pageCount: number;

  illustrator: string[];

  genres: string[];

  constructor(
    date: string,
    author: string,
    pageCount: number,
    illustrator: string[],
    genres: string[],
  ) {
    this.originalPubDate = date;
    this.author = author;
    this.pageCount = pageCount;
    this.illustrator = illustrator;
    this.genres = genres;
  }
}

export default BookSpecifications;
