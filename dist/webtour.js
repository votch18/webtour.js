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
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
      }
    }, {
      key: "onPrevious",
      value: function onPrevious() {
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onPrevious) this.steps[this.stepIndex].onPrevious();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) {
          return;
        }

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
        if (this.isPaused) {
          return;
        }

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

        if (this.options.highlight) {
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
        }

        this.document.body.appendChild(popover);

        if (!this.Popper && element) {
          this.positionPopover(element, popover, arrow, step);

          if (this.options.highlight) {
            this.positionOverlay(element, overlay1, overlay2, overlay3, overlay4);
          }
        } else if (!element) {
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
      key: "positionOverlay",
      value: function positionOverlay(element, overlay1, overlay2, overlay3, overlay4) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgb2Zmc2V0OiAyMCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcclxuICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgaGlnaGxpZ2h0T2Zmc2V0OiA1LFxyXG4gICAgICAgIGtleWJvYXJkOiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgIHpJbmRleDogMTAwNTAsXHJcbiAgICAgICAgcmVtb3ZlQXJyb3c6IGZhbHNlLFxyXG4gICAgICAgIG9uTmV4dDogKCkgPT4gbnVsbCxcclxuICAgICAgICBvblByZXZpb3VzOiAoKSA9PiBudWxsLFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgdGhpcy5zdGVwcyA9W107XHJcbiAgICB0aGlzLnN0ZXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIC8vZWxlbWVudHNcclxuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xyXG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xyXG5cclxuICAgIC8vZXZlbnRzXHJcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25LZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmluZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LW92ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZyB8fCAhdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yaWdodCBrZXkgZm9yIG5leHRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcGFnZSBpcyByZXNpemUgdXBkYXRlIHBvcG92ZXJcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NldCBwb3BwZXIgaW5zdGFuY2UgaWYgeW91IHdhbnQgdG8gdXNlIHBvcHBlciBlbmdpbmVcclxuICAgIHNldFBvcHBlckluc3RhbmNlKFBvcHBlcil7XHJcbiAgICAgICAgdGhpcy5Qb3BwZXIgPSBQb3BwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgd2ViIHRvdXIgc3RlcHNcclxuICAgIHNldFN0ZXBzKHN0ZXBzKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGVwcyA9IHN0ZXBzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRTdGVwcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGVwcztcclxuICAgIH1cclxuXHJcbiAgICAvL3N0YXJ0IHRoZSB3ZWIgdG91clxyXG4gICAgc3RhcnQoc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgc3RvcCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zaG93IGxvYWRlciBwcm9ncmVzc1xyXG4gICAgICAgIHNob3dMb2FkZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCd3dC1sb2FkZXInKTtcclxuICAgICAgICAgICAgbG9hZGVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggKyAxMDtcclxuICAgICAgICAgICAgcG9wb3Zlci5wcmVwZW5kKGxvYWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb3ZlTmV4dCgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1vdmVQcmV2aW91cygpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbk5leHQoKXtcclxuICAgICAgICAgICAgLy9leGVjdXRlIG9uTmV4dCBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25QcmV2aW91cygpe1xyXG4gICAgICAgICAgICAvL2V4ZWN1dGUgb25CYWNrIGZ1bmN0aW9uKClcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdICYmIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKmdvIHRvIG5leHQgc3RlcCAqL1xyXG4gICAgICAgIG5leHQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID49IHRoaXMuc3RlcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldmlvdXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RlcEluZGV4LS07XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIHRoZSBwb3BvdmVyIHRvIGRvY3VtZW50XHJcbiAgICAgICAgcmVuZGVyKHN0ZXApIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBzdGVwLmVsZW1lbnQgPyB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RlcC5lbGVtZW50KSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIGVsZW1lbnQgaXMgcHJlc2VudCBpZiBub3QgbWFrZSBpdCBmbG9hdGluZ1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICFlbGVtZW50LnN0eWxlLnBvc2l0aW9uID8gJ3JlbGF0aXZlJyA6IGVsZW1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwX2hpZ2hsaWdodCA9ICFzdGVwLmhpZ2hsaWdodCA/IHRydWUgOiBzdGVwLmhpZ2hsaWdodDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCBpcyBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcG9wb3ZlclxyXG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcG9wb3ZlcklubmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb25zdCBidG5OZXh0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuQmFjayA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLm9wdGlvbnMuYm9yZGVyUmFkaXVzICsgJ3B4JztcclxuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4ICsgMTA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53aWR0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGVwLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0ZXAud2lkdGggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHN0ZXAud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3BvdmVySW5uZXIuY2xhc3NMaXN0LmFkZCgnd3QtcG9wb3Zlci1pbm5lcicpO1xyXG4gICAgICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xyXG4gICAgICAgICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wcGVyLWFycm93JywgJ3RydWUnKTtcclxuICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnd3QtdGl0bGUnKTtcclxuICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgIGJ0bk5leHQuY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tbmV4dCcpO1xyXG4gICAgICAgICAgICBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLWJhY2snKTtcclxuICAgICAgICAgICAgaWYgKHN0ZXAucGxhY2VtZW50KSBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoc3RlcC5wbGFjZW1lbnQpOyAvL2FkZCB1c2VyIGRlZmluZSBwbGFjZW1lbnQgdG8gY2xhc3MgZm9yIHBvc2l0aW9uIGluIGNzc1xyXG5cclxuICAgICAgICAgICAgLy9hZGQgdGV4dFxyXG4gICAgICAgICAgICBpZiAoc3RlcC50aXRsZSkgdGl0bGUuaW5uZXJUZXh0ID0gc3RlcC50aXRsZTtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAoc3RlcC5jb250ZW50ID8gc3RlcC5jb250ZW50IDogJycpO1xyXG4gICAgICAgICAgICBidG5OZXh0LmlubmVySFRNTCA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHQgPyBzdGVwLmJ0bk5leHQudGV4dCA6ICh0aGlzLnN0ZXBJbmRleCA9PSB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEgPyAnRG9uZScgOiAnTmV4dCAmIzg1OTQ7JykpO1xyXG4gICAgICAgICAgICBidG5CYWNrLmlubmVySFRNTCA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLnRleHQgPyBzdGVwLmJ0bkJhY2sudGV4dCA6ICh0aGlzLnN0ZXBJbmRleCA9PSAwID8gJ0Nsb3NlJyA6ICdcdCYjODU5MjsgQmFjaycpKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHN0eWxlc1xyXG4gICAgICAgICAgICBidG5OZXh0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuTmV4dC5iYWNrZ3JvdW5kQ29sb3IgOiAnIzdjZDFmOScpO1xyXG4gICAgICAgICAgICBidG5CYWNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgOiAnI2VmZWZlZjsnKTtcclxuICAgICAgICAgICAgYnRuTmV4dC5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHRDb2xvciA/IHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgOiAnI2ZmZicpO1xyXG4gICAgICAgICAgICBidG5CYWNrLnN0eWxlLmNvbG9yID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2sudGV4dENvbG9yID8gc3RlcC5idG5CYWNrLnRleHRDb2xvciA6ICcjNTU1Jyk7XHJcblxyXG4gICAgICAgICAgICAvLy9jb21iaW5lIHBvcG92ZXIgY29tcG9uZW50XHJcbiAgICAgICAgICAgIGlmIChzdGVwLnRpdGxlKSBwb3BvdmVySW5uZXIuYXBwZW5kKHRpdGxlKTtcclxuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5OZXh0KTtcclxuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5CYWNrKTtcclxuICAgICAgICAgICAgcG9wb3Zlci5hcHBlbmQoYXJyb3cpO1xyXG4gICAgICAgICAgICBwb3BvdmVyLmFwcGVuZChwb3BvdmVySW5uZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5MS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTEnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkxLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5Mi5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTInKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5My5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTMnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkzLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXk0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5NC5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTQnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXk0LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0byBib2R5XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IGFkZCBob2xlIGluIG92ZXJsYXkgc2ltaWxhciB0byBwYWdldG91clxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Mik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheTMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXk0KTtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BvdmVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Qb3BwZXIgJiYgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25PdmVybGF5KGVsZW1lbnQsIG92ZXJsYXkxLCBvdmVybGF5Miwgb3ZlcmxheTMsIG92ZXJsYXk0KTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAqIE5vIGVsZW1lbnQgaXMgZGVmaW5lXHJcbiAgICAgICAgICAgICAgICAqIE1ha2UgcG9wb3ZlciBmbG9hdGluZyAocG9zaXRpb24gY2VudGVyKVxyXG4gICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZWxzZSBpZiAoIWVsZW1lbnQpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnd3Qtc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJjZW50ZXJcIn0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnd3Qtb3ZlcmxheScsICdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRkIG9wdGlvbiB0byByZW1vdmUgYXJyb3cgYmVjYXVzZSBwb3BwZXIgYXJyb3dzIGFyZSBub3QgcG9zaXRpb25pbmcgd2VsbFxyXG4gICAgICAgICAgICAvL1RPRE86IGZpeCBwb3BwZXIgYXJyb3dcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBcnJvdyl7XHJcbiAgICAgICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIHBvcG92ZXJcclxuICAgICAgICBjbGVhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBvcHVwID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtbG9hZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9wdXApIHBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAobG9hZGVyKSBsb2FkZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53dC1vdmVybGF5JykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKlt3dC1oaWdobGlnaHRdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0V2luZG93T2Zmc2V0KCl7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldE9mZnNldCggZWwgKSB7XHJcbiAgICAgICAgICAgIHZhciBfeCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBfeSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKCBlbCAmJiAhaXNOYU4oIGVsLm9mZnNldExlZnQgKSAmJiAhaXNOYU4oIGVsLm9mZnNldFRvcCApICkge1xyXG4gICAgICAgICAgICAgICAgX3ggKz0gZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgICAgICBfeSArPSBlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4geyB0b3A6IF95LCBsZWZ0OiBfeCB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcclxuICAgICAgICBnZXRUcmFuc2xhdGVYWShlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcclxuICAgICAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IERPTU1hdHJpeFJlYWRPbmx5KHN0eWxlLnRyYW5zZm9ybSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRXaWR0aCAqIChtYXRyaXgubTQxIC8gMTAwKSksXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRIZWlnaHQgKiAobWF0cml4Lm00MiAvIDEwMCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5nZXRPZmZzZXQoZWxlbWVudCkudG9wIC0gKGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVZIDogMCksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLmdldE9mZnNldChlbGVtZW50KS5sZWZ0IC0oIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVYIDogMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyXHJcbiAgICAgICAgcG9zaXRpb25Qb3BvdmVyKGVsZW1lbnQsIHBvcG92ZXIsIGFycm93LCBzdGVwKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSBzdGVwLnBsYWNlbWVudCA/IHN0ZXAucGxhY2VtZW50IDogJ2F1dG8nO1xyXG4gICAgICAgICAgICB2YXIgc3RyYXRlZ3kgPSBzdGVwLnN0cmF0ZWd5ID8gc3RlcC5zdHJhdGVneSA6ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XHJcbiAgICAgICAgICAgIGFycm93LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XHJcbiAgICAgICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XHJcbiAgICAgICAgICAgIGVsX3RvcCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLnRvcDsgXHJcbiAgICAgICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0OyBcclxuICAgICAgXHJcbiAgICAgICAgICAgIC8vaWYgcGxhY2VtZW50IGlzIG5vdCBkZWZpbmVkIG9yIGF1dG8gdGhlbiBjYWxjdWxhdGUgbG9jYXRpb25cclxuICAgICAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAnYXV0bycgfHwgcGxhY2VtZW50ID09ICdhdXRvLXN0YXJ0JyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tZW5kJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBwbGFjZW1lbnQucmVwbGFjZSgnYXV0bycsICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2Fycm93ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRvcFxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpID4gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3RvcCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0aGUgbGVmdFxyXG4gICAgICAgICAgICAgICAgaWYgKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHBvcG92ZXIub2Zmc2V0V2lkdGgpID4gdGhpcy53aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsX3RvcCA8ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfdG9wID4gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnbGVmdCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCBwb3BvdmVyLm9mZnNldFdpZHRoICYmIChlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPCB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF90b3AgPiAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdyaWdodCcgKyBuZXdfYXJyb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIGJvdHRvbVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsX3RvcCA8IChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpIHx8IGVsX3RvcCA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnYm90dG9tJyArIG5ld19hcnJvdztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2FkZCB0byBjbGFzcyBmb3IgY3NzXHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQocGxhY2VtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy90b3BcclxuICAgICAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpKSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLXN0YXJ0Jykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1lbmQnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9ib3R0b21cclxuICAgICAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIHBvcG92ZXIub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20tc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLWVuZCcpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9sZWZ0XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgLyAyKSAtICgoZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LXN0YXJ0Jykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSBlbF90b3AgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtZW5kJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3JpZ2h0XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCAvIDIpIC0gKChlbGVtZW50Lm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdC1zdGFydCcpIHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtZW5kJykge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaWYgcG9zaXRpb24gaXMgZml4ZWQgc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdmaXhlZCcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwibmVhcmVzdFwifSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc2l0aW9uT3ZlcmxheShlbGVtZW50LCBvdmVybGF5MSwgb3ZlcmxheTIsIG92ZXJsYXkzLCBvdmVybGF5NCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxyXG4gICAgICAgICAgICB2YXIgZWxfdG9wLCBlbF9sZWZ0O1xyXG4gICAgICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxyXG4gICAgICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBoaWdobGlnaHRfb2Zmc2V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldDtcclxuXHJcbiAgICAgICAgICAgIC8vb3ZlcmxheXMgdG9wLWxlZnRcclxuICAgICAgICAgICAgb3ZlcmxheTEuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICBvdmVybGF5MS5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICBvdmVybGF5MS5zdHlsZS53aWR0aCA9ICBlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCArICdweCc7XHJcbiAgICAgICAgICAgIG92ZXJsYXkxLnN0eWxlLmhlaWdodCA9ICAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgICAgIG92ZXJsYXkxLnN0eWxlLmxlZnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy9vdmVybGF5cyB0b3AtcmlnaHRcclxuICAgICAgICAgICAgb3ZlcmxheTIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICBvdmVybGF5Mi5zdHlsZS50b3AgPSAwO1xyXG4gICAgICAgICAgICBvdmVybGF5Mi5zdHlsZS5yaWdodCA9IDA7XHJcbiAgICAgICAgICAgIG92ZXJsYXkyLnN0eWxlLmhlaWdodCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgICAgIG92ZXJsYXkyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLXJpZ2h0XHJcbiAgICAgICAgICAgIG92ZXJsYXkzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgb3ZlcmxheTMuc3R5bGUudG9wID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICAgICAgb3ZlcmxheTMuc3R5bGUucmlnaHQgPSAwO1xyXG4gICAgICAgICAgICBvdmVybGF5My5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICBvdmVybGF5My5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgLy9vdmVybGF5cyBib3R0b20tbGVmdFxyXG4gICAgICAgICAgICBvdmVybGF5NC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgIG92ZXJsYXk0LnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcclxuICAgICAgICAgICAgb3ZlcmxheTQuc3R5bGUud2lkdGggPSAgIGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCAgKyAncHgnO1xyXG4gICAgICAgICAgICBvdmVybGF5NC5zdHlsZS5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICBvdmVybGF5NC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4iXSwibmFtZXMiOlsiV2ViVG91ciIsIm9wdGlvbnMiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwic3RlcHMiLCJzdGVwSW5kZXgiLCJpc1J1bm5pbmciLCJpc1BhdXNlZCIsImNvdW50ZXIiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uQ2xpY2siLCJiaW5kIiwib25SZXNpemUiLCJvbktleVVwIiwiZG9jdW1lbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5leHQiLCJwcmV2aW91cyIsInN0b3AiLCJldmVudCIsImtleUNvZGUiLCJjbGVhciIsInJlbmRlciIsIlBvcHBlciIsInN0YXJ0SW5kZXgiLCJwb3BvdmVyIiwicXVlcnlTZWxlY3RvciIsImxvYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJzdHlsZSIsInByZXBlbmQiLCJsZW5ndGgiLCJzdGVwIiwiZWxlbWVudCIsInBvc2l0aW9uIiwic3RlcF9oaWdobGlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJwb3BvdmVySW5uZXIiLCJhcnJvdyIsInRpdGxlIiwiY29udGVudCIsImJ0bk5leHQiLCJidG5CYWNrIiwicGxhY2VtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwidGV4dCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidGV4dENvbG9yIiwiYXBwZW5kIiwib3ZlcmxheTEiLCJvdmVybGF5MiIsIm92ZXJsYXkzIiwib3ZlcmxheTQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvblBvcG92ZXIiLCJwb3NpdGlvbk92ZXJsYXkiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJvdmVybGF5IiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwicmVtb3ZlIiwicG9wdXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInJlbW92ZUF0dHJpYnV0ZSIsImhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiZWwiLCJfeCIsIl95IiwiaXNOYU4iLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsIm9mZnNldFBhcmVudCIsImdldENvbXB1dGVkU3R5bGUiLCJtYXRyaXgiLCJET01NYXRyaXhSZWFkT25seSIsInRyYW5zZm9ybSIsInRyYW5zbGF0ZVgiLCJNYXRoIiwiYWJzIiwib2Zmc2V0V2lkdGgiLCJtNDEiLCJ0cmFuc2xhdGVZIiwib2Zmc2V0SGVpZ2h0IiwibTQyIiwiZ2V0T2Zmc2V0IiwiZ2V0VHJhbnNsYXRlWFkiLCJzdHJhdGVneSIsImVsX3RvcCIsImVsX2xlZnQiLCJnZXRFbGVtZW50UG9zaXRpb24iLCJyZXBsYWNlIiwidHJpbSIsIm5ld19hcnJvdyIsInNjcm9sbFRvIiwiaGlnaGxpZ2h0X29mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUJBO0VBQ2pCLHFCQUEwQjtFQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7RUFBQTs7RUFFMUIsU0FBS0EsT0FBTDtFQUNJQyxNQUFBQSxPQUFPLEVBQUUsSUFEYjtFQUVJQyxNQUFBQSxPQUFPLEVBQUUsR0FGYjtFQUdJQyxNQUFBQSxNQUFNLEVBQUUsRUFIWjtFQUlJQyxNQUFBQSxZQUFZLEVBQUUsQ0FKbEI7RUFLSUMsTUFBQUEsVUFBVSxFQUFFLElBTGhCO0VBTUlDLE1BQUFBLFNBQVMsRUFBRSxJQU5mO0VBT0lDLE1BQUFBLGVBQWUsRUFBRSxDQVByQjtFQVFJQyxNQUFBQSxRQUFRLEVBQUUsSUFSZDtFQVNJQyxNQUFBQSxLQUFLLEVBQUUsT0FUWDtFQVVJQyxNQUFBQSxNQUFNLEVBQUUsS0FWWjtFQVdJQyxNQUFBQSxXQUFXLEVBQUUsS0FYakI7RUFZSUMsTUFBQUEsTUFBTSxFQUFFO0VBQUEsZUFBTSxJQUFOO0VBQUEsT0FaWjtFQWFJQyxNQUFBQSxVQUFVLEVBQUU7RUFBQSxlQUFNLElBQU47RUFBQTtFQWJoQixPQWNPYixPQWRQO0VBaUJBLFNBQUtjLEtBQUwsR0FBWSxFQUFaO0VBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFqQjtFQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7RUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0VBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQWY7RUFFQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7RUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtFQUdBLFNBQUtDLE9BQUwsR0FB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
