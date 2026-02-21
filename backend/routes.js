const express = require("express");
const db = require("./db");

const router = express.Router();

// Health check or welcome endpoint for /api
router.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

router.get("/stats", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM stats LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/charts", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM charts ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch charts" });
  }
});

router.get("/recent-orders", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC LIMIT 10",
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/recent-activity", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM activities ORDER BY created_at DESC LIMIT 20",
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Users endpoint - reads from `users` table if present, otherwise returns sample data
router.get("/users", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC LIMIT 50",
    );
    if (rows && rows.length) return res.json(rows);
  } catch (err) {
    console.warn(
      "users table not found or query failed, returning sample users",
      err.message || err,
    );
  }

  // Fallback sample data
  res.json([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "admin",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      role: "user",
      created_at: new Date(),
    },
  ]);
});

// Create message
router.post("/messages", async (req, res) => {
  const { sender, subject, body: messageBody, read } = req.body || {};
  if (!subject) return res.status(400).json({ error: "subject required" });
  try {
    const { rows } = await db.query(
      "INSERT INTO messages (sender, subject, body, read) VALUES ($1, $2, $3, $4) RETURNING id, sender, subject, body, read, created_at",
      [sender || null, subject, messageBody || null, !!read],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Failed to create message", err);
    res.status(500).json({ error: "Failed to create message" });
  }
});

// Update message
router.put("/messages/:id", async (req, res) => {
  const id = req.params.id;
  const { sender, subject, body: messageBody, read } = req.body || {};
  try {
    const { rows } = await db.query(
      "UPDATE messages SET sender = COALESCE($1, sender), subject = COALESCE($2, subject), body = COALESCE($3, body), read = COALESCE($4, read) WHERE id = $5 RETURNING id, sender, subject, body, read, created_at",
      [sender, subject, messageBody, read, id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "message not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to update message", err);
    res.status(500).json({ error: "Failed to update message" });
  }
});

// Delete message
router.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete message", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// Create product
router.post("/products", async (req, res) => {
  const { name, price, stock } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  try {
    const { rows } = await db.query(
      "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING id, name, price, stock, created_at",
      [name, price || null, stock || 0],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Failed to create product", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product
router.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body || {};
  try {
    const { rows } = await db.query(
      "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), stock = COALESCE($3, stock) WHERE id = $4 RETURNING id, name, price, stock, created_at",
      [name, price, stock, id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "product not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to update product", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete product", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  const { name, email, role } = req.body || {};
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  try {
    const { rows } = await db.query(
      "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at",
      [name, email, role || "user"],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Failed to create user", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body || {};
  if (!id) return res.status(400).json({ error: "id required" });
  try {
    const { rows } = await db.query(
      "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), role = COALESCE($3, role) WHERE id = $4 RETURNING id, name, email, role, created_at",
      [name, email, role, id],
    );
    if (!rows.length) return res.status(404).json({ error: "user not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to update user", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "id required" });
  try {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete user", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Products endpoint
router.get("/products", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, name, price, stock, created_at FROM products ORDER BY id DESC LIMIT 50",
    );
    if (rows && rows.length) return res.json(rows);
  } catch (err) {
    console.warn(
      "products table not found or query failed, returning sample products",
      err.message || err,
    );
  }

  res.json([
    {
      id: 1,
      name: "Product A",
      price: 99.99,
      stock: 12,
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Product B",
      price: 49.5,
      stock: 40,
      created_at: new Date(),
    },
  ]);
});

// Messages endpoint (inbox)
router.get("/messages", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, sender, subject, body, created_at, read FROM messages ORDER BY created_at DESC LIMIT 50",
    );
    if (rows && rows.length) return res.json(rows);
  } catch (err) {
    console.warn(
      "messages table not found or query failed, returning sample messages",
      err.message || err,
    );
  }

  res.json([
    {
      id: 1,
      sender: "support@example.com",
      subject: "Welcome",
      body: "Welcome to the panel",
      created_at: new Date(),
      read: false,
    },
    {
      id: 2,
      sender: "noreply@example.com",
      subject: "Report Ready",
      body: "Your report is ready",
      created_at: new Date(),
      read: true,
    },
  ]);
});

// Settings endpoint - returns basic app settings (stored or defaults)
router.get("/settings", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT key, value FROM settings LIMIT 100",
    );
    if (rows && rows.length)
      return res.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
  } catch (err) {
    console.warn(
      "settings table not found or query failed, returning defaults",
      err.message || err,
    );
  }

  res.json({
    site_name: "AdminPanel",
    items_per_page: 20,
    allow_signups: true,
  });
});

// Update multiple settings (upsert key/value pairs)
router.put("/settings", async (req, res) => {
  const payload = req.body || {};
  if (typeof payload !== "object")
    return res.status(400).json({ error: "invalid body" });
  try {
    const keys = Object.keys(payload);
    for (const key of keys) {
      const value = String(payload[key]);
      await db.query(
        "INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        [key, value],
      );
    }
    // Return current settings
    const { rows } = await db.query("SELECT key, value FROM settings");
    return res.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
  } catch (err) {
    console.error("Failed to update settings", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// Analytics / reports endpoints can aggregate existing tables
router.get("/analytics", async (req, res) => {
  try {
    // Simple aggregation using existing stats table
    const { rows } = await db.query("SELECT * FROM stats LIMIT 1");
    const stats = rows[0] || {};
    return res.json({ stats });
  } catch (err) {
    console.warn(
      "analytics query failed, returning sample analytics",
      err.message || err,
    );
  }

  res.json({ stats: { total_sales: 0, total_orders: 0 } });
});

router.get("/reports", async (req, res) => {
  try {
    // Example: return latest orders as a report
    const { rows } = await db.query(
      "SELECT id, customer_name, product, price, status, created_at FROM orders ORDER BY created_at DESC LIMIT 50",
    );
    if (rows) return res.json(rows);
  } catch (err) {
    console.warn(
      "reports query failed, returning empty report",
      err.message || err,
    );
  }

  res.json([]);
});

module.exports = router;
