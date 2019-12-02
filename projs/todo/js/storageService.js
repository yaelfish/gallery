function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key , defaultValue) {
    var str = localStorage.getItem(key);
    return str?  JSON.parse(str) : defaultValue
}