import { tagValues } from './tags.js'

export async function Categories(recipes) {

    // Création d'un objet contenant les infos pour chaque catégorie (liste triée par ordre alphabétique)
    let ingredientsCategory = { 
        title: 'Ingredients', 
        data: [...new Set(recipes.flatMap(item => item.ingredients).map(item => item.ingredient))].filter(ingredient => !tagValues.some(tag => tag.value === ingredient)).sort() 
    }
    let appliancesCategory = { 
        title: 'Appareils', 
        data: [...new Set(recipes.map(item => item.appliance))].filter(appliance => !tagValues.some(tag => tag.value === appliance)).sort()
    }
    
    let ustensilsCategory = { 
        title: 'Ustensiles', 
        data: [...new Set(recipes.flatMap(item => item.ustensils))].filter(utensil => !tagValues.some(tag => tag.value === utensil)).sort() 
    }

    const dropDownContainer = document.querySelector('.dropDownsContainer')
    dropDownContainer.innerHTML = ''

    // Création des dropdowns et des listes d'items pour chaque catégorie
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
                        <img src="assets/visuel/clearCategoryIcon.svg" alt="clearCategory" class="clearCategoryIcon">
                        <p class="noResult">Auncun résultat</p>
                    </div>
                    <ul class="categoryList">${categoryListHTML}</ul>
                </div> 
            </div>
        `
    
        dropDownElement.innerHTML = dropDownHTML
        dropDownContainer.appendChild(dropDownElement)

        const categorySearchInput = dropDownElement.querySelectorAll('.categorySearchInput')
        const clearCategoryIcon = dropDownElement.querySelectorAll('.clearCategoryIcon')

        categorySearchInput.forEach(input => {
            input.addEventListener('input', () => handleInputChange(input, clearCategoryIcon, dropDownElement))
        })

        clearCategoryIcon.forEach(icon => {
            icon.addEventListener('click', () => handleIconClick(icon, categorySearchInput, dropDownElement))
        })
    

    }

    DropDown()
    SelectItem()
}

// Au click sur le bouton ouvrir/fermer la liste
function DropDown () {
    const buttonDivs = document.querySelectorAll('.buttonDiv')
    const vectors = document.querySelectorAll('.vector')
    const itemLists = document.querySelectorAll('.w-categoryList')

    buttonDivs.forEach((buttonDiv, index) => {
        buttonDiv.addEventListener('click', () => {
            const itemList = itemLists[index]
            const vector = vectors[index]
            itemList.style.display = itemList.style.display === 'none' ? 'block' : 'none'
            vector.style.transform = itemList.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)'
        })
    })
}

// Au click sur un item fermer la liste
function SelectItem () {
    const items = document.querySelectorAll('.itemList')
    items.forEach(item => {
        item.addEventListener('click', () => {
            const itemList = item.closest('.w-categoryList')
            const vector = itemList.previousElementSibling.querySelector('.vector')
            itemList.style.display = 'none'
            vector.style.transform = 'rotate(0deg)'
        })
    })
}

async function handleInputChange(input, clearCategoryIcon, dropDownElement) {
    clearCategoryIcon.forEach(icon => {
        icon.style.display = input.value !== '' ? 'block' : 'none'
    })
    const itemList = dropDownElement.querySelectorAll('.itemList')
    let hasResults = false;
    itemList.forEach(item => {
        if (input.value !== '') {
            if (!item.innerText.toLowerCase().includes(input.value.toLowerCase())) {
                item.style.display = 'none'
            } else {
                item.style.display = 'block'
                hasResults = true;
            }
        } else {
            item.style.display = 'block'
        }
    })
    const noResultMessage = dropDownElement.querySelector('.noResult');
    noResultMessage.style.display = (input.value !== '' && !hasResults) ? 'block' : 'none';
}

async function handleIconClick(icon, categorySearchInput, dropDownElement) {
    categorySearchInput.forEach(input => {
        input.value = ''
        icon.style.display = 'none'
        const itemList = document.querySelectorAll('.itemList')
        itemList.forEach(item => {
            item.style.display = 'block'
        })
        const noResultMessage = dropDownElement.querySelector('.noResult');
        noResultMessage.style.display = 'none';
    })
}