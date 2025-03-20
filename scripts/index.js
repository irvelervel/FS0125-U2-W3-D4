// questo documento si caricherà in index.html
// funzione che riempie il footer con l'anno corrente
const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById('year')
  footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

const hideSpinner = function () {
  const div = document.getElementById('spinner-container')
  div.classList.add('d-none')
}

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
      hideSpinner() // nascondo lo spinner
      console.log('DATI RICEVUTI DAL SERVER', data)

      // prendo un riferimento alla row definita in HTML
      const row = document.getElementById('events-row')
      // ora devo ciclare l'array "data" e per ogni oggetto (concerto) devo creare
      // una colonna con dentro una card

      data.forEach((concert) => {
        row.innerHTML =
          row.innerHTML +
          `
          <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
            <div class="card">
              <img src="https://visitcastelsaraceno.info/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-30-at-10.11.50-1.jpeg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${concert.name}</h5>
                <p class="card-text">${concert.description}</p>
                <p class="card-text">${concert.price}€ - ${new Date(
            concert.time
          ).toLocaleString()}</p>
                <a href="./details.html?id=${
                  concert._id
                }" class="btn btn-primary">Vai ai dettagli</a>
              </div>
            </div>
          </div>
        `
      })
    })
    .catch((error) => {
      hideSpinner() // nascondo lo spinner
      console.log('si è verificato un errore', error)
    })
}

getEvents()
