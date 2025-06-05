const express = require("express");
const path = require("node:path");

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

// data
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// define the views and view engine app properties
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// paths
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const { user, text } = req.body;

  if (user && text) {
    messages.push({
      user: user,
      text: text,
      added: new Date(),
    });
  }

  res.redirect("/");
});

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
