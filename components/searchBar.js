import { SearchRecipes } from "./searchEngine.js"
import { Categories } from "./categories.js"
import { Cards } from "./cards.js"

export async function SearchBar () {

    const searchInput = document.querySelector('.searchInput')
    const clearIcon = document.querySelector('.clearIcon')

    searchInput.addEventListener('input', async function() {
        if (searchInput.value !== '') { 
            clearIcon.style.display = 'block'
            const recipes = await SearchRecipes(searchInput.value)
            Cards(recipes)
            Categories(recipes)

        }
    })

    clearIcon.addEventListener('click', async function() {
        searchInput.value = ''
        this.style.display = 'none'
        const recipes = await SearchRecipes(searchInput.value)
        Cards(recipes)
        Categories(recipes)

    })
  
    const recipes = await SearchRecipes(searchInput.value)
    Cards(recipes)
    Categories(recipes)


    
}

document.addEventListener('DOMContentLoaded', SearchBar)