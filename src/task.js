import { events } from './pubsub.js';

/* Task Factory */
const Task = (name, date, category, description) => {
    'use strict';

    const id = Date.now();
    let complete = false;

    function update(newName, newDate, newCategory, newDescription) {
        _setName(newName);
        _setDate(newDate);
        _setCategory(newCategory);
        _setDescription(newDescription);
    }

    function isComplete() {
        return complete;
    }

    function toggleComplete() {
        complete = !complete;
    }

    function getID() {
        return id;
    }

    function _setName(newName) {
        name = newName;
    }

    function getName() {
        return name;
    }

    function _setDate(newDate) {
        date = newDate;
    }

    function getDate() {
        return date;
    }

    function _setCategory(newCategory) {
        category = newCategory;
    }

    function getCategory() {
        return category;
    }

    function _setDescription(newDescription) {
        description = newDescription;
    }

    function getDescription() {
        return description;
    }

    return {
        isComplete: isComplete,
        toggleComplete: toggleComplete,
        getID: getID,
        update: update,
        getName: getName,
        getDate: getDate,
        getCategory: getCategory,
        getDescription: getDescription
    };
};

export { Task };