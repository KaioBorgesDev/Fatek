CREATE TABLE users (
    id_user VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    address JSON NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imagem_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);
