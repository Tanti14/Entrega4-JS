const formContainer = document.getElementById('pokemon-picker') /* Formulario */
const inputNumber = document.getElementById('inputNumber'); /* Input tipo number */
const pokeResultContainer = document.querySelector(".poke-data-result") /* Card Container */

const fetchPoke = async (id) => {
    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); 
        const data = await response.json()
        return data;

    } catch (error) {
        console.log("Error", error);
    }
}


const isEmptyInput = () => {
    return inputNumber.value === ""
}

// Funcion que controla que el ID exista
const isInvalidId = (pokeData) => {
    return !pokeData.id
}

const getPokemonData = (pokeData) => {
    return {
        pokeImg: pokeData.sprites.front_shiny,
        pokeName: pokeData.name.toUpperCase(),
        pokeExp: pokeData.base_experience,
        pokeType: pokeData.types[0].type.name,
        pokePeso: pokeData.weight/10,
        pokeAltura: pokeData.height/10
    }
}

// Crear Card
const createCard = (pokeData) => {
    const {
        pokeImg,
        pokeName,
        pokeExp,
        pokeType,
        pokePeso,
        pokeAltura,
    } = getPokemonData(pokeData);

    return `<div class="poke-data-card">
    <img class="poke-img" src="${pokeImg}" alt="${pokeName}"/>
    <div class="poke-info">
      <div class="name">
        <span>NOMBRE:</span>
        <span>${pokeName}</span>
      </div>
      <div class="exp">
        <span>EXP:</span>
        <span>${pokeExp}</span>
      </div>
      <div class="type">
        <span>TIPO:</span>
        <span>${pokeType}</span>
      </div>
      <div class="peso">
        <span>PESO: </span>
        <span>${pokePeso}</span>
      </div>
      <div class="altura">
        <span>ALTURA: </span>
        <span>${pokeAltura}</span>
      </div>
    </div>
  </div>`
}

// Render Card
const renderCard = (pokeData) => {
    pokeResultContainer.innerHTML = createCard(pokeData)
} 


// Funcion que va a buscar el ID del pokemon en la api
const searchPokemon = async (e) => {
    e.preventDefault()

    if(isEmptyInput()){
        alert("Porfavor, ingrese un ID")
        return;
    }

    const searchedId = await fetchPoke(inputNumber.value);

    if (searchedId) {
      renderCard(searchedId);
    } else {
      alert("No existe ese pokemon")
      formContainer.reset();
      return pokeResultContainer.innerHTML = `<div class="poke-data-card">
      <img class="poke-img" src="./assets/ditto.png" alt="Ditto Pokemon" />
      <div class="poke-info">
        <div class="name">
          <span>NO EXISTE ESE KOKEMON</span>
        </div>
      </div>
    </div>`;
    }

    /* if(isInvalidId(searchedId)){
        alert("EL pokemon no existe")
        formContainer.reset();
        return;
    } */


    /* renderCard(searchedId); */
}

const init = () => {
    formContainer.addEventListener("submit", searchPokemon)
}

init();