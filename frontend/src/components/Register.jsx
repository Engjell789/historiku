import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pacienti = () => {
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container py-4 shadow-lg p-4 bg-white rounded" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <h3 className="bg-info text-dark py-2 rounded">Regjistro Pacientin</h3>
        </div>

        <div className="row">
          {/* Menu e majtë */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <button className="btn btn-primary w-75 mb-3">Regjistro</button>
            <button className="btn btn-success w-75">Historiku</button>
          </div>

          {/* Vijë ndarëse */}
          <div className="col-12 col-md-1 d-none d-md-flex justify-content-center">
            <div className="border-end border-3 border-secondary" style={{ height: "100%" }}></div>
          </div>

          {/* Forma e pacientit */}
          <div className="col-12 col-md-8">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control" placeholder="Emri" />
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control" placeholder="Mbiemri" />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nr. i letërnjoftimit"
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Shërbimi"
                ></textarea>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-dark px-5">Ruaj</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pacienti;
