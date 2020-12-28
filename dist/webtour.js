var WebTour = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var WebTour = function () {
    function WebTour() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, WebTour);

      if (!!this.constructor.instance) {
        return this.constructor.instance;
      }

      this.constructor.instance = this;
      this.options = _objectSpread2({
        animate: true,
        opacity: 0.5,
        offset: 20,
        borderRadius: 3,
        allowClose: true,
        highlight: true,
        highlightOffset: 5,
        keyboard: true,
        width: '300px',
        zIndex: 10050,
        removeArrow: false,
        onNext: function onNext() {
          return null;
        },
        onPrevious: function onPrevious() {
          return null;
        }
      }, options);
      this.steps = [];
      this.stepIndex = 0;
      this.isRunning = false;
      this.isPaused = false;
      this.window = window;
      this.document = document;
      this.onClick = this.onClick.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.bind();
      return this;
    }

    _createClass(WebTour, [{
      key: "bind",
      value: function bind() {
        if (!('ontouchstart' in this.document.documentElement)) {
          this.window.addEventListener('click', this.onClick, false);
        } else {
          this.window.addEventListener('touchstart', this.onClick, false);
        }

        this.window.addEventListener('resize', this.onResize, false);
        this.window.addEventListener('keyup', this.onKeyUp, false);
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        e.stopPropagation();

        if (e.target.classList.contains('wt-btn-next')) {
          this.onNext();
          this.next();
        }

        if (e.target.classList.contains('wt-btn-back')) {
          this.onPrevious();
          this.previous();
        }

        if (e.target.classList.contains('wt-overlay')) {
          if (this.options.allowClose) {
            this.stop();
          }
        }
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(event) {
        if (!this.isRunning || !this.options.keyboard) {
          return;
        }

        if (event.keyCode === 27 && this.options.allowClose) {
          this.stop();
          return;
        }

        if (event.keyCode === 39) {
          this.onNext();
          this.next();
        } else if (event.keyCode === 37) {
            this.onPrevious();
            this.previous();
          }
      }
    }, {
      key: "onResize",
      value: function onResize() {
        if (!this.isRunning) {
          return;
        }

        this.clear();
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "setSteps",
      value: function setSteps(steps) {
        this.steps = null;
        this.steps = steps;
      }
    }, {
      key: "getSteps",
      value: function getSteps() {
        return this.steps;
      }
    }, {
      key: "highlight",
      value: function highlight(element) {
        var _this = this;

        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return function (element) {
          _this.isRunning = true;

          var element = _this.document.querySelector(element);

          if (element) {
            if (step) {
              _this.steps = null;
              _this.stepIndex = 0;
              _this.steps = step;

              _this.render(_this.steps[_this.stepIndex]);
            } else {
              _this.createOverlay(element, step);
            }
          }
        }(element);
      }
    }, {
      key: "start",
      value: function start() {
        var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.isRunning = true;
        this.stepIndex = startIndex;
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clear();
        this.isRunning = false;
      }
    }, {
      key: "showLoader",
      value: function showLoader() {
        var popover = this.document.querySelector('.wt-popover');
        var loader = this.document.createElement('div');
        loader.classList.add('wt-loader');
        loader.style.zIndex = this.options.zIndex + 10;
        popover.prepend(loader);
      }
    }, {
      key: "moveNext",
      value: function moveNext() {
        this.isPaused = false;
        this.next();
      }
    }, {
      key: "movePrevious",
      value: function movePrevious() {
        this.isPaused = false;
        this.previous();
      }
    }, {
      key: "onNext",
      value: function onNext() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
      }
    }, {
      key: "onPrevious",
      value: function onPrevious() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onPrevious) this.steps[this.stepIndex].onPrevious();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) return;
        this.stepIndex++;
        this.clear();
        if (this.steps.length === 0) return false;

        if (this.stepIndex >= this.steps.length) {
          this.stop();
          return;
        }

        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "previous",
      value: function previous() {
        if (this.isPaused) return;
        this.stepIndex--;
        this.clear();
        if (this.steps.length === 0) return false;

        if (this.stepIndex < 0) {
          this.stop();
          return;
        }

        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "render",
      value: function render(step) {
        var element = step.element ? this.document.querySelector(step.element) : null;

        if (element) {
          element.style.position = !element.style.position ? 'relative' : element.style.position;
          var step_highlight = !step.highlight ? true : step.highlight;

          if (this.options.highlight && step_highlight) {
            element.setAttribute('wt-highlight', 'true');
          }
        }

        var popover = this.document.createElement('div');
        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;
        if (step.placement) popover.classList.add(step.placement);

        if (this.options.width) {
          if (typeof this.options.width === 'string') {
            popover.style.width = this.options.width;
          } else if (this.options.width > 0) {
            popover.style.width = this.options.width + 'px';
          }
        }

        if (step.width) {
          if (typeof step.width === 'string') {
            popover.style.width = step.width;
          } else if (step.width > 0) {
            popover.style.width = step.width + 'px';
          }
        }

        var popoverInner = this.document.createElement('div');
        popoverInner.classList.add('wt-popover-inner');
        var title = this.document.createElement('div');
        title.classList.add('wt-title');
        if (step.title) popoverInner.append(title);
        if (step.title) title.innerText = step.title;
        var content = this.document.createElement('div');
        content.classList.add('wt-content');
        popoverInner.append(content);
        content.innerHTML = step.content ? step.content : '';
        var showBtns = step.showBtns == null || step.showBtns == 'undefined' ? true : Boolean(step.showBtns);

        if (showBtns) {
          var btnNext = this.document.createElement('button');
          var btnBack = this.document.createElement('button');
          btnNext.classList.add('wt-btns', 'wt-btn-next');
          btnBack.classList.add('wt-btns', 'wt-btn-back');
          btnNext.innerHTML = step.btnNext && step.btnNext.text ? step.btnNext.text : this.stepIndex == this.steps.length - 1 ? 'Done' : 'Next &#8594;';
          btnBack.innerHTML = step.btnBack && step.btnBack.text ? step.btnBack.text : this.stepIndex == 0 ? 'Close' : '	&#8592; Back';
          btnNext.style.backgroundColor = step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9';
          btnNext.style.color = step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff';
          btnBack.style.backgroundColor = step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;';
          btnBack.style.color = step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555';
          popoverInner.append(btnNext);
          popoverInner.append(btnBack);
        }

        var arrow = this.document.createElement('div');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        popover.append(arrow);
        popover.append(popoverInner);
        this.document.body.appendChild(popover);

        if (element) {
          this.positionPopover(element, popover, arrow, step);

          if (this.options.highlight) {
            this.createOverlay(element, step);
          }
        } else {
            popover.classList.add('wt-slides');
            popover.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center"
            });

            if (this.options.highlight) {
              var overlay = document.createElement('div');
              overlay.classList.add('wt-overlay', 'open');
              overlay.style.zIndex = this.options.zIndex - 10;
              overlay.style.position = 'fixed';
              overlay.style.top = 0;
              overlay.style.left = 0;
              overlay.style.right = 0;
              overlay.style.bottom = 0;
              this.document.body.appendChild(overlay);
            }

            arrow.remove();
          }

        if (this.options.removeArrow) {
          arrow.remove();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var popup = this.document.querySelector('.wt-popover');
        var loader = this.document.querySelector('.wt-loader');
        if (popup) popup.remove();
        if (loader) loader.remove();
        this.document.querySelectorAll('.wt-overlay').forEach(function (element) {
          element.remove();
        });
        this.document.querySelectorAll('*[wt-highlight]').forEach(function (element) {
          element.removeAttribute('wt-highlight');
        });
      }
    }, {
      key: "getWindowOffset",
      value: function getWindowOffset() {
        return {
          height: this.window.innerHeight - (this.window.innerHeight - this.document.documentElement.clientHeight),
          width: this.window.innerWidth - (this.window.innerWidth - this.document.documentElement.clientWidth)
        };
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var _x = 0;
        var _y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }

        return {
          top: _y,
          left: _x
        };
      }
    }, {
      key: "getTranslateXY",
      value: function getTranslateXY(element) {
        var style = window.getComputedStyle(element);
        var matrix = new DOMMatrixReadOnly(style.transform);
        return {
          translateX: Math.abs(element.offsetWidth * (matrix.m41 / 100)),
          translateY: Math.abs(element.offsetHeight * (matrix.m42 / 100))
        };
      }
    }, {
      key: "getElementPosition",
      value: function getElementPosition(element) {
        return {
          top: this.getOffset(element).top - (element.style.transform ? this.getTranslateXY(element).translateY : 0),
          left: this.getOffset(element).left - (element.style.transform ? this.getTranslateXY(element).translateX : 0)
        };
      }
    }, {
      key: "positionPopover",
      value: function positionPopover(element, popover, arrow, step) {
        var placement = step.placement || 'auto';
        var strategy = step.strategy || 'absolute';
        popover.style.position = strategy;
        arrow.style.position = 'absolute';
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;

        if (placement == 'auto' || placement == 'auto-start' || placement == 'auto-end') {
          var _arrow = placement.replace('auto', '').trim();

          var new_arrow = '';

          if (el_top + (popover.offsetHeight + this.options.offset) > this.window.innerHeight - 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
                new_arrow = _arrow.length > 0 ? _arrow : '-end';
              }

            placement = 'top' + new_arrow;
          }

          if (el_left + element.offsetWidth + popover.offsetWidth > this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
                new_arrow = _arrow.length > 0 ? _arrow : '-start';
              }

            placement = 'left' + new_arrow;
          }

          if (el_left < popover.offsetWidth && element.offsetWidth + popover.offsetWidth < this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
                new_arrow = _arrow.length > 0 ? _arrow : '-start';
              }

            placement = 'right' + new_arrow;
          }

          if (el_top < popover.offsetHeight + this.options.offset || el_top < 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
                new_arrow = _arrow.length > 0 ? _arrow : '-end';
              }

            placement = 'bottom' + new_arrow;
          }

          popover.classList.add(placement);
        }

        if (placement == 'top') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + (element.offsetWidth / 2 - popover.offsetWidth / 2) + 'px';
        } else if (placement == 'top-start') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'top-end') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
        } else if (placement == 'bottom') {
            popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
            popover.style.left = el_left + element.offsetWidth / 2 - popover.offsetWidth / 2 + 'px';
          } else if (placement == 'bottom-start') {
            popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
            popover.style.left = el_left - this.options.highlightOffset + 'px';
          } else if (placement == 'bottom-end') {
            popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
            popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
          } else if (placement == 'right') {
              popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'right-start') {
              popover.style.top = el_top - this.options.highlightOffset + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'right-end') {
              popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'left') {
                popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
                popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
              } else if (placement == 'left-start') {
                popover.style.top = el_top - this.options.highlightOffset + 'px';
                popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
              } else if (placement == 'left-end') {
                popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
                popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
              }

        if (strategy === 'fixed') {
          this.window.scrollTo(0, 0);
        } else {
          popover.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });
        }
      }
    }, {
      key: "createOverlay",
      value: function createOverlay(element) {
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var strategy = step && step.strategy ? step.strategy : 'absolute';
        var overlay1 = document.createElement('div');
        overlay1.classList.add('wt-overlay', 'open', 'overlay1');
        overlay1.style.zIndex = this.options.zIndex - 10;
        var overlay2 = document.createElement('div');
        overlay2.classList.add('wt-overlay', 'open', 'overlay2');
        overlay2.style.zIndex = this.options.zIndex - 10;
        var overlay3 = document.createElement('div');
        overlay3.classList.add('wt-overlay', 'open', 'overlay3');
        overlay3.style.zIndex = this.options.zIndex - 10;
        var overlay4 = document.createElement('div');
        overlay4.classList.add('wt-overlay', 'open', 'overlay4');
        overlay4.style.zIndex = this.options.zIndex - 10;
        this.document.body.appendChild(overlay1);
        this.document.body.appendChild(overlay2);
        this.document.body.appendChild(overlay3);
        this.document.body.appendChild(overlay4);
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;
        var highlight_offset = this.options.highlightOffset;
        overlay1.style.position = strategy;
        overlay1.style.top = 0;
        overlay1.style.width = el_left - highlight_offset + 'px';
        overlay1.style.height = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay1.style.left = 0;
        overlay2.style.position = strategy;
        overlay2.style.top = 0;
        overlay2.style.right = 0;
        overlay2.style.height = el_top - highlight_offset + 'px';
        overlay2.style.left = el_left - highlight_offset + 'px';
        overlay3.style.position = strategy;
        overlay3.style.top = el_top - highlight_offset + 'px';
        overlay3.style.right = 0;
        overlay3.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay3.style.left = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.position = strategy;
        overlay4.style.top = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay4.style.width = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay4.style.left = 0;
      }
    }]);

    return WebTour;
  }();

  return WebTour;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGlmICghIXRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmluc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgIG9mZnNldDogMjAsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICBoaWdobGlnaHRPZmZzZXQ6IDUsXHJcbiAgICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgICAgICB3aWR0aDogJzMwMHB4JyxcclxuICAgICAgICAgICAgekluZGV4OiAxMDA1MCxcclxuICAgICAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgICAgICBvbk5leHQ6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIG9uUHJldmlvdXM6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0ZXBzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnRzXHJcbiAgICAgICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgICAgICAvL2V2ZW50c1xyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbktleVVwID0gdGhpcy5vbktleVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iaW5kKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LW92ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZyB8fCAhdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodCBrZXkgZm9yIG5leHRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcGFnZSBpcyByZXNpemUgdXBkYXRlIHBvcG92ZXJcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NldCB3ZWIgdG91ciBzdGVwc1xyXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFN0ZXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoaWdobGlnaHQoZWxlbWVudCwgc3RlcCA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcclxuICAgICAgICBpZiAoZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGlmIChzdGVwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwcyA9IHN0ZXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQsIHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9zdGFydCB0aGUgd2ViIHRvdXJcclxuICAgIHN0YXJ0KHN0YXJ0SW5kZXggPSAwKSB7XHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL3Nob3cgbG9hZGVyIHByb2dyZXNzXHJcbiAgICBzaG93TG9hZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZCgnd3QtbG9hZGVyJyk7XHJcbiAgICAgICAgbG9hZGVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggKyAxMDtcclxuICAgICAgICBwb3BvdmVyLnByZXBlbmQobG9hZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTmV4dCgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVByZXZpb3VzKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OZXh0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuICAgICAgICAvL2V4ZWN1dGUgb25OZXh0IGZ1bmN0aW9uKClcclxuICAgICAgICBpZiAodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0gJiYgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25OZXh0KSB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblByZXZpb3VzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuICAgICAgICAvL2V4ZWN1dGUgb25CYWNrIGZ1bmN0aW9uKClcclxuICAgICAgICBpZiAodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0gJiYgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25QcmV2aW91cykgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25QcmV2aW91cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKmdvIHRvIG5leHQgc3RlcCAqL1xyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnN0ZXBJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBJbmRleCA+PSB0aGlzLnN0ZXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4LS07XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkIHRoZSBwb3BvdmVyIHRvIGRvY3VtZW50XHJcbiAgICByZW5kZXIoc3RlcCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gc3RlcC5lbGVtZW50ID8gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0ZXAuZWxlbWVudCkgOiBudWxsO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGVsZW1lbnQgaXMgcHJlc2VudCBpZiBub3QgbWFrZSBpdCBmbG9hdGluZ1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAhZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA/ICdyZWxhdGl2ZScgOiBlbGVtZW50LnN0eWxlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBzdGVwX2hpZ2hsaWdodCA9ICFzdGVwLmhpZ2hsaWdodCA/IHRydWUgOiBzdGVwLmhpZ2hsaWdodDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaGlnaGxpZ2h0IGlzIHNldCB0byB0cnVlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0ICYmIHN0ZXBfaGlnaGxpZ2h0ICkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlclxyXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgICAgXHJcbiAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKCd3dC1wb3BvdmVyJyk7XHJcbiAgICAgICAgcG9wb3Zlci5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLm9wdGlvbnMuYm9yZGVyUmFkaXVzICsgJ3B4JztcclxuICAgICAgICBwb3BvdmVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggKyAxMDtcclxuICAgICAgICBpZiAoc3RlcC5wbGFjZW1lbnQpIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChzdGVwLnBsYWNlbWVudCk7IC8vYWRkIHVzZXIgZGVmaW5lIHBsYWNlbWVudCB0byBjbGFzcyBmb3IgcG9zaXRpb24gaW4gY3NzXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMud2lkdGggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RlcC53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ZXAud2lkdGggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BvcG92ZXIgaW5uZXIgY29udGFpbmVyXHJcbiAgICAgICAgY29uc3QgcG9wb3ZlcklubmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwb3BvdmVySW5uZXIuY2xhc3NMaXN0LmFkZCgnd3QtcG9wb3Zlci1pbm5lcicpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy90aXRsZVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd3dC10aXRsZScpO1xyXG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSBwb3BvdmVySW5uZXIuYXBwZW5kKHRpdGxlKTtcclxuICAgICAgICBpZiAoc3RlcC50aXRsZSkgdGl0bGUuaW5uZXJUZXh0ID0gc3RlcC50aXRsZTtcclxuXHJcbiAgICAgICAgLy9jb250ZW50XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IChzdGVwLmNvbnRlbnQgPyBzdGVwLmNvbnRlbnQgOiAnJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9idXR0b25zXHJcbiAgICAgICAgY29uc3Qgc2hvd0J0bnMgPSAoc3RlcC5zaG93QnRucyA9PSBudWxsIHx8IHN0ZXAuc2hvd0J0bnMgPT0gJ3VuZGVmaW5lZCcpID8gdHJ1ZSA6IEJvb2xlYW4oc3RlcC5zaG93QnRucyk7XHJcblxyXG4gICAgICAgIGlmIChzaG93QnRucyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBjb25zdCBidG5CYWNrID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICAgICAgICAgIGJ0bk5leHQuY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tbmV4dCcpO1xyXG4gICAgICAgICAgICBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLWJhY2snKTtcclxuXHJcbiAgICAgICAgICAgIGJ0bk5leHQuaW5uZXJIVE1MID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dCA/IHN0ZXAuYnRuTmV4dC50ZXh0IDogKHRoaXMuc3RlcEluZGV4ID09IHRoaXMuc3RlcHMubGVuZ3RoIC0gMSA/ICdEb25lJyA6ICdOZXh0ICYjODU5NDsnKSk7XHJcbiAgICAgICAgICAgIGJ0bkJhY2suaW5uZXJIVE1MID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2sudGV4dCA/IHN0ZXAuYnRuQmFjay50ZXh0IDogKHRoaXMuc3RlcEluZGV4ID09IDAgPyAnQ2xvc2UnIDogJ1x0JiM4NTkyOyBCYWNrJykpO1xyXG5cclxuICAgICAgICAgICAgLy9hZGQgc3R5bGVzXHJcbiAgICAgICAgICAgIGJ0bk5leHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA6ICcjN2NkMWY5Jyk7XHJcbiAgICAgICAgICAgIGJ0bk5leHQuc3R5bGUuY29sb3IgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgPyBzdGVwLmJ0bk5leHQudGV4dENvbG9yIDogJyNmZmYnKTtcclxuXHJcbiAgICAgICAgICAgIGJ0bkJhY2suc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2suYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA6ICcjZWZlZmVmOycpO1xyXG4gICAgICAgICAgICBidG5CYWNrLnN0eWxlLmNvbG9yID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2sudGV4dENvbG9yID8gc3RlcC5idG5CYWNrLnRleHRDb2xvciA6ICcjNTU1Jyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuTmV4dCk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuQmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BvcG92ZXIgYXJyb3dcclxuICAgICAgICBjb25zdCBhcnJvdyA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZCgnd3QtYXJyb3cnKTtcclxuICAgICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wcGVyLWFycm93JywgJ3RydWUnKTtcclxuICAgICAgICBwb3BvdmVyLmFwcGVuZChhcnJvdyk7XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlciBpbm5lciBjb250YWluZXJcclxuICAgICAgICBwb3BvdmVyLmFwcGVuZChwb3BvdmVySW5uZXIpO1xyXG5cclxuICAgICAgICAvL2FwcGVuZCBwb3BvdmVyIHRvIGJvZHlcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wb3Zlcik7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Qb3BvdmVyKGVsZW1lbnQsIHBvcG92ZXIsIGFycm93LCBzdGVwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQsIHN0ZXApO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTm8gZWxlbWVudCBpcyBkZWZpbmVcclxuICAgICAgICAqIE1ha2UgcG9wb3ZlciBmbG9hdGluZyAocG9zaXRpb24gY2VudGVyKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXNsaWRlcycpO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJjZW50ZXJcIn0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCBvcHRpb24gdG8gcmVtb3ZlIGFycm93IGJlY2F1c2UgcG9wcGVyIGFycm93cyBhcmUgbm90IHBvc2l0aW9uaW5nIHdlbGxcclxuICAgICAgICAvL1RPRE86IGZpeCBwb3BwZXIgYXJyb3dcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZUFycm93KXtcclxuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3JlbW92ZSBwb3BvdmVyXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB2YXIgcG9wdXAgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XHJcbiAgICAgICAgdmFyIGxvYWRlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LWxvYWRlcicpO1xyXG5cclxuICAgICAgICBpZiAocG9wdXApIHBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmIChsb2FkZXIpIGxvYWRlci5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3Qtb3ZlcmxheScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJypbd3QtaGlnaGxpZ2h0XScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2luZG93T2Zmc2V0KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9mZnNldCggZWwgKSB7XHJcbiAgICAgICAgdmFyIF94ID0gMDtcclxuICAgICAgICB2YXIgX3kgPSAwO1xyXG4gICAgICAgIHdoaWxlKCBlbCAmJiAhaXNOYU4oIGVsLm9mZnNldExlZnQgKSAmJiAhaXNOYU4oIGVsLm9mZnNldFRvcCApICkge1xyXG4gICAgICAgICAgICBfeCArPSBlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgX3kgKz0gZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdG9wOiBfeSwgbGVmdDogX3ggfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2dldCBjc3MgdHJhbnNmb3JtIHByb3BlcnR5IHRvIGZpeGVkIGlzc3VlcyB3aXRoIHRyYW5zZm9ybSBlbGVtZW50c1xyXG4gICAgZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBuZXcgRE9NTWF0cml4UmVhZE9ubHkoc3R5bGUudHJhbnNmb3JtKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGVYOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRXaWR0aCAqIChtYXRyaXgubTQxIC8gMTAwKSksXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6ICBNYXRoLmFicyhlbGVtZW50Lm9mZnNldEhlaWdodCAqIChtYXRyaXgubTQyIC8gMTAwKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5nZXRPZmZzZXQoZWxlbWVudCkudG9wIC0gKGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVZIDogMCksXHJcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuZ2V0T2Zmc2V0KGVsZW1lbnQpLmxlZnQgLSggZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPyB0aGlzLmdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpLnRyYW5zbGF0ZVggOiAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3Bvc2l0aW9uIHBvcG92ZXJcclxuICAgIHBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCkge1xyXG4gICAgICAgIHZhciBwbGFjZW1lbnQgPSBzdGVwLnBsYWNlbWVudCB8fCAnYXV0byc7XHJcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gc3RlcC5zdHJhdGVneSB8fCAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICBwb3BvdmVyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgYXJyb3cuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxyXG4gICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XHJcbiAgICAgICAgZWxfdG9wID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkudG9wOyBcclxuICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDsgXHJcbiAgICBcclxuICAgICAgICAvL2lmIHBsYWNlbWVudCBpcyBub3QgZGVmaW5lZCBvciBhdXRvIHRoZW4gY2FsY3VsYXRlIGxvY2F0aW9uXHJcbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAnYXV0bycgfHwgcGxhY2VtZW50ID09ICdhdXRvLXN0YXJ0JyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tZW5kJykge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IHBsYWNlbWVudC5yZXBsYWNlKCdhdXRvJywgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIG5ld19hcnJvdyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdG9wXHJcbiAgICAgICAgICAgIGlmIChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSA+IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfbGVmdCA8ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3RvcCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgbGVmdFxyXG4gICAgICAgICAgICBpZiAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPiB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2xlZnQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgcmlnaHRcclxuICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCBwb3BvdmVyLm9mZnNldFdpZHRoICYmIChlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPCB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3JpZ2h0JyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gYm90dG9tXHJcbiAgICAgICAgICAgIGlmIChlbF90b3AgPCAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSB8fCBlbF90b3AgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLWVuZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnYm90dG9tJyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hZGQgdG8gY2xhc3MgZm9yIGNzc1xyXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQocGxhY2VtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdG9wXHJcbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArICgoZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggLyAyKSkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSBlbF9sZWZ0IC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9ICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAtIHBvcG92ZXIub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2JvdHRvbVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbS1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9ICgoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gcG9wb3Zlci5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodFxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgcG9zaXRpb24gaXMgZml4ZWQgc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGlmIChzdHJhdGVneSA9PT0gJ2ZpeGVkJyl7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJuZWFyZXN0XCJ9KTtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwID0gbnVsbCl7XHJcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gKHN0ZXAgJiYgc3RlcC5zdHJhdGVneSkgPyBzdGVwLnN0cmF0ZWd5IDogJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXkxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTEuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkxJyk7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5Mi5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTInKTtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkzLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MycpO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXk0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXk0Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG4gICAgXHJcbiAgICAgICAgLy9hcHBlbmQgdG8gYm9keVxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5MSk7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkyKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTMpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5NCk7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBoaWdobGlnaHRfb2Zmc2V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldDtcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyB0b3AtbGVmdFxyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUudG9wID0gMDtcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS53aWR0aCA9ICBlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuaGVpZ2h0ID0gIChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS5sZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyB0b3AtcmlnaHRcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLmhlaWdodCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1yaWdodFxyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUudG9wID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuYm90dG9tID0gMCAtICh0aGlzLmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1sZWZ0XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUud2lkdGggPSAgIGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCAgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmJvdHRvbSA9IDAgLSAodGhpcy5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIHRoaXMud2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJuYW1lcyI6WyJXZWJUb3VyIiwib3B0aW9ucyIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwic3RlcHMiLCJzdGVwSW5kZXgiLCJpc1J1bm5pbmciLCJpc1BhdXNlZCIsIndpbmRvdyIsImRvY3VtZW50Iiwib25DbGljayIsImJpbmQiLCJvblJlc2l6ZSIsIm9uS2V5VXAiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibmV4dCIsInByZXZpb3VzIiwic3RvcCIsImV2ZW50Iiwia2V5Q29kZSIsImNsZWFyIiwicmVuZGVyIiwiZWxlbWVudCIsInN0ZXAiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT3ZlcmxheSIsInN0YXJ0SW5kZXgiLCJwb3BvdmVyIiwibG9hZGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsInN0eWxlIiwicHJlcGVuZCIsImxlbmd0aCIsInBvc2l0aW9uIiwic3RlcF9oaWdobGlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJwbGFjZW1lbnQiLCJwb3BvdmVySW5uZXIiLCJ0aXRsZSIsImFwcGVuZCIsImlubmVyVGV4dCIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJzaG93QnRucyIsIkJvb2xlYW4iLCJidG5OZXh0IiwiYnRuQmFjayIsInRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRDb2xvciIsImFycm93IiwiYm9keSIsImFwcGVuZENoaWxkIiwicG9zaXRpb25Qb3BvdmVyIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiaW5saW5lIiwib3ZlcmxheSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsInJlbW92ZSIsInBvcHVwIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImVsIiwiX3giLCJfeSIsImlzTmFOIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJvZmZzZXRQYXJlbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF0cml4IiwiRE9NTWF0cml4UmVhZE9ubHkiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2xhdGVYIiwiTWF0aCIsImFicyIsIm9mZnNldFdpZHRoIiwibTQxIiwidHJhbnNsYXRlWSIsIm9mZnNldEhlaWdodCIsIm00MiIsImdldE9mZnNldCIsImdldFRyYW5zbGF0ZVhZIiwic3RyYXRlZ3kiLCJlbF90b3AiLCJlbF9sZWZ0IiwiZ2V0RWxlbWVudFBvc2l0aW9uIiwicmVwbGFjZSIsInRyaW0iLCJuZXdfYXJyb3ciLCJzY3JvbGxUbyIsIm92ZXJsYXkxIiwib3ZlcmxheTIiLCJvdmVybGF5MyIsIm92ZXJsYXk0IiwiaGlnaGxpZ2h0X29mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUJBO0VBQ2pCLHFCQUEwQjtFQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7RUFBQTs7RUFDdEIsUUFBSSxDQUFDLENBQUMsS0FBS0MsV0FBTCxDQUFpQkMsUUFBdkIsRUFBaUM7RUFDN0IsYUFBTyxLQUFLRCxXQUFMLENBQWlCQyxRQUF4QjtFQUNIOztFQUVELFNBQUtELFdBQUwsQ0FBaUJDLFFBQWpCLEdBQTRCLElBQTVCO0VBRUEsU0FBS0YsT0FBTDtFQUNJRyxNQUFBQSxPQUFPLEVBQUUsSUFEYjtFQUVJQyxNQUFBQSxPQUFPLEVBQUUsR0FGYjtFQUdJQyxNQUFBQSxNQUFNLEVBQUUsRUFIWjtFQUlJQyxNQUFBQSxZQUFZLEVBQUUsQ0FKbEI7RUFLSUMsTUFBQUEsVUFBVSxFQUFFLElBTGhCO0VBTUlDLE1BQUFBLFNBQVMsRUFBRSxJQU5mO0VBT0lDLE1BQUFBLGVBQWUsRUFBRSxDQVByQjtFQVFJQyxNQUFBQSxRQUFRLEVBQUUsSUFSZDtFQVNJQyxNQUFBQSxLQUFLLEVBQUUsT0FUWDtFQVVJQyxNQUFBQSxNQUFN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
