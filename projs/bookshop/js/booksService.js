'use strict';

const KEY_TODOS = 'books';

var gBooks;
var gCurrPage = 0;
var gBooksOnPage = 3;
var gCurrentBook = null;
var gFilterByName = '';
var gSortBy = 'year';


function getCurrPage(){
    return gCurrPage;
}

function getPagesCount(){
    return Math.ceil(gBooks.length/gBooksOnPage)
}
function createBook(name, author, price, rating = 0, img) {
    return {
        name,
        author,
        price,
        rating,
        img: img || '',
        id: getRandomID()
    }
}

function createBooks() {
    gBooks = [];
    gBooks.push(createBook('Oh, The places you\'ll go', 'Dr. Seuss', 5, 5, 'places'))
    gBooks.push(createBook('Harry Potter', 'J.K Rowling', 12, 5, 'harry'))
    gBooks.push(createBook('The Book of Mormons', 'god', 0, 2, 'mormon'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 4, 'lion'))
    gBooks.push(createBook('Oh, The places you\'ll go', 'Dr. Seuss', 5, 5, 'places'))
    gBooks.push(createBook('Harry Potter', 'J.K Rowling', 12, 5, 'harry'))
    gBooks.push(createBook('The Book of Mormons', 'god', 0, 2, 'mormon'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 4, 'lion'))
    gBooks.push(createBook('Oh, The places you\'ll go', 'Dr. Seuss', 5, 5, 'places'))
    gBooks.push(createBook('Harry Potter', 'J.K Rowling', 12, 5, 'harry'))
    gBooks.push(createBook('The Book of Mormons', 'god', 0, 2, 'mormon'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 4, 'lion'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 4, 'lion'))
    gBooks.push(createBook('Oh, The places you\'ll go', 'Dr. Seuss', 5, 5, 'places'))
    gBooks.push(createBook('Harry Potter', 'J.K Rowling', 12, 5, 'harry'))
    gBooks.push(createBook('The Book of Mormons', 'god', 0, 2, 'mormon'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 4, 'lion'))
    saveToStorage(KEY_TODOS, gBooks);
    return gBooks;
}

function loadBooks() {
    gBooks = loadFromStorage(KEY_TODOS)
    if (!gBooks) {
        createBooks();
    }
}

function updateBookByPrice(price, id) {
    var book = getBookByID(id);
    book.price = price;
    saveToStorage(KEY_TODOS, gBooks);
}

function getBookByID(bookID) {
    return gBooks.find(function (book) {
        if (book.id === bookID)
            return book;
    });
}

function getBooksToRender() {
    var filteredBooks = gBooks.filter(function (book) {
        return book.name.includes(gFilterByName);
    })

    var sortedBooks = filteredBooks.sort(function (book1, book2) {
        return book1[gSortBy] > book2[gSortBy] ? 1 :
            (book1[gSortBy] < book2[gSortBy] ? -1 : 0)
    })

    var startAt = gCurrPage * gBooksOnPage;
    return sortedBooks.slice(startAt, startAt + gBooksOnPage);
}

function getBookIndexByID(bookID) {
    return gBooks.findIndex(function (book) {
        return book.id === bookID
    })
}

function deleteBook(bookID) {
    var bookIndex = getBookIndexByID(bookID)
    gBooks.splice(bookIndex, 1);
    saveToStorage(KEY_TODOS, gBooks);
}

function addBook(name, author, price, rating) {
    var book = createBook(name, author, price, rating, img);
    gBooks.push(book);
    saveToStorage(KEY_TODOS, gBooks);
}

function updateBook(newPrice) {
    gCurrentBook.price = newPrice;
    saveToStorage(KEY_TODOS, gBooks);
}

function changeRtng(diff, id) {
    gCurrentBook = getBookByID(id);
    if (gCurrentBook.rating <= 0 || gCurrentBook.rating >= 10) {
        return;
    }
    gCurrentBook.rating += diff;
    saveToStorage(KEY_TODOS, gBooks);
};

function setFilterByName(name) {
    gFilterByName = name;
    gCurrPage = 0;
}

function setCurrentbook(bookID) {
    gCurrentBook = getBookByID(bookID);
}

function goToNextPage(diff) {
    gCurrPage += diff;
}

function checkIfValidPage(diff) {
    // number of filled page displays
    var upperLimit = Math.floor(gBooks.length / gBooksOnPage) - 1;
    // the remainder
    var remainder = gBooks.length % gBooksOnPage;
    // if there is a remainder - one more display page is needed
    if (remainder !== 0) upperLimit++;

    var targetPage = gCurrPage + diff;

    if (targetPage < 0 || targetPage > upperLimit) return false;
    return true;

}

function setCurrPage(pageNum) {
    gCurrPage = pageNum;
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}