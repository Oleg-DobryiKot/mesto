class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem() {
    this._renderedItems.forEach(item =>
      this._renderer(item));
  }

  setItemAppend(element) {
    this._container.append(element);
  }

  setItemPrepend(element) {
    this._container.prepend(element);
  }

  setRenderedItems(items) {
    this._renderedItems = items;
  }
};
export default Section;