import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import MenuComponent from './components/menu.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './util.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    pageTaskListElem.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    pageTaskListElem.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(pageTaskListElem, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageMainElem = document.querySelector(`.main`);
const pageHeaderElem = pageMainElem.querySelector(`.main__control`);
render(pageHeaderElem, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(pageMainElem, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(pageMainElem, boardComponent.getElement(), RenderPosition.BEFOREEND);
render(boardComponent.getElement(), new SortingComponent().getElement(), RenderPosition.AFTERBEGIN);

const pageTaskListElem = boardComponent.getElement().querySelector(`.board__tasks`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount).forEach((task) => renderTask(task));

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
