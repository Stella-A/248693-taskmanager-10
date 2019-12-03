import {generateTasks} from './mock/task.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createBoardTemplate} from './components/board.js';
import {generateFilters} from "./mock/filter.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageMainElem = document.querySelector(`.main`);
const pageHeaderElem = pageMainElem.querySelector(`.main__control`);
render(pageHeaderElem, createMenuTemplate());
const tasks = generateTasks(TASK_COUNT);

const filters = generateFilters(tasks);
render(pageMainElem, createFilterTemplate(filters));
render(pageMainElem, createBoardTemplate());

const pageBoardElem = pageMainElem.querySelector(`.board`);
render(pageBoardElem, createSortingTemplate(), `afterbegin`);
const pageTaskListElem = pageMainElem.querySelector(`.board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
for (let i = 0; i < showingTasksCount; i++) {
  if (i === 0) {
    render(pageTaskListElem, createTaskEditTemplate(tasks[i]));
  } else {
    render(pageTaskListElem, createTaskTemplate(tasks[i]));
  }
}

render(pageBoardElem, createLoadMoreButtonTemplate());

const loadMoreButtonElem = pageBoardElem.querySelector(`.load-more`);
loadMoreButtonElem.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(pageTaskListElem, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonElem.remove();
  }
});
