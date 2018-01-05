function ToDo(id, title, isFinished) {
    this.id         = id;
    this.title      = title;
    this.isFinished = isFinished;

    this.insertToHTML = () => {
        let tableBodyElement= $('#table-body');
        let tableRowElement = document.createElement('tr');
        tableRowElement.innerHTML = `
                    <td colspan="2" class="table-td ta-left" id="${this.id}">
                        <label class="checkbox-container">
                            <span class="todo-title"> ${this.title}</span>
                            <input class="checkbox-input" type="checkbox">
                            <span class="checkbox-mark"></span>
                        </label>
                        <span class="todo-title"> ${this.title}</span>
                    </td>`;

        tableBodyElement.append(tableRowElement);
    };

    this.generateId = (todos) => {
        const maxId = Math.max(...todos.map(obj => obj.id));

        if (!isFinite(maxId)) {
            this.id = 0;
        } else {
            this.id = maxId + 1;
        }
    };

    this.setTodo = () => {
        todos.push(this);
        setLocalTodos(todos);
        this.insertToHTML();
    };

}

function initTodos() {
    let todoString = localStorage.getItem('todos');
    if (!todoString) {
        return [];
    }

    let todos = JSON.parse(todoString);
    for (let i = 0; i < todos.length; i++) {
        todos[i] = new ToDo(i, todos[i].title, todos[i].isFinished);
    }

    return todos;
}

function filterTodos (todos, isFinished = false) {
    $('#table-body').empty();
    let arrayTodos = [];

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].isFinished === isFinished) {
            arrayTodos.push(todos[i]);
            todos[i].insertToHTML();
        }
    }

    return arrayTodos;
}

function getActiveTodos(todos) {
    return filterTodos(todos, false);
}

function getDoneTodos(todos) {
    return filterTodos(todos, true);
}

let todos = initTodos();
getActiveTodos(todos);