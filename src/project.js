import { events } from "./pubsub.js";
import { Task } from './task.js';

/* Project Factory */
export const Project = (name) => {
    'use strict';
    
    const tasks = [];

    function getName() {
        return name;
    }

    function setName(newName) {
        name = newName;
    }

    function addTask(name, date, category, description) {
        const newTask = Task(name, date, category, description);
        tasks.push(newTask);
    }

    function deleteTask(index) {
        tasks.splice(index,1);
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