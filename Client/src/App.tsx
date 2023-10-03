import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Objectives from "./pages/Objectives";
import Objective from "./pages/Objective";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RootContext } from "./providers/rootContext";
import { useContext } from "react";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  const rootContext = useContext(RootContext);
  const token = rootContext?.token;

  if (
    (token == null && location.pathname !== "/Login") ||
    (token == null && location.pathname !== "/")
  ) {
    navigator("/Login");
  }
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Objectives" element={<Objectives />} />
      <Route path="/Objectives/:id" element={<Objective />} />
    </Routes>
  );
}

export default App;
