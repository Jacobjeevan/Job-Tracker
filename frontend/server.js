const express = require("express"),
  path = require("path");

const app = express();

const port = 5003 || process.env.PORT;

app.use(express.static(path.join(__dirname, "dist/")));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "dist/") });
});

app.listen(port, () => {
  console.log(`Frontend server is running at port ${port}.`);
});
