import { events } from "./pubsub.js";
import { Task } from './task.js';

/* Project Factory */
const Project = (name) => {
    'use strict';
    
    let tasks = [];

    function getName() {
        return name;
    }

    function setName(newName) {
        name = newName;
    }

    function addTask(newTask) {
        tasks.push(newTask);
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.getID() != id);
    }

    function getTask(id) {
        return tasks.find(task => task.getID() == id);
    }

    function getTasks() {
        return tasks;
    }

    return {
        getName: getName,
        setName: setName,
        addTask: addTask,
        deleteTask: deleteTask,
        getTask: getTask,
        getTasks: getTasks,
    };
};

export { Project };