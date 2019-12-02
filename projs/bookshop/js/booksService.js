var gBooks;
var gCurrPage = 0;
var gBooksOnPage = 6;
var gCurrentBook = null;
var gFilterByName = '';
var gSortBy = 'year';

function createBook(name, author, price, img) {
    return {
        name,
        author,
        price,
        img: img || '',
        id: getRandomID()
    }
}

function createBooks() {
    gBooks = [];
    gBooks.push(createBook('Oh, The places you\'ll go', 'Dr. Seuss', 5, 'places'))
    gBooks.push(createBook('Harry Potter', 'J.K Rowling', 12, 'harry'))
    gBooks.push(createBook('The Book of Mormons', 'god', 0, 'mormon'))
    gBooks.push(createBook('The Lion who loved strawberry', 'Tirza Atar', 16, 'lion'))
    saveToStorage('books', gBooks);
    return gBooks;
}

function loadBooks() {
    gBooks = loadFromStorage('books')
    if (!gBooks){
        createBooks();
    }    
}

function updateBookByPrice(price, id){
    var book = getBookByID(id);
    book.price = price;
    saveToStorage('books', gBooks);
}

function getBookByID(bookID) {
    return gBooks.find(function (book) {
        if (book.id === bookID)
        return book;
    });
}

function getBooksToRender() {
    var filteredBooks = gBooks.filter(function(book) {
        return book.name.includes(gFilterByName);
    })

    var sortedBooks = filteredBooks.sort(function(book1, book2) {
        return book1[gSortBy] > book2[gSortBy] ? 1 :
            (book1[gSortBy] < book2[gSortBy] ? -1 : 0)
    })

    var startAt = gCurrPage * gBooksOnPage;
    return sortedBooks.slice(startAt, startAt + gBooksOnPage);
}

function getBookIndexByID(bookID) {
    return gBooks.findIndex(function(book) {
        return book.id === bookID
    })
}

function deleteBook(bookID) {
    var bookIndex = getBookIndexByID(bookID)
    gBooks.splice(bookIndex, 1);
    saveToStorage('books', gBooks);
}

function addBook(name, author, price) {
    var book = createBook(name, author, price, img);
    gBooks.push(book);
    saveToStorage('books', gBooks);
}

function updateBook(bookId, price) {
    var book = getBookByID(bookId);
    console.log(book);
    console.log(price);
    console.log(book[price]);
}

function setFilterByName(name) {
    gFilterByName = name;
    gCurrPage = 0;
}

function setCurrentbook(bookID) {
    gCurrentBook = getBookByID(bookID);
    return gCurrentBook;
}

function goToNextPage() {
    gCurrPage++;
    gCurrPage = (gCurrPage + gBooks.length) % gBooks.length;
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}