function setBorderFocus(){
    const inputSearch =  document.querySelector('#search-inp')
    const divToCustom = document.querySelector('.search-input-pg')
    const iconSearch = document.querySelector('#search-icon')
    inputSearch.addEventListener('focus',()=>{
        divToCustom.classList.add('search-border')
        iconSearch.classList.add('text-white')
    })
    inputSearch.addEventListener('blur', () => {
        divToCustom.classList.remove('search-border')
        iconSearch.classList.remove('text-white')
      })
}

setBorderFocus()