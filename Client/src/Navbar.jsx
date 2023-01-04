import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        My Kitchen
      </Link>
      <ul>
      <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/addIngredient">Add Ingredient</Link>
        </li>
        <li>
        <Link to="/addRecipe">Add Recipe</Link>
        </li>
      </ul>
    </nav>
  );
}
