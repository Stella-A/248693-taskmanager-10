import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createBoardTemplate} from './components/board.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageMainElem = document.querySelector(`.main`);
const pageHeaderElem = pageMainElem.querySelector(`.main__control`);

render(pageHeaderElem, createMenuTemplate());
render(pageMainElem, createFilterTemplate());
render(pageMainElem, createBoardTemplate());

const pageBoardElem = pageMainElem.querySelector(`.board`);
const pageTaskListElem = pageMainElem.querySelector(`.board__tasks`);
render(pageBoardElem, createSortingTemplate(), `afterbegin`);
render(pageTaskListElem, createTaskEditTemplate());

for (let i = 0; i < 3; i++) {
  render(pageTaskListElem, createTaskTemplate());
}

render(pageBoardElem, createLoadMoreButtonTemplate());
