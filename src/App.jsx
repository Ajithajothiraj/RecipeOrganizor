import React from 'react'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import AddRecipe from './AddRecipe'
import RecipeDetails from "./RecipeDetails"

function App() {
  
  return (
    <>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/addrecipe' element={<AddRecipe/>}/>
     <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
    </>
  )
}

export default App
