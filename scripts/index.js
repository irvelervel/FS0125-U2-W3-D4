// questo documento si caricherà in index.html
// funzione che riempie il footer con l'anno corrente
const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById('year')
  footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

// funzione che recupera dalle API gli eventi attualmente nel DB
// in modo da generare nell'HTML le col con le card corrispondenti
const getEvents = function () {
  const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
  //   con questo URL ora facciamo un'operazione di GET per recuperare gli eventi
  // attualmente salvati
  fetch(eventsURL, {
    // method: 'GET',
    // body:
    // headers: {
    // blabla
    // }
  })
    .then((response) => {
      // response è un oggetto JS che comprende un po' di proprietà interessanti
      // tra cui una proprietà chiamata "ok" che in un semplice booleano riassume
      // l'esito della chiamata
      if (response.ok) {
        // possiamo sperare di recuperare i dati da questa response!
        return response.json()
      } else {
        // vuol dire che la response è arrivata ma che ha un problema
        // se finiamo nell'else, lanciamoci nel blocco .catch()
        throw new Error('la risposta non era valida')
      }
    })
    .then((data) => {
      console.log('DATI RICEVUTI DAL SERVER', data)
    })
    .catch((error) => {
      console.log('si è verificato un errore', error)
    })
}

getEvents()
