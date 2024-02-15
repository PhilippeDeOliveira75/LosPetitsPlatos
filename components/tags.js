export function Tags() {

    const tagsContainer = document.querySelector('.tagsContainer')
    const itemListElements = document.querySelectorAll('.itemList')

    itemListElements.forEach(itemList => {
        itemList.addEventListener('click', (event) => {

            const tagValue = event.target.innerText

            let tagList = document.createElement('li')
            tagList.className = 'tagList'
            
            tagList.innerHTML = `
                ${tagValue}
                <img src="assets/visuel/clearTag.svg" alt="clearTag" class="clearTagIcon">
            `;
    
            tagsContainer.appendChild(tagList)
    
            event.target.style.display = 'none'
 
            tagList.addEventListener('click', (event) => {
                if (event.target.classList.contains('clearTagIcon')) { 

                    event.target.parentElement.remove()
    
                    itemListElements.forEach(item => {
                        if (item.innerText === tagValue) {
                            item.style.display = 'block'
                        }
                    })
                }
            })
        })
    })
}