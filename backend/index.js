const express = require("express");
const app = express();

const cors = require("cors");

// Database connection
const exe = require("./db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "FloraMart Server Started!",
  });
});

// ==========================================
// GET ALL FLOWERS
// ==========================================

app.get("/api/flower", async (req, res) => {
  try {
    const sql = "SELECT * FROM flowers";

    const data = await exe(sql);

    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to fetch products",
    });
  }
});

// ==========================================
// GET FLOWER BY ID
// ==========================================

app.get("/api/flower/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM flowers WHERE id = ?";

    const data = await exe(sql, [id]);

    if (data.length === 0) {
      return res.status(404).json({
        error: "Flower not found",
      });
    }

    res.json(data[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to access product",
    });
  }
});

// ==========================================
// ADD FLOWER
// ==========================================

app.post("/api/flower", async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    // Basic validation

    if (!name || !price || !image || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const sql = `
      INSERT INTO flowers
      (name, price, image, category)
      VALUES (?, ?, ?, ?)
    `;

    const data = await exe(sql, [name, price, image, category]);

    res.status(201).json({
      message: "Flower added successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to insert product",
    });
  }
});

// ==========================================
// UPDATE FLOWER
// ==========================================

app.put("/api/flower/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, price, image, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const sql = `
      UPDATE flowers
      SET
        name = ?,
        price = ?,
        image = ?,
        category = ?
      WHERE id = ?
    `;

    const data = await exe(sql, [name, price, image, category, id]);

    if (data.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: data,
    });
  } catch (err) {
    console.log("UPDATE ERROR:", err);

    res.status(500).json({
      error: "Unable to update product",
    });
  }
});

// ==========================================
// DELETE FLOWER
// ==========================================

app.delete("/api/flower/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "DELETE FROM flowers WHERE id = ?";

    const data = await exe(sql, [id]);

    // Product doesn't exist

    if (data.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to delete product",
    });
  }
});

//login

app.post("/api/user/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    // Check existing email
    const existingUser = await exe("SELECT * FROM customers WHERE email = ?", [
      email,
    ]);

    console.log("Existing users:", existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const sql = `
      INSERT INTO customers (name, email, password)
      VALUES (?, ?, ?)
    `;

    const result = await exe(sql, [name, email, hashedPassword]);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable to create account",
      details: err.message,
    });
  }
});

app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user by email
    const existingUser = await exe("SELECT * FROM customers WHERE email = ?", [
      email,
    ]);

    // User not found
    if (existingUser.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = existingUser[0];

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Wrong password
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // ==========================================
    // CREATE JWT TOKEN
    // ==========================================

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      "floramart_secret_key",
      {
        expiresIn: "1d",
      },
    );

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Login successful",

      token: token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      error: "Unable to login account",
      details: err.message,
    });
  }
});

app.post("/user/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Insert contact data
    const sql =
      "INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)";

    const d = await exe(sql, [name, email, phone, message]);

    // Check if data was inserted
    if (d.affectedRows === 0) {
      return res.status(500).json({
        error: "Unable to send message",
      });
    }

    // Success response
    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (err) {
    console.log("Contact API Error:", err);

    return res.status(500).json({
      error: "Unable to send message",
    });
  }
});

// ==========================================
// GET ALL ORDERS
// ==========================================

app.get("/api/flower/order", async (req, res) => {
  try {
    const sql = "SELECT * FROM orders";

    const data = await exe(sql);

    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to access orders",
    });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const existingUser = await exe(
      "SELECT * FROM admin WHERE email = ? and password = ?",
      [email, password],
    );
    if (existingUser.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const Admin = existingUser[0];

    const token = jwt.sign(
      { id: Admin.id, name: Admin.name, email: Admin.email },
      "floramart_secret_key",
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: { id: Admin.id, name: Admin.name, email: Admin.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Unable to login account" });
  }
});



// ADD TO CART
app.post("/api/cart", async (req, res) => {
  try {
    const { user_id, flower_id, quantity } = req.body;

    if (!user_id || !flower_id) {
      return res.status(400).json({
        error: "User ID and Flower ID are required",
      });
    }

    const qty = quantity || 1;

    // Check if item already exists
    const existing = await exe(
      "SELECT * FROM cart WHERE user_id = ? AND flower_id = ?",
      [user_id, flower_id]
    );

    if (existing.length > 0) {
      await exe(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND flower_id = ?",
        [qty, user_id, flower_id]
      );

      return res.status(200).json({
        message: "Cart quantity updated",
      });
    }

    await exe(
      "INSERT INTO cart (user_id, flower_id, quantity) VALUES (?, ?, ?)",
      [user_id, flower_id, qty]
    );

    return res.status(201).json({
      message: "Item added to cart",
    });

  } catch (err) {
    console.log("ADD CART ERROR:", err);

    return res.status(500).json({
      error: "Unable to add item to cart",
    });
  }
});


// GET CART
app.get("/api/cart/:user_id", async (req, res) => {
  try {

    const { user_id } = req.params;

    const cart = await exe(
      `SELECT
        cart.id,
        cart.user_id,
        cart.flower_id,
        cart.quantity,
        flowers.name,
        flowers.price,
        flowers.image,
        flowers.category
      FROM cart
      INNER JOIN flowers
        ON cart.flower_id = flowers.id
      WHERE cart.user_id = ?
      ORDER BY cart.id DESC`,
      [user_id]
    );

    return res.status(200).json(cart);

  } catch (err) {

    console.log("GET CART ERROR:", err);

    return res.status(500).json({
      error: "Unable to fetch cart",
    });

  }
});


// UPDATE CART QUANTITY
app.put("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        error: "Quantity must be at least 1",
      });
    }

    const result = await exe(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [quantity, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Cart updated successfully",
    });

  } catch (err) {
    console.log("UPDATE CART ERROR:", err);

    return res.status(500).json({
      error: "Unable to update cart",
    });
  }
});


// DELETE CART ITEM
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await exe(
      "DELETE FROM cart WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Item removed from cart",
    });

  } catch (err) {
    console.log("DELETE CART ERROR:", err);

    return res.status(500).json({
      error: "Unable to remove cart item",
    });
  }
});



// ==========================================
// SERVER
// ==========================================

app.listen(8000, () => {
  console.log("Server Started on http://localhost:8000");
});
