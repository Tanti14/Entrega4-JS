const formContainer =
  document.getElementById("pokemon-picker"); /* Formulario */
const inputNumber =
  document.getElementById("inputNumber"); /* Input tipo number */
const pokeResultContainer =
  document.querySelector(".poke-data-result"); /* Card Container */

const fetchPoke = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

const isEmptyInput = () => {
  return inputNumber.value === "";
};

// Funcion que controla que el ID exista
const isInvalidId = (pokeData) => {
  return !pokeData.id;
};

const getPokemonData = (pokeData) => {
  return {
    pokeImg: pokeData.sprites.other.home.front_default,
    pokeName: pokeData.name.toUpperCase(),
    pokeExp: pokeData.base_experience,
    pokeType: pokeData.types,
    pokePeso: pokeData.weight / 10,
    pokeAltura: pokeData.height / 10,
  };
};

const getPokeType = (types) => {
  return types
    .map((type) => {
      return `<span class="${type.type.name} type">${type.type.name}</span>`;
    })
    .join("");
};

// Crear Card
const createCard = (pokeData) => {
  const { pokeImg, pokeName, pokeExp, pokeType, pokePeso, pokeAltura } =
    getPokemonData(pokeData);

  return `<div class="poke-data-card">
  <div class="poke-img-container">
    <div class="bg ${pokeType[0].type.name}"></div>
    <img class="poke-img" src="${pokeImg}" alt="${pokeName}"/>
  </div>

  <div class="poke-info-container">
    <span>${pokeName}</span>
    <div class="type-container">
      ${getPokeType(pokeType)}
    </div>

    <div class="poke-specs">
      <div class="peso">
        <span>PESO</span>
        <span>${pokePeso}</span>
      </div>

      <div class="altura">
        <span>ALTURA</span>
        <span>${pokeAltura}</span>
      </div>
    </div>

    <div class="experience">
      <span>EXP</span>
      <span>${pokeExp}</span>
    </div>
  </div>
</div>
  `;
};

const preCard = () => {
  return (pokeResultContainer.innerHTML = `
  <div class="precard">
          <div class="precard-info">
            <p>ATENCION</p>
            <img
              class="precard-img"
              src="./assets/lupa.png"
              alt="Ditto Pokemon"
            />
            <p>INGRESE UN ID PARA BUSCAR UN POKEMON</p>
          </div>
        </div>`);
};

// Render Card
const renderCard = (pokeData) => {
  pokeResultContainer.innerHTML = createCard(pokeData);
};

// Funcion que va a buscar el ID del pokemon en la api
const searchPokemon = async (e) => {
  e.preventDefault();

  if (isEmptyInput()) {
    alert("Porfavor, ingrese un ID");
    return;
  }

  const searchedId = await fetchPoke(inputNumber.value);

  if (searchedId) {
    renderCard(searchedId);
  } else {
    formContainer.reset();
    return (pokeResultContainer.innerHTML = `<div class="precard">
    <div class="precard-info">
      <p>ATENCION</p>
      <img
        class="precard-img"
        src="./assets/404-fit.png"
        alt="404 Not Found"
      />
      <p>NO SE HA ENCONTRADO EL POKEMON SOLICITADO</p>
    </div>
  </div>`);
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", preCard);
  formContainer.addEventListener("submit", searchPokemon);
};

init();
