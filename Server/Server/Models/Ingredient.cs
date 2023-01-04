using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Ingredient
    {
        public Ingredient() {}

        // ID, Name, Image(Url), Calories
        private int ingredientId;
        private string ingredientImage;
        private int ingredientCalories;
        private string ingredientName;

        public Ingredient(string ingredientName, string ingredientImage, int ingredientCalories)
        {
            this.IngredientId = ingredientId;
            IngredientName = ingredientName;
            IngredientImage = ingredientImage;
            IngredientCalories = ingredientCalories;
        }

        
        public int IngredientId { get => ingredientId; set => ingredientId = value; }

        public string IngredientName { get => ingredientName; set => ingredientName = value; }
        public string IngredientImage { get => ingredientImage; set => ingredientImage = value; }
        public int IngredientCalories { get => ingredientCalories; set => ingredientCalories = value; }



        public override string ToString()
        {
            return $"ID = {IngredientId}, Name= {IngredientName}, Image={IngredientImage}, Calories = {IngredientCalories}";
        }


    }
}