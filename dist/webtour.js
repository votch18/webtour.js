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
        var element = this.document.querySelector(element);

        if (element) {
          this.createOverlay(element);
        }
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
        var popoverInner = this.document.createElement('div');
        var arrow = this.document.createElement('div');
        var title = this.document.createElement('div');
        var content = this.document.createElement('div');
        var btnNext = this.document.createElement('button');
        var btnBack = this.document.createElement('button');
        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;

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

        popoverInner.classList.add('wt-popover-inner');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        title.classList.add('wt-title');
        content.classList.add('wt-content');
        btnNext.classList.add('wt-btns', 'wt-btn-next');
        btnBack.classList.add('wt-btns', 'wt-btn-back');
        if (step.placement) popover.classList.add(step.placement);
        if (step.title) title.innerText = step.title;
        content.innerHTML = step.content ? step.content : '';
        btnNext.innerHTML = step.btnNext && step.btnNext.text ? step.btnNext.text : this.stepIndex == this.steps.length - 1 ? 'Done' : 'Next &#8594;';
        btnBack.innerHTML = step.btnBack && step.btnBack.text ? step.btnBack.text : this.stepIndex == 0 ? 'Close' : '	&#8592; Back';
        btnNext.style.backgroundColor = step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9';
        btnBack.style.backgroundColor = step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;';
        btnNext.style.color = step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff';
        btnBack.style.color = step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555';
        if (step.title) popoverInner.append(title);
        popoverInner.append(content);
        popoverInner.append(btnNext);
        popoverInner.append(btnBack);
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
        var placement = step.placement ? step.placement : 'auto';
        var strategy = step.strategy ? step.strategy : 'absolute';
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
              popover.style.top = el_top + popover.offsetHeight / 2 - (element.offsetHeight + this.options.highlightOffset) / 2 + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'right-start') {
              popover.style.top = el_top - this.options.highlightOffset + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'right-end') {
              popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
              popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
            } else if (placement == 'left') {
                popover.style.top = el_top + popover.offsetHeight / 2 - (element.offsetHeight + this.options.highlightOffset) / 2 + 'px';
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
        var strategy = step.strategy || 'absolute';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgb2Zmc2V0OiAyMCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgaGlnaGxpZ2h0T2Zmc2V0OiA1LFxyXG4gICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgIHpJbmRleDogMTAwNTAsXHJcbiAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgIG9uTmV4dDogKCkgPT4gbnVsbCxcclxuICAgICAgICBvblByZXZpb3VzOiAoKSA9PiBudWxsLFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgdGhpcy5zdGVwcyA9IFtdO1xyXG4gICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgIC8vZWxlbWVudHNcclxuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xyXG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgIC8vZXZlbnRzXHJcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25LZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmluZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LW92ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZyB8fCAhdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodCBrZXkgZm9yIG5leHRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcGFnZSBpcyByZXNpemUgdXBkYXRlIHBvcG92ZXJcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NldCB3ZWIgdG91ciBzdGVwc1xyXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFN0ZXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoaWdobGlnaHQoZWxlbWVudCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoZWxlbWVudClcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL3N0YXJ0IHRoZSB3ZWIgdG91clxyXG4gICAgc3RhcnQoc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2hvdyBsb2FkZXIgcHJvZ3Jlc3NcclxuICAgIHNob3dMb2FkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcclxuICAgICAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCd3dC1sb2FkZXInKTtcclxuICAgICAgICBsb2FkZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG4gICAgICAgIHBvcG92ZXIucHJlcGVuZChsb2FkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOZXh0KCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUHJldmlvdXMoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHQoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbk5leHQgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlvdXMoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbkJhY2sgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKSB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqZ28gdG8gbmV4dCBzdGVwICovXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID49IHRoaXMuc3RlcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlvdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXgtLTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGQgdGhlIHBvcG92ZXIgdG8gZG9jdW1lbnRcclxuICAgIHJlbmRlcihzdGVwKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzdGVwLmVsZW1lbnQgPyB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RlcC5lbGVtZW50KSA6IG51bGw7XHJcblxyXG4gICAgICAgIC8vY2hlY2sgaWYgZWxlbWVudCBpcyBwcmVzZW50IGlmIG5vdCBtYWtlIGl0IGZsb2F0aW5nXHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICFlbGVtZW50LnN0eWxlLnBvc2l0aW9uID8gJ3JlbGF0aXZlJyA6IGVsZW1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHN0ZXBfaGlnaGxpZ2h0ID0gIXN0ZXAuaGlnaGxpZ2h0ID8gdHJ1ZSA6IHN0ZXAuaGlnaGxpZ2h0OyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9oaWdobGlnaHQgaXMgc2V0IHRvIHRydWVcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0JywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wb3BvdmVyXHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgcG9wb3ZlcklubmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBhcnJvdyA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkJhY2sgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcclxuICAgICAgICBwb3BvdmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMub3B0aW9ucy5ib3JkZXJSYWRpdXMgKyAncHgnO1xyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLndpZHRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAud2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGVwLndpZHRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXItaW5uZXInKTtcclxuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xyXG4gICAgICAgIGFycm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItYXJyb3cnLCAndHJ1ZScpO1xyXG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3d0LXRpdGxlJyk7XHJcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XHJcbiAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1uZXh0Jyk7XHJcbiAgICAgICAgYnRuQmFjay5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1iYWNrJyk7XHJcbiAgICAgICAgaWYgKHN0ZXAucGxhY2VtZW50KSBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoc3RlcC5wbGFjZW1lbnQpOyAvL2FkZCB1c2VyIGRlZmluZSBwbGFjZW1lbnQgdG8gY2xhc3MgZm9yIHBvc2l0aW9uIGluIGNzc1xyXG5cclxuICAgICAgICAvL2FkZCB0ZXh0XHJcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHRpdGxlLmlubmVyVGV4dCA9IHN0ZXAudGl0bGU7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAoc3RlcC5jb250ZW50ID8gc3RlcC5jb250ZW50IDogJycpO1xyXG4gICAgICAgIGJ0bk5leHQuaW5uZXJIVE1MID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dCA/IHN0ZXAuYnRuTmV4dC50ZXh0IDogKHRoaXMuc3RlcEluZGV4ID09IHRoaXMuc3RlcHMubGVuZ3RoIC0gMSA/ICdEb25lJyA6ICdOZXh0ICYjODU5NDsnKSk7XHJcbiAgICAgICAgYnRuQmFjay5pbm5lckhUTUwgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0ID8gc3RlcC5idG5CYWNrLnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gMCA/ICdDbG9zZScgOiAnXHQmIzg1OTI7IEJhY2snKSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHN0eWxlc1xyXG4gICAgICAgIGJ0bk5leHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA6ICcjN2NkMWY5Jyk7XHJcbiAgICAgICAgYnRuQmFjay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgPyBzdGVwLmJ0bkJhY2suYmFja2dyb3VuZENvbG9yIDogJyNlZmVmZWY7Jyk7XHJcbiAgICAgICAgYnRuTmV4dC5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHRDb2xvciA/IHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgOiAnI2ZmZicpO1xyXG4gICAgICAgIGJ0bkJhY2suc3R5bGUuY29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgPyBzdGVwLmJ0bkJhY2sudGV4dENvbG9yIDogJyM1NTUnKTtcclxuXHJcbiAgICAgICAgLy8vY29tYmluZSBwb3BvdmVyIGNvbXBvbmVudFxyXG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSBwb3BvdmVySW5uZXIuYXBwZW5kKHRpdGxlKTtcclxuICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuTmV4dCk7XHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5CYWNrKTtcclxuICAgICAgICBwb3BvdmVyLmFwcGVuZChhcnJvdyk7XHJcbiAgICAgICAgcG9wb3Zlci5hcHBlbmQocG9wb3ZlcklubmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcG92ZXIpO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIE5vIGVsZW1lbnQgaXMgZGVmaW5lXHJcbiAgICAgICAgKiBNYWtlIHBvcG92ZXIgZmxvYXRpbmcgKHBvc2l0aW9uIGNlbnRlcilcclxuICAgICAgICAqL1xyXG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKCd3dC1zbGlkZXMnKTtcclxuICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwiY2VudGVyXCJ9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuYm90dG9tID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGFycm93LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgb3B0aW9uIHRvIHJlbW92ZSBhcnJvdyBiZWNhdXNlIHBvcHBlciBhcnJvd3MgYXJlIG5vdCBwb3NpdGlvbmluZyB3ZWxsXHJcbiAgICAgICAgLy9UT0RPOiBmaXggcG9wcGVyIGFycm93XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBcnJvdyl7XHJcbiAgICAgICAgICAgIGFycm93LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9yZW1vdmUgcG9wb3ZlclxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdmFyIHBvcHVwID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xyXG4gICAgICAgIHZhciBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1sb2FkZXInKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcHVwKSBwb3B1cC5yZW1vdmUoKTtcclxuICAgICAgICBpZiAobG9hZGVyKSBsb2FkZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnd0LW92ZXJsYXknKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW3d0LWhpZ2hsaWdodF0nKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd3dC1oaWdobGlnaHQnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdpbmRvd09mZnNldCgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRPZmZzZXQoIGVsICkge1xyXG4gICAgICAgIHZhciBfeCA9IDA7XHJcbiAgICAgICAgdmFyIF95ID0gMDtcclxuICAgICAgICB3aGlsZSggZWwgJiYgIWlzTmFOKCBlbC5vZmZzZXRMZWZ0ICkgJiYgIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcclxuICAgICAgICAgICAgX3ggKz0gZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgIF95ICs9IGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHRvcDogX3ksIGxlZnQ6IF94IH07XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgIGdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXHJcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IERPTU1hdHJpeFJlYWRPbmx5KHN0eWxlLnRyYW5zZm9ybSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRlWDogIE1hdGguYWJzKGVsZW1lbnQub2Zmc2V0V2lkdGggKiAobWF0cml4Lm00MSAvIDEwMCkpLFxyXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRIZWlnaHQgKiAobWF0cml4Lm00MiAvIDEwMCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHRoaXMuZ2V0T2Zmc2V0KGVsZW1lbnQpLnRvcCAtIChlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA/IHRoaXMuZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkudHJhbnNsYXRlWSA6IDApLFxyXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmdldE9mZnNldChlbGVtZW50KS5sZWZ0IC0oIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVYIDogMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9wb3NpdGlvbiBwb3BvdmVyXHJcbiAgICBwb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApIHtcclxuICAgICAgICB2YXIgcGxhY2VtZW50ID0gc3RlcC5wbGFjZW1lbnQgPyBzdGVwLnBsYWNlbWVudCA6ICdhdXRvJztcclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSBzdGVwLnN0cmF0ZWd5ID8gc3RlcC5zdHJhdGVneSA6ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBhcnJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0OyBcclxuICAgIFxyXG4gICAgICAgIC8vaWYgcGxhY2VtZW50IGlzIG5vdCBkZWZpbmVkIG9yIGF1dG8gdGhlbiBjYWxjdWxhdGUgbG9jYXRpb25cclxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICdhdXRvJyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tc3RhcnQnIHx8IHBsYWNlbWVudCA9PSAnYXV0by1lbmQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gcGxhY2VtZW50LnJlcGxhY2UoJ2F1dG8nLCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgbmV3X2Fycm93ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0b3BcclxuICAgICAgICAgICAgaWYgKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpID4gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLWVuZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAndG9wJyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSBsZWZ0XHJcbiAgICAgICAgICAgIGlmICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA+IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnbGVmdCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgbGVmdCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICBpZiAoZWxfbGVmdCA8IHBvcG92ZXIub2Zmc2V0V2lkdGggJiYgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA8IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAncmlnaHQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byBib3R0b21cclxuICAgICAgICAgICAgaWYgKGVsX3RvcCA8IChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpIHx8IGVsX3RvcCA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF9sZWZ0ID4gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdib3R0b20nICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2FkZCB0byBjbGFzcyBmb3IgY3NzXHJcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChwbGFjZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90b3BcclxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpKSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICd0b3Atc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYm90dG9tXHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSBwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20tc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9ICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAtIHBvcG92ZXIub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xlZnRcclxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgLyAyKSAtICgoZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodC1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSBlbF90b3AgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgLyAyKSAtICgoZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdC1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgLSBwb3BvdmVyLm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIHBvc2l0aW9uIGlzIGZpeGVkIHNjcm9sbCB0byB0b3BcclxuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdmaXhlZCcpe1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwibmVhcmVzdFwifSk7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCA9IG51bGwpe1xyXG5cclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSBzdGVwLnN0cmF0ZWd5IHx8ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkxLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MScpO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXkyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTIuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkyJyk7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5My5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTMnKTtcclxuICAgICAgICBvdmVybGF5My5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXk0LmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5NCcpO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgIFxyXG4gICAgICAgIC8vYXBwZW5kIHRvIGJvZHlcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTEpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Mik7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkzKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTQpO1xyXG5cclxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxyXG4gICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XHJcbiAgICAgICAgZWxfdG9wID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkudG9wOyBcclxuICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgaGlnaGxpZ2h0X29mZnNldCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQ7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgdG9wLWxlZnRcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUud2lkdGggPSAgZWxfbGVmdCAtIGhpZ2hsaWdodF9vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmhlaWdodCA9ICAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUubGVmdCA9IDA7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgdG9wLXJpZ2h0XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5oZWlnaHQgPSAoZWxfdG9wIC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyBib3R0b20tcmlnaHRcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnRvcCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLmJvdHRvbSA9IDAgLSAodGhpcy5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIHRoaXMud2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyBib3R0b20tbGVmdFxyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLndpZHRoID0gICBlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIGhpZ2hsaWdodF9vZmZzZXQgICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5ib3R0b20gPSAwIC0gKHRoaXMuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSB0aGlzLndpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwibmFtZXMiOlsiV2ViVG91ciIsIm9wdGlvbnMiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwic3RlcHMiLCJzdGVwSW5kZXgiLCJpc1J1bm5pbmciLCJpc1BhdXNlZCIsIndpbmRvdyIsImRvY3VtZW50Iiwib25DbGljayIsImJpbmQiLCJvblJlc2l6ZSIsIm9uS2V5VXAiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibmV4dCIsInByZXZpb3VzIiwic3RvcCIsImV2ZW50Iiwia2V5Q29kZSIsImNsZWFyIiwicmVuZGVyIiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVPdmVybGF5Iiwic3RhcnRJbmRleCIsInBvcG92ZXIiLCJsb2FkZXIiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwic3R5bGUiLCJwcmVwZW5kIiwibGVuZ3RoIiwic3RlcCIsInBvc2l0aW9uIiwic3RlcF9oaWdobGlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJwb3BvdmVySW5uZXIiLCJhcnJvdyIsInRpdGxlIiwiY29udGVudCIsImJ0bk5leHQiLCJidG5CYWNrIiwicGxhY2VtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwidGV4dCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidGV4dENvbG9yIiwiYXBwZW5kIiwiYm9keSIsImFwcGVuZENoaWxkIiwicG9zaXRpb25Qb3BvdmVyIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiaW5saW5lIiwib3ZlcmxheSIsInRvcCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsInJlbW92ZSIsInBvcHVwIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImVsIiwiX3giLCJfeSIsImlzTmFOIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJvZmZzZXRQYXJlbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF0cml4IiwiRE9NTWF0cml4UmVhZE9ubHkiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2xhdGVYIiwiTWF0aCIsImFicyIsIm9mZnNldFdpZHRoIiwibTQxIiwidHJhbnNsYXRlWSIsIm9mZnNldEhlaWdodCIsIm00MiIsImdldE9mZnNldCIsImdldFRyYW5zbGF0ZVhZIiwic3RyYXRlZ3kiLCJlbF90b3AiLCJlbF9sZWZ0IiwiZ2V0RWxlbWVudFBvc2l0aW9uIiwicmVwbGFjZSIsInRyaW0iLCJuZXdfYXJyb3ciLCJzY3JvbGxUbyIsIm92ZXJsYXkxIiwib3ZlcmxheTIiLCJvdmVybGF5MyIsIm92ZXJsYXk0IiwiaGlnaGxpZ2h0X29mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUJBO0VBQ2pCLHFCQUEwQjtFQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7RUFBQTs7RUFFMUIsU0FBS0EsT0FBTDtFQUNJQyxNQUFBQSxPQUFPLEVBQUUsSUFEYjtFQUVJQyxNQUFBQSxPQUFPLEVBQUUsR0FGYjtFQUdJQyxNQUFBQSxNQUFNLEVBQUUsRUFIWjtFQUlJQyxNQUFBQSxZQUFZLEVBQUUsQ0FKbEI7RUFLSUMsTUFBQUEsVUFBVSxFQUFFLElBTGhCO0VBTUlDLE1BQUFBLFNBQVMsRUFBRSxJQU5mO0VBT0lDLE1BQUFBLGVBQWUsRUFBRSxDQVByQjtFQVFJQyxNQUFBQSxRQUFRLEVBQUUsSUFSZDtFQVNJQyxNQUFBQSxLQUFLLEVBQUUsT0FUWDtFQVVJQyxNQUFBQSxNQUFNLEVBQUUsS0FWWjtFQVdJQyxNQUFBQSxXQUFXLEVBQUUsS0FYakI7RUFZSUMsTUFBQUEsTUFBTSxFQUFFO0VBQUEsZUFBTSxJQUFOO0VBQUEsT0FaWjtFQWFJQyxNQUFBQSxVQUFVLEVBQUU7RUFBQSxlQUFNLElBQU47RUFBQTtFQWJoQixPQWNPYixPQWRQO0VBaUJBLFNBQUtjLEtBQUws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
