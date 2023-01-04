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
    public class IngredientsController : ApiController
    {

        public IngredientsController() { }

        [HttpGet]
        //  [Route("GetAll")]
        public IHttpActionResult GetIngredients()
        {
            try
            {
                string query = @"
                            select *
                            from
                            dbo.Ingredients
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
        public IHttpActionResult GetIngredientsById(int id)
        {
            try
            {
                string query = @" SELECT * FROM dbo.Ingredients WHERE IngredientId=@IngredientId";

                DataTable table = new DataTable();
                string sqlDataSource = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
                SqlDataReader myReader;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, con))
                    {
                        myCommand.Parameters.AddWithValue("@IngredientId", id);
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
        public IHttpActionResult Post([FromBody] Ingredient newIngredient)
        {
            try
            {
                string query = @"
                            insert into dbo.Ingredients
                            (IngredientName,IngredientImage,IngredientCalories)
                            values (@IngredientName,@IngredientImage,@IngredientCalories)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
                SqlDataReader myReader;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, con))
                    {
                        myCommand.Parameters.AddWithValue("@IngredientName", newIngredient.IngredientName ?? "");
                        myCommand.Parameters.AddWithValue("@IngredientImage", newIngredient.IngredientImage ?? "");
                        myCommand.Parameters.AddWithValue("@IngredientCalories", newIngredient.IngredientCalories);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        con.Close();
                    }
                }

                return Created(new Uri(Request.RequestUri.AbsoluteUri + newIngredient.IngredientId), newIngredient);
            }
            catch (Exception ex)
            {

                return Content(System.Net.HttpStatusCode.BadRequest, ex);
            }
        }

    }


}



