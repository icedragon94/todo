function ToDo(id, title, isFinished) {
    this.id         = id;
    this.title      = title;
    this.isFinished = isFinished;

    this.insertToHTML = () => {
        let addRowElement   = $('#add-row');
        let tableRowElement = document.createElement('tr');
        tableRowElement.innerHTML = `
                    <td colspan="2" class="table-td ta-left" id="${this.id}">
                        <label class="checkbox-container">
                            <span class="todo-title"> ${this.title}</span>
                            <input class="checkbox-input" type="checkbox">
                            <span class="checkbox-mark"></span>
                        </label>
                    </td>`;

        addRowElement.before(tableRowElement);
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

    return filterIsFinished(todos);
}

function filterIsFinished (todos, isFinished = false) {
    $('.table-td').remove();
    let arrayTodos = [];

    for (let i = 0; i < todos.length; i++) {
        let todo = new ToDo(i, todos[i].title, todos[i].isFinished);
        if (todo.isFinished === isFinished) {
            arrayTodos.push(todo);
            todo.insertToHTML();
        }
    }

    return arrayTodos;
}

let todos = initTodos();


function changeTab() {
    let active  = $('#active');
    let done    = $('#done');
    let todoElement = $('#table-body');

    active.click(function () {
        console.log('test active');
        todos = filterIsFinished(todos);
    });

    done.click(function () {
        console.log('test done');
        todos = filterIsFinished(todos, true);
    })
}

changeTab();