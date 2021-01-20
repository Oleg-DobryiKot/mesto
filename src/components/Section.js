class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItems(userData) {
    this._renderedItems.forEach(item => {
      this._renderer(item, userData);
    });
  }

  setResolvedItems(items) {
    this._renderedItems = items;
  }

  appendItem(element) {
    this._containerElement.append(element);
  }

  prependItem(element) {
    this._containerElement.prepend(element);
  }
};
export default Section;