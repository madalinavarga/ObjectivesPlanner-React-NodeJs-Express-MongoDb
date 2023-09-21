import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import Objectives from "./pages/Objectives";
import Objective from "./pages/Objective";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ContextProvider, RootContext } from "./providers/rootContext";

function App() {
  const rootContext = useContext(RootContext);
  const navigator = useNavigate();
  const location = useLocation();

  if (
    (rootContext?.token == null && location.pathname !== "/Login") ||
    (rootContext?.token == null && location.pathname !== "/")
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
