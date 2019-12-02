'use strict';
// var gInterval;
var gQuests = [];
var gCurrQuestIdx = 0;
var gQuestionIdx = 0;
var gRounds = 0;

function initGame() {
    createQuests();
    renderQuest(gCurrQuestIdx);
}

function createQuests() {
    gQuests = [
        { id: gQuestionIdx++, ops: ['Foxes', 'Sheeps'], correctOptIdx: 0, imgSrc: 'fox' },
        { id: gQuestionIdx++, ops: ['Tetris', 'Lego'], correctOptIdx: 1, imgSrc: 'lego' }, 
        { id: gQuestionIdx++, ops: ['Triangles', 'Circles'], correctOptIdx: 1, imgSrc: 'circles'}
    ];
    return gQuests;
};

function renderQuest(gCurrQuestIdx) {
    var questsContainer = document.querySelector('.questions-container');
    var strHTML = '';
    var question = gQuests[gCurrQuestIdx];

    strHTML += `<h1>Questions Game</h1>
                <p>Pick The sentence that describes the picture:</p>
                <div class="question">
                    <img class="question-img" src="./images/${question.imgSrc}.jpg">`
    for (let i = 0; i < question.ops.length; i++) {
        const currOpt = question.ops[i];
        strHTML += `<button class="answer"
                         onclick="checkAnswer(this,${i},${question.correctOptIdx})">${currOpt}</button>
                </div>`
    }
    questsContainer.innerHTML = strHTML;
}

function checkAnswer(elPressedBtn, optIdx, correctOptIdx) {
    if (optIdx === correctOptIdx) {
        // correct answer
        if (elPressedBtn.classList.contains('incorrect')){
            elPressedBtn.classList.remove('incorrect')
        }
        elPressedBtn.classList.add('correct');
        
        debugger
        gCurrQuestIdx++;
        gRounds = gQuests.length;
        
        if (gCurrQuestIdx === gRounds) {
            gameOver()
        } else {
            renderQuest(gCurrQuestIdx);
        }
    }
    else {
        // wrong answer
        elPressedBtn.classList.add('incorrect');
        alert('Wrong answer, try again')
    }
}

function gameOver() {
    var replay = confirm("You did it! Wanna do it again?");
    if (replay){
        gCurrQuestIdx = 0;
        gQuestionIdx = 0;
        gRounds = 0;
        initGame();
    }
    else {
        var questsContainer = document.querySelector('.questions-container');
        questsContainer.innerHTML = '<div class="bye">BYE BYE!</div>';
    }
}