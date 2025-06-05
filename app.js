const express = require("express");
const path = require("node:path");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));

// Data store
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date("2025-06-05T12:00:00Z"), // fixed timestamp for consistency
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date("2025-06-05T12:01:00Z"),
  },
];

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const user = req.body.user?.trim();
  const text = req.body.text?.trim();

  if (user && text) {
    messages.push({
      user,
      text,
      added: new Date(),
    });
  }
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
