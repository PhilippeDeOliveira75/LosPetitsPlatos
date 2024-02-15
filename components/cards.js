export async function Cards(recipes) {

    const cardContainer = document.querySelector('.cardContainer')
    cardContainer.innerHTML = ''

    if (!recipes || recipes.length === 0) {
        const message = document.createElement('h2')
        message.className = 'no-results'
        message.textContent = 'Aucun résultat trouvé'
        cardContainer.appendChild(message)
        return
    }

    recipes.forEach(recipe => {

        const card = document.createElement('div')
        card.className = 'card'
    
        let cardContent = `
            <img src="assets/images/${recipe.image}" alt="${recipe.name}" class="imgCard">
            <div class="timeDiv">${recipe.time} min</div>
            <div class="cardContent">
                <h2 class="cardTitle">${recipe.name}</h2>
                <p class="category">recette</p>
                <p class="cardText">${recipe.description}.</p>
                <div class="ingredient">
                    <p class="category">Ingrédients</p>
                    <ul class="cardList">
                    ${recipe.ingredients.map(ingredientObj => {
                        let ingredientInfo = `<span class="ingredient-name">${ingredientObj.ingredient || ''}</span>`;
                        if (ingredientObj.quantity || ingredientObj.unit) {
                            ingredientInfo += `<span class="ingredient-quantity-unit">${ingredientObj.quantity || ''} ${ingredientObj.unit || ''}</span>`;
                        }
                        return `<li class="cardListInfo">${ingredientInfo}</li>`
                    }).join('')}
                </ul>
                </div>
            </div>
        `;
    
        card.innerHTML = cardContent
        cardContainer.appendChild(card)
    })
}