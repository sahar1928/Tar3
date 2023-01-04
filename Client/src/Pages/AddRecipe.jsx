import React, { useState, useEffect } from "react";
import { Ingredient } from "../Classes/Ingredient";
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

export default function AddRecipe() {
  const [ingredients,setIngredients] = useState([]);
  const [formValue, setFormValue] = useState({
    rName: "",
    rImage: "",
    rCookingMethod: "",
    rTime: 0,
  });

  const resetForm = () => {
    setFormValue({
      rName: "",
      rImage: "",
      rCookingMethod: "",
      rTime: 0,
    });
  }

  useEffect(() => {
    return () => {
    try {
      const ingredientsTemp = [];
       fetch("https://localhost:44314/api/Ingredients")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            ingredientsTemp.push({
              Ingredient: new Ingredient(
                item.IngredientId,
                item.IngredientName,
                item.IngredientImage,
                item.IngredientCalories
              ),
              isChecked: false,
            });
            console.log(ingredientsTemp)
          });
          setIngredients([...ingredientsTemp]);
        });
    } catch (error) {
      console.log(error);
    }
}}, []);


  const onChange = (e) => {
    setFormValue((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const IngredientCheck = (event) =>{
    const index = event.target.value;
    const newIngredients = [...ingredients];
    newIngredients[index].isChecked = event.target.checked;
    setIngredients(newIngredients);
    console.log(ingredients)
  }

  const recipeIngredient = () => {
    const recipeIngredients = ingredients
      .filter((item) => item.isChecked)
      .map((item) => item.Ingredient.IngredientId);
      console.log(recipeIngredients)
    if (recipeIngredients) RecipeData(recipeIngredients);
    else alert("Please choose ingredients ");
  };

  const url = "https://localhost:44314/api/Recipes";

  const RecipeData = (recipeIngredients) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RecipeName: formValue.rName,
        RecipeImage: formValue.rImage,
        RecipeCookingMethod: formValue.rCookingMethod,
        RecipeTime: formValue.rTime,
        Ingredients: recipeIngredients,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {})
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
      });
      resetForm();
  };
  return (
    <>
      <h1>Add Recipe</h1>
      <form>
      <div className="form-group">
        <MDBValidation className="row g-3">
        <label htmlFor="rName">Name: </label>
          <MDBValidationItem tooltip className="col-md-4" feedback="Please fill in the recipe name ">
            <MDBInput
              value={formValue.rName}
              name="rName"
              onChange={onChange}
              id="validationCustom01"
              required
            />
          </MDBValidationItem>
          <label htmlFor="rImage">Image: </label>
          <MDBValidationItem
            feedback="Please insert an image of the complete result"
            tooltip
            className="col-md-4"
          >
            <MDBInput
              value={formValue.rImage}
              name="rImage"
              onChange={onChange}
              id="validationCustom02"
              required
            />
          </MDBValidationItem>
          <label htmlFor="rcookingMethod">Cooking Method: </label>
          <MDBValidationItem
            tooltip
            className="col-md-6"
            feedback="So what's the plan?"
            invalid
          >
            <MDBInput
              value={formValue.rCookingMethod}
              name="rCookingMethod"
              onChange={onChange}
              id="validationCustom03"
              required
              contrast
            />
          </MDBValidationItem>
          <label htmlFor="rTime">Time (Minutes): </label>
          <MDBValidationItem
            tooltip
            className="col-md-6"
            feedback="How long does it takes in minutes to cook it?"
            invalid
          >
            <MDBInput
              value={formValue.rTime}
              name="rTime"
              onChange={onChange}
              id="validationCustom03"
              required
              type="number"
              contrast
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="mb-2 pb-1"
            invalid
            feedback="Example invalid feedback text."
          >
          </MDBValidationItem>
          <h2>Please choose ingredients for your recipe </h2>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {ingredients.map((item, index) => (
        <div key={item.Ingredient.IngredientId} className="small-card">
          <input type="checkbox" value={index} checked={item.isChecked} onChange={IngredientCheck} />
          {item.Ingredient.IngredientName}
          <img src={item.Ingredient.IngredientImage} className="small-image"/>
          <div>Calories: {item.Ingredient.IngredientCalories}</div>
        </div>
      ))}
      </div>
          <div className="col-12">
            <MDBBtn type="button" onClick={() => recipeIngredient()} block>
              Add Recipe
            </MDBBtn>
          </div>
        </MDBValidation>
        </div>
      </form>
    </>
  );
}
