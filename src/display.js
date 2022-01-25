import { events } from './pubsub.js';
import { Task } from './task.js';
import { Project } from './project.js';

/* Display Module */
const display = (() => {
    'use strict';

    // Cache the DOM
    const addTaskBtn = document.getElementById('new-task');
    const exitModalBtn = document.querySelector('.modal-exit');
    const modalBackground = document.querySelector('.modal-background');

    const projectList = document.querySelector('.project-list');
    const taskList = document.querySelector('.task-list');

    events.on('projectAdded', _addProject);
    // events.on('projectDeleted', _displayProjects);
    events.on('projectChanged', _displayTasks);
    events.on('taskAdded', _addTask);
    events.on('taskDeleted', _displayTasks)

    addTaskBtn.addEventListener('click', _openModal);
    exitModalBtn.addEventListener('click', _exitModal);

    function _clearTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // function _displayProjects(projects) {
    //     for (let i = 0; i < projects.length; i++) {
    //         _addProject(projects[i]);
    //     }
    // }

    function _displayTasks(Project) {
        _clearTasks();
        for (let i = 0; i < Project.getTasks().length; i++) {
            _addTask(Project.getTasks()[i]);
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

    function _addProject(Project) {
        // Create the project list item, add the name, and append to DOM
        const newProject = document.createElement('li');
        newProject.classList.add('project');
        const newProjectText = document.createElement('h3');
        newProjectText.classList.add('project-name');
        newProjectText.textContent = Project.getName();
        newProject.appendChild(newProjectText);
        projectList.appendChild(newProject);
    }

    function _addTask(Task) {
        const newTask = document.createElement('li');
        newTask.classList.add('task');

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute('type', 'checkbox');

        const taskName = document.createElement('h4');
        taskName.classList.add('name');
        taskName.textContent = Task.getName();

        const taskDate = document.createElement('p');
        taskDate.classList.add('date');
        taskDate.textContent = Task.getDate();

        const taskCategory = document.createElement('p');
        taskCategory.classList.add('category');
        taskCategory.textContent = Task.getCategory();

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
        taskDescription.textContent = Task.getDescription();

        newTask.appendChild(taskInfo);
        newTask.appendChild(taskBreak);
        newTask.appendChild(taskDescription);

        taskList.appendChild(newTask);

        modalBackground.classList.remove('modal-background--active');
    }

    return {

    };
})();
