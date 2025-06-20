const {loginController, registerController, registerUserAdressController} = require("./adapters/controllers/UserController")
const {postBookController, purchaseBookController} = require("./adapters/controllers/BookController")
const {saveSubscriptionController} = require("./adapters/controllers/SubscriptionController")
const {saveWishController} = require("./adapters/controllers/WishController")
const {saveReviewController} = require("./adapters/controllers/ReviewController")
const {authJwt} = require("./adapters/midlewares/AuthJwt")

const multer = require("multer");
const express = require("express");
const cors = require("cors")
const app = express();
import pool from "./infra/Database/mysql";
import { addItemToCart, getAllItemsFromCart } from "./adapters/controllers/ShoppingCart"
import EmailerServiceImp from "./infra/Service/EmailerServiceImp";
import SendEmail from "./usecases/EmailCase/SendEmail";
const storage = multer.memoryStorage();
const upload = multer({ storage });
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
})

app.get("/send_email_teste", () => {
    const sendEmail = new SendEmail(new EmailerServiceImp());
    sendEmail.execute("1231", "Teste", "<h1>Teste</h1>", "Teste");
});

app.post("/login", loginController);

app.post("/register", registerController);

app.post("/book", upload.single("file"), authJwt, postBookController);

app.post("/address", authJwt, registerUserAdressController);

app.post("/buy", authJwt, purchaseBookController);

app.get("/teste", (req,res)=>{
    res.status(200).send("certo")
})

app.post("/review", authJwt, saveReviewController)

app.post("/wish", authJwt, saveWishController)

app.post("/cart/add", authJwt, addItemToCart)

app.get("/cart", authJwt, getAllItemsFromCart)

app.get("/isAdmin", authJwt, async (req,res)=>{
    const id_user = req.body.id_user;
    if (id_user !== "f1c509d6-1b11-434d-80aa-efd7856e62b2") {
        return res.status(200).send({isAdmin: false});
    }
    return res.status(200).send({isAdmin: true});
})


app.get("/admin/active-users-count", authJwt, async (req, res) => {
  try {
    const id_user = req.body.id_user || req.query.id_user;
    const role = req.body.role || req.query.role;
    console.log("ID do usuário:", role);

    if (role !== "admin") {
      return res.status(500).json({ error: "Acesso negado. Apenas administradores." });
    }

    console.log("ID do usuário:", id_user);
    const query = "SELECT COUNT(*) AS count FROM users WHERE account_status = 'ativo'";
    const [rows]: any = await pool.execute(query);

    const count = rows[0]?.count ?? 0;

    return res.status(200).json({ activeUsers: count });
  } catch (error) {
    console.error("Erro ao buscar usuários ativos:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id_category, name FROM book_categories ORDER BY name");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


app.post("/categories", authJwt, async (req, res) => {
  try {
    const { name, role } = req.body;

    if (role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores podem criar categorias." });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome da categoria é obrigatório." });
    }

    const [existing]: any = await pool.execute(
      "SELECT * FROM book_categories WHERE name = ?",
      [name.trim()]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Categoria já existe." });
    }

    await pool.execute("CALL create_category_if_not_exists(?)", [name.trim()]);

    return res.status(201).json({ message: "Categoria criada com sucesso." });

  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.post("/coupons", authJwt, async (req, res) => {
  try {
    const { code, discount, expiration_date, status, role } = req.body;

    if (role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores podem criar cupons." });
    }

    if (!code || !discount || !expiration_date) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const [existing] = await pool.execute("SELECT * FROM coupons WHERE code = ?", [code]);
    // @ts-ignore
    if (existing.length > 0) {
      return res.status(400).json({ error: "Cupom já existe." });
    }

    await pool.execute(
      `INSERT INTO coupons (code, discount, expiration_date, status)
       VALUES (?, ?, ?, ?)`,
      [code.trim(), discount, expiration_date, status || "ativo"]
    );

    return res.status(201).json({ message: "Cupom criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.get("/notifications", authJwt, async (req, res) => {
  try {
    const userId = req.body.id_user;

    if (!userId) {
      return res.status(400).json({ error: "Usuário não autenticado." });
    }

    const [rows]: any = await pool.execute(
      `SELECT id_notification, message, status, created_at
       FROM notifications
       WHERE id_user = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    const notifications = rows.map((row: any) => ({
      id: row.id_notification.toString(),
      title: "Nova notificação",  // Pode personalizar o título aqui
      message: row.message,
      read: row.status === "lida",
      created_at: row.created_at,
    }));

    return res.json(notifications);

  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.get("/coupons", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM view_coupons");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});
app.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE status = 'ativo' ORDER BY start_date DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/wishlist", authJwt, async (req, res) => {
  try {
    const userId = req.body.id_user;

    if (!userId) {
      return res.status(400).json({ error: "Usuário não autenticado." });
    }

    const [rows]: any = await pool.execute(
      "SELECT * FROM view_user_wishlist WHERE id_user = ?",
      [userId]
    );

    const wishlist = rows.map((row: any) => ({
      id: row.id_wishlist.toString(),
      added_date: row.added_date,
      book: {
        id: row.book_id,
        title: row.title,
        author: row.author,
        price: Number(row.price),
        cover_image: row.image_url,
      },
    }));

    return res.json(wishlist);
  } catch (error) {
    console.error("Erro ao buscar wishlist:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// GET todas as mensagens do usuário
app.get("/messages", authJwt, async (req, res) => {
  const userId = req.body.id_user;

  if (!userId) return res.status(400).json({ error: "Usuário não autenticado." });

  try {
    const [rows]: any = await pool.execute(
      "SELECT * FROM messages WHERE id_user = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// GET mensagem por ID
app.get("/messages/:id", authJwt, async (req, res) => {
  const userId = req.body.id_user;
  const id_message = req.params.id;

  try {
    const [rows]: any = await pool.execute(
      "SELECT * FROM messages WHERE id_message = ? AND id_user = ?",
      [id_message, userId]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Mensagem não encontrada." });

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});


// POST nova mensagem
app.post("/messages", authJwt, async (req, res) => {
  const userId = req.body.id_user;
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Mensagem é obrigatória." });

  try {
    const [result]: any = await pool.execute(
    "CALL insert_user_message(?, ?)",
    [userId, message]
    );

    res.status(201).json({ id_message: result.insertId });
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// PUT atualizar mensagem
app.put("/messages/:id", authJwt, async (req, res) => {
  const id_message = req.params.id;
  const { response, status } = req.body;

  try {
    const [result]: any = await pool.execute(
      "UPDATE messages SET response = ?, status = ? WHERE id_message = ?",
      [response || null, status || "aberto", id_message]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Mensagem não encontrada." });

    res.json({ message: "Mensagem atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});
app.get("/messages/all", authJwt, async (req, res) => {
  try {
    const [rows]: any = await pool.execute("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});


// DELETE remover mensagem
app.delete("/messages/:id", authJwt, async (req, res) => {
  const id_message = req.params.id;

  try {
    const [result]: any = await pool.execute(
      "DELETE FROM messages WHERE id_message = ?",
      [id_message]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Mensagem não encontrada." });

    res.json({ message: "Mensagem removida com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.post("/transactions", authJwt, async (req, res) => {
  const {
    cartItems,
    formData,
    selectedCoupon,
    paymentMethod,
  } = req.body;

  const userId = req.body.id_user;

  if (!cartItems || !formData || !paymentMethod) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  try {
    // 1. Criar pedido
    const [orderResult]: any = await pool.execute(
      "INSERT INTO orders (id_buyer) VALUES (?)",
      [userId]
    );
    const orderId = orderResult.insertId;

    // 2. Inserir itens no pedido
    const orderItemsInserts = cartItems.map(item => [
      orderId,
      item.bookId,
      item.quantity,
      item.price ?? 0,
    ]);

    await pool.query(
      "INSERT INTO order_items (id_order, id_book, quantity, price) VALUES ?",
      [orderItemsInserts]
    );

    // 3. Calcular total e desconto
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price ?? 0) * item.quantity,
      0
    );

    let discount = 0;
    if (selectedCoupon) {
      const [rows]: any = await pool.execute(
        "SELECT discount FROM coupons WHERE id_coupon = ? AND status = 'ativo' LIMIT 1",
        [selectedCoupon]
      );
      if (rows.length > 0) discount = rows[0].discount || 0;
    }
    const totalAmount = subtotal * (1 - discount / 100);

    // 4. Criar transação
    await pool.execute(
      "INSERT INTO transactions (id_order, total_amount, payment_method, payment_status) VALUES (?, ?, ?, 'pendente')",
      [orderId, totalAmount.toFixed(2), paymentMethod]
    );

    res.status(201).json({ id_order: orderId });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});


export default app;
