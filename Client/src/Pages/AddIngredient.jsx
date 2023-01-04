import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

export default function AddIngredient() {
  const [formValue, setFormValue] = useState({
    iName: "",
    iImage: "",
    iCalories: 0,
  });

  const resetForm = () => {
    setFormValue({
      iName: "",
      iImage: "",
      iCalories: 0,
    });
  }

  const onChange = (e) => {
    setFormValue((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const url = "https://localhost:44314/api/Ingredients";

  const IngredientData = () => {
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IngredientName: formValue.iName,
        IngredientImage: formValue.iImage,
        IngredientCalories: formValue.iCalories,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
      resetForm();
  };
  return (
    <>
      <h1>Add Ingredient</h1>
      <form className="form-elegant" style={{ marginTop: "20px" }}>
      <div className="form-group">
       <label htmlFor="iName">Name: </label>
  <MDBValidation className="row g-3">
    <MDBValidationItem tooltip className="col-md-4" feedback="Please fill in the ingredient name ">
      <MDBInput
        value={formValue.iName}
        name="iName"
        onChange={onChange}
        id="validationCustom01"
        required
       // label={left : 'Name: '}
        color="primary"
      />
    </MDBValidationItem>
    <label htmlFor="iImage">Image: </label>
    <MDBValidationItem tooltip className="col-md-4 text-left" feedback="Please add a picture of the ingredient ">
      <MDBInput
        value={formValue.iImage}
        name="iImage"
        onChange={onChange}
        id="validationCustom02"
        required
        color="primary"
      />
    </MDBValidationItem>
    <label htmlFor="iCalories">Calories: </label>
    <MDBValidationItem
      tooltip
      className="col-md-6 text-left"
      feedback="Please provide a the num of calories."
      invalid
    >
      <MDBInput
        value={formValue.iCalories}
        name="iCalories"
        onChange={onChange}
        id="validationCustom03"
        required
        type="number"
        contrast
      />
    </MDBValidationItem>
    <div className="col-12">
      <MDBBtn type="button" onClick={() => IngredientData()} block color="primary">
        Add Ingredient
      </MDBBtn>
    </div>
  </MDBValidation>
  </div>
</form>
    </>
  );
}

