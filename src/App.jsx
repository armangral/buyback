import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AddProduct from "./pages/addProduct/addProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
