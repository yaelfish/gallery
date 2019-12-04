'use strict'

function init() {
    loadBooks();
    render();
    doTrans();
    addTouchEvent();
}

function render() {
    renderBooks();
    renderNav()
}

function addTouchEvent() {
    enableSwap()
}

function renderNav() {
    var currPage = getCurrPage();
    var pageCount = getPagesCount();
    var strHtml = ''
    for (var i = 1; i <= pageCount; i++) {
        strHtml += `<li class="page-item ${currPage + 1 === i ? 'active' : ''}" onclick="onPageItemClick(this)">
            <a class="page-link" href="#" onclick="onChangePage(${i - 1})">${i}</a>
        </li>`
    }
    document.querySelector('.nav-container').innerHTML = strHtml;
}

function renderBooks() {
    var books = getBooksToRender();
    var counter = 1;
    var divs = books.map(function (book) {

        return `<tr data-id="${book.id}">
                    <td>${counter++}</td>
                    <td>${book.author}</td>
                    <td>${book.name}</td>
                    <td>${book.price}$</td>
                    <td>${book.rating}</td>
                    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#displayBookDetails" onclick="renderBookDetails('${book.id}')" data-trans="read">Read</button></td>
                    <!-- Button update trigger modal -->
                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#updateBookModal" onclick="onOpenUpdateModal('${book.id}')" data-trans="update">Update</button></td>
                    <td><button class="btn btn-danger" onclick="onDeleteBook('${book.id}')" data-trans="delete">Delete</button></td>
               </tr>\n`
    })

    document.querySelector('.books-container').innerHTML = divs.join('');
}

function renderBookDetails(bookID) {
    var book = getBookByID(bookID);
    var div = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="displayBookModalLabel">${book.name} - ${book.author}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modal-price"><span data-trans="price"></span>: ${book.price}<span data-trans="currency"></span></div>
                
                <div class="container">
                    <img class="img" src="./img/${book.img}.jpg" alt="${book.img}" width="250px">
                </div>
                <div class="container rating-display"><span data-trans="rating"></span>: <button class="btn btn-secondary" onclick="onChangeRtng(-1, '${book.id}')">-</button><span id="book-rating">${book.rating}</span><button class="btn btn-secondary" onclick="onChangeRtng(1, '${book.id}')">+</button></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" data-trans="close">Close</button>
                </div>
            </div>
        </div>`

    document.querySelector('#displayBookDetails').innerHTML = div;
    doTrans();
}

function onDeleteBook(bookID) {
    deleteBook(bookID);
    render();
}

function onAddBook() {
    var titleVal = document.querySelector('.add-name').value;
    var authorVal = document.querySelector('.add-author').value;
    var priceVal = document.querySelector('.add-price').value;
    var ratingVal = document.querySelector('.add-rating').value;
    var imgUrlVal = document.querySelector('.add-image').value;

    addBook(titleVal, authorVal, priceVal, ratingVal, imgUrlVal);

    render();
}

function onFilterName(txtName) {
    var filterByName = txtName.value;
    setFilterByName(filterByName)
    render();
    doTrans();
}

function onSort(elSortSelect) {
    var sortBy = elSortSelect;
    setSortBy(sortBy);
    render();
    doTrans();
}

function onShowDetails(bookID) {
    var book = setCurrentbook(bookID);

    document.querySelector('.price').innerText = book.price;
    document.querySelector('.book-details-img').innerText = './img/' + book.name + '.jpg'
    document.querySelector('.rating').value = book.rating;
    document.querySelector('.name').value = book.name;
    document.querySelector('.author').value = book.author;

    document.querySelector('.modalbookDetails').hidden = false;
}

function onChangeRtng(diff, id) {
    changeRtng(diff, id);
    document.querySelector('#book-rating').innerText = gCurrentBook.rating;
    render();
}

function onOpenUpdateModal(id) {
    gCurrentBook = getBookByID(id);
    document.querySelector('#updated-price').value = gCurrentBook.price;
}

function onReadAndUpdateBook() {
    var price = document.querySelector('#updated-price').value;
    updateBook(price);
    render();
}

function onCloseModal() {
    document.querySelector('.modalbookDetails').hidden = true;
}

function onNextPrevPage(diff) {
    var isValid = checkIfValidPage(diff);
    if (!isValid) return
    goToNextPage(diff);
    render();
}

function onChangePage(pageNum) {
    setCurrPage(pageNum);
    render();
}

function onPageItemClick(el) {
    var elPagnLis = document.querySelectorAll('.page-item');
    console.log(elPagLis)
    for (let i = 0; i < elPagnLis.length; i++) {
        const elPagLi = elPagnLis[i];
        console.log(elPagLi)
        if (elPagLi.classList.contains('active')) elPagLi.classList.remove('active')
    }
    el.classList.add('active');
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.querySelector('body').style['direction'] = 'rtl';
    }
    else {
        document.querySelector('body').style['direction'] = 'ltr'

    }
    render()
    doTrans();
}

function enableSwap() {
    console.log('bbb');
    
    const elContainer = document.querySelector('table');
    const hmrContainer = new Hammer(elContainer);
    // hmrContainer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hmrContainer.on('panleft panright', (ev) => {
        console.log(ev.target.nodeName);
        
        if (ev.target.nodeName !== 'TD') {
            return;

        }
        var side = (ev.type === 'panright') ? 'Right' : 'Left';

        var bookid = ev.target.parentElement.dataset.id;
        if (side === 'Right') {
            var book = getBookByID(bookid);
            console.log('book deleted', book);
            onDeleteBook(bookid);
            ev.target.parentElement.classList.add('animated', `fadeOut${side}`)
            render();

        } else {
            renderBookDetails(bookid);
            $('#displayBookDetails').modal('show');
        }
        hmrContainer.stop();
    });

}



