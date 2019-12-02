'use strict'

function init(){
    loadData();
    renderTodos()
}


function renderTotals(){
    var elTotalSpan = document.querySelector('#total-todos');
    var elActiveSpan = document.querySelector('#active-todos');

    elTotalSpan.innerHTML = getTotalTodosCount();
    elActiveSpan.innerHTML = getActiveTodosCount();
}

function renderTodosList(){
    var elTodods = document.querySelector('.todos');
    var todos = getTodosToRender();

    if (todos.length === 0) { 
        var strLis = renderWhenEmpty();
        elTodods.innerHTML = strLis
        return;
    } 
    else {
        var strLis = todos.map(function (todo) {
            return `<li class="todo ${todo.isDone ? 'done' : ''}" onclick="onTodoClicked(${todo.id})">
                    ${todo.title}, חשיבות: ${todo.importance} <button class="delete" onclick="onDeleteClick(${todo.id} , event)">test</button>
                </li>\n`;
        });
    }
    elTodods.innerHTML = strLis.join('');
}

function renderWhenEmpty() {
    var emptyMsg = '';
    switch (gStatusFilter) {
        case 'all':
            emptyMsg = 'No todos to show';
            break;
        case 'active':
            emptyMsg = 'No active todos to show';
            break;
        case 'done':
            emptyMsg = 'No Done todos to show';
            break;
    }
    return `<p>${emptyMsg}</p>`
}

function renderTodos(){
    renderTodosList();
    renderTotals();
}

function onDeleteClick(todoID , event){
    var confirmDelete = confirm('Are you sure you want to delete this?');
    event.stopPropagation();
    if (confirmDelete){
        deleteTodo(todoID);
        renderTodos();
    }
    return;
}

function onTodoClicked(todoID){
    toggleDone(todoID);
    renderTodos();
}

function onAddClick(){
    var elTxtTodo = document.querySelector('#todo-title');
    var newTodoTitle =  elTxtTodo.value;

    var elImportance = document.querySelector('#importance');
    var importance = elImportance.value;
    
    if(newTodoTitle !== ''){
        addTodo(newTodoTitle, importance);
    } else {
        elTxtTodo.placeholder = 'You cannot submit an empty task';
    }
    renderTodos();
}

function onStatusFilterChange(elStatusFilter){
    var filterByStatus = elStatusFilter.value;

    setFilterStatus(filterByStatus);
    renderTodos();
}

function onSortStatusChange(sortByVal) {
     setCurrSort(sortByVal);
     renderTodos()
}
