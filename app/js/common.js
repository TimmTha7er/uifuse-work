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
    //		smooth scroll when clicking an anchor link
    // ----------------------------------------------
    const root = (() => {
      if ('scrollingElement' in document) return document.scrollingElement;
      const html = document.documentElement;
      const start = html.scrollTop;
      html.scrollTop = start + 1;
      const end = html.scrollTop;
      html.scrollTop = start;
      return end > start ? html : document.body;
    })();

    const ease = (duration, elapsed, start, end) =>
      Math.round(end * (-Math.pow(2, (-10 * elapsed) / duration) + 1) + start);

    const getCoordinates = (hash) => {
      const start = root.scrollTop;
      const delta = (() => {
        if (hash.length < 2) return -start;
        const target = getEl(hash);
        if (!target) return;
        const top = target.getBoundingClientRect().top;
        const max = root.scrollHeight - window.innerHeight;
        return start + top < max ? top : max - start;
      })();
      if (delta)
        return new Map([
          ['start', start],
          ['delta', delta],
        ]);
    };

    const scroll = (link) => {
      const hash = link.getAttribute('href');
      const coordinates = getCoordinates(hash);
      if (!coordinates) return;

      const tick = (timestamp) => {
        progress.set('elapsed', timestamp - start);

        let progressValues = [];
        let coordinatesValues = [];

        progress.forEach(element => {
          progressValues.push(element);
        });

        coordinates.forEach(element => {
          coordinatesValues.push(element);
        });

        root.scrollTop = ease(...progressValues, ...coordinatesValues);

        progress.get('elapsed') < progress.get('duration')
          ? requestAnimationFrame(tick)
          : complete(hash, coordinates);
      };

      const progress = new Map([['duration', 800]]);
      const start = performance.now();
      requestAnimationFrame(tick);
    };

    const complete = (hash, coordinates) => {
      history.pushState(null, null, hash);
      root.scrollTop = coordinates.get('start') + coordinates.get('delta');
    };

    const attachHandler = (links, index) => {
      const link = links.item(index);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        scroll(link);
      });
      if (index) return attachHandler(links, index - 1);
    };

    const links = getAllEl('a[href^="#"]');
    const last = links.length - 1;
    if (last < 0) return;
    attachHandler(links, last);

    // ----------------------------------------------
    //		scroll to top
    // ----------------------------------------------
    function toggleBtnToTop() {
      const pos = window.pageYOffset;

      if (pos > 300) {
        toTop.style.display = 'flex';
      } else {
        toTop.style.display = 'none';
      }
    }

    const toTop = getEl('.to-top');

    window.onscroll = function () {
      toggleBtnToTop();
    };

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
