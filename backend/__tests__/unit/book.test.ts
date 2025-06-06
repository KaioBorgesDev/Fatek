import { describe, expect, test } from "@jest/globals";
import Book from "../../src/entities/Book";

type TypeBook = {
  id_user?: string;
  title?: string;
  autor?: string;
  publisher?: string;
  release_date?: string;
  category?: string;
  price?: number;
  image: string;
};

describe("Book Entity", () => {
  test("validate() deve passar quando todos os campos obrigatórios são fornecidos", () => {
    const validBook: TypeBook = {
      id_user: "123",
      title: "Livro de Teste",
      autor: "Autor Teste",
      publisher: "Editora Teste",
      release_date: "2023-01-01",
      category: "Ficção",
      price: 50,
      image: "http://image.com/livro.jpg",
    };
    const book = new Book(validBook);

    expect(book.validate()).toEqual(validBook);
  });

  test("validate() deve lançar erro quando campos obrigatórios estiverem faltando", () => {
    const invalidBook: TypeBook = {
      id_user: "123",
      title: "",
      autor: "Autor Teste",
      publisher: "Editora Teste",
      release_date: "2023-01-01",
      category: "Ficção",
      price: 50,
      image: "http://imagem.com/livro.jpg",
    };

    const book = new Book(invalidBook);

    expect(() => book.validate()).toThrow("Campos obrigatórios estão faltando.");
  });
});
