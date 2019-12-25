import AbstractComponent from './abstract-component.js';

const createFilterMarkup = (filter, {checked: isChecked}) => {
  const {title, count} = filter;

  return (
    `<input
          type="radio"
          id="filter__${title}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
          ${(count <= 0) ? `disabled` : ``}
    />
    <label for="filter__all" class="filter__label">${title}
      <span class="filter__${title}-count">${count}</span>
    </label>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters
    .map((filter, i) => createFilterMarkup(filter, {checked: i === 0}))
    .join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Board extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
