import { events } from './pubsub.js';

/* Task Factory */
const Task = (name, date, category, description) => {
    'use strict';

    function update(newName, newDate, newCategory, newDescription) {
        _setName(newName);
        _setDate(newDate);
        _setCategory(newCategory);
        _setDescription(newDescription);
    }

    function _setName(newName) {
        name = newName;
    }

    function _setDate(newDate) {
        date = newDate;
    }

    function _setCategory(newCategory) {
        category = newCategory;
    }

    function _setDescription(newDescription) {
        description = newDescription;
    }

    return {
        update: update,
    };
};

export { Task };