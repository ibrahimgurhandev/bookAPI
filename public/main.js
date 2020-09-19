const trash = document.getElementsByClassName("trash");


Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentElement.children[0].innerText
    console.log(name)
    fetch('deletebook', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name

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
  fetch(
      `searchBooks?bookName=${bookName}`
    )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderAllBook(data);
      setUpBookMarkButtons()

    })
}

function renderAllBook(data) {
  let bookResults = document.querySelector("#bookResults")
  bookResults.innerHTML = `
  <div class="grid">
    ${data.items
      .map(
        (book) =>{
          const bookName = book.volumeInfo.title
          const bookAuthor = book.volumeInfo.authors || "no Author"
          const tempImage =book.volumeInfo.imageLinks || "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
          const bookImage = tempImage.smallThumbnail || "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"

         return( `<div class="eachBook">
          <p id="booktitle">${bookName}</p> 
          <p>by ${bookAuthor}</p> 

          <button class="btn btn-primary" data-title="${bookName}" data-author="${bookAuthor}" data-image="${bookImage}"> Bookmark <span><i class="fa fa-plus-circle"
          aria-hidden="true"></i></span> </button>
          <img class="searchImage"src="${bookImage}" />
          </div>
        `)}
      )
      .join("")}
  </div>
`
}






function setUpBookMarkButtons() {
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
            'author': element.dataset.author,
            'image': element.dataset.image
          })
        })
        .then(function (response) {
          window.location.reload()
        })
    })
  })
}