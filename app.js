const searchInput = document.getElementById("search");
const suggestions = document.querySelector(".suggestions");
const body = document.querySelector(".body-container");
let apiKey = "677176eb";


searchInput.addEventListener("keyup", function () {
  let movieTitle = searchInput.value.trim().toLowerCase();

  if (movieTitle.length > 0) {
    suggestions.classList.remove("hidden");
    getData(movieTitle);
  }else{
    suggestions.classList.add("hidden");
    suggestions.innerHTML = '';
  }
});

async function getData(movieTitle) {

  let url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;

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

      // suggestions.insertAdjacentHTML("beforeend", movieSuggestion);
    }
  } else {
    suggestions.innerHTML = '<p class="no-movies">No movies found</p>';
  }
}


async function selectMovie(id) {
  suggestions.classList.add("hidden");

  let movieSelectedUrl = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

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