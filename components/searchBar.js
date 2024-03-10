export function handleInput(searchInput, clearIcon, renderFunction) {
    searchInput.addEventListener('input', function() {
        if (searchInput.value !== '') { 
            clearIcon.style.display = 'block'
            renderFunction(searchInput.value)
        }
    })
}

export function handleClear(clearIcon, searchInput, renderFunction) {
    clearIcon.addEventListener('click', function() {
        searchInput.value = ''
        this.style.display = 'none'
        renderFunction(searchInput.value)
    })
}