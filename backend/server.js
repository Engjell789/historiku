const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
  origin: "https://historiku-frontend.onrender.com", // vendos linkun e frontend-it të Render
  methods: ["GET", "POST", "DELETE"],
  credentials: true // nëse përdor cookies (opsional)
}));
app.options("*", cors()); // lejon OPTIONS për të gjitha rruget


app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;


const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Lidhja me MongoDB u realizua me sukses!"))
  .catch(err => console.log("Gabim në lidhje:", err));


//Import modelin e pacientëve
const Pacient = require("./pacientetSchema");

//  POST – regjistrimi i pacientit
app.post("/api/pacientet", async (req, res) => {
  const { name, surname, cardnumber, birthday, city, service, price } = req.body;
  const date = new Date().toISOString().slice(0, 10);

  try {
    const pacient = new Pacient({ name, surname, cardnumber, birthday, city, service, price, date });
    await pacient.save();
    res.send("✅ Pacienti u regjistrua me sukses!");
  } catch (err) {
    console.log("Gabim:", err);
    res.status(500).send("Gabim gjatë regjistrimit!");
  }
});

// GET – marrja e të gjithë pacientëve
app.get("/api/pacientet", async (req, res) => {
  try {
    const pacientet = await Pacient.find().sort({ _id: -1 });
    res.json(pacientet);
  } catch (err) {
    console.error("Gabim gjatë marrjes së pacientëve:", err);
    res.status(500).send("Gabim gjatë marrjes së të dhënave");
  }
});

// ➤ DELETE – fshirja e pacientit
app.delete("/api/pacientet/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Pacient.findByIdAndDelete(id);
    res.send("✅ Pacienti u fshi me sukses!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Gabim gjatë fshirjes!");
  }
});


// ➤ Start serveri
app.listen(PORT, () => {
  console.log(`Serveri po funksionon në portin ${PORT}...`);
});