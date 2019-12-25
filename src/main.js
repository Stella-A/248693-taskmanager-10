import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterComponent from './components/filter.js';
import MenuComponent from './components/menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;

const pageMainElem = document.querySelector(`.main`);
const pageHeaderElem = pageMainElem.querySelector(`.main__control`);
render(pageHeaderElem, new MenuComponent(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(pageMainElem, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(pageMainElem, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
