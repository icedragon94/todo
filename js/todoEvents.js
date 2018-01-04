let addElement = $('#add-todo');

addElement.click(
    () => {
        addElement.text('');
        addElement.removeClass('ta-center');
        addElement.attr('contenteditable', 'true');
        addElement.addClass('ta-left');
        addElement.addClass('p-5px');
        addElement.focus();
    });

addElement.keypress((e) => {
    if (e.which !== 13) {
        return;
    }

    let title = addElement.text();
    let todo = new ToDo(0, title, false);
    todo.generateId(todos);
    todo.setTodo(todo);

    addElement.text('');
});

addElement.blur(() => {
    addElement.text('Add Todo');
    addElement.removeClass('ta-left');
    addElement.removeClass('p-5px');
    addElement.addClass('ta-center');
});

$('body').on('click', '.table-td', function (e) {
    let element = e.target.parentNode.parentNode;
    let id = element.id;
    const index = getTodoIndex(id);
    if (index === -1) {
        return ;
    }

    todos.splice(index, 1);
    $('#' + id).fadeOut(200);
    setLocalTodos(todos);
});