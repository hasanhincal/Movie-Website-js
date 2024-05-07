const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=702327d8f5a8e8a2fb179c1ededa7168&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=702327d8f5a8e8a2fb179c1ededa7168&query=";

const form = document.querySelector("form");
const search = document.getElementById("search");
const main = document.querySelector("main");

//* API istek atma;
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results)
};

getMovies(API_URL);

//* search input submit olayı;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value= "";
  } else {
    window.location.reload();
  }
});

const showMovies = (movies)=>{
  
  main.innerHTML ="";
  movies.forEach((movie) => {
    const {overview, poster_path, title, vote_average} = movie
 
  const movieEl = document.createElement("div")
  movieEl.classList.add("movie")
  movieEl.innerHTML = 
  `
        <img
          src="${IMG_PATH + poster_path}"
          width="300"
          height="300"
          alt="${title}"
        />
        <div class="movie_info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>${title}</h3>
          <p>
          ${overview}
          </p>
        </div>
  
  `
main.appendChild(movieEl)
});
}

//* rating işlemi;
const getClassByRate = (vote)=>{
if (vote >= 8) {
  return 'green'
} else if(vote >= 5) {
  return 'orange'
}else{
  return 'red';
}
}