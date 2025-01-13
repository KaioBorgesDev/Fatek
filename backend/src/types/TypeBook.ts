type TypeBook = {
    id_book?: string; // Opcional porque pode ser gerado automaticamente
    id_user: string; // ID do usuário associado ao livro
    date?: Date; // Data de criação, opcional porque tem valor padrão
    title: string; // Título do livro
    autor: string; // Autor do livro
    publisher: string; // Editora
    release_date: Date; // Data de lançamento do livro
    category: string; // Categoria do livro
    language?: string; // Idioma, opcional porque tem valor padrão
    price: number; // Preço do livro
    imagem_url: Buffer; // Imagem do livro em formato binário
    status?: "Ativo" | "Inativo" | "Finalizado"; // Status do livro, com valor padrão
};
