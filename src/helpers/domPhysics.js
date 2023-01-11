/**
 * Center a child in a scrollable container
 *
 * @param {Element} parentElement
 * @param {Element} childElement
 */
const scrollToChild = (containerElement, activeElement) => {
  if (containerElement == null || activeElement == null) return;

  containerElement.scrollLeft +=
    activeElement.offsetLeft - containerElement.clientWidth / 2;
};

/**
 * https://stackoverflow.com/a/59680347/6132438
 * @param {*} event
 * @returns
 */
function transformScroll(event) {
  event.preventDefault();
  event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
}

function scrollPickerLeft(element) {
  const dx = Math.min(element.scrollLeft, element.clientWidth / 2);

  element.scrollBy({
    left: -dx,
    behavior: 'smooth',
  });
}

function scrollPickerRight(element) {
  const spaceLeft =
    element.scrollWidth - element.scrollLeft - element.clientWidth;

  const dx = Math.min(spaceLeft, element.clientWidth / 2);

  element.scrollBy({
    left: dx,
    behavior: 'smooth',
  });
}

function canScrollLeft(element) {
  if (element == null) return false;

  return element.scrollLeft > 0;
}

function canScrollRight(element) {
  if (element == null) return false;

  return element.scrollWidth - element.clientWidth - element.scrollLeft > 0;
}

export {
  scrollToChild,
  transformScroll,
  scrollPickerLeft,
  scrollPickerRight,
  canScrollLeft,
  canScrollRight,
};
