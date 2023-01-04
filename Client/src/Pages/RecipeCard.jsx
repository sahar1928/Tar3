import React from 'react';
import IngredientCard from "./IngredientCard";
import '../Card.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

export default function Recipe({recipe,showIngredients,recipeShow,totalCalories,ingredientsShow,CloseButton}) {
  return (
  
  <MDBCard key={recipe.RecipeId} className="small-card">
    {(recipeShow == recipe.RecipeId) && <MDBBtn id={recipe.RecipeId} onClick={(e) => CloseButton(e)} className="close-button">X</MDBBtn>}
  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
    <MDBCardImage src={recipe.RecipeImage} fluid className='small-image' alt='...' />
    <a>
      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
    </a>
  </MDBRipple>
  <MDBCardBody>
    <MDBCardTitle>{recipe.RecipeName}</MDBCardTitle>
    <MDBCardText>
      {recipe.RecipeCookingMethod}
    </MDBCardText>
    {(recipeShow == recipe.RecipeId) && (ingredientsShow.length > 0) && <IngredientCard ingredientsShow={ingredientsShow} totalCalories={totalCalories} />}
   {!(recipeShow) && <MDBBtn id={recipe.RecipeId} type='button' onClick={(e)=>showIngredients(e)}>Show Ingredients</MDBBtn>}
  </MDBCardBody>
</MDBCard>

  )
}
