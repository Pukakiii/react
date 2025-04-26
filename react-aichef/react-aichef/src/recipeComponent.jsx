import React from "react";
import ReactMarkdown from "react-markdown";

export default function RecipeComponent({ recipe, hovered }) {
  return (
    <section className="recipe-ai">
      {hovered && <div onClick={hovered} id="cancel"></div>}
      <h2>AI Recipe</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
}
