import { events } from './pubsub.js';
import { myProjects } from './global.js';

/* Display Module */
const display = (() => {
    'use strict';

    // Cache the DOM
    const addTaskBtn = document.getElementById('new-task');
    const exitModalBtn = document.querySelector('.modal-exit');
    const modalBackground = document.querySelector('.modal-background');

    const projectList = document.querySelector('.project-list');
    const newProjectBtn = document.getElementById('new-project');
    const newProjectName = document.getElementById('new-project--name');
    const taskList = document.querySelector('.task-list');
    const form = document.getElementById('form-addTask');

    // Bind events
    function initEventListeners() {
        projectList.addEventListener('click', _changeProject);
        newProjectBtn.addEventListener('click', _addProject);
        addTaskBtn.addEventListener('click', _openModal);
        exitModalBtn.addEventListener('click', _exitModal);
        form.addEventListener('submit', function(e) {
            // Prevent submit from reloading browser, parse the form data
            e.preventDefault();
            const formData = _readFormData();

            // Display the new task
            _addTask(...formData);

            // Emit task added
            events.emit('taskAdded', ...formData);

            // Exit the modal
            _exitModal(e);
        });
    }

    function _changeProject(e) {
        if (e.target && e.target.closest('li.project')) {
            // events.emit('projectChanged', e.target.textContent);
        }
    }

    function _openModal(e) {
        modalBackground.classList.add('modal-background--active');

        // Stop propagation so we can add the click outside modal exit without it triggering immediately */
        e.stopPropagation();
        document.addEventListener('click', _exitModal);
    }

    function _exitModal(e) {
        // Exit the modal if clicked outside, using the exit button, or submitted
        if (!e.target.closest('.modal') || e.target === exitModalBtn || e.type === 'submit') {
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

            // Emit task added
            events.emit('projectAdded', newProjectName.value);
        }
    }

    function _addTask(name, date, category, description) {
        const newTask = document.createElement('li');
        newTask.classList.add('task');

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute('type', 'checkbox');

        const taskName = document.createElement('h4');
        taskName.classList.add('name');
        taskName.textContent = name;

        const taskDate = document.createElement('p');
        taskDate.classList.add('date');
        taskDate.textContent = date;

        const taskCategory = document.createElement('p');
        taskCategory.classList.add('category');
        taskCategory.textContent = category;

        const taskBtns = document.createElement('div');
        taskBtns.classList.add('buttons');
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        taskBtns.appendChild(editBtn);
        taskBtns.appendChild(deleteBtn);

        taskInfo.appendChild(taskCheckbox);
        taskInfo.appendChild(taskName);
        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskCategory);
        taskInfo.appendChild(taskBtns);

        const taskBreak = document.createElement('hr');
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = description;

        newTask.appendChild(taskInfo);
        newTask.appendChild(taskBreak);
        newTask.appendChild(taskDescription);

        taskList.appendChild(newTask);
    }

    return {
        initEventListeners: initEventListeners,
    };
})();

export { display };