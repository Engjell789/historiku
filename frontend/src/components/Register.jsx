import React, { useState } from "react";
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Pacienti = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    cardnumber: "",
    day: "",
    month: "",
    year: "",
    birthday: "",
    city: "",
    service: "",
    price: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  const updated = { ...formData, [name]: value };

  // Nëse ka ditë, muaj dhe vit → krijo datën finale
  if (updated.day && updated.month && updated.year) {
    updated.birthday = `${updated.year}-${String(updated.month).padStart(2,"0")}-${String(updated.day).padStart(2,"0")}`;
  }

  setFormData(updated);
};


  const handleSubmit = async () => {
  const requiredFields = ["name", "surname", "cardnumber", "day", "month", "year", "city", "service", "price"];

  const emptyField = requiredFields.find(field => !formData[field]);
  if (emptyField) {
    toast.error("Ju lutem plotësoni të gjitha fushat!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
    return;
  }

  // Objekt i ri që dërgohet te backend
  const submitData = {
    name: formData.name,
    surname: formData.surname,
    cardnumber: formData.cardnumber,
    birthday: formData.birthday,  // vetëm 1 fushë
    city: formData.city,
    service: formData.service,
    price: formData.price,
  };

  try {
    await axios.post("http://localhost:5000/api/pacientet", submitData);

    toast.success("Regjistrimi u krye me sukses!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    setFormData({
      name: "",
      surname: "",
      cardnumber: "",
      day: "",
      month: "",
      year: "",
      city: "",
      service: "",
      price: "",
      birthday: "",
    });

  } catch (err) {
    toast.error("❌ Gabim gjatë regjistrimit!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  }
};


  

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container py-4 shadow-lg p-4 bg-white rounded" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <h3 className="bg-info text-dark py-2 rounded">Regjistro Pacientin</h3>
        </div>

        <div className="row">
          {/* Menu e majtë */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <button className="btn btn-primary w-75 mb-3" onClick={()=> navigate("/regjistro")}>Regjistro</button>
            <button className="btn btn-success w-75" onClick={()=> navigate("/historiku")}>Historiku</button>
          </div>

          {/* Vijë ndarëse */}
          <div className="col-12 col-md-1 d-none d-md-flex justify-content-center">
            <div className="border-end border-3 border-secondary" style={{ height: "100%" }}></div>
          </div>

          {/* Forma e pacientit */}
          <div className="col-12 col-md-8">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="form-control" 
                placeholder="Emri" />
              </div>
              <div className="col-12 col-sm-6">
                <input 
                type="text"
                name="surname" 
                value={formData.surname}
                onChange={handleChange}
                className="form-control" 
                placeholder="Mbiemri" />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="cardnumber"
                  value={formData.cardnumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nr. i letërnjoftimit"
                />
              </div>
              {/* Datelindja */}
              {/* Datelindja (vetëm për UI, dërgon birthday si një string) */}
              <div className="col-12 col-sm-6">
                <div className="d-flex gap-2">

                  {/* Dita */}
                  <select
                    name="day"
                    className="form-control"
                    value={formData.day || ""}
                    onChange={handleChange}
                  >
                    <option value="">Dita</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>

                  {/* Muaji */}
                  <select
                    name="month"
                    className="form-control"
                    value={formData.month || ""}
                    onChange={handleChange}
                  >
                    <option value="">Muaji</option>
                    <option value="1">Janar</option>
                    <option value="2">Shkurt</option>
                    <option value="3">Mars</option>
                    <option value="4">Prill</option>
                    <option value="5">Maj</option>
                    <option value="6">Qershor</option>
                    <option value="7">Korrik</option>
                    <option value="8">Gusht</option>
                    <option value="9">Shtator</option>
                    <option value="10">Tetor</option>
                    <option value="11">Nëntor</option>
                    <option value="12">Dhjetor</option>
                  </select>

                  {/* Viti */}
                  <select
                    name="year"
                    className="form-control"
                    value={formData.year || ""}
                    onChange={handleChange}
                  >
                    <option value="">Viti</option>
                    {Array.from({ length: 120 }, (_, i) => 2025 - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <input 
                type="text"
                name="city" 
                value={formData.city}
                onChange={handleChange}
                className="form-control" 
                placeholder="Qyteti" />
              </div>

              <div className="col-9" style={{ marginTop: "40px" }}>
                <textarea
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Shërbimi"
                ></textarea>
              </div>

              <div className="col-3" style={{ marginTop: "40px" }}>
              <div className="input-group">
                <input
                  type="text" // jo number
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) { // lejon vetëm numra
                      handleChange(e);
                    }
                  }}
                  className="form-control"
                  placeholder="Çmimi"
                />
                <span className="input-group-text">€</span>
              </div>
              </div>

              <div className="col-12 text-center">
                <button onClick={handleSubmit} className="btn btn-dark px-5">Ruaj</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Pacienti;
