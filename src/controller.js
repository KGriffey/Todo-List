import { events } from './pubsub.js';
import { Project } from './project.js';
import { myProjects } from './global.js';

const controller = (() => {
    'use strict';

    let currProjectIndex = 0;

    events.on('taskAdded', _addTask);
    events.on('projectAdded', _addProject);
    events.on('projectChanged', _setCurrProject);

    function _addTask(name, date, category, description) {
        myProjects[currProjectIndex].addTask(name, date, category, description);
    }

    function _addProject(name) {
        myProjects.push(Project(name));
    }

    function _setCurrProject(name) {

    }

    return {

    };
})();

export { controller };