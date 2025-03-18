-- Inserts para a tabela `users`
INSERT INTO users (id_user, name, email, passwordHash, phone, address, user_type, reset_token, account_status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'João Silva', 'joao@email.com', 'hash123', '11999999999', 'Rua A, 123', 'comprador', NULL, 'ativo'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Maria Souza', 'maria@email.com', 'hash456', '11988888888', 'Rua B, 456', 'vendedor', NULL, 'ativo'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Admin', 'admin@email.com', 'hash789', NULL, NULL, 'admin', NULL, 'ativo');

-- Inserts para a tabela `sessions`
INSERT INTO sessions (id_session, id_user, login_time, logout_time)
VALUES
    ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '2023-10-01 10:00:00', '2023-10-01 12:00:00'),
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '2023-10-01 11:00:00', '2023-10-01 13:00:00'),
    ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '2023-10-01 12:00:00', '2023-10-01 14:00:00');

-- Inserts para a tabela `password_reset_requests`
INSERT INTO password_reset_requests (id_user, token, expiration)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'token123', '2023-10-02 10:00:00'),
    ('550e8400-e29b-41d4-a716-446655440001', 'token456', '2023-10-02 11:00:00'),
    ('550e8400-e29b-41d4-a716-446655440002', 'token789', '2023-10-02 12:00:00');

-- Inserts para a tabela `books`
INSERT INTO books (id_user, title, author, publisher, release_date, category, price, description, isbn, image_url, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Dom Quixote', 'Miguel de Cervantes', 'Editora A', '1605-01-01', 'Literatura Clássica', 50.00, 'Um clássico da literatura mundial.', '9781234567890', 'http://imagem.com/quixote.jpg', 'disponivel'),
    ('550e8400-e29b-41d4-a716-446655440001', '1984', 'George Orwell', 'Editora B', '1949-06-08', 'Ficção Científica', 40.00, 'Uma distopia famosa.', '9781234567891', 'http://imagem.com/1984.jpg', 'disponivel'),
    ('550e8400-e29b-41d4-a716-446655440001', 'O Senhor dos Anéis', 'J.R.R. Tolkien', 'Editora C', '1954-07-29', 'Fantasia', 60.00, 'Uma épica jornada na Terra-média.', '9781234567892', 'http://imagem.com/senhor-aneis.jpg', 'disponivel');

-- Inserts para a tabela `book_categories`
INSERT INTO book_categories (name)
VALUES
    ('Literatura Clássica'),
    ('Ficção Científica'),
    ('Fantasia');

-- Inserts para a tabela `book_inventory`
INSERT INTO book_inventory (id_book, quantity)
VALUES
    (1, 10),
    (2, 5),
    (3, 8);

-- Inserts para a tabela `orders`
INSERT INTO orders (id_buyer, order_date, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '2023-10-01 10:00:00', 'pendente'),
    ('550e8400-e29b-41d4-a716-446655440000', '2023-10-01 11:00:00', 'em_transito'),
    ('550e8400-e29b-41d4-a716-446655440001', '2023-10-01 12:00:00', 'entregue');

-- Inserts para a tabela `order_items`
INSERT INTO order_items (id_order, id_book, quantity, price)
VALUES
    (1, 1, 1, 50.00),
    (1, 2, 1, 40.00),
    (2, 3, 2, 60.00);

-- Inserts para a tabela `transactions`
INSERT INTO transactions (id_order, total_amount, payment_method, payment_status)
VALUES
    (1, 90.00, 'pix', 'pago'),
    (2, 120.00, 'cartao', 'pago'),
    (3, 60.00, 'pix', 'pendente');

-- Inserts para a tabela `invoices`
INSERT INTO invoices (id_order, invoice_number)
VALUES
    (1, 'INV-001'),
    (2, 'INV-002'),
    (3, 'INV-003');

-- Inserts para a tabela `deliveries`
INSERT INTO deliveries (id_order, delivery_address, estimated_date, status)
VALUES
    (1, '{"rua": "Rua A, 123", "cidade": "São Paulo"}', '2023-10-02', 'preparando'),
    (2, '{"rua": "Rua B, 456", "cidade": "Rio de Janeiro"}', '2023-10-03', 'a_caminho'),
    (3, '{"rua": "Rua C, 789", "cidade": "Belo Horizonte"}', '2023-10-04', 'entregue');

-- Inserts para a tabela `delivery_tracking`
INSERT INTO delivery_tracking (id_delivery, status)
VALUES
    (1, 'preparando'),
    (2, 'a_caminho'),
    (3, 'entregue');

-- Inserts para a tabela `reviews`
INSERT INTO reviews (id_user, id_book, rating, comment)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 1, 5, 'Excelente livro!'),
    ('550e8400-e29b-41d4-a716-446655440001', 2, 4, 'Muito bom, mas assustador.'),
    ('550e8400-e29b-41d4-a716-446655440000', 3, 5, 'Obra-prima da fantasia.');

-- Inserts para a tabela `wishlist`
INSERT INTO wishlist (id_user, id_book, added_date)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 1, '2023-10-01 10:00:00'),
    ('550e8400-e29b-41d4-a716-446655440001', 2, '2023-10-01 11:00:00'),
    ('550e8400-e29b-41d4-a716-446655440000', 3, '2023-10-01 12:00:00');

-- Inserts para a tabela `favorites`
INSERT INTO favorites (id_user, id_book, added_date)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 1, '2023-10-01 10:00:00'),
    ('550e8400-e29b-41d4-a716-446655440001', 2, '2023-10-01 11:00:00'),
    ('550e8400-e29b-41d4-a716-446655440000', 3, '2023-10-01 12:00:00');

-- Inserts para a tabela `admin_actions`
INSERT INTO admin_actions (id_admin, id_user_affected, action_type)
VALUES
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'bloquear'),
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'desbloquear'),
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'desbloquear');

-- Inserts para a tabela `sales_reports`
INSERT INTO sales_reports (report_type, report_data)
VALUES
    ('livros_mais_vendidos', '{"livro1": 10, "livro2": 8, "livro3": 5}'),
    ('usuarios_ativos', '{"usuarios": 150}'),
    ('livros_mais_vendidos', '{"livro1": 12, "livro2": 9, "livro3": 6}');

-- Inserts para a tabela `audit_logs`
INSERT INTO audit_logs (id_user, action)
VALUES
    ('550e8400-e29b-41d4-a716-446655440002', 'Bloqueou usuário João Silva'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Desbloqueou usuário Maria Souza'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Gerou relatório de vendas');

-- Inserts para a tabela `coupons`
INSERT INTO coupons (code, discount, expiration_date, status)
VALUES
    ('CUPOM10', 10.00, '2023-12-31', 'ativo'),
    ('CUPOM20', 20.00, '2023-12-31', 'ativo'),
    ('CUPOM30', 30.00, '2023-12-31', 'inativo');

-- Inserts para a tabela `messages`
INSERT INTO messages (id_user, message, response, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Quando chega meu pedido?', 'Seu pedido está a caminho.', 'fechado'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Preciso de ajuda com meu livro.', 'Claro, como posso ajudar?', 'aberto'),
    ('550e8400-e29b-41d4-a716-446655440000', 'O livro chegou danificado.', 'Vamos enviar um novo.', 'fechado');

-- Inserts para a tabela `notifications`
INSERT INTO notifications (id_user, message, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Seu pedido foi enviado.', 'nao_lida'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Seu livro foi vendido.', 'nao_lida'),
    ('550e8400-e29b-41d4-a716-446655440000', 'Avalie seu pedido.', 'nao_lida');

-- Inserts para a tabela `book_recommendations`
INSERT INTO book_recommendations (id_user, id_book, reason)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 1, 'Clássico imperdível.'),
    ('550e8400-e29b-41d4-a716-446655440001', 2, 'Leitura obrigatória.'),
    ('550e8400-e29b-41d4-a716-446655440000', 3, 'Fantasia incrível.');

-- Inserts para a tabela `subscriptions`
INSERT INTO subscriptions (id_user, plan, start_date, end_date, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'mensal', '2023-10-01', '2023-11-01', 'ativo'),
    ('550e8400-e29b-41d4-a716-446655440001', 'anual', '2023-10-01', '2024-10-01', 'ativo'),
    ('550e8400-e29b-41d4-a716-446655440002', 'mensal', '2023-10-01', '2023-11-01', 'inativo');

-- Inserts para a tabela `book_requests`
INSERT INTO book_requests (id_user, title, author, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'O Hobbit', 'J.R.R. Tolkien', 'pendente'),
    ('550e8400-e29b-41d4-a716-446655440001', 'A Revolução dos Bichos', 'George Orwell', 'pendente'),
    ('550e8400-e29b-41d4-a716-446655440000', 'Cem Anos de Solidão', 'Gabriel García Márquez', 'pendente');

-- Inserts para a tabela `events`
INSERT INTO events (name, description, start_date, end_date, status)
VALUES
    ('Feira do Livro', 'Evento com descontos em livros.', '2023-11-01', '2023-11-07', 'ativo'),
    ('Lançamento de Novidades', 'Conheça os novos livros.', '2023-12-01', '2023-12-03', 'ativo'),
    ('Promoção de Natal', 'Descontos especiais de Natal.', '2023-12-20', '2023-12-25', 'inativo');