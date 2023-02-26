const addTodoBtn = document.querySelector('#add-todo-btn');
const clearTodoBtn = document.querySelector('#clear-todo-btn');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-ul');
const taskCount = document.querySelector('#task-count');

let todos = [];

addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', completeDeleteTodo);
clearTodoBtn.addEventListener('click', clearCompletedTodos);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        alert('Please enter a task.');
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    displayTodos();
}

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});


function displayTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="delete-todo-btn" data-id="${todo.id}">Delete</button>
                <input type="checkbox" class="complete-todo-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
            </div>
        `;

        todoList.appendChild(li);
    });

    updateTaskCount();
}

function completeDeleteTodo(event) {
    if (event.target.matches('.delete-todo-btn')) {
        const id = Number(event.target.getAttribute('data-id'));
        todos = todos.filter(todo => todo.id !== id);
        displayTodos();
    }

    if (event.target.matches('.complete-todo-checkbox')) {
        const id = Number(event.target.getAttribute('data-id'));
        const todo = todos.find(todo => todo.id === id);
        todo.completed = event.target.checked;
        displayTodos();
    }
}

function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    displayTodos();
}

function updateTaskCount() {
    const taskCountText = todos.length === 1 ? '1 task' : `${todos.length} tasks`;
    taskCount.textContent = taskCountText;
}

displayTodos();
