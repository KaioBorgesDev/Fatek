CREATE TABLE users (
    id_user VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NULL,
    address VARCHAR(100) NULL,
    user_type ENUM('comprador', 'vendedor', 'admin') DEFAULT 'comprador',
    reset_token VARCHAR(255) NULL,
    account_status ENUM('ativo', 'bloqueado') DEFAULT 'ativo'
);

CREATE TABLE sessions (
    id_session VARCHAR(36) PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    logout_time DATETIME NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE password_reset_requests (
    id_request INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiration DATETIME NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NULL,
    isbn VARCHAR(13) NULL,
    image_url VARCHAR(255) NOT NULL,
    status ENUM('disponivel', 'vendido', 'em_entrega') DEFAULT 'disponivel',
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE book_categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE book_inventory (
    id_inventory INT AUTO_INCREMENT PRIMARY KEY,
    id_book INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    id_buyer VARCHAR(36) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em_transito', 'entregue') DEFAULT 'pendente',
    FOREIGN KEY (id_buyer) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id_order_item INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    id_book INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id_transaction INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cartao', 'pix') DEFAULT 'pix',
    payment_status ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente',
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE
);

CREATE TABLE invoices (
    id_invoice INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    invoice_number VARCHAR(100) NOT NULL,
    issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE
);

CREATE TABLE deliveries (
    id_delivery INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    delivery_address JSON NOT NULL,
    estimated_date DATE NOT NULL,
    status ENUM('preparando', 'a_caminho', 'entregue') DEFAULT 'preparando',
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE
);

CREATE TABLE delivery_tracking (
    id_tracking INT AUTO_INCREMENT PRIMARY KEY,
    id_delivery INT NOT NULL,
    status ENUM('preparando', 'a_caminho', 'entregue') NOT NULL,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_delivery) REFERENCES deliveries(id_delivery) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id_review INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    id_book INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
    id_wishlist INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    id_book INT NOT NULL,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    id_favorite INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    id_book INT NOT NULL,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE admin_actions (
    id_action INT AUTO_INCREMENT PRIMARY KEY,
    id_admin VARCHAR(36) NOT NULL,
    id_user_affected VARCHAR(36) NOT NULL,
    action_type ENUM('bloquear', 'desbloquear') NOT NULL,
    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_admin) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_user_affected) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE sales_reports (
    id_report INT AUTO_INCREMENT PRIMARY KEY,
    report_type ENUM('livros_mais_vendidos', 'usuarios_ativos') NOT NULL,
    report_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    report_data JSON NOT NULL
);

CREATE TABLE audit_logs (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    action VARCHAR(255) NOT NULL,
    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE coupons (
    id_coupon INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount DECIMAL(5, 2) NOT NULL,
    expiration_date DATE NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

CREATE TABLE messages (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    response TEXT NULL,
    status ENUM('aberto', 'fechado') DEFAULT 'aberto',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id_notification INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('nao_lida', 'lida') DEFAULT 'nao_lida',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE book_recommendations (
    id_recommendation INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    id_book INT NOT NULL,
    reason TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
    id_subscription INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    plan ENUM('mensal', 'anual') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE book_requests (
    id_request INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status ENUM('pendente', 'atendido') DEFAULT 'pendente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE events (
    id_event INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);