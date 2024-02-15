import { MockCaller } from "../_services/mockCaller.js"


export async function SearchRecipes(input) {


    let recipes = await MockCaller()

    if (input.length >= 3) { 

        recipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(input.toLowerCase()) ||
                recipe.description.toLowerCase().includes(input.toLowerCase()) ||
                recipe.ingredients.some(ingredientObj => ingredientObj.ingredient.toLowerCase().includes(input.toLowerCase()))
        })
    }

    return recipes

}