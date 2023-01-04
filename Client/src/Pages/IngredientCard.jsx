import React from "react";
import '../Card.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';


export default function IngredientCard({ingredientsShow,totalCalories}) {
  return (
    <>
   {ingredientsShow.length > 0 && ingredientsShow.map((ingredient) => (
     <MDBCard key={ingredient.Ingredient.IngredientId} className="small-card">            
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={ingredient.Ingredient.IngredientImage} fluid className="small-image" alt='...' />
          <a>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>{ingredient.Ingredient.IngredientName}</MDBCardTitle>
          <MDBCardText>Calories: {ingredient.Ingredient.IngredientCalories}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
 ))}
 <div>Total Calories : {totalCalories}</div>   
    </>
  )
}
