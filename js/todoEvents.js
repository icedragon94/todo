const addElement        = $('#add-todo');
const bodyElement       = $('body');
const activeElement     = $('#active');
const doneElement       = $('#done');
const todoTableElement  = $('.todo-title');

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
    addElement.text('Add todo');
    addElement.removeClass('ta-left');
    addElement.removeClass('p-5px');
    addElement.addClass('ta-center');
});

bodyElement.on('dblclick', (event) => {
    let target = event.target;
    target.contentEditable = 'true';
    target.focus();
});

bodyElement.on('focusout', (event) => {
    let target = event.target;
    target.removeAttribute('contentEditable');
    target.selectionStart = 2;
});

bodyElement.on('keypress', (event) => {
    if (event.which !== 13) {
        return;
    }
    const target = event.target;
    const id = target.parentNode.id;
    const title = target.textContent;
    const index = getTodoIndex(id);
    const isFinished = todos[index].isFinished;

    todos[index] = new ToDo(id, title, isFinished);
    setLocalTodos(todos);
    target.blur();
});

bodyElement.on('click', '.checkbox-mark', (event) => {
    let element = event.target.parentNode.parentNode;

    event.stopPropagation();
    event.preventDefault();

    let id = element.id;
    const index = getTodoIndex(id);
    if (index === -1) {
        return ;
    }

    todos[index].isFinished = !todos[index].isFinished;
    $('#' + id).fadeOut(200);
    setLocalTodos(todos);
});

activeElement.click(() => {
    getActiveTodos(todos);
});

doneElement.click(() => {
    getDoneTodos(todos, true);
});

bodyElement.on('click', '.todo-delete', () => {
    const target = event.target;

    const id = target.parentNode.id;
    const index = getTodoIndex(id);
    todos.splice(index, 1);
    setLocalTodos(todos);

    target.parentNode.remove();
});