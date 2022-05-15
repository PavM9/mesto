export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  addInitialItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
