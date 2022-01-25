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

    function deleteTask(name) {
        tasks = tasks.filter(task => task.getName() !== name);
    }

    function getTasks() {
        return tasks;
    }

    function setTasks(newTasks) {
        tasks = newTasks;
    }

    return {
        getName: getName,
        setName: setName,
        addTask: addTask,
        deleteTask: deleteTask,
        getTasks: getTasks,
        setTasks: setTasks,
    };
};

export { Project };