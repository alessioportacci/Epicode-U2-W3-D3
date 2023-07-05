const getBooks = function () {
    fetch("https://striveschool-api.herokuapp.com/books")
      //Ritorno il Json
      .then((res) => {
        if (res.ok) return res.json()
      })
      //Mi creo le cards dei libri
      .then((data) => {
        console.log(data)
        const booksRow = document.getElementById("books-row")
        data.forEach((book) => {
          let div = document.createElement("div")
          div.classList.add("mt-5")
          div.classList.add("p-2")
          div.innerHTML = `<img src=${book.img} style="width: 100%" height=400>
                           <h4 class="text-center text-truncate"> ${book.title} </h4>
                           <h6> ${book.price}€ </h6>
                           <button class="btn btn-secondary"> Rimuovi </button>
                           <button class="btn btn-success" name="${book.title}" price="${book.price}"> Aggiungi al carrello </button>`

          booksRow.appendChild(div)
        })
      })
      //Aggiungo le funzionalità ai pulsanti nelle cards
      .then(() => {
        //Aggiungo la funzione di rimoziione delle card
        const buttons = document.querySelectorAll(".btn-secondary")
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            this.parentElement.style.display = "none"
          })
        })
        //Aggiungo la funzione di aggiunta al carrello
        const buttonsShopping = document.querySelectorAll(".btn-success")
        const carrelloRow = document.getElementById("carrello-row")
        buttonsShopping.forEach((button) => {
          button.addEventListener("click", function () {
            let col = document.createElement("div")
            col.innerHTML = `<button class="btn btn-danger"> Remove </button>
                             ${this.getAttribute("name")} 
                             - ${this.getAttribute("price")}`
            carrelloRow.appendChild(col)

            document.querySelectorAll(".btn-danger").forEach((button) => {
              button.addEventListener("click", function () {
                this.parentElement.style.display = "none"
              })
            })
          })
        })
      })
  }

  getBooks()