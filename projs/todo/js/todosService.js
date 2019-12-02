var gTodos = [], gNextID = 1, gStatusFilter = 'all', gSortBy = 'text';

function createTodo(title, importance) {
    var todo = {
        title,
        isDone: false,
        id: gNextID++,
        createdAt: getCurrentTime(),
        importance
    }
    saveToStorage('gNextID', gNextID);
    return todo;
}

function saveTodos() {
    saveToStorage('todos', gTodos);
}

function loadData() {
    gTodos = loadFromStorage('todos', []);
    gNextID = loadFromStorage('gNextID', 1)
}

function createTodos() {
    gTodos = [];
}

function getTodosToRender() {
    var filteredTodos = gTodos.filter(function (todo) {
        return ((gStatusFilter === 'all') ||
            (gStatusFilter === 'active' && !todo.isDone) ||
            (gStatusFilter === 'done' && todo.isDone))
    });
    return sortTodos(filteredTodos);
}

function findTodoById(todoID) {
    return gTodos.find(function (todo) {
        return todo.id === todoID
    });
}
function findTodoIndexById(todoID) {
    return gTodos.findIndex(function (todo) {
        return todo.id === todoID
    });
}

function toggleDone(todoID) {
    var todo = findTodoById(todoID);
    todo.isDone = !todo.isDone;
    saveTodos()
}

function addTodo(title, importance) {
    var newTodo = createTodo(title, importance);
    gTodos.push(newTodo);
    saveTodos()
}

function updateImportanceLevel(importanceLevel) {
    return importanceLevel;

}

function deleteTodo(todoID) {
    var todoIndex = findTodoIndexById(todoID);
    gTodos.splice(todoIndex, 1);
    saveTodos()
}

function setFilterStatus(statusFilter) {
    gStatusFilter = statusFilter;
}

function getActiveTodosCount() {
    return gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count++;
        return count;
    }, 0);
}

function getTotalTodosCount() {
    return gTodos.length;
}

function setCurrSort(value){
    gSortBy = value;
    return gSortBy;
}

function sortTodos(todos) {
    switch (gSortBy) {
        case 'text':
            todos.sort((aTodo, bTodo) => (aTodo.title > bTodo.title) ? 1 : ((bTodo.title > aTodo.title) ? -1 : 0)); 
            break;
        case 'importance':
            todos.sort((aTodo, bTodo) => (aTodo.importance - bTodo.importance)); 
            break;
        case 'timeCreated':
            todos.sort((aTodo, bTodo) => new Date(bTodo.createdAt) - new Date(aTodo.createdAt)); 
            break;
    }
    return todos;
}