'use strict';

var gCurrModal;
var gProjs;

function loadProjs(){
    gProjs = createProjs();
}

function createProj(id, name, title, desc, url, labels){
    return {
        id,
        name,
        title,
        desc,
        url,
        publishedAt: getCurrentTime(),
        labels
    }
}

function createProjs(){
    var gProjs = [];

    gProjs.unshift(createProj('inpicture', 'in picture', 'What do you see here?', 'Pac-Man is a maze arcade game developed and released by Namco in 1980. The original Japanese title of Puck Man was changed to Pac-Man for international releases as a preventative measure against defacement of the arcade machines.', 'projs/inpicture', ["Matrixes", "keyboard events"]));

    gProjs.unshift(createProj('todo', 'to do', 'Always remember whats ahead', 'Pac-Man is a maze arcade game developed and released by Namco in 1980. The original Japanese title of Puck Man was changed to Pac-Man for international releases as a preventative measure against defacement of the arcade machines.', 'projs/todo', ["Matrixes", "keyboard events"]));

    gProjs.unshift(createProj('bookshop', 'book shop', 'Manage your books inventory', 'Pac-Man is a maze arcade game developed and released by Namco in 1980. The original Japanese title of Puck Man was changed to Pac-Man for international releases as a preventative measure against defacement of the arcade machines.', 'projs/bookshop', ["Matrixes", "keyboard events"]));

    gProjs.unshift(createProj('chess', 'chess', 'Plan your next move', 'Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid. The game is played by millions of people worldwide.', 'projs/chess', ["Matrixes", "keyboard events"]));

    gProjs.unshift(createProj('minesweeper', 'minesweeper', 'Avoid all the mines', 'Minesweeper is a single-player puzzle computer game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field. ', 'projs/minesweeper', ["Matrixes", "keyboard events"]));

    gProjs.unshift(createProj('pacman', 'pacman', 'Be ahead of your enemies', 'Pac-Man is a maze arcade game developed and released by Namco in 1980. The original Japanese title of Puck Man was changed to Pac-Man for international releases as a preventative measure against defacement of the arcade machines.', 'projs/pacman', ["Matrixes", "keyboard events"]));
   
    return gProjs;
}

function getProjsToRender(){
    return createProjs();
}

function sumbitForm(email, subject, msgBody) {
    var redirectLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${msgBody}`;
    var redirectWindow = window.open(redirectLink, '_blank');
    redirectWindow.location;
}