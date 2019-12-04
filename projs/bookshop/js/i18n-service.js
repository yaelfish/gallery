var gTrans = {
    title: {
        en: 'Welcome To My Book Shop',
        he: 'ברוכים הבאים לחנות הספרים'
    },
    'Add-new-book-title': {
        en: 'Add new book title',
        he: 'הוספת ספר',
    },
    'placeholder-book-title': {
        en: 'Add new book title',
        he: 'הוספת כותר חדש'
    },
    'placeholder-img-url': {
        en: 'image-url',
        he: 'לינק לתמונה'
    },
    create: {
        en: 'Add new book',
        he: 'הוספת ספר',
    },
    author: {
        en: 'Author',
        he: 'מאת',
    },
    'book-title': {
        en: 'Title',
        he: 'כותר',
    },
    currency: {
        en: '$',
        he: '₪'
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    rating: {
        en: 'Rating',
        he: 'דירוג',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות לביצוע',
    },
    read: {
        en: 'Read',
        he: 'הצגת מידע'
    },
    update: {
        en: 'Update',
        he: 'עדכון מחיר',
    },
    'update-book-price': {
        en: 'Update book price',
        he: 'עדכון מחיר ספר',
    },
    delete: {
        en: 'Delete',
        he: 'מחיקת פריט',
    },
    next: {
        en: 'next',
        he: 'הבא',
    },
    prev: {
        en: 'previous',
        he: 'הקודם',
    },
    close: {
        en: 'Close',
        he: 'סגירה'
    },
    save: {
        en: 'Save changes',
        he: 'שמירה'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (element) {
        var transKey = element.dataset.trans;
        var translation = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (element.nodeName === 'INPUT') {
            element.setAttribute('placeholder', translation);
        } else {
            element.innerText = translation;
        }
    });
}


function getTrans(transKey) { 
    var mapTrans = gTrans[transKey][gCurrLang];
    if(!mapTrans){
        console.error('missing translation', transKey)
    } else return gTrans[transKey][gCurrLang];
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(date) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(date);
}


function kmToMiles(km) {
    return km / 1.609;
}