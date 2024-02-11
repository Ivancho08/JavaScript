const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs").promises;

const PORT = 3000;

app.use(express.json());
app.use(cors());

// Endpoint para inicializar o agregar datos al archivo password.json
app.post("/initialize-passwords", async (req, res) => {
  try {
    const initialPasswords = ["hash1", "hash2", "hash3"]; // Puedes cambiar esto según tus necesidades
    await fs.writeFile("password.json", JSON.stringify(initialPasswords));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error initializing passwords:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/passwords", async (req, res) => {
  try {
    const passwords = req.body;
    await fs.writeFile("password.json", JSON.stringify(passwords));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error writing passwords to file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
