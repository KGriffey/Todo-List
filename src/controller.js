import { events } from './pubsub.js';
import { Task } from './task.js';
import { Project } from './project.js';
import { projects } from './global.js';

const controller = (() => {
    'use strict';

    // Default to the first project in the list
    let activeProject = projects[0];
    let taskBeingEdited;

    // Cache the DOM
    const projectList = document.querySelector('.project-list');
    const newProjectBtn = document.getElementById('new-project');
    const newProjectName = document.getElementById('new-project--name');
    const taskList = document.querySelector('.task-list');
    const form = document.getElementById('form-addTask');
    const formHeader = document.querySelector('.modal-header');

    // Bind events
    projectList.addEventListener('click', _changeActiveProject);
    newProjectBtn.addEventListener('click', _addProject);
    form.addEventListener('submit', _updateTask);
    taskList.addEventListener('click', _modifyTask);

    function _modifyTask(e) {
        if (e.target.matches('button.delete')) {
            _deleteTask(e);
            return;
        } else if (e.target.matches('button.edit')) {
            taskBeingEdited = e.target.closest('.task').dataset.id;
            events.emit('editingTask', e);
            return;
        }

        // Expand the task details
        e.target.closest('.task').getElementsByClassName('task-description')[0].classList.toggle('task-description--open');
    }

    function _updateTask(e) {
        // Prevent form from refreshing the page
        e.preventDefault();

        if (formHeader.textContent === 'New Task') {
            _addTask();
        } else {
            activeProject.getTask(taskBeingEdited).update(..._readFormData());
            
            // Emit task updated
            events.emit('taskUpdated', activeProject);
        }
    }

    function _deleteTask(e) {
        const taskID = e.target.closest('.task').dataset.id;
        activeProject.deleteTask(taskID);

        events.emit('taskDeleted', activeProject);
    }

    function init() {
        for (let i = 0; i < projects.length; i++) {
            events.emit('projectAdded', projects[i]);
        }
    }

    function _changeActiveProject(e) {
        if (e.target && e.target.matches('h3.project-name')) {
            activeProject = projects.find(function (project) {
                return project.getName() === e.target.textContent;
            });

            events.emit('projectChanged', activeProject);
        }
    }

    function _addTask() {
        // Read the form data and add the task to the current project
        const newTask = Task(..._readFormData());
        activeProject.addTask(newTask);

        // Emit task added
        events.emit('taskAdded', newTask);
    }

    function _addProject() {
        // Check if the project name is not empty or matches an existing project
        if (newProjectName.value !== '' && !projects.some(project => project.getName() === newProjectName.value)) {
            const newProject = Project(newProjectName.value);
            projects.push(newProject);

            events.emit('projectAdded', newProject);
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

    return {
        init: init,
    };

})();

export { controller };