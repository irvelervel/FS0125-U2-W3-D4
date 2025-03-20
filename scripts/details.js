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
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero dei dettagli')
      }
    })
    .then((data) => {
      console.log('DETTAGLI EVENTO', data)
      //   riempio i dettagli mancanti della card
      const name = document.getElementById('name')
      const description = document.getElementById('description')
      const timePrice = document.getElementById('price-time')
      // data è un oggetto con name, description, time, price etc.
      name.innerText = data.name
      description.innerText = data.description
      timePrice.innerText =
        data.price + '€' + ' - ' + new Date(data.time).toLocaleString()
    })
    .catch((err) => {
      console.log('ERRORE NEL RECUPERO DATI CONCERTO', err)
    })
}

const editConcert = function () {
  location.assign('./backoffice.html?id=' + concertId)
}

const deleteConcert = function () {
  // --- WARNING ---
  // stiamo per eliminare il concerto
  fetch(eventsURL + '/' + concertId, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // abbiamo eliminato il concerto
        alert('CONCERTO ELIMINATO')
        // riportiamo l'utente in home
        location.assign('./index.html') // riportiamo l'utente in home
      } else {
        throw new Error('eliminazione NON andata a buon fine!')
      }
    })
    .catch((err) => {
      console.log('ERRORE NELLA CANCELLAZIONE', err)
    })
}

getConcertDetails()

// GET su eventsURL --> torna TUTTI gli oggetti in un array
// GET su eventsURL + id --> torna UN oggetto, quello dotato di quell'id
// POST su eventsURL --> crea un NUOVO oggetto
// DELETE su eventsURL + id --> elimina un oggetto
// PUT su eventsURL + id --> modifica un oggetto
