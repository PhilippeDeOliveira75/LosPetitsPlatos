export async function MockCaller() {

    try {

        const response = await fetch('data/data.json')

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`)

        }

        let data = await response.json()

        data = data.map(recipe => {

            recipe.ingredients = recipe.ingredients.map(ingredientObj => {
                let unit = ingredientObj.unit === 'grammes' ? 'g' : ingredientObj.unit
                let ingredient = ingredientObj.ingredient.charAt(0).toUpperCase() + ingredientObj.ingredient.slice(1).toLowerCase()
                return { ...ingredientObj, unit: unit, ingredient: ingredient }

            })

            return recipe

        })

        return data

    } 
    
    catch (error) {

        console.error(error)

    }

}