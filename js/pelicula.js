 const pelicula = document.getElementById("pelicula");
 const titulo = document.getElementById("titulo")
 const inicio = document.getElementById("inicio");
let id = localStorage.getItem("id");
const URL_PELI = `https://api.themoviedb.org/3/movie/${id}?api_key=fff89553e9929092089d06842e9cb52e&language=es-MX`


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmY4OTU1M2U5OTI5MDkyMDg5ZDA2ODQyZTljYjUyZSIsInN1YiI6IjY0ZTE4MmJkZGE5ZWYyMDEzYzVlMTIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cm8xwVqCDhuZdmkunIIGB_bPWZqcZgNHDL6sLZzk05w'
    }
  };

  fetch(URL_PELI, options)
  .then(res => res.json())
  .then(movie => {
    titulo.innerHTML = movie.title
    console.log(movie)
    pelicula.innerHTML = 
            `<div class="card mb-3 d-flex" style="max-width: 2000px; ">
            <div class="row g-0">
              <div class="col-md-2">
                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="img-fluid rounded-start" alt="Poster de la pelicula">
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.overview}</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
          <iframe id="repro" allowfullscreen="true" src="https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1"></iframe>
          `
  })

  inicio.addEventListener("click", () => {
    window.location = "index.html"
  })