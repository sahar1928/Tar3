using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Ingredients
    {
        static public List<Ingredient> ingredients = new List<Ingredient>()
        {
            new Ingredient() {IngredientId = 1,IngredientName = "Hamburger", IngredientImage = "Image", IngredientCalories = 22 },
            new Ingredient() {IngredientId = 2,IngredientName = "Pineapple", IngredientImage = "Image", IngredientCalories = 150 },
            new Ingredient() {IngredientId = 3, IngredientName = "Banana", IngredientImage = "Image",IngredientCalories = 35 }
        };
    }
}