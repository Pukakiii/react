import React, { use, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import RecipeComponent from "./recipeComponent";
import IngredientsListComponent from "./ingredientsListComponent";
import getRecipeFromAI from "./ai"; // Import the function to get the recipe from AI

export default function Main() {
  const [ingredients, setIngredients] = useState(["meet", "vegies", "rice"]); // Initialize with some default ingredients
  // Handle form submission
  function addIngredient(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    const formData = new FormData(e.target); // Grab form data
    const newIngredient = formData.get("ingredient"); // Get the ingredient from the input field
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]); // Update the ingredients list

    e.target.reset(); // Reset the input field
  }

  const [recipe, setRecipe] = useState(""); // State to control recipe visibility
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromAI(ingredients); // Call the function to get the recipe from AI
    setRecipe(recipeMarkdown); // Set the recipe in state
    console.log(recipeMarkdown); // Log the recipe to the console for debugging
  }
  const scrollView = React.useRef(null); // Create a ref to scroll to the bottom of the page
  React.useEffect(() => {
    if (recipe !== "" && scrollView.current !== null) {
      scrollView.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom of the page when the recipe is generated
    }
  }, [recipe]); // Add an empty dependency array to run this effect only once

  function handleCancel() {
    setRecipe(""); // Clear the recipe when the cancel button is clicked
  }
  return (
    <main>
      {/* Use onSubmit to handle the form submission */}
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          name="ingredient" // Use name to access the field in formData
          placeholder="Enter ingredient"
          required
        />
        <button type="submit">ADD</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsListComponent
          ingredients={ingredients}
          getRecipe={getRecipe}
          scrollView={scrollView}
        />
      )}
      {recipe && <RecipeComponent recipe={recipe} hovered={handleCancel} />}
    </main>
  );
}
