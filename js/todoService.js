function setLocalTodos (todos) {
    const todosString = JSON.stringify(todos);
    localStorage.setItem('todos', todosString);
}

function getTodoIndex (id) {
    return todos.findIndex(function (item) {
        return item.id == id;
    });
}
