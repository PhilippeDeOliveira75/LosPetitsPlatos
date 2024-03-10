import { SearchRecipes } from './searchEngine.js'
import { Cards } from './cards.js'
import { Categories } from './categories.js'

function createTag(tagValue) {
    let tagList = document.createElement('li')
    tagList.className = 'tagList'
    tagList.innerHTML = `
        ${tagValue}
        <img src="assets/visuel/clearTag.svg" alt="clearTag" class="clearTagIcon">
    `;
    return tagList
}

export let tagValues = []

export async function UpdateTagValues(action, tagValue, tagType) {
    if (action === 'add') {
        tagValues.push({ value: tagValue, type: tagType })
    } else if (action === 'remove') {
        tagValues = tagValues.filter(tag => tag.value !== tagValue)
    }

    return tagValues
}


function SelectTag(event, tagType) {
    const tagsContainer = document.querySelector('.tagsContainer')
    const tagValue = event.target.innerText
    const tagList = createTag(tagValue)
    tagsContainer.appendChild(tagList)
    event.target.style.display = 'none'
    tagList.addEventListener('click', DeleteTag)
    let tag = UpdateTagValues('add', tagValue, tagType)
    const searchInput = document.querySelector('.searchInput')
    SearchRecipes(searchInput.value, tag).then(recipes => {
        Cards(recipes)
        Categories(recipes)
        Tags()
    })
}

function DeleteTag(event, tagType) {
    const itemListElements = document.querySelectorAll('.itemList')
    let tagValue;
    
    if (event.target.classList.contains('clearTagIcon')) {
        tagValue = event.target.parentElement.innerText
        event.target.parentElement.remove()
        itemListElements.forEach(item => {
            if (item.innerText === tagValue) {
                item.style.display = 'block'
            }
        })
    }
    let tag = UpdateTagValues('remove', tagValue, tagType)
    const searchInput = document.querySelector('.searchInput')
    SearchRecipes(searchInput.value, tag).then(recipes => {
        Cards(recipes)
        Categories(recipes)
        Tags()
    })
}

export async function Tags() {
    const itemListElements = document.querySelectorAll('.itemList')
    itemListElements.forEach(itemList => {
        const tagType = itemList.dataset.tagType
        itemList.addEventListener('click', (event) => SelectTag(event, tagType))
    })
}