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
      this.counter = 0;
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
      key: "setPopperInstance",
      value: function setPopperInstance(Popper) {
        this.Popper = Popper;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgb2Zmc2V0OiAyMCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgaGlnaGxpZ2h0T2Zmc2V0OiA1LFxyXG4gICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgIHpJbmRleDogMTAwNTAsXHJcbiAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgIG9uTmV4dDogKCkgPT4gbnVsbCxcclxuICAgICAgICBvblByZXZpb3VzOiAoKSA9PiBudWxsLFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgdGhpcy5zdGVwcyA9IFtdO1xyXG4gICAgdGhpcy5zdGVwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICAvL2VsZW1lbnRzXHJcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcclxuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcclxuXHJcbiAgICAvL2V2ZW50c1xyXG4gICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vblJlc2l6ZSA9IHRoaXMub25SZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uS2V5VXAgPSB0aGlzLm9uS2V5VXAuYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJpbmQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYmluZCgpIHtcclxuICAgICAgICBpZiAoISgnb250b3VjaHN0YXJ0JyBpbiB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkNsaWNrLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXAsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1uZXh0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3dC1idG4tYmFjaycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3dC1vdmVybGF5JykpIHtcclxuICAgICAgICAgICAgLy9pZiBhbGxvd0Nsb3NlID0gdHJ1ZSBjbG9zZSB3aGVuIGJhY2tkcm9wIGlzIGNsaWNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcgfHwgIXRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5vcHRpb25zLmFsbG93Q2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmlnaHQga2V5IGZvciBuZXh0XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25OZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgLy9sZWZ0IGtleSBmb3IgYmFja1xyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUHJldmlvdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3BhZ2UgaXMgcmVzaXplIHVwZGF0ZSBwb3BvdmVyXHJcbiAgICBvblJlc2l6ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgcG9wcGVyIGluc3RhbmNlIGlmIHlvdSB3YW50IHRvIHVzZSBwb3BwZXIgZW5naW5lXHJcbiAgICBzZXRQb3BwZXJJbnN0YW5jZShQb3BwZXIpe1xyXG4gICAgICAgIHRoaXMuUG9wcGVyID0gUG9wcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2V0IHdlYiB0b3VyIHN0ZXBzXHJcbiAgICBzZXRTdGVwcyhzdGVwcykge1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U3RlcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhpZ2hsaWdodChlbGVtZW50KXtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcclxuICAgICAgICBpZiAoZWxlbWVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheShlbGVtZW50KVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vc3RhcnQgdGhlIHdlYiB0b3VyXHJcbiAgICBzdGFydChzdGFydEluZGV4ID0gMCkge1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zaG93IGxvYWRlciBwcm9ncmVzc1xyXG4gICAgc2hvd0xvYWRlcigpIHtcclxuICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3d0LWxvYWRlcicpO1xyXG4gICAgICAgIGxvYWRlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4ICsgMTA7XHJcbiAgICAgICAgcG9wb3Zlci5wcmVwZW5kKGxvYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZU5leHQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVQcmV2aW91cygpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dCgpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcbiAgICAgICAgLy9leGVjdXRlIG9uTmV4dCBmdW5jdGlvbigpXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdICYmIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCkgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25OZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QcmV2aW91cygpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcbiAgICAgICAgLy9leGVjdXRlIG9uQmFjayBmdW5jdGlvbigpXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdICYmIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipnbyB0byBuZXh0IHN0ZXAgKi9cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPj0gdGhpcy5zdGVwcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91cygpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnN0ZXBJbmRleC0tO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2FkZCB0aGUgcG9wb3ZlciB0byBkb2N1bWVudFxyXG4gICAgcmVuZGVyKHN0ZXApIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHN0ZXAuZWxlbWVudCA/IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGVwLmVsZW1lbnQpIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBlbGVtZW50IGlzIHByZXNlbnQgaWYgbm90IG1ha2UgaXQgZmxvYXRpbmdcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gIWVsZW1lbnQuc3R5bGUucG9zaXRpb24gPyAncmVsYXRpdmUnIDogZWxlbWVudC5zdHlsZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgY29uc3Qgc3RlcF9oaWdobGlnaHQgPSAhc3RlcC5oaWdobGlnaHQgPyB0cnVlIDogc3RlcC5oaWdobGlnaHQ7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2hpZ2hsaWdodCBpcyBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCAmJiBzdGVwX2hpZ2hsaWdodCApIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd3dC1oaWdobGlnaHQnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BvcG92ZXJcclxuICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBwb3BvdmVySW5uZXIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQmFjayA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnd3QtcG9wb3ZlcicpO1xyXG4gICAgICAgIHBvcG92ZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5vcHRpb25zLmJvcmRlclJhZGl1cyArICdweCc7XHJcbiAgICAgICAgcG9wb3Zlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4ICsgMTA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMud2lkdGggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RlcC53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ZXAud2lkdGggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVySW5uZXIuY2xhc3NMaXN0LmFkZCgnd3QtcG9wb3Zlci1pbm5lcicpO1xyXG4gICAgICAgIGFycm93LmNsYXNzTGlzdC5hZGQoJ3d0LWFycm93Jyk7XHJcbiAgICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1hcnJvdycsICd0cnVlJyk7XHJcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnd3QtdGl0bGUnKTtcclxuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ3d0LWNvbnRlbnQnKTtcclxuICAgICAgICBidG5OZXh0LmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLW5leHQnKTtcclxuICAgICAgICBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLWJhY2snKTtcclxuICAgICAgICBpZiAoc3RlcC5wbGFjZW1lbnQpIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChzdGVwLnBsYWNlbWVudCk7IC8vYWRkIHVzZXIgZGVmaW5lIHBsYWNlbWVudCB0byBjbGFzcyBmb3IgcG9zaXRpb24gaW4gY3NzXHJcblxyXG4gICAgICAgIC8vYWRkIHRleHRcclxuICAgICAgICBpZiAoc3RlcC50aXRsZSkgdGl0bGUuaW5uZXJUZXh0ID0gc3RlcC50aXRsZTtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IChzdGVwLmNvbnRlbnQgPyBzdGVwLmNvbnRlbnQgOiAnJyk7XHJcbiAgICAgICAgYnRuTmV4dC5pbm5lckhUTUwgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC50ZXh0ID8gc3RlcC5idG5OZXh0LnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gdGhpcy5zdGVwcy5sZW5ndGggLSAxID8gJ0RvbmUnIDogJ05leHQgJiM4NTk0OycpKTtcclxuICAgICAgICBidG5CYWNrLmlubmVySFRNTCA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLnRleHQgPyBzdGVwLmJ0bkJhY2sudGV4dCA6ICh0aGlzLnN0ZXBJbmRleCA9PSAwID8gJ0Nsb3NlJyA6ICdcdCYjODU5MjsgQmFjaycpKTtcclxuXHJcbiAgICAgICAgLy9hZGQgc3R5bGVzXHJcbiAgICAgICAgYnRuTmV4dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC5iYWNrZ3JvdW5kQ29sb3IgPyBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yIDogJyM3Y2QxZjknKTtcclxuICAgICAgICBidG5CYWNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgOiAnI2VmZWZlZjsnKTtcclxuICAgICAgICBidG5OZXh0LnN0eWxlLmNvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dENvbG9yID8gc3RlcC5idG5OZXh0LnRleHRDb2xvciA6ICcjZmZmJyk7XHJcbiAgICAgICAgYnRuQmFjay5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLnRleHRDb2xvciA/IHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgOiAnIzU1NScpO1xyXG5cclxuICAgICAgICAvLy9jb21iaW5lIHBvcG92ZXIgY29tcG9uZW50XHJcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHBvcG92ZXJJbm5lci5hcHBlbmQodGl0bGUpO1xyXG4gICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5OZXh0KTtcclxuICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGJ0bkJhY2spO1xyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKGFycm93KTtcclxuICAgICAgICBwb3BvdmVyLmFwcGVuZChwb3BvdmVySW5uZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wb3Zlcik7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Qb3BvdmVyKGVsZW1lbnQsIHBvcG92ZXIsIGFycm93LCBzdGVwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTm8gZWxlbWVudCBpcyBkZWZpbmVcclxuICAgICAgICAqIE1ha2UgcG9wb3ZlciBmbG9hdGluZyAocG9zaXRpb24gY2VudGVyKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXNsaWRlcycpO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJjZW50ZXJcIn0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCBvcHRpb24gdG8gcmVtb3ZlIGFycm93IGJlY2F1c2UgcG9wcGVyIGFycm93cyBhcmUgbm90IHBvc2l0aW9uaW5nIHdlbGxcclxuICAgICAgICAvL1RPRE86IGZpeCBwb3BwZXIgYXJyb3dcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZUFycm93KXtcclxuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3JlbW92ZSBwb3BvdmVyXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB2YXIgcG9wdXAgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XHJcbiAgICAgICAgdmFyIGxvYWRlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LWxvYWRlcicpO1xyXG5cclxuICAgICAgICBpZiAocG9wdXApIHBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmIChsb2FkZXIpIGxvYWRlci5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3Qtb3ZlcmxheScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJypbd3QtaGlnaGxpZ2h0XScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2luZG93T2Zmc2V0KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9mZnNldCggZWwgKSB7XHJcbiAgICAgICAgdmFyIF94ID0gMDtcclxuICAgICAgICB2YXIgX3kgPSAwO1xyXG4gICAgICAgIHdoaWxlKCBlbCAmJiAhaXNOYU4oIGVsLm9mZnNldExlZnQgKSAmJiAhaXNOYU4oIGVsLm9mZnNldFRvcCApICkge1xyXG4gICAgICAgICAgICBfeCArPSBlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgX3kgKz0gZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdG9wOiBfeSwgbGVmdDogX3ggfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2dldCBjc3MgdHJhbnNmb3JtIHByb3BlcnR5IHRvIGZpeGVkIGlzc3VlcyB3aXRoIHRyYW5zZm9ybSBlbGVtZW50c1xyXG4gICAgZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBuZXcgRE9NTWF0cml4UmVhZE9ubHkoc3R5bGUudHJhbnNmb3JtKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGVYOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRXaWR0aCAqIChtYXRyaXgubTQxIC8gMTAwKSksXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6ICBNYXRoLmFicyhlbGVtZW50Lm9mZnNldEhlaWdodCAqIChtYXRyaXgubTQyIC8gMTAwKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5nZXRPZmZzZXQoZWxlbWVudCkudG9wIC0gKGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVZIDogMCksXHJcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuZ2V0T2Zmc2V0KGVsZW1lbnQpLmxlZnQgLSggZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPyB0aGlzLmdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpLnRyYW5zbGF0ZVggOiAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3Bvc2l0aW9uIHBvcG92ZXJcclxuICAgIHBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCkge1xyXG4gICAgICAgIHZhciBwbGFjZW1lbnQgPSBzdGVwLnBsYWNlbWVudCA/IHN0ZXAucGxhY2VtZW50IDogJ2F1dG8nO1xyXG4gICAgICAgIHZhciBzdHJhdGVneSA9IHN0ZXAuc3RyYXRlZ3kgPyBzdGVwLnN0cmF0ZWd5IDogJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgcG9wb3Zlci5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xyXG4gICAgICAgIGFycm93LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgLy9lbGVtZW50IHRvcCAmIGxlZnRcclxuICAgICAgICB2YXIgZWxfdG9wLCBlbF9sZWZ0O1xyXG4gICAgICAgIGVsX3RvcCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLnRvcDsgXHJcbiAgICAgICAgZWxfbGVmdCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLmxlZnQ7IFxyXG4gICAgXHJcbiAgICAgICAgLy9pZiBwbGFjZW1lbnQgaXMgbm90IGRlZmluZWQgb3IgYXV0byB0aGVuIGNhbGN1bGF0ZSBsb2NhdGlvblxyXG4gICAgICAgIGlmIChwbGFjZW1lbnQgPT0gJ2F1dG8nIHx8IHBsYWNlbWVudCA9PSAnYXV0by1zdGFydCcgfHwgcGxhY2VtZW50ID09ICdhdXRvLWVuZCcpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBwbGFjZW1lbnQucmVwbGFjZSgnYXV0bycsICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgIHZhciBuZXdfYXJyb3cgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRvcFxyXG4gICAgICAgICAgICBpZiAoZWxfdG9wICsgKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkgPiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF9sZWZ0ID4gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICd0b3AnICsgbmV3X2Fycm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdGhlIGxlZnRcclxuICAgICAgICAgICAgaWYgKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHBvcG92ZXIub2Zmc2V0V2lkdGgpID4gdGhpcy53aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX3RvcCA8ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF90b3AgPiAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdsZWZ0JyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgcG9wb3Zlci5vZmZzZXRXaWR0aCAmJiAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHBvcG92ZXIub2Zmc2V0V2lkdGgpIDwgdGhpcy53aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX3RvcCA8ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF90b3AgPiAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdyaWdodCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIGJvdHRvbVxyXG4gICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkgfHwgZWxfdG9wIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxfbGVmdCA8ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2JvdHRvbScgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIGNsYXNzIGZvciBjc3NcclxuICAgICAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHBsYWNlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RvcFxyXG4gICAgICAgIGlmIChwbGFjZW1lbnQgPT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIChwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICd0b3AtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9ib3R0b21cclxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIHBvcG92ZXIub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbS1zdGFydCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20tZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbGVmdFxyXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCAvIDIpIC0gKChlbGVtZW50Lm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtZW5kJykge1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9ICgoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gcG9wb3Zlci5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmlnaHRcclxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCAvIDIpIC0gKChlbGVtZW50Lm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LWVuZCcpIHtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgcG9zaXRpb24gaXMgZml4ZWQgc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGlmIChzdHJhdGVneSA9PT0gJ2ZpeGVkJyl7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJuZWFyZXN0XCJ9KTtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlT3ZlcmxheShlbGVtZW50KXtcclxuICAgICAgICB2YXIgb3ZlcmxheTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5MS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTEnKTtcclxuICAgICAgICBvdmVybGF5MS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcblxyXG4gICAgICAgIHZhciBvdmVybGF5MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG92ZXJsYXkyLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MicpO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuXHJcbiAgICAgICAgdmFyIG92ZXJsYXkzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgb3ZlcmxheTMuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJywgJ292ZXJsYXkzJyk7XHJcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xyXG5cclxuICAgICAgICB2YXIgb3ZlcmxheTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5NC5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTQnKTtcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcbiAgICBcclxuICAgICAgICAvL2FwcGVuZCB0byBib2R5XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkxKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTIpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Myk7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXk0KTtcclxuXHJcbiAgICAgICAgLy9lbGVtZW50IHRvcCAmIGxlZnRcclxuICAgICAgICB2YXIgZWxfdG9wLCBlbF9sZWZ0O1xyXG4gICAgICAgIGVsX3RvcCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLnRvcDsgXHJcbiAgICAgICAgZWxfbGVmdCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLmxlZnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGhpZ2hsaWdodF9vZmZzZXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0O1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIHRvcC1sZWZ0XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUud2lkdGggPSAgZWxfbGVmdCAtIGhpZ2hsaWdodF9vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmhlaWdodCA9ICAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUubGVmdCA9IDA7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgdG9wLXJpZ2h0XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnRvcCA9IDA7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLmhlaWdodCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1yaWdodFxyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBvdmVybGF5My5zdHlsZS50b3AgPSAoZWxfdG9wIC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnJpZ2h0ID0gMDtcclxuICAgICAgICBvdmVybGF5My5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcblxyXG4gICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLWxlZnRcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLndpZHRoID0gICBlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIGhpZ2hsaWdodF9vZmZzZXQgICsgJ3B4JztcclxuICAgICAgICBvdmVybGF5NC5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwibmFtZXMiOlsiV2ViVG91ciIsIm9wdGlvbnMiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwic3RlcHMiLCJzdGVwSW5kZXgiLCJpc1J1bm5pbmciLCJpc1BhdXNlZCIsImNvdW50ZXIiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uQ2xpY2siLCJiaW5kIiwib25SZXNpemUiLCJvbktleVVwIiwiZG9jdW1lbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5leHQiLCJwcmV2aW91cyIsInN0b3AiLCJldmVudCIsImtleUNvZGUiLCJjbGVhciIsInJlbmRlciIsIlBvcHBlciIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT3ZlcmxheSIsInN0YXJ0SW5kZXgiLCJwb3BvdmVyIiwibG9hZGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsInN0eWxlIiwicHJlcGVuZCIsImxlbmd0aCIsInN0ZXAiLCJwb3NpdGlvbiIsInN0ZXBfaGlnaGxpZ2h0Iiwic2V0QXR0cmlidXRlIiwicG9wb3ZlcklubmVyIiwiYXJyb3ciLCJ0aXRsZSIsImNvbnRlbnQiLCJidG5OZXh0IiwiYnRuQmFjayIsInBsYWNlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsInRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRDb2xvciIsImFwcGVuZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInBvc2l0aW9uUG9wb3ZlciIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsImlubGluZSIsIm92ZXJsYXkiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJyZW1vdmUiLCJwb3B1cCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lcldpZHRoIiwiY2xpZW50V2lkdGgiLCJlbCIsIl94IiwiX3kiLCJpc05hTiIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0UGFyZW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm1hdHJpeCIsIkRPTU1hdHJpeFJlYWRPbmx5IiwidHJhbnNmb3JtIiwidHJhbnNsYXRlWCIsIk1hdGgiLCJhYnMiLCJvZmZzZXRXaWR0aCIsIm00MSIsInRyYW5zbGF0ZVkiLCJvZmZzZXRIZWlnaHQiLCJtNDIiLCJnZXRPZmZzZXQiLCJnZXRUcmFuc2xhdGVYWSIsInN0cmF0ZWd5IiwiZWxfdG9wIiwiZWxfbGVmdCIsImdldEVsZW1lbnRQb3NpdGlvbiIsInJlcGxhY2UiLCJ0cmltIiwibmV3X2Fycm93Iiwic2Nyb2xsVG8iLCJvdmVybGF5MSIsIm92ZXJsYXkyIiwib3ZlcmxheTMiLCJvdmVybGF5NCIsImhpZ2hsaWdodF9vZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQTtFQUNqQixxQkFBMEI7RUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0VBQUE7O0VBRTFCLFNBQUtBLE9BQUw7RUFDSUMsTUFBQUEsT0FBTyxFQUFFLElBRGI7RUFFSUMsTUFBQUEsT0FBTyxFQUFFLEdBRmI7RUFHSUMsTUFBQUEsTUFBTSxFQUFFLEVBSFo7RUFJSUMsTUFBQUEsWUFBWSxFQUFFLENBSmxCO0VBS0lDLE1BQUFBLFVBQVUsRUFBRSxJQUxoQjtFQU1JQyxNQUFBQSxTQUFTLEVBQUUsSUFOZjtFQU9JQyxNQUFBQSxlQUFlLEVBQUUsQ0FQckI7RUFRSUMsTUFBQUEsUUFBUSxFQUFFLElBUmQ7RUFTSUMsTUFBQUEsS0FBSyxFQUFFLE9BVFg7RUFVSUMsTUFBQUEsTUFBTSxFQUFFLEtBVlo7RUFXSUMsTUFBQUEsV0FBVyxFQUFFLEtBWGpCO0VBWUlDLE1BQUFBLE1BQU0sRUFBRTtFQUFBLGVBQU0sSUFBTjtFQUFBLE9BWlo7RUFhSUMsTUFBQUEsVUFBVSxFQUFFO0VBQUEsZUFBTSxJQUFOO0VBQUE7RUFiaEIsT0FjT2IsT0FkUDtFQWlCQSxTQUFLYyxLQUFMLEdBQWEsRUFBYjtFQUNBLFNBQUtDLFNBQUws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
