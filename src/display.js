import { events } from './pubsub.js';

/* Display Module */
const display = (() => {
    'use strict';

    // Cache the DOM
    const addTaskBtn = document.getElementById('new-todo');
    const exitModalBtn = document.querySelector('.modal-exit');
    const modalBackground = document.querySelector('.modal-background');

    const projectList = document.querySelector('.project-list');
    const newProjectBtn = document.getElementById('new-project');
    const newProjectName = document.getElementById('new-project--name');
    const todoList = document.querySelector('.todo-list');
    const form = document.getElementById('form-addTodo');

    // Bind events
    function initEventListeners() {
        newProjectBtn.addEventListener('click', _addProject);
        addTaskBtn.addEventListener('click', _openModal);
        exitModalBtn.addEventListener('click', _exitModal);
        form.addEventListener('submit', _addTask);
    }

    function _openModal(e) {
        modalBackground.classList.add('modal-background--active');

        // Stop propagation so we can add the click outside modal exit without it triggering immediately */
        e.stopPropagation();
        document.addEventListener('click', _exitModal);
    }

    function _exitModal(e) {
        // Exit the modal if clicked outside or or using the exit button
        if (!e.target.closest('.modal') || e.target === exitModalBtn || e.target === form) {
            modalBackground.classList.remove('modal-background--active');
            document.removeEventListener('click', _exitModal);
        }
    }

    function _readFormData() {
        // Get all the form field data
        const name = form.elements['form-name'].value;
        const date = form.elements['form-date'].value;
        const category = form.elements['form-category'].value;
        const description = form.elements['form-description'].value;
        
        return [name, date, category, description];
    }

    function _addProject() {
        // Add a method here to check for empty field or name already used
        if (newProjectName.value !== '') {
            // Create the project list item, add the name, and append to DOM
            const newProject = document.createElement('li');
            newProject.classList.add('project');
            const newProjectText = document.createElement('h3');
            newProjectText.textContent = newProjectName.value;
            newProject.appendChild(newProjectText);
            projectList.appendChild(newProject);
        }
    }

    function _addTask(e) {
        // Prevent submit from reloading browser
        e.preventDefault();

        const formData = _readFormData();
        const newTask = document.createElement('li');
        newTask.classList.add('todo');

        const todoInfo = document.createElement('div');
        todoInfo.classList.add('todo-info');

        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute('type', 'checkbox');

        const todoName = document.createElement('h4');
        todoName.classList.add('name');
        todoName.textContent = formData[0];

        const todoDate = document.createElement('p');
        todoDate.classList.add('date');
        todoDate.textContent = formData[1];

        const todoCategory = document.createElement('p');
        todoCategory.classList.add('category');
        todoCategory.textContent = formData[2];

        const todoBtns = document.createElement('div');
        todoBtns.classList.add('buttons');
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        todoBtns.appendChild(editBtn);
        todoBtns.appendChild(deleteBtn);

        todoInfo.appendChild(todoCheckbox);
        todoInfo.appendChild(todoName);
        todoInfo.appendChild(todoDate);
        todoInfo.appendChild(todoCategory);
        todoInfo.appendChild(todoBtns);

        const todoBreak = document.createElement('hr');
        const todoDescription = document.createElement('p');
        todoDescription.classList.add('todo-description');
        todoDescription.textContent = formData[3];

        newTask.appendChild(todoInfo);
        newTask.appendChild(todoBreak);
        newTask.appendChild(todoDescription);

        todoList.appendChild(newTask);

        _exitModal(e);
    }

    return {
        initEventListeners: initEventListeners,
    };
})();

export { display };