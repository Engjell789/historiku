import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Historiku from "./components/Historiku";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/historiku" element={<Historiku />} />

        <Route path="*" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
