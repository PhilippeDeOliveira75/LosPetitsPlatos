export function Tags () {

    const tagsContainer = document.querySelector('.tagsContainer')
    const itemListElements = document.querySelectorAll('.itemList')

    // Pour chaque élément itemList cliqué on créé son tag
    itemListElements.forEach(itemList => {
        itemList.addEventListener('click', (event) => {

            // Récupérer la valeur de l'itemList cliqué
            const tagValue = event.target.innerText

            // Créer un nouvel élément li
            let tagList = document.createElement('li')
            tagList.className = 'tagList'
            tagList.dataset.tagValue = tagValue
            tagList.innerHTML = `
                ${tagValue}
                <img src="assets/visuel/clearTag.svg" alt="clearTag" class="clearTagIcon">
            `;

            // Ajouter le nouvel élément à tagsContainer
            tagsContainer.appendChild(tagList)

            // Cacher l'élément itemList cliqué de itemList
            event.target.style.display = 'none'

            // Supprimer le tag si on click sur l'icone clearTagIcon
            tagList.addEventListener('click', (event) => {
                if (event.target.classList.contains('clearTagIcon')) {
                    event.target.parentElement.remove()
                    const itemListElements = document.querySelectorAll('.itemList')
                    itemListElements.forEach(item => {
                        if (item.innerText === event.target.parentElement.dataset.tagValue) {
                            item.style.display = 'block'
                        }
                    })
                }
            })
        })
    })
}