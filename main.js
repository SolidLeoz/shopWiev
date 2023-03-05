// animazione toggler e nav

let togglerCustom = document.querySelector('#togglerCustom');
let navCustom = document.querySelector('#navCustom')
let checkRotate = false; 

togglerCustom.addEventListener('click', ()=> {
    if (checkRotate == false ) {
        togglerCustom.style.transform = 'rotate(90deg)';
        checkRotate = true
    } else {
        togglerCustom.style.transform = 'rotate(0deg)';        
        checkRotate = false
    }
})

// increment number sezione numeri 

function createInterval (finalNumber, element) {
    
    let counter = 0; 

    let interval = setInterval(()=>{

        if (counter < finalNumber) {
            
            counter++
            
            element.innerHTML = counter;
            
        } else {
            
            clearInterval(interval);
        }
        
    }, 1);
    
}

let first_span = document.querySelector('#firstSpan');
let second_span = document.querySelector('#secondSpan');
let third_span = document.querySelector('#thirdSpan');


// intersectionObserver per numeri e animazione
// numeri
let section1H2 = document.querySelector('#section1H2');


let intersectionInterval = true


let observer = new IntersectionObserver(
    (entries)=>{
        entries.forEach((entry) =>{
            if (entry.isIntersecting && intersectionInterval){
                
                createInterval(1283, first_span);
                createInterval(2154, second_span);
                createInterval(1956, third_span);
                intersectionInterval = false;
                
            }
            
        })
        
    }
    
    )
    observer.observe(section1H2);
    
    // animazione img
    
    const element = document.getElementById("imgCustom");
    
    // btn arrow up
    let scroller = document.querySelector('#btnScroller')
    
window.addEventListener("scroll", () => {
  if (element.getBoundingClientRect().top < window.innerHeight) {
    element.classList.remove("d-none");
    element.classList.add("zoomIn");
    // btn arrow up
    scroller.classList.remove('d-none');
}else{
    scroller.classList.add('d-none');
}
});

// annunci card creator
// filtri per categoria prezzo e parola

fetch('./annunci.json').then( (response) => response.json()).then((data)=> {

    let categoryWrapper = document.querySelector('#categoryWrapper');

    let cardsWrapper = document.querySelector('#cardsWrapper');

    function setCategoryFilter () {
        
        let categories = data.map( (element)=> element.category );
        // abbiamo la lista di tutte le categorie doppiate
        
        let uniqueCategories = [];
        // variabile contenitore categorie
        
        categories.forEach( (category) => { 
            // per ogni categoria
            if (!uniqueCategories.includes(category)) {
                // se non è inclusa
                uniqueCategories.push(category)
                // pushala all'interno della variabile uniqueCat
            }
        })


        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
            <label class="form-check-label" for="${category}">
              ${category}
            </label>
            
            `
            categoryWrapper.appendChild(div);

        })
    }
    setCategoryFilter();

    // showcards 

    // ++ NON ESSENZIALE ++funzione numero randomico per img
    function randomBetween400And600() {
        return Math.floor(Math.random() * 201) + 400;
    }

    
    function showCards (array) {
        // svuoto lo schermo e faccio spazio ai nuovi selezionati
        cardsWrapper.innerHTML = ``
        array.forEach((element) => {
            
            
            let div = document.createElement('div');
            div.classList.add('card-item');
            div.innerHTML = `
            
              <img class="card-img-top card-img-custom" src="https://picsum.photos/${randomBetween400And600()}" alt="">
              <div class="card-body card-body-custom d-flex flex-column align-content-center justify-content-center">
                <h3 class="card-title text-center mb-3">${element.name}</h3>
                <p class="card-text text-center">${element.category}</p>
                <h4 class="card-title text-center">Prezzo</h4>
                <p class="card-text text-center">€ ${element.price}</p>
              </div>
            
            `
            
            cardsWrapper.appendChild(div);
        })
    }
    
    showCards(data);
    
    function filteredByCategory (categoria) {
        if (categoria != 'all'){
            let filtered = data.filter((annuncio)=>annuncio.category == categoria);
            showCards(filtered);
        }else{
            
            showCards(data);
        }

    }
    
    let checkInput= document.querySelectorAll('.form-check-input');
    checkInput.forEach((checkInput) => {
 
        checkInput.addEventListener('click', ()=> {
 
            filteredByCategory(checkInput.id)
 
        })
 
    })

    // filter by keywords

    let inputSearch = document.getElementById('inputPlaceholder'); 
    
    let inputTxt = inputSearch.value;



    function filteredByKeyword (keywords) {
        let filteredWords = data.filter((annuncio) => annuncio.name.includes(keywords));
        showCards(filteredWords);
    }


    
    let cerca = document.getElementById('cerca') 
    cerca.addEventListener('click', ()=>{
        
        filteredByKeyword(inputTxt)

   })    





})

