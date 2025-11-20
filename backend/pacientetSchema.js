const mongoose = require("mongoose");

const pacientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  cardnumber: String,
  birthday: Date,
  city: String,
  service: String,
  price: Number,
  date: String
});

const Pacient = mongoose.model("pacientet", pacientSchema);

module.exports = Pacient;
