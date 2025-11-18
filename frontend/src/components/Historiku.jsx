import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Historiku = () => {
  const navigate = useNavigate();
  const [pacientet, setPacientet] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // inputi i search
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pacientet");
        setPacientet(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së të dhënave", err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Toast me pyetje PO/JO për fshirje
  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>A doni me e fshi këtë pacient?</p>
        <div className="d-flex justify-content-end gap-2 mt-2">
          <button className="btn btn-sm btn-success" onClick={() => confirmDelete(id)}>Po</button>
          <button className="btn btn-sm btn-danger" onClick={() => toast.dismiss()}>Jo</button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    toast.dismiss(); // mbyll pyetjen
    try {
      await axios.delete(`http://localhost:5000/api/pacientet/${id}`);
      setPacientet(pacientet.filter((p) => p.id !== id));
      toast.success("Pacienti u fshi me sukses!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      toast.error("Gabim gjatë fshirjes!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

   // Filtrimi i pacientëve bazuar në searchTerm
  const filteredPacientet = pacientet.filter((p) => {
    const term = searchTerm.toLowerCase().replace(/\s/g, ''); // hiq hapësirat
    return (
      p.name.toLowerCase().includes(term) ||
      p.surname.toLowerCase().includes(term) ||
      p.cardnumber.startsWith(term) // ndryshimi kryesor
    );
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container py-4 shadow-lg p-4 bg-white rounded" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <h3 className="bg-info text-dark py-2 rounded" >Historiku i Pacientëve</h3>
          
        </div>

        <div className="row">
          {/* Menu e Majtë */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center">
          {/* Butonat */}
          <button className="btn btn-primary w-75 mb-3" onClick={() => navigate("/regjistro")}>Regjistro</button>
          <button className="btn btn-success w-75 mb-3">Historiku</button>

          {/* Input me margin-top */}
          <div style={{ width: "75%", marginTop: "20px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Kërko"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "1px solid #007bff",
                borderRadius: "0.25rem",
                padding: "0.375rem 0.75rem",
                width: "100%", // mbulon wrapper-in
              }}
            />
          </div>
          
          <p style={{ marginTop: "10px", fontSize: "1rem" }}>
            Total: {filteredPacientet.length} pacient{filteredPacientet.length !== 1 ? 'ë' : ''}
          </p>
        </div>


          {/* Vijë ndarëse */}
          <div className="col-12 col-md-1 d-none d-md-flex justify-content-center">
            <div className="border-end border-3 border-secondary" style={{ height: "100%" }}></div>
          </div>

          {/* Lista me të dhëna */}
          <div className="col-12 col-md-8">
            <div style={{ maxHeight: "325px", overflowY: "auto" }}>
              {filteredPacientet.length > 0 ? (
                filteredPacientet.map((p) => (
                  <div
                    key={p.id}
                    className="shadow-sm p-3 mb-4 rounded position-relative"
                    style={{ border: "1px solid #dadada", backgroundColor: "#f8f9fa" }}
                  >
                    {/* Ikona Delete */}
                    <i
                      className="bi bi-trash3-fill text-danger"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(p.id)}
                      title="Fshij pacientin"
                    ></i>

                    {/* Emri & Mbiemri */}
                    <h5 className="text-primary mb-3">{p.name} {p.surname}</h5>

                    {/* Të dhënat */}
                    <div className="row" style={{ fontSize: "0.95rem" }}>
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Nr. Letërnjoftimit:</strong> {p.cardnumber}
                      </div>
                      
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Shërbimi:</strong> {p.service}
                      </div>
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Datëlindja:</strong> {formatDate(p.birthday)}
                      </div>
                      
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Çmimi:</strong> {p.price}€
                      </div>
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Qyteti:</strong> {p.city}
                      </div>
                      <div className="col-12 col-md-6 mb-1">
                        <strong>Data Regjistrimit:</strong> {formatDate(p.date)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">
                  Nuk ka asnjë pacient të regjistruar...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Historiku;
