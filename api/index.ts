const express = require("express");
const app = express();

app.get("/api", (req, res) => res.send("Express on Vercel"));

app.get("/hello", (req, res) => res.send("Express on Vercel hello"));

app.get("/api/hello", (req, res) => res.send("Express on Vercel api/hello"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;