// questo documento si caricherà in index.html
const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById('year')
  footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()
