const peliculas = document.getElementById("peliculas");
const boton = document.getElementById("boton");
const buscador = document.getElementById("input");
const inicio = document.getElementById("inicio");
const mostrar_mas = document.getElementById("cargar");
const popular_movie = `https://api.themoviedb.org/3/movie/popular?api_key=fff89553e9929092089d06842e9cb52e&language=es-MX&page=undefined`
let contador = 2

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
  peticion(popular_movie, options).then(movies => {
    movies.results.forEach(movie => {
      peliculas.innerHTML += `
      <div class="col">
            <a class="card mt-3" style="width: 12rem;"">
            <div>
            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"  onclick="redirect(${movie.id})" alt="Poster de la pelicula">
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
              <a class="card mt-3" style="width: 12rem;"">
              <div>
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"  onclick="redirect(${movie.id})" alt="Poster de la pelicula">
              </div>
            </a>
          </div>`
      })
    })
  })
  
  inicio.addEventListener("click", () => {
      peticion(popular_movie, options).then(movies => {
        peliculas.innerHTML = ""
        movies.results.forEach(movie => {
          peliculas.innerHTML += `
          <div class="col">
                <a class="card mt-3" style="width: 12rem;"">
                <div>
                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"  onclick="redirect(${movie.id})" alt="Poster de la pelicula">
                </div>
              </a>
            </div>`
        });
      })
  })
  
  
  
  mostrar_mas.addEventListener("click", () => {
    
    let url_paginacion = `https://api.themoviedb.org/3/movie/popular?api_key=fff89553e9929092089d06842e9cb52e&language=es-MX&page=${contador}`
      peticion(url_paginacion, options).then(movies => {
        movies.results.forEach(movie => {
          peliculas.innerHTML += `
          <div class="col">
                <a class="card mt-3" style="width: 12rem;"">
                <div>
                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top"  onclick="redirect(${movie.id})" alt="Poster de la pelicula">
                </div>
              </a>
            </div>`
        })
      })
      contador += 1
    
  })
})






function redirect(id){
  localStorage.setItem("id", id)
  window.location = "peliculas.html"
}