using Server.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace Server.Controllers
{
    public class RecipesController : ApiController
    {

        public RecipesController() { }

        [HttpGet]
        //  [Route("GetAll")]
        public IHttpActionResult GetRecipes()
        {
            try
            {
                string query = @"
                            select *
                            from
                            dbo.Recipes
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
                SqlDataReader myReader;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, con))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        con.Close();
                    }
                }

                return Ok(table);
            }
            catch (Exception ex)
            {

                return Content(System.Net.HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetRecipesById(int id)
        {
            try
            {
                string query = @" SELECT ingredient_id FROM dbo.ingredientsInRecipes WHERE recipe_id=@recipe_id";

                DataTable table = new DataTable();
                string sqlDataSource = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
                SqlDataReader myReader;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, con))
                    {
                        myCommand.Parameters.AddWithValue("@recipe_id", id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        con.Close();
                    }
                }

                return Ok(table);
            }
            catch (Exception ex)
            {

                return Content(System.Net.HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] Recipe newRecipe)
        {
            int recipeId = 0;
            try
            {
                string query = @"
                            insert into dbo.Recipes
                            (RecipeName,RecipeImage,RecipeCookingMethod,RecipeTime)
                            values (@RecipeName,@RecipeImage,@RecipeCookingMethod,@RecipeTime)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
                SqlDataReader myReader,myReader2;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, con))
                    {
                        myCommand.Parameters.AddWithValue("@RecipeName", newRecipe.RecipeName ?? "");
                        myCommand.Parameters.AddWithValue("@RecipeImage", newRecipe.RecipeImage ?? "");
                        myCommand.Parameters.AddWithValue("@RecipeCookingMethod", newRecipe.RecipeCookingMethod ?? "");
                        myCommand.Parameters.AddWithValue("@RecipeTime", newRecipe.RecipeTime);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                       // myCommand.ExecuteNonQuery();
                    }



                    query = @" SELECT MAX(RecipeId) FROM dbo.Recipes";
                    SqlCommand myCommand2 = new SqlCommand(query, con);
                    recipeId = (Int32)myCommand2.ExecuteScalar();





                    for (int i = 0; i < newRecipe.Ingredients.Length; i++)
                    {
                        using (SqlCommand myCommand3 = new SqlCommand("INSERT INTO ingredientsInRecipes (ingredient_id,recipe_id) VALUES (@ingredient_id,@recipe_id)", con))
                        {
                           

                            myCommand3.Parameters.AddWithValue("@ingredient_id", newRecipe.Ingredients[i]);
                            myCommand3.Parameters.AddWithValue("@recipe_id", recipeId);
                            myReader2 = myCommand2.ExecuteReader();
                            table.Load(myReader2);
                            myReader2.Close();
                            myCommand3.ExecuteNonQuery();
                        }
                    }


                    con.Close();
                    
                }

                return Created(new Uri(Request.RequestUri.AbsoluteUri + newRecipe.RecipeId), newRecipe);
            }
            catch (Exception ex)
            {

                return Content(System.Net.HttpStatusCode.BadRequest, ex);
            }
        }
    }
}



