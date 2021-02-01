const express = require("express"),
  path = require("path");

const app = express();

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

app.listen(3000, () => {
  console.log("Frontend server is running at port 3000.");
});
