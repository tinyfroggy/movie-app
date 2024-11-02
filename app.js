const searchInput = document.getElementById("search");
const suggestions = document.querySelector(".suggestions");
const favoriteMoviesContainer = document.querySelector(".favorite-movies");
const menu = document.querySelector(".menu-icon");
const addFavorite = document.querySelector(".add-favorite");
const removeFavorite = document.querySelector(".remove-favorite");
const body = document.querySelector(".body-container");
const apiKey = "677176eb";

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

function storeToLocalStorage(favoriteMovies) {
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}


searchInput.addEventListener("keyup", function () {
  let movieTitle = searchInput.value.trim().toLowerCase();

  if (movieTitle.length > 0) {
    suggestions.classList.remove("hidden");
    getData(movieTitle);
  } else {
    suggestions.classList.add("hidden");
    suggestions.innerHTML = '';
  }
});

menu.addEventListener("click", function () {
  favoriteMoviesContainer.classList.toggle("hidden");
});

async function getData(movieTitle) {

  let url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displaySuggestions(json.Search);
  } catch (error) {
    console.error(error.message);
  }
}

function displaySuggestions(movies) {
  suggestions.innerHTML = '';

  if (movies && movies.length > 0) {

    for (const movie of movies) {
      const movieSuggestion =
        `
          <!-- suggestions movie -->
            <div onclick="selectMovie('${movie.imdbID}')" class="suggestions-movie">

              <!-- suggestions img -->
                <div class="suggestions-img">
                  <img class="suggestions-poster" src="${movie.Poster}" alt="poster">
                </div>
              <!-- end suggestions img -->

          <!-- suggestions info -->
            <div class="suggestions-info">
              <h1 class="suggestions-title">${movie.Title}</h1>
              <h2 class="suggestions-year">${movie.Year}</h2>
            </div>
          <!-- end suggestions info -->

            </div>
          <!-- end suggestions movie -->
        `

      suggestions.innerHTML += movieSuggestion;

    }
  } else {
    suggestions.innerHTML = '<p class="no-movies">No movies found</p>';
  }
}


async function selectMovie(id) {
  suggestions.classList.add("hidden");

  let movieSelectedUrl = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

  try {
    const response = await fetch(movieSelectedUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const movie =
      `
    <!-- body container -->
      <div class="body-container">

        <!-- img container -->
          <div class="img-container">
            <img class="poster" src="${json.Poster}" alt="Poster">
          </div>
        <!-- end img container -->

        <!-- info container -->
          <div class="info-container">

        <!-- title movie -->
        <h2 class="title-movie highlight">${json.Title}</h2>
        <!-- end title movie -->

        <!-- history movie -->
        <p class="history-movie"><span class="year highlight">Year:</span> ${json.Year} <span
            class="rating highlight">PG-12</span> <span class="released highlight">released:</span> ${json.Released}</p>
        <!-- end history movie -->

        <!-- genre movie -->
        <p class="genre-movie"><span class="genre highlight">genre:</span> ${json.Genre}</p>
        <!-- end genre movie -->

        <!-- rating movie -->
        <p class="writer-movie"><span class="writer highlight">writer:</span> ${json.Writer}</p>
        <!-- end rating movie -->

        <!-- actors movie -->
        <p class="actors-movie"><span class="actors highlight">actors:</span> ${json.Actors}</p>
        <!-- end actors movie -->

        <!-- plot movie -->
        <p class="plot-movie"><span class="plot highlight">plot:</span> ${json.Plot}.</p>
        <!-- end plot movie -->

        <!-- language movie -->
        <p class="language-movie"><span class="language highlight">language:</span> ${json.Language}</p>
        <!-- end language movie -->

        <!-- awards movie -->
        <p class="awards-movie"><span class="awards highlight">awards:</span> ${json.Awards}</p>
        <!-- end awards movie -->

        <!-- add favorite -->
        <button onclick="addFavoriteFunction('${json.imdbID}')"class="add-favorite">  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
          width="24px" fill="#fff">
          <path
            d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
        </svg></button>
        <!-- end add favorite -->

      </div>
      <!-- end info container -->

    </div>
    <!-- end body container -->
  `

    body.innerHTML = movie;

  } catch (error) {
    console.error(error.message);
  }

}

async function addFavoriteFunction(id) {
  const movieFavoriteUrl = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

  const response = await fetch(movieFavoriteUrl);
  const json = await response.json();

  const favoriteMovie =
    `
    <!-- favorites container -->
    <div data-id="${json.imdbID}" class="favorites-container">

      <!-- img container -->
      <img class="poster-favorite" src="${json.Poster}" alt="Poster">
      <!-- end img container -->

      <!-- info favorite container -->
      <div class="info-favorite">
        <h1 class="title-favorite">${json.Title}</h1>
        <h2 class="year-favorite">${json.Year}</h2>
        <button onclick="removeFavoriteFunction('${json.imdbID}')" class="remove-favorite">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#fff">
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg></button>
      </div>
      <!-- end info favorite container -->

    </div>
    <!-- end favorites container -->
    `

  let favoriteMovies = getFromLocalStorage();

  if (favoriteMovies.some(movie => movie.imdbID === json.imdbID)) {
    alert("Movie already added to favorites");
    return;
  }

  favoriteMoviesContainer.innerHTML += favoriteMovie;

  favoriteMovies.push(json);
  storeToLocalStorage(favoriteMovies);
}

async function removeFavoriteFunction(id) {
  const favoriteMovie = document.querySelector(`[data-id="${id}"]`);
  favoriteMovie.remove();

  let favoriteMovies = getFromLocalStorage();
  favoriteMovies = favoriteMovies.filter(movie => movie.imdbID !== id);
  storeToLocalStorage(favoriteMovies);
}

function addFavoriteMovieToDOM(movie) {
  const favoriteMovie =
    `
    <!-- favorites container -->
    <div data-id="${movie.imdbID}" class="favorites-container">
      <img class="poster-favorite" src="${movie.Poster}" alt="Poster">
      <div class="info-favorite">
        <h1 class="title-favorite">${movie.Title}</h1>
        <h2 class="year-favorite">${movie.Year}</h2>
        <button onclick="removeFavoriteFunction('${movie.imdbID}')" class="remove-favorite">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </div>
    `;

  favoriteMoviesContainer.innerHTML += favoriteMovie;
}

function loadFavorites() {
  const favoriteMovies = getFromLocalStorage();
  favoriteMoviesContainer.innerHTML = '';

  favoriteMovies.forEach(movie => {
    addFavoriteMovieToDOM(movie);
  });
}

loadFavorites(); 
