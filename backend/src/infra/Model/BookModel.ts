import { Schema, model } from "mongoose";
import crypto from "node:crypto";

const BookSchema = new Schema({
    id_book: { type: String, default: crypto.randomUUID, unique: true },
    id_user: { type: String, required: true },
    date: { type: Date, default: new Date()},
    title: { type: String, required: true },
    autor: { type: String, required: true },
    publisher: { type: String, required: true },
    release_date: { type: Date, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true, default: 'Português'},
    price: { type: Number, required: true },
    image: { type: String, required: true },
    status: {
        type: String,
        enum: ["Ativo", "Inativo", "Finalizado"],
        default: "Ativo",
    },
});

const BookModel = model("book", BookSchema);

export default BookModel;

/*
exemplo de request
{
  "id_user": "1658c3e9-3b0b-44d2-9011-cdd613097e2a",
  "id_book": "6f2e1b34-56e4-4b8f-a9d5-7d1e43d90f19",
  "date": "2025-01-13T10:30:00Z",
  "title": "Clean Code",
  "autor": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "release_date": "2008-08-01T00:00:00Z",
  "category": "Programming",
  "language": "English",
  "price": 89.99,
  "imagem": "iVBORw0KGgoAAAANSUhEUgAAAAUA",
  "status": "Ativo"
}

*/
