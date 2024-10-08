const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 


app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'grocery_db', // Your MySQL database name
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });

  
  app.post("/add_grocery", (req, res) => {
    const sql =
      "INSERT INTO grocery (`name`,`category`,`quantity`) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.category, req.body.quantity];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Grocery added successfully" });
    });
  });


  app.get('/groceries', (req, res) => {
    const sql = 'SELECT * FROM grocery';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.delete('/groceries/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM grocery WHERE id = ?';

  // Execute the delete query
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error deleting grocery:', err);
          return res.status(500).json({ message: 'Server error' });
      }

      if (result.affectedRows === 0) {
          // No grocery item found with the given id
          return res.status(404).json({ message: 'Grocery item not found' });
      }

      // Success response
      res.status(200).json({ message: 'Grocery item deleted successfully' });
  });
});

app.put('/groceries/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, quantity } = req.body;

  const query = 'UPDATE grocery SET name = ?, category = ?, quantity = ? WHERE id = ?';

  // Execute the update query
  db.query(query, [name, category, quantity, id], (err, result) => {
      if (err) {
          console.error('Error updating grocery:', err);
          return res.status(500).json({ message: 'Server error' });
      }

      if (result.affectedRows === 0) {
          // No grocery item found with the given id
          return res.status(404).json({ message: 'Grocery item not found' });
      }

      // Success response
      res.status(200).json({ message: 'Grocery item updated successfully' });
  });
});

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });
