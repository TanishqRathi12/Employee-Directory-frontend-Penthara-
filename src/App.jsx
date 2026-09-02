import EmployeeDirectory from "./pages/EmployeeDirectory";
import NotFound from "./pages/NotFound";

const App = () => {
  const path = window.location.pathname;

  if (path === "/") {
    return <EmployeeDirectory />; // Main page
  }
  
  return <NotFound />; // Fallback page 
};

export default App;
