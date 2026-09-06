import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
