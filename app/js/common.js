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
    //		search form
    // ----------------------------------------------
    const searchInput = getEl('.search-form__input');
    const searchBtn = getEl('.user-bar__search-btn');
    const formWrap = getEl('.search-form__wrap');

    function toggleSearch() {
      searchInput.classList.toggle('search-form__input_active');
    }

    searchBtn.onclick = () => toggleSearch();

    document.addEventListener('click', (e) => {
      const target = e.target;
      const its_form = target == formWrap || formWrap.contains(target);

      const search_is_active = searchInput.classList.contains(
        'search-form__input_active'
      );

      const its_hamburger = target == searchBtn;

      if (!its_form && !its_hamburger && search_is_active) {
        toggleSearch();
      }
    });

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
      startIndex: 1,
    });

    // change slide number
    const totalSlide = getEl('.pagination__cur-number');
    totalSlide.innerHTML = '0' + slider.getInfo().slideCount;

    function changeSlideNumber(className) {
      const element = getEl(className);
      element.innerHTML = '0' + slider.getInfo().index;
    }

    changeSlideNumber('.pagination__cur-slide-number');

    slider.events.on('indexChanged', () => {
      setTimeout(() => {
        changeSlideNumber('.pagination__cur-slide-number');
        changeSlideNumber('.pagination__total-number');
      }, 500);
    });

    // ----------------------------------------------
    //		portfolio filter
    // ----------------------------------------------
    function removeClass(elements, className) {
      elements.forEach((el) => {
        el.classList.remove(className);
      });
    }

    function activeCategory() {
      const categoryFilters = getAllEl('.categories__filter');

      categoryFilters.forEach((el) => {
        el.onclick = (e) => {
          const filterName = e.target.getAttribute('data-filter');

          removeClass(categoryFilters, 'categories__filter_active');
          e.target.classList.add('categories__filter_active');
          showCategory(filterName);
        };
      });
    }
    activeCategory();

    function showCategory(category) {
      const contentItems = getAllEl('.content__item');

      removeClass(contentItems, 'hidden');

      contentItems.forEach((el) => {
        if (category === 'all') {
          el.classList.remove('hidden');
        } else if (el.getAttribute('data-for') !== category) {
          el.classList.add('hidden');
        }
      });
    }
  });
})();
