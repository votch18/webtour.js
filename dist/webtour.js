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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
        var rect = el.getBoundingClientRect();

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }

        _y = parseInt(rect.y) > parseInt(_y) ? rect.y : _y;
        _x = parseInt(rect.x) > parseInt(_x) ? rect.x : _x;
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
      key: "getTranslate3D",
      value: function getTranslate3D(element) {
        var transform = window.getComputedStyle(element, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);
        var x, y, z;

        if (!results) {
          return {
            X: 0,
            Y: 0,
            Z: 0
          };
        }

        if (results[1] == '3d') {
          var _results$slice = results.slice(2, 5);

          var _results$slice2 = _slicedToArray(_results$slice, 3);

          x = _results$slice2[0];
          y = _results$slice2[1];
          z = _results$slice2[2];
          return {
            X: x,
            Y: y,
            Z: z
          };
        }

        results.push(0);

        var _results$slice3 = results.slice(5, 8);

        var _results$slice4 = _slicedToArray(_results$slice3, 3);

        x = _results$slice4[0];
        y = _results$slice4[1];
        z = _results$slice4[2];
        return {
          X: x,
          Y: y,
          Z: z
        };
      }
    }, {
      key: "getElementPosition",
      value: function getElementPosition(element) {
        return {
          top: this.getOffset(element).top + this.getTranslate3D(element).Y - (element.style.transform ? this.getTranslateXY(element).translateY : 0),
          left: this.getOffset(element).left + this.getTranslate3D(element).X - (element.style.transform ? this.getTranslateXY(element).translateX : 0)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGlmICghIXRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmluc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgIG9mZnNldDogMjAsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICBoaWdobGlnaHRPZmZzZXQ6IDUsXHJcbiAgICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgICAgICB3aWR0aDogJzMwMHB4JyxcclxuICAgICAgICAgICAgekluZGV4OiAxMDA1MCxcclxuICAgICAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgICAgICBvbk5leHQ6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIG9uUHJldmlvdXM6ICgpID0+IG51bGwsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0ZXBzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnRzXHJcbiAgICAgICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgICAgICAvL2V2ZW50c1xyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbktleVVwID0gdGhpcy5vbktleVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iaW5kKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LW92ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZyB8fCAhdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodCBrZXkgZm9yIG5leHRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcGFnZSBpcyByZXNpemUgdXBkYXRlIHBvcG92ZXJcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NldCB3ZWIgdG91ciBzdGVwc1xyXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFN0ZXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodChlbGVtZW50LCBzdGVwID0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmIChlbGVtZW50KXtcclxuICAgICAgICAgICAgaWYgKHN0ZXApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL3N0YXJ0IHRoZSB3ZWIgdG91clxyXG4gICAgc3RhcnQoc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2hvdyBsb2FkZXIgcHJvZ3Jlc3NcclxuICAgIHNob3dMb2FkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcclxuICAgICAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCd3dC1sb2FkZXInKTtcclxuICAgICAgICBsb2FkZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG4gICAgICAgIHBvcG92ZXIucHJlcGVuZChsb2FkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOZXh0KCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUHJldmlvdXMoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHQoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbk5leHQgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlvdXMoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbkJhY2sgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKSB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqZ28gdG8gbmV4dCBzdGVwICovXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID49IHRoaXMuc3RlcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlvdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXgtLTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGQgdGhlIHBvcG92ZXIgdG8gZG9jdW1lbnRcclxuICAgIHJlbmRlcihzdGVwKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzdGVwLmVsZW1lbnQgPyB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RlcC5lbGVtZW50KSA6IG51bGw7XHJcblxyXG4gICAgICAgIC8vY2hlY2sgaWYgZWxlbWVudCBpcyBwcmVzZW50IGlmIG5vdCBtYWtlIGl0IGZsb2F0aW5nXHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICFlbGVtZW50LnN0eWxlLnBvc2l0aW9uID8gJ3JlbGF0aXZlJyA6IGVsZW1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHN0ZXBfaGlnaGxpZ2h0ID0gIXN0ZXAuaGlnaGxpZ2h0ID8gdHJ1ZSA6IHN0ZXAuaGlnaGxpZ2h0OyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9oaWdobGlnaHQgaXMgc2V0IHRvIHRydWVcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0JywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wb3BvdmVyXHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICAgICBcclxuICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcclxuICAgICAgICBwb3BvdmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMub3B0aW9ucy5ib3JkZXJSYWRpdXMgKyAncHgnO1xyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG4gICAgICAgIGlmIChzdGVwLnBsYWNlbWVudCkgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHN0ZXAucGxhY2VtZW50KTsgLy9hZGQgdXNlciBkZWZpbmUgcGxhY2VtZW50IHRvIGNsYXNzIGZvciBwb3NpdGlvbiBpbiBjc3NcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53aWR0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RlcC53aWR0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlciBpbm5lciBjb250YWluZXJcclxuICAgICAgICBjb25zdCBwb3BvdmVySW5uZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHBvcG92ZXJJbm5lci5jbGFzc0xpc3QuYWRkKCd3dC1wb3BvdmVyLWlubmVyJyk7XHJcbiAgICAgICBcclxuICAgICAgICAvL3RpdGxlXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3d0LXRpdGxlJyk7XHJcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHBvcG92ZXJJbm5lci5hcHBlbmQodGl0bGUpO1xyXG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSB0aXRsZS5pbm5lclRleHQgPSBzdGVwLnRpdGxlO1xyXG5cclxuICAgICAgICAvL2NvbnRlbnRcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ3d0LWNvbnRlbnQnKTtcclxuICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gKHN0ZXAuY29udGVudCA/IHN0ZXAuY29udGVudCA6ICcnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2J1dHRvbnNcclxuICAgICAgICBjb25zdCBzaG93QnRucyA9IChzdGVwLnNob3dCdG5zID09IG51bGwgfHwgc3RlcC5zaG93QnRucyA9PSAndW5kZWZpbmVkJykgPyB0cnVlIDogQm9vbGVhbihzdGVwLnNob3dCdG5zKTtcclxuXHJcbiAgICAgICAgaWYgKHNob3dCdG5zKXtcclxuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bkJhY2sgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1uZXh0Jyk7XHJcbiAgICAgICAgICAgIGJ0bkJhY2suY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tYmFjaycpO1xyXG5cclxuICAgICAgICAgICAgYnRuTmV4dC5pbm5lckhUTUwgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC50ZXh0ID8gc3RlcC5idG5OZXh0LnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gdGhpcy5zdGVwcy5sZW5ndGggLSAxID8gJ0RvbmUnIDogJ05leHQgJiM4NTk0OycpKTtcclxuICAgICAgICAgICAgYnRuQmFjay5pbm5lckhUTUwgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0ID8gc3RlcC5idG5CYWNrLnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gMCA/ICdDbG9zZScgOiAnXHQmIzg1OTI7IEJhY2snKSk7XHJcblxyXG4gICAgICAgICAgICAvL2FkZCBzdHlsZXNcclxuICAgICAgICAgICAgYnRuTmV4dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC5iYWNrZ3JvdW5kQ29sb3IgPyBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yIDogJyM3Y2QxZjknKTtcclxuICAgICAgICAgICAgYnRuTmV4dC5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHRDb2xvciA/IHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgOiAnI2ZmZicpO1xyXG5cclxuICAgICAgICAgICAgYnRuQmFjay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgPyBzdGVwLmJ0bkJhY2suYmFja2dyb3VuZENvbG9yIDogJyNlZmVmZWY7Jyk7XHJcbiAgICAgICAgICAgIGJ0bkJhY2suc3R5bGUuY29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgPyBzdGVwLmJ0bkJhY2sudGV4dENvbG9yIDogJyM1NTUnKTtcclxuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5OZXh0KTtcclxuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5CYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcG9wb3ZlciBhcnJvd1xyXG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xyXG4gICAgICAgIGFycm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItYXJyb3cnLCAndHJ1ZScpO1xyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKGFycm93KTtcclxuXHJcbiAgICAgICAgLy9wb3BvdmVyIGlubmVyIGNvbnRhaW5lclxyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKHBvcG92ZXJJbm5lcik7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIHBvcG92ZXIgdG8gYm9keVxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BvdmVyKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBObyBlbGVtZW50IGlzIGRlZmluZVxyXG4gICAgICAgICogTWFrZSBwb3BvdmVyIGZsb2F0aW5nIChwb3NpdGlvbiBjZW50ZXIpXHJcbiAgICAgICAgKi9cclxuICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnd3Qtc2xpZGVzJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiwgaW5saW5lOiBcImNlbnRlclwifSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmJvdHRvbSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIG9wdGlvbiB0byByZW1vdmUgYXJyb3cgYmVjYXVzZSBwb3BwZXIgYXJyb3dzIGFyZSBub3QgcG9zaXRpb25pbmcgd2VsbFxyXG4gICAgICAgIC8vVE9ETzogZml4IHBvcHBlciBhcnJvd1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlQXJyb3cpe1xyXG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vcmVtb3ZlIHBvcG92ZXJcclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHZhciBwb3B1cCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcclxuICAgICAgICB2YXIgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIGlmIChwb3B1cCkgcG9wdXAucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKGxvYWRlcikgbG9hZGVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53dC1vdmVybGF5JykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKlt3dC1oaWdobGlnaHRdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRXaW5kb3dPZmZzZXQoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2Zmc2V0KCBlbCApIHtcclxuICAgICAgICB2YXIgX3ggPSAwO1xyXG4gICAgICAgIHZhciBfeSA9IDA7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgd2hpbGUoIGVsICYmICFpc05hTiggZWwub2Zmc2V0TGVmdCApICYmICFpc05hTiggZWwub2Zmc2V0VG9wICkgKSB7XHJcbiAgICAgICAgICAgIF94ICs9IGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICBfeSArPSBlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKF95LCBfeCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwYXJzZUludChyZWN0LlkpLCBwYXJzZUludChyZWN0LlkpID4gcGFyc2VJbnQoX3kpKTtcclxuICAgICAgICBfeSA9IHBhcnNlSW50KHJlY3QueSkgPiBwYXJzZUludChfeSkgPyByZWN0LnkgOiBfeTtcclxuICAgICAgICBfeCA9IHBhcnNlSW50KHJlY3QueCkgPiBwYXJzZUludChfeCkgPyByZWN0LnggOiBfeDtcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7IHRvcDogIF95ICwgbGVmdDogX3ggfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2dldCBjc3MgdHJhbnNmb3JtIHByb3BlcnR5IHRvIGZpeGVkIGlzc3VlcyB3aXRoIHRyYW5zZm9ybSBlbGVtZW50c1xyXG4gICAgZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBuZXcgRE9NTWF0cml4UmVhZE9ubHkoc3R5bGUudHJhbnNmb3JtKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGVYOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRXaWR0aCAqIChtYXRyaXgubTQxIC8gMTAwKSksXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6ICBNYXRoLmFicyhlbGVtZW50Lm9mZnNldEhlaWdodCAqIChtYXRyaXgubTQyIC8gMTAwKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgIGdldFRyYW5zbGF0ZTNEKGVsZW1lbnQpe1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xyXG4gICAgICAgIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfS4rKSkoPzosICgtezAsMX0uKykpXFwpKS8pO1xyXG5cclxuICAgICAgICBsZXQgeCwgeSwgejtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHsgWDogMCwgWTogMCwgWjogMCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSB7XHJcbiAgICAgICAgICAgIFt4LCB5LCB6XSA9IHJlc3VsdHMuc2xpY2UoMiwgNSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFg6IHgsIFk6IHksIFo6IHogfTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3VsdHMucHVzaCgwKTtcclxuICAgICAgICBbeCwgeSwgel0gPSByZXN1bHRzLnNsaWNlKDUsIDgpO1xyXG4gICAgICAgIHJldHVybiB7IFg6IHgsIFk6IHksIFo6IHogfTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiAodGhpcy5nZXRPZmZzZXQoZWxlbWVudCkudG9wICsgdGhpcy5nZXRUcmFuc2xhdGUzRChlbGVtZW50KS5ZKSAtIChlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA/IHRoaXMuZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkudHJhbnNsYXRlWSA6IDApLFxyXG4gICAgICAgICAgICBsZWZ0OiAodGhpcy5nZXRPZmZzZXQoZWxlbWVudCkubGVmdCArIHRoaXMuZ2V0VHJhbnNsYXRlM0QoZWxlbWVudCkuWCkgLSggZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPyB0aGlzLmdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpLnRyYW5zbGF0ZVggOiAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3Bvc2l0aW9uIHBvcG92ZXJcclxuICAgIHBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCkge1xyXG4gICAgICAgIHZhciBwbGFjZW1lbnQgPSBzdGVwLnBsYWNlbWVudCB8fCAnYXV0byc7XHJcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gc3RlcC5zdHJhdGVneSB8fCAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICBwb3BvdmVyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgYXJyb3cuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxyXG4gICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XHJcbiAgICAgICAgZWxfdG9wID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkudG9wOyBcclxuICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDsgXHJcbiAgICBcclxuICAgICAgICAvL2lmIHBsYWNlbWVudCBpcyBub3QgZGVmaW5lZCBvciBhdXRvIHRoZW4gY2FsY3VsYXRlIGxvY2F0aW9uXHJcbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAnYXV0bycgfHwgcGxhY2VtZW50ID09ICdhdXRvLXN0YXJ0JyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tZW5kJykge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IHBsYWNlbWVudC5yZXBsYWNlKCdhdXRvJywgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIG5ld19hcnJvdyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdG9wXHJcbiAgICAgICAgICAgIGlmIChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSA+IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfbGVmdCA8ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3RvcCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgbGVmdFxyXG4gICAgICAgICAgICBpZiAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPiB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2xlZnQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgcmlnaHRcclxuICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCBwb3BvdmVyLm9mZnNldFdpZHRoICYmIChlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPCB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3JpZ2h0JyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gYm90dG9tXHJcbiAgICAgICAgICAgIGlmIChlbF90b3AgPCAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSB8fCBlbF90b3AgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLWVuZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnYm90dG9tJyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hZGQgdG8gY2xhc3MgZm9yIGNzc1xyXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQocGxhY2VtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdG9wXHJcbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArICgoZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggLyAyKSkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSBlbF9sZWZ0IC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9ICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAtIHBvcG92ZXIub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2JvdHRvbVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbS1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9ICgoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gcG9wb3Zlci5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodFxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgcG9zaXRpb24gaXMgZml4ZWQgc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGlmIChzdHJhdGVneSA9PT0gJ2ZpeGVkJyl7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJuZWFyZXN0XCJ9KTtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwID0gbnVsbCl7XHJcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gKHN0ZXAgJiYgc3RlcC5zdHJhdGVneSkgPyBzdGVwLnN0cmF0ZWd5IDogJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXkxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTEuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkxJyk7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5Mi5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTInKTtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkzLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MycpO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXk0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXk0Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG4gICAgXHJcbiAgICAgICAgLy9hcHBlbmQgdG8gYm9keVxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5MSk7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkyKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTMpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5NCk7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBoaWdobGlnaHRfb2Zmc2V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldDtcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyB0b3AtbGVmdFxyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUudG9wID0gMDtcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS53aWR0aCA9ICBlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuaGVpZ2h0ID0gIChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS5sZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyB0b3AtcmlnaHRcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLmhlaWdodCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1yaWdodFxyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUudG9wID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuYm90dG9tID0gMCAtICh0aGlzLmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1sZWZ0XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUud2lkdGggPSAgIGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCAgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmJvdHRvbSA9IDAgLSAodGhpcy5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIHRoaXMud2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJuYW1lcyI6WyJXZWJUb3VyIiwib3B0aW9ucyIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwic3RlcHMiLCJzdGVwSW5kZXgiLCJpc1J1bm5pbmciLCJpc1BhdXNlZCIsIndpbmRvdyIsImRvY3VtZW50Iiwib25DbGljayIsImJpbmQiLCJvblJlc2l6ZSIsIm9uS2V5VXAiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibmV4dCIsInByZXZpb3VzIiwic3RvcCIsImV2ZW50Iiwia2V5Q29kZSIsImNsZWFyIiwicmVuZGVyIiwiZWxlbWVudCIsInN0ZXAiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT3ZlcmxheSIsInN0YXJ0SW5kZXgiLCJwb3BvdmVyIiwibG9hZGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsInN0eWxlIiwicHJlcGVuZCIsImxlbmd0aCIsInBvc2l0aW9uIiwic3RlcF9oaWdobGlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJwbGFjZW1lbnQiLCJwb3BvdmVySW5uZXIiLCJ0aXRsZSIsImFwcGVuZCIsImlubmVyVGV4dCIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJzaG93QnRucyIsIkJvb2xlYW4iLCJidG5OZXh0IiwiYnRuQmFjayIsInRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRDb2xvciIsImFycm93IiwiYm9keSIsImFwcGVuZENoaWxkIiwicG9zaXRpb25Qb3BvdmVyIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiaW5saW5lIiwib3ZlcmxheSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsInJlbW92ZSIsInBvcHVwIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImVsIiwiX3giLCJfeSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpc05hTiIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0UGFyZW50IiwicGFyc2VJbnQiLCJ5IiwieCIsImdldENvbXB1dGVkU3R5bGUiLCJtYXRyaXgiLCJET01NYXRyaXhSZWFkT25seSIsInRyYW5zZm9ybSIsInRyYW5zbGF0ZVgiLCJNYXRoIiwiYWJzIiwib2Zmc2V0V2lkdGgiLCJtNDEiLCJ0cmFuc2xhdGVZIiwib2Zmc2V0SGVpZ2h0IiwibTQyIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInJlc3VsdHMiLCJtYXRjaCIsInoiLCJYIiwiWSIsIloiLCJzbGljZSIsInB1c2giLCJnZXRPZmZzZXQiLCJnZXRUcmFuc2xhdGUzRCIsImdldFRyYW5zbGF0ZVhZIiwic3RyYXRlZ3kiLCJlbF90b3AiLCJlbF9sZWZ0IiwiZ2V0RWxlbWVudFBvc2l0aW9uIiwicmVwbGFjZSIsInRyaW0iLCJuZXdfYXJyb3ciLCJzY3JvbGxUbyIsIm92ZXJsYXkxIiwib3ZlcmxheTIiLCJvdmVybGF5MyIsIm92ZXJsYXk0IiwiaGlnaGxpZ2h0X29mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
