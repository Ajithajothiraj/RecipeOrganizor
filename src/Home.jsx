import React from 'react'
import "./Home.css"
import { useState,useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate()
  const API_URL='http://localhost:3000/recipe'
  const[search,setSearch]=useState('')
  const [recipes, setRecipes] = useState([]);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );
 
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); 
        setRecipes(data); 
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);


 


  
  return (
    <>
      <div className="bg-container">
      <h1 className="title1">Recipe Master</h1>
      <p className="slogan">Organize, Cook, Enjoy – Your Recipes, Your Way!</p>

        <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
            <input type='text' autoFocus placeholder='searchItem' id='search' role='searchbox' value={search} onChange={
              (e)=>setSearch(e.target.value)
            }/>
            <button onClick={() => navigate("/AddRecipe")}>Add Recipe</button>
        </form>
      </div>
      {recipes.length === 0 && <p>No recipes found</p>}

     
      <div className="recipe-grid" >
      {filteredRecipes.length > 0 ? (
        filteredRecipes?.map((recipe) => (
          <div key={recipe.id} className="recipe-box" onClick={() => navigate(`/recipe/${recipe.id}`)} style={{ cursor: "pointer", color: "black" }}>
            {recipe.title}
          </div>
        ))):(
          <p>No matching recipes found</p>
        )
      }
      </div>
    </>
  )
}

export default Home
