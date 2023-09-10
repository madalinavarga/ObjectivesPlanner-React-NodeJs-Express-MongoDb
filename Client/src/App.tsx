import { Route, Routes } from "react-router-dom";

import Objectives from "./pages/Objectives";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Objectives />} />
      </Routes>
  );
}

export default App;
