import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { HomePage } from "./components/pages/HomePage";
import { CalculatorPage } from "./components/pages/CalculatorPage";
import { RegulationPage } from "./components/pages/RegulationPage";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokélead-calculator" element={<CalculatorPage />} />
        <Route path="/regulation-ma" element={<RegulationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
