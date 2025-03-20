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
  // prendiamo i riferimenti ai 4 input del form
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')

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

  const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

  fetch(eventsURL, {
    method: 'POST', // metodo post per creazione nuovo evento
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
