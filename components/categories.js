import { Tags } from "./tags.js"

export async function Categories(recipes) {

    // Création d'un objet contenant les infos pour chaque catégorie (liste triée par ordre alphabétique)
    let ingredientsCategory = { 
        title: 'Ingredients', 
        data: [...new Set(recipes.flatMap(item => item.ingredients).map(item => item.ingredient))].sort() 
    }
    let appliancesCategory = { 
        title: 'Appareils', 
        data: [...new Set(recipes.map(item => item.appliance))].sort() 
    }
    let ustensilsCategory = { 
        title: 'Ustensiles', 
        data: [...new Set(recipes.flatMap(item => item.ustensils))].sort() 
    }

    const dropDownContainer = document.querySelector('.dropDownsContainer')
    dropDownContainer.innerHTML = ''

    for (let dropDown of [ingredientsCategory, appliancesCategory, ustensilsCategory]) {

        const dropDownElement = document.createElement('div') 
        const categoryListHTML = dropDown.data.map(item => `<li class="itemList" data-tag-value="${item || ''}" data-tag-type="${dropDown.title || ''}">${item || ''}</li>`).join('')

        let dropDownHTML = `
            <div class="dropDownDiv">
                <div class="buttonDiv">
                    <h2 class="buttonTitle">${dropDown.title}</h2>
                    <img class="vector" src="assets/visuel/vector.svg">
                </div>
                <div class="w-categoryList">
                    <div class="categorySearchBar">
                        <input type="text" class="categorySearchInput">
                        <img src="assets/visuel/categorySearch.svg" alt="tagSearch" class="categorySearchIcon">
                    </div>
                    <ul class="categoryList">${categoryListHTML}</ul>
                </div> 
            </div>
        `
    
        dropDownElement.innerHTML = dropDownHTML
        dropDownContainer.appendChild(dropDownElement)


        
        // Déroulement de la liste
        const buttonDiv = dropDownElement.querySelector('.buttonDiv')
        const vector = dropDownElement.querySelector('.vector')
        const itemList = dropDownElement.querySelector('.w-categoryList')
        buttonDiv.addEventListener('click', () => {
            itemList.style.display = itemList.style.display === 'none' ? 'block' : 'none'
            vector.style.transform = itemList.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)'
        })

        const items = dropDownElement.querySelectorAll('.itemList')
        items.forEach(item => {
            item.addEventListener('click', () => {
                const itemList = document.querySelector('.w-categoryList')
                const vector = document.querySelector('.vector')
                itemList.style.display = 'none'
                vector.style.transform = 'rotate(0deg)' 
            })
        })
    }

    Tags()

}