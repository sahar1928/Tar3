using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Recipe
    {

        public Recipe() { }


        private int recipeId;
        private string recipeImage;
        private string recipeName;
        private string recipeCookingMethod;
        private int recipeTime;
        private int[] ingredients;

        public Recipe(int recipeId, string recipeImage, string recipeName, string recipeCookingMethod, int recipeTime, int[] ingredients)
        {
            this.RecipeId = recipeId;
            this.RecipeImage = recipeImage;
            this.RecipeName = recipeName;
            this.RecipeCookingMethod = recipeCookingMethod;
            this.RecipeTime = recipeTime;
            this.Ingredients = ingredients;
        }

        public int RecipeId { get => recipeId; set => recipeId = value; }

        public string RecipeName { get => recipeName; set => recipeName = value; }
        public string RecipeImage { get => recipeImage; set => recipeImage = value; }
        public string RecipeCookingMethod { get => recipeCookingMethod; set => recipeCookingMethod = value; }
        public int RecipeTime { get => recipeTime; set => recipeTime = value; }
        public int[] Ingredients { get => ingredients; set => ingredients = value; }

        public override string ToString()
        {
            return $"ID = {RecipeId}, Name= {RecipeName}, Image={RecipeImage}, Recipe Cooking Metod={RecipeCookingMethod}, Recipe Time = {RecipeTime} ";
        }


    }
}
