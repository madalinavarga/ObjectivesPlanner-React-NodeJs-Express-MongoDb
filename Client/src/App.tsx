import { Route, Routes } from "react-router-dom";

import Objectives from "./pages/Objectives";
import Objective from "./pages/Objective";

function App() {
  return (
      <Routes>
        <Route path="/Objectives" element={<Objectives />} />
        <Route path="/Objectives/:id" element={<Objective />} />
      </Routes>
  );
}

export default App;
