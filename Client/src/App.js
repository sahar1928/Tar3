import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddIngredient from "./Pages/AddIngredient";
import AddRecipe from "./Pages/AddRecipe";
import Navbar from "./Navbar";
import NotFound from "./Pages/NotFound";


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="addRecipe" element={<AddRecipe />}/>
          <Route path="/addIngredient" element={<AddIngredient />}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
