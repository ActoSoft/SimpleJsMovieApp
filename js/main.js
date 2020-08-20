// const listMoviesSection = document.getElementById('movies-list');

const mockData = [
  {
    title: 'La forma del agua',
    duration: '140 min',
    director: 'Guillero del Toro',
    gender: 'Ciencia Ficción',
    country: 'México',
    isAvailable: true,
    sinopsis: 'Es una película chida'
  },
  {
    title: 'JOJO Rabbit',
    duration: '120 min',
    director: 'Taika Waititi',
    gender: 'Comedia',
    country: 'USA',
    isAvailable: false
  },
  {
    title: 'El Resplandor',
    duration: '125 min',
    director: 'Stanley Kubrick',
    gender: 'Terror',
    country: 'USA',
    isAvailable: true
  },
  {
    title: 'Gremlins',
    duration: '180 min',
    director: 'Joe Dante',
    gender: 'Comedia',
    country: 'USA',
    isAvailable: false
  },
]

const listMoviesSection = document.querySelector('#movies-list')

const getMovies = () => {
  let moviesHtml = '';
  mockData.forEach(movie => {
    if (!movie.sinopsis) {
      movie.sinopsis = 'No hay sinopsis'
    }
    const html = `
    <article>
      <h4 class="rojito">${movie.title}</h4>
      <p>Duración: ${movie.duration}</p>
      <p>Director: ${movie.director}</p>
      <p>Género: ${movie.gender}</p>
      <p>País: ${movie.country}</p>
      <p>Disponible: ${movie.isAvailable ? 'SI' : 'NO'}</p>
      <p>Sinopsis: ${movie.sinopsis}</p>

    </article>
    `
    moviesHtml += html;
  })
  listMoviesSection.innerHTML += moviesHtml
}

document.addEventListener('DOMContentLoaded', getMovies())

// AQUÍ ME PUSE BRAVA, SORRY

const nameInput = document.querySelector('#name-input')
const directorInput = document.querySelector('#director-input')
const errorsList = document.querySelector('#errors')

const errors = {
  'name.lengthInvalid': { isActive: false, message: 'El nombre debe ser de al menos 4 letras' },
  'name.capitalLetter': { isActive: false, message: 'El nombre debe iniciar con mayúscula' },
  'director.lengthInvalid': { isActive: false, message: 'El nombre del Director debe ser de al menos 4 letras' },
  'director.capitalLetter': { isActive: false, message: 'El nombre del Director debe iniciar con mayúscula' }
}

const printErrors = () => {
  errorsList.innerHTML = ''
  // Object.keys(errors) = ['name.lengthInvalid', 'name.capitalLetter']
  // Si error = 'name.lengthInvalid', entonces errors[error] = errors.'name.lengthInvalid' = {isActive: false, message: 'El nombre debe ser al menos 4 letras}
  Object.keys(errors).forEach(error => {
    if (errors[error].isActive) {
      errorsList.innerHTML += `<li>${errors[error].message}</li>`
    }
  })
}

const isLengthInvalid = (value) => value.length < 4;
const isCapitalLetter = (value) => value && value[0] !== value[0].toUpperCase();

nameInput.addEventListener('input', (event) => {
  const textValue = event.target.value;

  if (isLengthInvalid(textValue)) {
    errors['name.lengthInvalid'].isActive = true
  } else {
    errors['name.lengthInvalid'].isActive = false
  }

  if (isCapitalLetter(textValue)) {
    errors['name.capitalLetter'].isActive = true
  } else {
    errors['name.capitalLetter'].isActive = false
  }
  printErrors()
})

directorInput.addEventListener('input', (event) => {
  const textValue = event.target.value;

  if (isLengthInvalid(textValue)) {
    errors['director.lengthInvalid'].isActive = true
  } else {
    errors['director.lengthInvalid'].isActive = false
  }

  if (isCapitalLetter(textValue)) {
    errors['director.capitalLetter'].isActive = true
  } else {
    errors['director.capitalLetter'].isActive = false
  }
  printErrors()
})

