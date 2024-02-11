const express = require("express");
const app = express();
const fs = require("fs").promises;

const PORT = 3000;

app.use(express.json());

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
