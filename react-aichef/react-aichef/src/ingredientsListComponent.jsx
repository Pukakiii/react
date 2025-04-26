export default function IngredientsListComponent(props) {
  return (
    <section>
      <h2>Ingredients here:</h2>
      <ul>
        {props.ingredients.map((item, index) => (
          <li key={index}>{item}</li> // Use index if the ingredient is a simple string
        ))}
      </ul>
      {props.ingredients.length >= 3 && (
        <div className="recipe-container">
          <div ref={props.scrollView} className="recipe-ai-create">
            <h4>AI recipe</h4>
            <p>
              Here will be the AI-generated recipe based on the ingredients.
            </p>
          </div>
          <button onClick={props.getRecipe}>Create</button>
        </div>
      )}
    </section>
  );
}
