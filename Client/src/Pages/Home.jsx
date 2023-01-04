import React, { useState, useEffect } from "react";
import { Ingredient } from "../Classes/Ingredient";
import { Recipe } from "../Classes/Recipe";
import RecipeCard from "./RecipeCard";


export default function Home() {
  const [ ringredients, setRingredients ] = useState([]);
  const [ recipes, setRecipes ] = useState([]);
  const [ ingredientsShow, setIngredientsShow ] = useState([]);
  const [id,setId] = useState(0);
  const [totalCalories,setTotalCalories] = useState(0);


  useEffect(() => {
    return () => {
        gi();
        gr();
    };
  }, []);


  function gi(){
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
                )
              });
            });
            console.log(ingredientsTemp)
            setRingredients([...ingredientsTemp]);
        });

      } catch (error) {
        console.log(error);
      }
  }


  function gr(){
    try {
        const recipesTemp = [];
        fetch("https://localhost:44314/api/Recipes")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((item) => {
              recipesTemp.push({
                Recipe: new Recipe(
                  item.RecipeId,
                  item.Recipename,
                  item.RecipeImage,
                  item.RecipeCookingMethod,
                  item.RecipeTime
                ),show:false,              
              });
            });
            console.log(recipesTemp)
            setRecipes([...recipesTemp]);
        });
      } catch (error) {
        console.log(error);
      }
  }

  const closeButton = (event) => {
  const recipeId = event.target.id;
  const newRecipe =  recipes.map(r => {
      if (r.Recipe.RecipeId == recipeId){
       return {...r, show: false};   
      }
      return r;
    });
    setRecipes([...newRecipe]);
  }

  const handleClick = (event) => {
    setId(event.target.id);
    const newRecipes = [...recipes]
    newRecipes.forEach(r => {
      if (r.Recipe.RecipeId == event.target.id) {
        r.show = parseInt(event.target.id);
      }else r.show = false
    });

    setRecipes([...newRecipes,])
  }


  async function fetchIngredientsShow() {
    const ingredientsShowTemp = [];
    var tCalories = 0;
    const response = await fetch(`https://localhost:44314/api/Recipes/${id}`);
    const data = await response.json();
    data.forEach((id) => {
        ringredients.forEach(ingredient => {
            if (ingredient.Ingredient.IngredientId === id.ingredient_id) {
              ingredientsShowTemp.push({
                Ingredient: new Ingredient(
                  ingredient.Ingredient.IngredientId,
                  ingredient.Ingredient.IngredientName,
                  ingredient.Ingredient.IngredientImage,
                  ingredient.Ingredient.IngredientCalories
                )
              })
              tCalories += ingredient.Ingredient.IngredientCalories;
            }
          });
        });
        setIngredientsShow([...ingredientsShowTemp]);
        setTotalCalories(tCalories);
  }
  
  useEffect(() => {
    fetchIngredientsShow();
  }, [id]);

  return (
    <>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {recipes.length > 0 && recipes.map(recipe => (
              <RecipeCard recipe={recipe.Recipe} id={recipe.Recipe.RecipeId} showIngredients={handleClick} CloseButton={closeButton}  recipeShow={recipe.show} ingredientsShow={ingredientsShow} totalCalories={totalCalories} key={recipe.Recipe.RecipeId}/>       
          ))}
       </div>   
          
    </>
   );
}
