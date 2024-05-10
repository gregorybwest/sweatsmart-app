const express = require("express");
const app = express();

app.get("/api/users", (req, res) => res.send("Express on Vercel"));

app.get("/api", (req, res) => res.send("Express on Vercel - Base Route"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
