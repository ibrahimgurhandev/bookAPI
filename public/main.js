var trash = document.getElementsByClassName("fa-trash");




Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('deletebook', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

let searchBtn = document.querySelector("#searchBtn")
searchBtn.addEventListener('click', searchBooks)

function searchBooks() {
  let bookName = document.querySelector("#search").value;
  let bookResults = document.querySelector("#bookResults")
  fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
    )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderAllBook(data);


      var btn = document.getElementsByClassName("btn");
      Array.from(btn).forEach(function (element) {
        element.addEventListener('click', function () {
          fetch('addbook', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'name': element.dataset.title,
                'author': element.dataset.author
              })
            })
            .then(function (response) {
              window.location.reload()
            })
        })
      })
    })
}

function renderAllBook(data) {

  bookResults.innerHTML = `
  <div class="grid">
    ${data.items
      .map(
        (book) =>{
          const bookName = book.volumeInfo.title
          const bookAuthor =book.volumeInfo.authors[0]

         return( `<div class="eachBook">
          <strong>${book.volumeInfo.title}</strong> 
          <button class="btn" data-title="${bookName}" data-author="${bookAuthor}"> Bookmark <span><i class="fa fa-plus-circle"
          aria-hidden="true"></i></span> </button>
          <img src="${book.volumeInfo.imageLinks.smallThumbnail}" />
          </div>
        `)}
      )
      .join("")}
  </div>
`

}