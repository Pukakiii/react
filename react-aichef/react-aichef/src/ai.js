import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.REACT_APP_HF_API_KEY);

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`;

const getRecipeFromAi = async (ingredientsArr) => {
  const ingredientsStr = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have the following ingredients: ${ingredientsStr}. What recipe can I make with them?`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content; // Extract the recipe from the response
  } catch (error) {
    console.log("Error fetching recipe:", error);
  }
};

export default getRecipeFromAi;
