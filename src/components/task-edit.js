import {MonthNames, Days, Colors} from '../const.js';
import {formatTime} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createHashtagsTemplate = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return (
        `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${hashtag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`
      );
    })
    .join(`\n`);
};

const createColorsTaskTemplate = (colors, currentColor) => {
  return colors
    .map((color, i) => {
      return (
        `<input
          type="radio"
          id="color-${color}-${i}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${(color === currentColor) ? `checked` : ``}
        />
        <label
          for="color-${color}-${i}"
          class="card__color card__color--${color}"
          >${color}</label>`
      );
    })
    .join(`\n`);
};

const createDaysTaskTemplate = (days, repeatingDays) => {
  return days
    .map((day, i) => {
      const isChecked = repeatingDays[day];

      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${i}"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-${i}">${day}</label>`
      );
    })
    .join(`\n`);
};

const createTaskEditTemplate = (task) => {
  const {description, dueDate, repeatingDays, tags, color} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = dueDate;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);

  const date = isDateShowing ? `${dueDate.getDate()} ${MonthNames[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const hashtags = createHashtagsTemplate(Array.from(tags));
  const colors = createColorsTaskTemplate(Colors, color);
  const days = createDaysTaskTemplate(Days, repeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${date} ${time}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${days}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtags}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colors}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
