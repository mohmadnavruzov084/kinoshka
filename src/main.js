import "./scss/main.scss";

// Конфигурация API
const API_KEY = "G89F912-3EVMK77-M249QTW-GTEG75P";
const API_URL = "https://api.kinopoisk.dev/v1.3/movie";

const movieBox = document.getElementById("movies-container");

async function loadMovies() {
  try {
    const response = await fetch(
      `${API_URL}?page=1&limit=12&selectFields=name&selectFields=description&selectFields=poster&selectFields=rating&selectFields=year`,
      {
        headers: { "X-API-KEY": API_KEY },
      }
    );
    const data = await response.json();

    movieBox.innerHTML = "";
    data.docs.forEach((movie) => {
      movieBox.innerHTML += createMovieCard(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

function createMovieCard(movie) {
  return `
                <div class="card__content">
                    <div class="card__img">
                        <img src="${movie.poster.url}"
                             alt="">
                    </div>
                    <div class="card__info">
                        <h3 class="card__name">
                        ${movie.name}</h3>
                        <p class="card__rating">Рейтинг: ${
                          movie.rating?.kp ? movie.rating.kp.toFixed(1) : "Н/Д"
                        }</p>
                    </div>
                </div>
            `;
}

document.addEventListener("DOMContentLoaded", loadMovies);
