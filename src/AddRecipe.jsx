import React, { useEffect, useState } from 'react'
import './Addrecipe.css'
import { useNavigate } from 'react-router-dom'
const API_URL="http://localhost:3000/recipe"
const AddRecipe = () => {
  const[title,setTitle]=useState('');
  const[ingredients,setIngredients]=useState('')
  const[procedure,setProcedure]=useState('')
  const[recipes,setRecipes]=useState([])
  const navigate=useNavigate()
  
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!title||!ingredients||!procedure) return ;
    addRecipe(title,ingredients,procedure)
    setTitle('')
    setIngredients('')  
    setProcedure('')
  }
  const addRecipe=async(title,ingredients,procedure)=>{
    
    const addNewRecipe={title,ingredients,procedure}
    const listRecipe=[...recipes,addNewRecipe]
    setRecipes(listRecipe)
   const postoption={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(addNewRecipe)
   }
   const result=await fetch(API_URL,postoption)
   if(result){
    console.log("added succesfully")
    navigate('/')
   }
   else{
    console.log("error adding")
   }

  }

  return (
    <div>
      <div className="add-recipe-container">
      <h2 className="title">Add Your Recipe</h2>
        <form  className="recipe-form" onSubmit={handleSubmit} >

            <label htmlFor="tittle">Tittle:</label>
            <input type="text" id="tittle" name="tittle" required onChange={e=>{setTitle(e.target.value)}}/><br/>

            <label htmlFor="ingredients">ingredients:</label>
            <textarea type="text" id="ingredients" name="ingredients" required onChange={e=>{setIngredients(e.target.value)}}/><br/>

            <label htmlFor="procedure">Procedure:</label>
            <textarea type="text" id="procedure" name="procedure" required onChange={e=>{setProcedure(e.target.value)}}/><br/>

            <button type="submit" >Save</button>
        </form>
       
    </div>
    </div>
  )
}

export default AddRecipe
