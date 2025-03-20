// questo documento si caricherà in index.html
const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById('year')
  footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

// ora la pagina Backoffice serve un duplice scopo... può:
// - creare un concerto nuovo
// - modificare un concerto esistente
// da cosa capisco se sono in modalità "CREA" o in modalità "MODIFICA"?
// dal fatto che abbia o meno un "id" come parametro nella barra degli indirizzi
const URLparameters = new URLSearchParams(location.search)
const eventId = URLparameters.get('id')

// prendiamo i riferimenti ai 4 input del form
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const timeInput = document.getElementById('time')

const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// eventId è una stringa se sono in modalità MODIFICA
// eventId è null se sono in modalità CREA
if (eventId) {
  // MODALITÀ MODIFICA
  // ripopolo i campi del form con i dati esistenti
  fetch(eventsURL + '/' + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json() // recupero il contenuto del JSON con una seconda Promise
      } else {
        throw new Error('errore nella fetch')
      }
    })
    .then((data) => {
      // data è l'oggetto corrispondente all'id da modificare
      // riempire i campi del form con i valori di data
      nameInput.value = data.name
      descriptionInput.value = data.description
      priceInput.value = data.price
      timeInput.value = data.time.split('.')[0] // tolto il '.000Z' dalla stringa
    })
    .catch((err) => console.log('ERRORE DEL RIPOPOLAMENTO DEL FORM', err))
}

// il mio backender di fiducia mi ha detto che un oggetto "evento" è fatto così:
// ci sono 4 proprietà:
// - name -> string
// - description  -> string
// - price -> string/number
// - time -> string

// gestiamo il submit del form in modo da creare un oggetto con i 4 campi
// e spedire un nuovo evento alle API!
// prendiamo un riferimento al form
const form = document.getElementById('event-form')
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const concert = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )

  console.log('CONCERT', concert)

  // ora il bello: lo salviamo in modo persistente nel DB
  // nota positiva: in un'API di tipo RESTFUL, l'URL su cui fate la GET generica
  // è anche l'URL per fare una POST!

  let methodToUse
  let URLtoUse

  if (eventId) {
    methodToUse = 'PUT'
    URLtoUse = eventsURL + '/' + eventId
  } else {
    methodToUse = 'POST'
    URLtoUse = eventsURL
  }

  fetch(URLtoUse, {
    method: methodToUse, // metodo post per creazione nuovo evento
    body: JSON.stringify(concert), // oggetto concert convertito in stringa JSON
    headers: {
      // se l'API richiedesse un'autorizzazione, la mettereste qui dentro
      // authorization: 'kldsjfdslkfjdsklfjdslkjfdslk',
      'Content-Type': 'application/json', // andiamo a definire che il nostro payloar
      // è di tipo json. IMPORTANTE INSERIRLA!
    },
  })
    .then((response) => {
      // la response ci dice se il salvataggio del nostro concerto è andato a buon fine o meno
      if (response.ok) {
        // il salvataggio ha funzionato!
        alert('SALVATAGGIO COMPLETATO!')
        // io nella pagina backoffice non avrei bisogno di recuperare il JSON dalla response
        // direi che potremmo semplicemente svuotare il form e finire qua
        form.reset() // svuoto il form
      } else {
        // 400, 401, 500 etc.
        throw new Error('ricevuta response non ok dal backend')
      }
    })
    .catch((err) => {
      console.log('errore nel salvataggio!', err)
    })
})
