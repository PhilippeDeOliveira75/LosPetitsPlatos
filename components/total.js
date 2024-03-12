export async function Total (recipes) {

    let total = recipes.length

    const totalContainer = document.querySelector('.totalContainer')

    let totalContent = `
        <div>
            <h3 class="total" >${total} ${total <= 2 ? 'recette' : 'recettes'}</h3>
        </div>
    `

    totalContainer.innerHTML = totalContent

}