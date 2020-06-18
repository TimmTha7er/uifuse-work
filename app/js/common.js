(function () {
  // Custom JS
  window.addEventListener('load', function () {
    // ----------------------------------------------
    //		common functions
    // ----------------------------------------------
    function getEl(className) {
      return document.querySelector(className);
    }

    function getAllEl(className) {
      return document.querySelectorAll(className);
    }

    function createEl(type) {
      return document.createElement(type);
    }

    // ----------------------------------------------
    //		humburger menu
    // ----------------------------------------------
    function toggleMenu() {
      const toggleLine = getEl('.toggle-menu__line');
      const mainMenu = getEl('.main-menu');

      toggleLine.classList.toggle('toggle-menu__line_active');
      mainMenu.classList.toggle('main-menu_active');
    }

    const toggleBtn = getEl('.toggle-menu');
    toggleBtn.onclick = () => toggleMenu();

    // ----------------------------------------------
    //		header slider
    //    https://github.com/ganlanyuan/tiny-slider
    // ----------------------------------------------
    // add nav dots
    function addNavDots(itemClass, containerClass) {
      const count = getAllEl(itemClass).length;
      const container = getEl(containerClass);

      for (let i = 0; i < count; i++) {
        let dot = createEl('div');
        dot.className = `${containerClass.slice(1)}__dot`;
        container.appendChild(dot);
      }
    }

    addNavDots('.slider__item', '.header-nav-container');

    // add slider
    const slider = tns({
      container: '.slider',
      items: 1,
      slideBy: 'page',
      speed: 400,
      mouseDrag: true,
      controls: true,
      nav: true,
      navPosition: 'bottom',
      navContainer: '.header-nav-container',
      controlsContainer: '.header-controls-btns',
      prevButton: '.header-controls-btns__prev',
      nextButton: '.header-controls-btns__next',
      startIndex: 1
    });
  });
})();
