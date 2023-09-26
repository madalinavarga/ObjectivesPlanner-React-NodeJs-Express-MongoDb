import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Objectives from "./pages/Objectives";
import Objective from "./pages/Objective";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ContextProvider } from "./providers/rootContext";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  let token = localStorage.getItem("token");

  if (
    (token==null && location.pathname != "/Login") ||
    (token == null && location.pathname != "/")
  ) {
    navigator("/Login");
  }
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Objectives" element={<Objectives />} />
        <Route path="/Objectives/:id" element={<Objective />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
