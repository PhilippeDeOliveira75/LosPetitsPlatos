


    const itemListElements = document.querySelectorAll('.itemList')

    itemListElements.forEach(item => {
        const tagValue = item.dataset.tagValue
        const tagType = item.dataset.tagType
    
        if(item.style.display === 'none') {
            console.log(tagType, tagValue) 
        }
    })
    


let result = {
    "ingredients": [],
    "appliance": "",
    "ustensils": []
}

window.addEventListener('itemClicked', (event) => {
    const { tagValue, tagType } = event.detail
    console.log(tagValue, tagType) 


    if (tagType === 'Ingredients') {
        result.ingredients.push({ "ingredient": tagValue })
    } else if (tagType === 'Appareils') {
        result.appliance = tagValue;
    } else if (tagType === 'Ustensiles') {
        result.ustensils.push(tagValue)
    }

    console.log(result)


    mutation observer