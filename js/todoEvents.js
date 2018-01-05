const addElement =    $('#add-todo');
const bodyElement =   $('body');
const activeElement = $('#active');
const doneElement =   $('#done');

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

// bodyElement.on('dblclick', '.table-td', function () {
//
// });

bodyElement.on('click', '.checkbox-container', function (e) {
    let element = e.target.parentNode.parentNode;

    e.stopPropagation();
    e.preventDefault();

    let id = element.id;
    const index = getTodoIndex(id);
    if (index === -1) {
        return ;
    }

    todos[index].isFinished = !todos[index].isFinished;
    $('#' + id).fadeOut(200);
    setLocalTodos(todos);
});

activeElement.click(function () {
    getActiveTodos(todos);
});

doneElement.click(function () {
    getDoneTodos(todos, true);
});