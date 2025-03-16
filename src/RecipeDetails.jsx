import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import './RecipeDetails.css'
import { useNavigate } from "react-router-dom";


const RecipeDetails = () => {
  const { id } = useParams();
  const[recipe,setRecipe]=useState(null)
  const[recipes,setRecipes]=useState([])
  const [show,setShow]=useState(false)
 
  const  navigate=useNavigate()
   const API_URL="http://localhost:3000/recipe"
   useEffect(()=>{
    const fetchRecipe=async()=>{
    try{
        console.log(`Fetching: ${API_URL}/${id}`);

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

   
    const text = await response.text();
    console.log("Raw Response:", text);

    try {
      const data = JSON.parse(text);
      console.log("Parsed JSON:", data);
      setRecipe(data); 
    } catch (jsonError) {
      console.error(" Invalid JSON received:", text);
      throw new Error("Invalid JSON received from API");
    }

    }catch(error){
        if(error.response){
            console.log(error)
        }
        else{
            console.log(error)
        }
    }
   }
   fetchRecipe();
},[id])
  if (!recipe) 
    return <p>Loading recipe details...</p>
  const handleDelete=async(id)=>{
    const listRecipe=recipes.filter((recipe)=>
      recipes.id!==id)
      setRecipes(listRecipe)
      try{
        const deleteOption={
        method:'DELETE'
        }
        
        const result1=await fetch(`${API_URL}/${id}`,deleteOption)
        if(result1.ok){
          console.log("successfull")
          alert("Sucessfully deleted")
          navigate('/')
        }
        else{
          console.log("not deleted ")
        }
      }
    catch(error){
      console.log(error)
    }
  }
  const handleSave = async (id) => {
    console.log("Searching for recipe with ID:", id);
    
    const updatedRecipe = { ...recipe }; 

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) throw new Error("Failed to update recipe");

      console.log("Recipe updated successfully");
      alert("Successfully edited");

      setShow(false); 
      navigate("/");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  
  
  
  

  return (
    <div className="recipe-details-wrapper">
      {show ? (
        
        <div className="recipe-container1">
            <h4>Title:</h4>
            <input type="text" value={recipe.title} onChange={(e) => setRecipe({...recipe, title: e.target.value})} />
            <h4>Ingredients:</h4>
            <textarea type="text" value={recipe.ingredients} onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})} />
            <h4>Procedure:</h4>
            <textarea type="text" value={recipe.procedure} onChange={(e) => setRecipe({...recipe, procedure: e.target.value})} />
  
          <button onClick={() => handleSave(recipe.id)} className="saveButton">Save</button>
        </div>
      ) : (
        
        <div className="recipe-container">
          <div className="details-group">
            <h4>Title:</h4>
            <p>{recipe.title}</p>
          </div>
  
          <div className="details-group">
            <h4>Ingredients:</h4>
            <p>{recipe.ingredients}</p>
          </div>
  
          <div className="details-group">
            <h4>Procedure:</h4>
            <p>{recipe.procedure}</p>
          </div>
  
          <div className="button-container">
            <button className="button1" onClick={() => setShow(true)}>Edit</button>
            <button className="deleteButton" onClick={() => handleDelete(recipe.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default RecipeDetails;
