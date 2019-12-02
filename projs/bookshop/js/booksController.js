'use strict'

function init() { 
    loadBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooksToRender();
    var counter = 1;
    var divs = books.map(function(book) {
        
        return `<tr>
                    <td>${counter++}</td>
                    <td>${book.author}</td>
                    <td>${book.name}</td>
                    <td>${book.price}$</td>
                    <td>
                    
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#displayBookDetails" onclick="renderBookDetails('${book.id}')">Read</button>
                    </td>
                    <!-- Button update trigger modal -->
                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#updateBookModal" onclick="onReadAndUpdateBook('${book.id}')">Update</button></td>
                    <td><button class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button></td>
               </tr>\n`
    })

    document.querySelector('.books-container').innerHTML = divs.join('');
}

function renderBookDetails(bookID) {
    var book = getBookByID(bookID)
    console.log(book);
    
    var div = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="displayBookModalLabel">${book.name} - ${book.author}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">Price: ${book.price}$</div>
                <div class="container">
                <img class="img" src="./img/${book.img}.jpg" alt="${book.img}" width="250px">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>`
    document.querySelector('#displayBookDetails').innerHTML = div;
}

function onDeleteBook(bookID) {
    deleteBook(bookID);
    renderBooks();
}

function onAddBook() {
    var titleVal = document.querySelector('.add-name').value;
    var authorVal = document.querySelector('.add-author').value;
    var priceVal = document.querySelector('.add-price').value;
    var imgUrlVal = document.querySelector('.add-image').value;

    addBook(titleVal,authorVal,priceVal, imgUrlVal);

    renderBooks();
}

function onFilterName(txtName) {
    var filterByName = txtName.value;
    setFilterByName(filterByName)
    renderBooks();
}

function onSort(elSortSelect) {
    var sortBy = elSortSelect;
    setSortBy(sortBy);
    renderBooks();
}

function onShowDetails(bookID) {
    var book = setCurrentbook(bookID);

    document.querySelector('.price').innerText = book.price;
    document.querySelector('.book-details-img').innerText = './img/' + book.name + '.jpg'

    document.querySelector('.name').value = book.name;
    document.querySelector('.author').value = book.author;

    document.querySelector('.modalbookDetails').hidden = false;
}

function onReadAndUpdateBook(id) {
    var newPrice = document.querySelector('#updated-price').value;
    updateBook(id, newPrice);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modalbookDetails').hidden = true;
}

function onNext() {
    goToNextPage()
    renderBooks()
}