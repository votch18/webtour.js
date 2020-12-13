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
            this.createOverlay(element);
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
        overlay1.style.position = 'absolute';
        overlay1.style.top = 0;
        overlay1.style.width = el_left - highlight_offset + 'px';
        overlay1.style.height = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay1.style.left = 0;
        overlay2.style.position = 'absolute';
        overlay2.style.top = 0;
        overlay2.style.right = 0;
        overlay2.style.height = el_top - highlight_offset + 'px';
        overlay2.style.left = el_left - highlight_offset + 'px';
        overlay3.style.position = 'absolute';
        overlay3.style.top = el_top - highlight_offset + 'px';
        overlay3.style.right = 0;
        overlay3.style.bottom = 0;
        overlay3.style.left = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.position = 'absolute';
        overlay4.style.top = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay4.style.width = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.bottom = 0;
        overlay4.style.left = 0;
      }
    }]);

    return WebTour;
  }();

  return WebTour;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgb2Zmc2V0OiAyMCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgaGlnaGxpZ2h0T2Zmc2V0OiA1LFxyXG4gICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgIHpJbmRleDogMTAwNTAsXHJcbiAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgIG9uTmV4dDogKCkgPT4gbnVsbCxcclxuICAgICAgICBvblByZXZpb3VzOiAoKSA9PiBudWxsLFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgdGhpcy5zdGVwcyA9IFtdO1xyXG4gICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgIC8vZWxlbWVudHNcclxuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xyXG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgIC8vZXZlbnRzXHJcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25LZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmluZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LW92ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGVyZScsIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLmVsZW1lbnQsIGUudGFyZ2V0LmVsZW1lbnQpO1xyXG4gICAgICAgIC8vIGlmIChlLnRhcmdldC5lbGVtZW50ID09IHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLmVsZW1lbnQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1vdmVOZXh0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZyB8fCAhdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodCBrZXkgZm9yIG5leHRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcGFnZSBpcyByZXNpemUgdXBkYXRlIHBvcG92ZXJcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NldCB3ZWIgdG91ciBzdGVwc1xyXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFN0ZXBzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoaWdobGlnaHQoZWxlbWVudCl7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoZWxlbWVudClcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL3N0YXJ0IHRoZSB3ZWIgdG91clxyXG4gICAgc3RhcnQoc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2hvdyBsb2FkZXIgcHJvZ3Jlc3NcclxuICAgIHNob3dMb2FkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcclxuICAgICAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCd3dC1sb2FkZXInKTtcclxuICAgICAgICBsb2FkZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG4gICAgICAgIHBvcG92ZXIucHJlcGVuZChsb2FkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOZXh0KCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUHJldmlvdXMoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHQoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbk5leHQgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlvdXMoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vZXhlY3V0ZSBvbkJhY2sgZnVuY3Rpb24oKVxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKSB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqZ28gdG8gbmV4dCBzdGVwICovXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID49IHRoaXMuc3RlcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlvdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXgtLTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGQgdGhlIHBvcG92ZXIgdG8gZG9jdW1lbnRcclxuICAgIHJlbmRlcihzdGVwKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzdGVwLmVsZW1lbnQgPyB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RlcC5lbGVtZW50KSA6IG51bGw7XHJcblxyXG4gICAgICAgIC8vY2hlY2sgaWYgZWxlbWVudCBpcyBwcmVzZW50IGlmIG5vdCBtYWtlIGl0IGZsb2F0aW5nXHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICFlbGVtZW50LnN0eWxlLnBvc2l0aW9uID8gJ3JlbGF0aXZlJyA6IGVsZW1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHN0ZXBfaGlnaGxpZ2h0ID0gIXN0ZXAuaGlnaGxpZ2h0ID8gdHJ1ZSA6IHN0ZXAuaGlnaGxpZ2h0OyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9oaWdobGlnaHQgaXMgc2V0IHRvIHRydWVcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0JywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wb3BvdmVyXHJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgcG9wb3ZlcklubmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBhcnJvdyA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkJhY2sgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcclxuICAgICAgICBwb3BvdmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMub3B0aW9ucy5ib3JkZXJSYWRpdXMgKyAncHgnO1xyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLndpZHRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAud2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGVwLndpZHRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXItaW5uZXInKTtcclxuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xyXG4gICAgICAgIGFycm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItYXJyb3cnLCAndHJ1ZScpO1xyXG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3d0LXRpdGxlJyk7XHJcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XHJcbiAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1uZXh0Jyk7XHJcbiAgICAgICAgYnRuQmFjay5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1iYWNrJyk7XHJcbiAgICAgICAgaWYgKHN0ZXAucGxhY2VtZW50KSBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoc3RlcC5wbGFjZW1lbnQpOyAvL2FkZCB1c2VyIGRlZmluZSBwbGFjZW1lbnQgdG8gY2xhc3MgZm9yIHBvc2l0aW9uIGluIGNzc1xyXG5cclxuICAgICAgICAvL2FkZCB0ZXh0XHJcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHRpdGxlLmlubmVyVGV4dCA9IHN0ZXAudGl0bGU7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAoc3RlcC5jb250ZW50ID8gc3RlcC5jb250ZW50IDogJycpO1xyXG4gICAgICAgIGJ0bk5leHQuaW5uZXJIVE1MID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dCA/IHN0ZXAuYnRuTmV4dC50ZXh0IDogKHRoaXMuc3RlcEluZGV4ID09IHRoaXMuc3RlcHMubGVuZ3RoIC0gMSA/ICdEb25lJyA6ICdOZXh0ICYjODU5NDsnKSk7XHJcbiAgICAgICAgYnRuQmFjay5pbm5lckhUTUwgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0ID8gc3RlcC5idG5CYWNrLnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gMCA/ICdDbG9zZScgOiAnXHQmIzg1OTI7IEJhY2snKSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHN0eWxlc1xyXG4gICAgICAgIGJ0bk5leHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA6ICcjN2NkMWY5Jyk7XHJcbiAgICAgICAgYnRuQmFjay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgPyBzdGVwLmJ0bkJhY2suYmFja2dyb3VuZENvbG9yIDogJyNlZmVmZWY7Jyk7XHJcbiAgICAgICAgYnRuTmV4dC5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHRDb2xvciA/IHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgOiAnI2ZmZicpO1xyXG4gICAgICAgIGJ0bkJhY2suc3R5bGUuY29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgPyBzdGVwLmJ0bkJhY2sudGV4dENvbG9yIDogJyM1NTUnKTtcclxuXHJcbiAgICAgICAgLy8vY29tYmluZSBwb3BvdmVyIGNvbXBvbmVudFxyXG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSBwb3BvdmVySW5uZXIuYXBwZW5kKHRpdGxlKTtcclxuICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuTmV4dCk7XHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5CYWNrKTtcclxuICAgICAgICBwb3BvdmVyLmFwcGVuZChhcnJvdyk7XHJcbiAgICAgICAgcG9wb3Zlci5hcHBlbmQocG9wb3ZlcklubmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcG92ZXIpO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheShlbGVtZW50KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIE5vIGVsZW1lbnQgaXMgZGVmaW5lXHJcbiAgICAgICAgKiBNYWtlIHBvcG92ZXIgZmxvYXRpbmcgKHBvc2l0aW9uIGNlbnRlcilcclxuICAgICAgICAqL1xyXG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKCd3dC1zbGlkZXMnKTtcclxuICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwiY2VudGVyXCJ9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuYm90dG9tID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGFycm93LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgb3B0aW9uIHRvIHJlbW92ZSBhcnJvdyBiZWNhdXNlIHBvcHBlciBhcnJvd3MgYXJlIG5vdCBwb3NpdGlvbmluZyB3ZWxsXHJcbiAgICAgICAgLy9UT0RPOiBmaXggcG9wcGVyIGFycm93XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBcnJvdyl7XHJcbiAgICAgICAgICAgIGFycm93LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9yZW1vdmUgcG9wb3ZlclxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdmFyIHBvcHVwID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xyXG4gICAgICAgIHZhciBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1sb2FkZXInKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcHVwKSBwb3B1cC5yZW1vdmUoKTtcclxuICAgICAgICBpZiAobG9hZGVyKSBsb2FkZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnd0LW92ZXJsYXknKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW3d0LWhpZ2hsaWdodF0nKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd3dC1oaWdobGlnaHQnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdpbmRvd09mZnNldCgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRPZmZzZXQoIGVsICkge1xyXG4gICAgICAgIHZhciBfeCA9IDA7XHJcbiAgICAgICAgdmFyIF95ID0gMDtcclxuICAgICAgICB3aGlsZSggZWwgJiYgIWlzTmFOKCBlbC5vZmZzZXRMZWZ0ICkgJiYgIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcclxuICAgICAgICAgICAgX3ggKz0gZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgIF95ICs9IGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHRvcDogX3ksIGxlZnQ6IF94IH07XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgIGdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXHJcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IERPTU1hdHJpeFJlYWRPbmx5KHN0eWxlLnRyYW5zZm9ybSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRlWDogIE1hdGguYWJzKGVsZW1lbnQub2Zmc2V0V2lkdGggKiAobWF0cml4Lm00MSAvIDEwMCkpLFxyXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRIZWlnaHQgKiAobWF0cml4Lm00MiAvIDEwMCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHRoaXMuZ2V0T2Zmc2V0KGVsZW1lbnQpLnRvcCAtIChlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA/IHRoaXMuZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkudHJhbnNsYXRlWSA6IDApLFxyXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmdldE9mZnNldChlbGVtZW50KS5sZWZ0IC0oIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVYIDogMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9wb3NpdGlvbiBwb3BvdmVyXHJcbiAgICBwb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApIHtcclxuICAgICAgICB2YXIgcGxhY2VtZW50ID0gc3RlcC5wbGFjZW1lbnQgPyBzdGVwLnBsYWNlbWVudCA6ICdhdXRvJztcclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSBzdGVwLnN0cmF0ZWd5ID8gc3RlcC5zdHJhdGVneSA6ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcclxuICAgICAgICBhcnJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0OyBcclxuICAgIFxyXG4gICAgICAgIC8vaWYgcGxhY2VtZW50IGlzIG5vdCBkZWZpbmVkIG9yIGF1dG8gdGhlbiBjYWxjdWxhdGUgbG9jYXRpb25cclxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICdhdXRvJyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tc3RhcnQnIHx8IHBsYWNlbWVudCA9PSAnYXV0by1lbmQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gcGxhY2VtZW50LnJlcGxhY2UoJ2F1dG8nLCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgbmV3X2Fycm93ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0b3BcclxuICAgICAgICAgICAgaWYgKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpID4gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLWVuZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAndG9wJyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSBsZWZ0XHJcbiAgICAgICAgICAgIGlmICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA+IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnbGVmdCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgbGVmdCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICBpZiAoZWxfbGVmdCA8IHBvcG92ZXIub2Zmc2V0V2lkdGggJiYgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA8IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAncmlnaHQnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byBib3R0b21cclxuICAgICAgICAgICAgaWYgKGVsX3RvcCA8IChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpIHx8IGVsX3RvcCA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF9sZWZ0ID4gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdib3R0b20nICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2FkZCB0byBjbGFzcyBmb3IgY3NzXHJcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChwbGFjZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90b3BcclxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpKSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICd0b3Atc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYm90dG9tXHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSBwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20tc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9ICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAtIHBvcG92ZXIub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xlZnRcclxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgLyAyKSAtICgoZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodC1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSBlbF90b3AgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgLyAyKSAtICgoZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdC1lbmQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgLSBwb3BvdmVyLm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIHBvc2l0aW9uIGlzIGZpeGVkIHNjcm9sbCB0byB0b3BcclxuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdmaXhlZCcpe1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwibmVhcmVzdFwifSk7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU92ZXJsYXkoZWxlbWVudCl7XHJcbiAgICAgICAgdmFyIG92ZXJsYXkxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTEuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkxJyk7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5Mi5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTInKTtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkzLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MycpO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXk0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXk0Jyk7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG4gICAgXHJcbiAgICAgICAgLy9hcHBlbmQgdG8gYm9keVxyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5MSk7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkyKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTMpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5NCk7XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcclxuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBoaWdobGlnaHRfb2Zmc2V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldDtcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyB0b3AtbGVmdFxyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLndpZHRoID0gIGVsX2xlZnQgLSBoaWdobGlnaHRfb2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS5oZWlnaHQgPSAgKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmxlZnQgPSAwO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIHRvcC1yaWdodFxyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICBvdmVybGF5Mi5zdHlsZS5oZWlnaHQgPSAoZWxfdG9wIC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgLy9vdmVybGF5cyBib3R0b20tcmlnaHRcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUudG9wID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuYm90dG9tID0gMDtcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1sZWZ0XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS53aWR0aCA9ICAgZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBoaWdobGlnaHRfb2Zmc2V0ICArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuYm90dG9tID0gMDtcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sIm5hbWVzIjpbIldlYlRvdXIiLCJvcHRpb25zIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJvZmZzZXQiLCJib3JkZXJSYWRpdXMiLCJhbGxvd0Nsb3NlIiwiaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0T2Zmc2V0Iiwia2V5Ym9hcmQiLCJ3aWR0aCIsInpJbmRleCIsInJlbW92ZUFycm93Iiwib25OZXh0Iiwib25QcmV2aW91cyIsInN0ZXBzIiwic3RlcEluZGV4IiwiaXNSdW5uaW5nIiwiaXNQYXVzZWQiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uQ2xpY2siLCJiaW5kIiwib25SZXNpemUiLCJvbktleVVwIiwiZG9jdW1lbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5leHQiLCJwcmV2aW91cyIsInN0b3AiLCJldmVudCIsImtleUNvZGUiLCJjbGVhciIsInJlbmRlciIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT3ZlcmxheSIsInN0YXJ0SW5kZXgiLCJwb3BvdmVyIiwibG9hZGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsInN0eWxlIiwicHJlcGVuZCIsImxlbmd0aCIsInN0ZXAiLCJwb3NpdGlvbiIsInN0ZXBfaGlnaGxpZ2h0Iiwic2V0QXR0cmlidXRlIiwicG9wb3ZlcklubmVyIiwiYXJyb3ciLCJ0aXRsZSIsImNvbnRlbnQiLCJidG5OZXh0IiwiYnRuQmFjayIsInBsYWNlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsInRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRDb2xvciIsImFwcGVuZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInBvc2l0aW9uUG9wb3ZlciIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsImlubGluZSIsIm92ZXJsYXkiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJyZW1vdmUiLCJwb3B1cCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lcldpZHRoIiwiY2xpZW50V2lkdGgiLCJlbCIsIl94IiwiX3kiLCJpc05hTiIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0UGFyZW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm1hdHJpeCIsIkRPTU1hdHJpeFJlYWRPbmx5IiwidHJhbnNmb3JtIiwidHJhbnNsYXRlWCIsIk1hdGgiLCJhYnMiLCJvZmZzZXRXaWR0aCIsIm00MSIsInRyYW5zbGF0ZVkiLCJvZmZzZXRIZWlnaHQiLCJtNDIiLCJnZXRPZmZzZXQiLCJnZXRUcmFuc2xhdGVYWSIsInN0cmF0ZWd5IiwiZWxfdG9wIiwiZWxfbGVmdCIsImdldEVsZW1lbnRQb3NpdGlvbiIsInJlcGxhY2UiLCJ0cmltIiwibmV3X2Fycm93Iiwic2Nyb2xsVG8iLCJvdmVybGF5MSIsIm92ZXJsYXkyIiwib3ZlcmxheTMiLCJvdmVybGF5NCIsImhpZ2hsaWdodF9vZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQTtFQUNqQixxQkFBMEI7RUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0VBQUE7O0VBRTFCLFNBQUtBLE9BQUw7RUFDSUMsTUFBQUEsT0FBTyxFQUFFLElBRGI7RUFFSUMsTUFBQUEsT0FBTyxFQUFFLEdBRmI7RUFHSUMsTUFBQUEsTUFBTSxFQUFFLEVBSFo7RUFJSUMsTUFBQUEsWUFBWSxFQUFFLENBSmxCO0VBS0lDLE1BQUFBLFVBQVUsRUFBRSxJQUxoQjtFQU1JQyxNQUFBQSxTQUFTLEVBQUUsSUFOZjtFQU9JQyxNQUFBQSxlQUFlLEVBQUUsQ0FQckI7RUFRSUMsTUFBQUEsUUFBUSxFQUFFLElBUmQ7RUFTSUMsTUFBQUEsS0FBSyxFQUFFLE9BVFg7RUFVSUMsTUFBQUEsTUFBTSxFQUFFLEtBVlo7RUFXSUMsTUFBQUEsV0FBVyxFQUFFLEtBWGpCO0VBWUlDLE1BQUFBLE1BQU0sRUFBRTtFQUFBLGVBQU0sSUFBTjtFQUFBLE9BWlo7RUFhSUMsTUFBQUEsVUFBVSxFQUFFO0VBQUEsZUFBTSxJQUFOO0VBQUE7RUFiaEIsT0FjT2Is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
