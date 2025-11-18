const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clinic_db"
});

db.connect(err => {
  if (err) {
    console.log("Gabim në lidhje:", err);
  } else {
    console.log("✅ Lidhja me MySQL u realizua me sukses!");
  }
});


// ➤ POST – regjistrimi i pacientit
app.post("/api/pacientet", (req, res) => {
  const { name, surname, cardnumber, birthday, city, service, price } = req.body;

  // Data e sotme automatike
  const date = new Date().toISOString().slice(0, 10);

  const sql = `
    INSERT INTO pacientet 
    (name, surname, cardnumber, birthday, city, service, price, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, surname, cardnumber, birthday, city, service, price, date],
    (err, result) => {
      if (err) {
        console.log("Gabim:", err);
        return res.status(500).send("Gabim gjatë regjistrimit!");
      }

      res.send("✅ Pacienti u regjistrua me sukses!");
    }
  );
});


// ➤ GET – marrja e të gjithë pacientëve
app.get("/api/pacientet", (req, res) => {
  db.query("SELECT * FROM pacientet ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim gjatë marrjes së të dhënave");
    } else {
      res.json(results);
    }
  });
});


// ➤ DELETE – fshirja e pacientit
app.delete("/api/pacientet/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM pacientet WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Gabim gjatë fshirjes!");
    } else {
      res.send("✅ Pacienti u fshi me sukses!");
    }
  });
});


// ➤ Start serveri
app.listen(5000, () => {
  console.log("Serveri po funksionon në portin 5000...");
});
