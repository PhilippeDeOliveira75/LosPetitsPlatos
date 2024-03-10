import { SearchRecipes } from "./components/searchEngine.js"
import { Categories } from "./components/categories.js"
import { Cards } from "./components/cards.js"
import { Tags } from "./components/tags.js"
import { handleInput, handleClear } from "./components/searchBar.js"

async function render(input) {
    let recipes = await SearchRecipes(input)
    Cards(recipes)
    await Categories(recipes)
    await Tags()
}

async function initializeApp() {
    
    const searchInput = document.querySelector('.searchInput')
    const clearIcon = document.querySelector('.clearIcon')

    handleInput(searchInput, clearIcon, render)
    handleClear(clearIcon, searchInput, render)

    await render(searchInput.value)
}

document.addEventListener('DOMContentLoaded', initializeApp)