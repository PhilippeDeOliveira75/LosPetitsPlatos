import { MockCaller } from "../_services/mockCaller.js"
import { UpdateTagValues } from "./tags.js"

export async function SearchRecipes(input) {

    let recipes = await MockCaller()

    let tags = await UpdateTagValues()

    // Filtrer les recettes en fonction de l'input
    if (input.length >= 3) { 
        recipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(input.toLowerCase()) ||
                recipe.description.toLowerCase().includes(input.toLowerCase()) ||
                recipe.ingredients.some(ingredientObj => ingredientObj.ingredient.toLowerCase().includes(input.toLowerCase()))
        })
    }

    // Filtrer les recettes en fonction des tags
    if (tags.length > 0) {

        recipes = recipes.filter(recipe => {
            return tags.every(t => {
                if (t.type.toLowerCase() === 'ingredients') {
                    return recipe.ingredients.some(ingredientObj => 
                        ingredientObj.ingredient.toLowerCase().trim() === t.value.toLowerCase().trim()
                    )
                } else if (t.type.toLowerCase() === 'appareils') {
                    return recipe.appliance.toLowerCase().trim() === t.value.toLowerCase().trim()
                } else if (t.type.toLowerCase() === 'ustensiles') {
                    return recipe.ustensils.some(utensil => 
                        utensil.toLowerCase().trim() === t.value.toLowerCase().trim()
                    )
                }

                return false
            })
        })
    }

    return recipes
}

/*export async function SearchRecipes(input) {

    let recipes = await MockCaller()

    let tags = await UpdateTagValues()
    console.log(tags)

if (input.length >= 3) { 
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(input.toLowerCase()) ||
            recipe.description.toLowerCase().includes(input.toLowerCase()) ||
            recipe.ingredients.some(ingredientObj => ingredientObj.ingredient.toLowerCase().includes(input.toLowerCase()))) {
            filteredRecipes.push(recipe);
        }
    }
    recipes = filteredRecipes;
}
    console.log(recipes)

    return recipes
}*/
