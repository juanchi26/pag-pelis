const estrenos = document.getElementById("estrenos");
const boton = document.getElementById("boton");
const buscador = document.getElementById("input");
const cargar_mas = document.getElementById("cargar")
const estrenos_movies = `https://api.themoviedb.org/3/movie/upcoming?language=es-MX&page=1`
let contador = 2
function redirect(id){
    localStorage.setItem("id", id)
    window.location = "peliculas.html"
  }


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmY4OTU1M2U5OTI5MDkyMDg5ZDA2ODQyZTljYjUyZSIsInN1YiI6IjY0ZTE4MmJkZGE5ZWYyMDEzYzVlMTIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cm8xwVqCDhuZdmkunIIGB_bPWZqcZgNHDL6sLZzk05w'
    }
  };
  
  
  
  async function peticion(url, options) {
    let response = await fetch(url, options)
    let data = await response.json()
    return data
  }
  
  
  
document.addEventListener("DOMContentLoaded", () => {
  peticion(estrenos_movies, options).then(movies => {
    console.log(movies.results)
    movies.results.forEach(movie => {
      peliculas.innerHTML += `
      <div class="col">
            <a class="card mt-3" style="width: 18rem;"">
            <div>
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"" alt="Poster de la pelicula">
              <div onclick="redirect(${movie.id})" class="contenido">
                <h6>${movie.title}</h6>
                <svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 384 512"><style>svg{fill:#ffffff}</style><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                <p>Puntuación ${movie.vote_average} <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#e6d837}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
              </div>
            </div>
          </a>
        </div>`
    });
  
  })

  boton.addEventListener("click", () => {
    peticion(`https://api.themoviedb.org/3/search/movie?query=${buscador.value}&include_adult=false&language=es-MX&page=1`, options).then(movies => {
      peliculas.innerHTML = ""
      movies.results.forEach(movie => {
        peliculas.innerHTML += `
        <div class="col">
            <a class="card mt-3" style="width: 18rem;"">
            <div>
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"" alt="Poster de la pelicula">
              <div onclick="redirect(${movie.id})" class="contenido">
                <h6>${movie.title}</h6>
                <svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 384 512"><style>svg{fill:#ffffff}</style><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                <p>Puntuación ${movie.vote_average} <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#e6d837}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
              </div>
            </div>
          </a>
        </div>`
      })
    })
  })


cargar_mas.addEventListener("click", () => {
  let url_paginacion = `https://api.themoviedb.org/3/movie/upcoming?language=es-MX&page=${contador}`
      peticion(url_paginacion, options).then(movies => {
        movies.results.forEach(movie => {
          peliculas.innerHTML += `
          <div class="col">
            <a class="card mt-3" style="width: 18rem;"">
            <div>
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"" alt="Poster de la pelicula">
              <div onclick="redirect(${movie.id})" class="contenido">
                <h6>${movie.title}</h6>
                <svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 384 512"><style>svg{fill:#ffffff}</style><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                <p>Puntuación ${movie.vote_average} <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#e6d837}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
              </div>
            </div>
          </a>
        </div>`
        })
      })
      contador += 1
})




})  
  
  