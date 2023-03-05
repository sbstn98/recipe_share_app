const express = require("express");
const { connection } = require("./db.config");
const app = express();
const port = 3001;

app.use(express.json());


app.listen(port, function() {
    console.log(`Listening on ${port}...`);
  });

  app.get("/recipes", async (req, res) => {
    const connected = await connection();
    const [recipes, _] = await connected.execute(`SELECT * FROM recipes`);
  
    res.status(200).json({ recipes }) 
  });

  app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const connected = await connection();
    const [recipes, _] = await connected.execute(
      `SELECT * FROM recipes WHERE id = ?`,
      [id]
    );
    if (recipes.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    const recipe = recipes[0];
    res.status(200).json({ recipe })
  });