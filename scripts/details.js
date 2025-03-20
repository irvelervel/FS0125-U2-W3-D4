const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById('year')
  footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

// qui dentro ora recupero il parametro "id" che mi sono inserito nell'URL
// in cui si sta montando questa pagina details.html
const URLparameters = new URLSearchParams(location.search) // location.search è l'intero contenuto della barra URL

// details.html?id=67dbe830e205930015653b39

const concertId = URLparameters.get('id') // '67dbe830e205930015653b39'
// ora con questo concertId potrò:
// - recuperare i dettagli SOLO di questo concerto (e non di tutti)
// - modificare i dettagli SOLO di questo concerto
// - eliminare questo concerto

// per recuperare i dettagli di un solo elemento a DB, faccio una GET...
// ...ma non sarà una GET "generale" come prima!
// sarà una GET molto specifica, in cui inserirò l'ID del concerto nell'URL!
const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

const getConcertDetails = function () {
  // https://striveschool-api.herokuapp.com/api/agenda/67dbe830e205930015653b39
  fetch(eventsURL + '/' + concertId)
    .then((response) => {
      console.log('response', response)
    })
    .catch((err) => {
      console.log('ERRORE NEL RECUPERO DATI CONCERTO', err)
    })
}

getConcertDetails()
