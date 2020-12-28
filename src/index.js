export default class WebTour {    
    constructor(options = {}) {
        if (!!this.constructor.instance) {
            return this.constructor.instance;
        }

        this.constructor.instance = this;

        this.options = {
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
            onNext: () => null,
            onPrevious: () => null,
            ...options,
        }

        this.steps = [];
        this.stepIndex = 0;
        this.isRunning = false;
        this.isPaused = false;

        //elements
        this.window = window;
        this.document = document;

        //events
        this.onClick = this.onClick.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        
        this.bind();

        return this;

    }

    bind() {
        if (!('ontouchstart' in this.document.documentElement)) {
            this.window.addEventListener('click', this.onClick, false);
        } else {
            this.window.addEventListener('touchstart', this.onClick, false);
        }

        this.window.addEventListener('resize', this.onResize, false);
        this.window.addEventListener('keyup', this.onKeyUp, false);
    }

    onClick(e) {
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
            //if allowClose = true close when backdrop is click
            if (this.options.allowClose) {
                this.stop();
            }
        }
    }

    onKeyUp(event) {
        if (!this.isRunning || !this.options.keyboard) {
            return;
        }

        if (event.keyCode === 27 && this.options.allowClose) {
            this.stop();
            return;
        }

        //right key for next
        if (event.keyCode === 39) {
            this.onNext();
            this.next();
        }
            //left key for back
        else if (event.keyCode === 37 ) {
            this.onPrevious();
            this.previous();
        }
    }

    //page is resize update popover
    onResize() {
        if (!this.isRunning) {
            return;
        }

        this.clear();
        this.render(this.steps[this.stepIndex]);
    }

    //set web tour steps
    setSteps(steps) {
        this.steps = null;
        this.steps = steps;
    }


    getSteps() {
        return this.steps;
    }

    highlight(element, step = null){
        this.isRunning = true;
        var element = this.document.querySelector(element);
        if (element){
            if (step){
                this.steps = null;
                this.stepIndex = 0;
                this.steps = step;
                this.render(this.steps[this.stepIndex]);
            }else{
                this.createOverlay(element, step);
            }
        }        
    }

    //start the web tour
    start(startIndex = 0) {
        this.isRunning = true;
        this.stepIndex = startIndex;
        this.render(this.steps[this.stepIndex]);
    }

    stop() {
        this.clear();
        this.isRunning = false;
    }

    //show loader progress
    showLoader() {
        const popover = this.document.querySelector('.wt-popover');
        const loader = this.document.createElement('div');
        loader.classList.add('wt-loader');
        loader.style.zIndex = this.options.zIndex + 10;
        popover.prepend(loader);
    }

    moveNext() {
        this.isPaused = false;
        this.next();
    }

    movePrevious() {
        this.isPaused = false;
        this.previous();
    }

    onNext(){
        if (this.isPaused) return;
        //execute onNext function()
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
    }

    onPrevious(){
        if (this.isPaused) return;
        //execute onBack function()
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onPrevious) this.steps[this.stepIndex].onPrevious();
    }

    /**go to next step */
    next() {
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

    previous() {
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

    //add the popover to document
    render(step) {
        var element = step.element ? this.document.querySelector(step.element) : null;

        //check if element is present if not make it floating
        if (element) {
            element.style.position = !element.style.position ? 'relative' : element.style.position;
            const step_highlight = !step.highlight ? true : step.highlight;                
            //highlight is set to true
            if (this.options.highlight && step_highlight ) {
                element.setAttribute('wt-highlight', 'true');
            }
        }

        //popover
        const popover = this.document.createElement('div');        
        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;
        if (step.placement) popover.classList.add(step.placement); //add user define placement to class for position in css

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

        //popover inner container
        const popoverInner = this.document.createElement('div');
        popoverInner.classList.add('wt-popover-inner');
       
        //title
        const title = this.document.createElement('div');
        title.classList.add('wt-title');
        if (step.title) popoverInner.append(title);
        if (step.title) title.innerText = step.title;

        //content
        const content = this.document.createElement('div');
        content.classList.add('wt-content');
        popoverInner.append(content);
        content.innerHTML = (step.content ? step.content : '');
        
        //buttons
        const showBtns = (step.showBtns == null || step.showBtns == 'undefined') ? true : Boolean(step.showBtns);

        if (showBtns){
            const btnNext = this.document.createElement('button');
            const btnBack = this.document.createElement('button');

            btnNext.classList.add('wt-btns', 'wt-btn-next');
            btnBack.classList.add('wt-btns', 'wt-btn-back');

            btnNext.innerHTML = (step.btnNext && step.btnNext.text ? step.btnNext.text : (this.stepIndex == this.steps.length - 1 ? 'Done' : 'Next &#8594;'));
            btnBack.innerHTML = (step.btnBack && step.btnBack.text ? step.btnBack.text : (this.stepIndex == 0 ? 'Close' : '	&#8592; Back'));

            //add styles
            btnNext.style.backgroundColor = (step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9');
            btnNext.style.color = (step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff');

            btnBack.style.backgroundColor = (step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;');
            btnBack.style.color = (step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555');
            popoverInner.append(btnNext);
            popoverInner.append(btnBack);
        }

        //popover arrow
        const arrow = this.document.createElement('div');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        popover.append(arrow);

        //popover inner container
        popover.append(popoverInner);

        //append popover to body
        this.document.body.appendChild(popover);

        if (element) {
            this.positionPopover(element, popover, arrow, step);
            if (this.options.highlight){
                this.createOverlay(element, step);
            }            
        }
        /**
        * No element is define
        * Make popover floating (position center)
        */
        else {                
            popover.classList.add('wt-slides');
            popover.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

            if (this.options.highlight){
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

        //add option to remove arrow because popper arrows are not positioning well
        //TODO: fix popper arrow
        if (this.options.removeArrow){
            arrow.remove();
        }

    }

    //remove popover
    clear() {
        var popup = this.document.querySelector('.wt-popover');
        var loader = this.document.querySelector('.wt-loader');

        if (popup) popup.remove();
        if (loader) loader.remove();

        this.document.querySelectorAll('.wt-overlay').forEach((element) => {
            element.remove();
        })

        this.document.querySelectorAll('*[wt-highlight]').forEach((element) => {
            element.removeAttribute('wt-highlight');
        })
    }

    getWindowOffset(){
        return {
            height: this.window.innerHeight - (this.window.innerHeight - this.document.documentElement.clientHeight),
            width: this.window.innerWidth - (this.window.innerWidth - this.document.documentElement.clientWidth),
        }
    }

    getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    //get css transform property to fixed issues with transform elements
    getTranslateXY(element) {
        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)

        return {
            translateX:  Math.abs(element.offsetWidth * (matrix.m41 / 100)),
            translateY:  Math.abs(element.offsetHeight * (matrix.m42 / 100))
        }
    }

    getElementPosition(element){
        return {
            top: this.getOffset(element).top - (element.style.transform ? this.getTranslateXY(element).translateY : 0),
            left: this.getOffset(element).left -( element.style.transform ? this.getTranslateXY(element).translateX : 0)
        }
    }

    //position popover
    positionPopover(element, popover, arrow, step) {
        var placement = step.placement || 'auto';
        var strategy = step.strategy || 'absolute';

        popover.style.position = strategy;
        arrow.style.position = 'absolute';

        //element top & left
        var el_top, el_left;
        el_top = this.getElementPosition(element).top; 
        el_left = this.getElementPosition(element).left; 
    
        //if placement is not defined or auto then calculate location
        if (placement == 'auto' || placement == 'auto-start' || placement == 'auto-end') {
            const arrow = placement.replace('auto', '').trim();
            var new_arrow = '';

            //element is position to the bottom of the screen
            //position popover to top
            if (el_top + (popover.offsetHeight + this.options.offset) > this.window.innerHeight - 100) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (el_left < (this.window.innerWidth / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                    //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (el_left > (this.window.innerWidth - (this.window.innerWidth / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-end';
                }
                placement = 'top' + new_arrow;
            }

            //element is position to the right side of the screen
            //position popover to the left
            if ((el_left + element.offsetWidth + popover.offsetWidth) > this.window.innerWidth) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (el_top < (this.window.innerHeight / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                    //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (el_top > (this.window.innerHeight - (this.window.innerHeight / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                placement = 'left' + new_arrow;
            }

            //element is position to the left side of the screen
            //position popover to the right
            if (el_left < popover.offsetWidth && (element.offsetWidth + popover.offsetWidth) < this.window.innerWidth) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (el_top < (this.window.innerHeight / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                    //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (el_top > (this.window.innerHeight - (this.window.innerHeight / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                placement = 'right' + new_arrow;
            }

            //element is position to the top of the screen
            //position popover to bottom
            if (el_top < (popover.offsetHeight + this.options.offset) || el_top < 100) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (el_left < (this.window.innerWidth / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                    //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (el_left > (this.window.innerWidth - (this.window.innerWidth / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-end';
                }
                placement = 'bottom' + new_arrow;
            }

            //add to class for css
            popover.classList.add(placement);
        }

        //top
        if (placement == 'top') {
            popover.style.top = (el_top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = (el_left + ((element.offsetWidth / 2) - (popover.offsetWidth / 2))) + 'px';
        } else if (placement == 'top-start') {
            popover.style.top = (el_top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'top-end') {
            popover.style.top = (el_top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = ((el_left + element.offsetWidth + this.options.highlightOffset) - popover.offsetWidth) + 'px';
        }

            //bottom
        else if (placement == 'bottom') {
            popover.style.top = (el_top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = (el_left + (element.offsetWidth / 2) - popover.offsetWidth / 2) + 'px';
        } else if (placement == 'bottom-start') {
            popover.style.top = (el_top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = (el_left - this.options.highlightOffset) + 'px';
        } else if (placement == 'bottom-end') {
            popover.style.top = (el_top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = ((el_left + element.offsetWidth + this.options.highlightOffset) - popover.offsetWidth) + 'px';
        }

            //left
        else if (placement == 'right') {
            popover.style.top = (el_top + (Math.abs(popover.offsetHeight - element.offsetHeight) / 2)) + 'px';
            popover.style.left = (el_left + (element.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'right-start') {
            popover.style.top = el_top - this.options.highlightOffset + 'px';
            popover.style.left = (el_left + (element.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'right-end') {
            popover.style.top = ((el_top + element.offsetHeight) - popover.offsetHeight) + this.options.highlightOffset + 'px';
            popover.style.left = (el_left + (element.offsetWidth + this.options.offset)) + 'px';
        }

        //right
        else if (placement == 'left') {
            popover.style.top = (el_top + (Math.abs(popover.offsetHeight - element.offsetHeight) / 2)) + 'px';
            popover.style.left = (el_left - (popover.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'left-start') {
            popover.style.top = el_top - this.options.highlightOffset + 'px';
            popover.style.left = (el_left - (popover.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'left-end') {
            popover.style.top = ((el_top + element.offsetHeight) - popover.offsetHeight) + this.options.highlightOffset + 'px';
            popover.style.left = (el_left - (popover.offsetWidth + this.options.offset)) + 'px';
        }

        //if position is fixed scroll to top
        if (strategy === 'fixed'){
            this.window.scrollTo(0, 0);
        }else{
            popover.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }            
    }

    createOverlay(element, step = null){
        var strategy = (step && step.strategy) ? step.strategy : 'absolute';

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
    
        //append to body
        this.document.body.appendChild(overlay1);
        this.document.body.appendChild(overlay2);
        this.document.body.appendChild(overlay3);
        this.document.body.appendChild(overlay4);

        //element top & left
        var el_top, el_left;
        el_top = this.getElementPosition(element).top; 
        el_left = this.getElementPosition(element).left;
        
        var highlight_offset = this.options.highlightOffset;

        //overlays top-left
        overlay1.style.position = strategy;
        overlay1.style.top = 0;
        overlay1.style.width =  el_left - highlight_offset + 'px';
        overlay1.style.height =  (el_top + element.offsetHeight + highlight_offset) + 'px';
        overlay1.style.left = 0;

        //overlays top-right
        overlay2.style.position = strategy;
        overlay2.style.top = 0;
        overlay2.style.right = 0;
        overlay2.style.height = (el_top - highlight_offset) + 'px';
        overlay2.style.left = (el_left - highlight_offset) + 'px';

        //overlays bottom-right
        overlay3.style.position = strategy;
        overlay3.style.top = (el_top - highlight_offset) + 'px';
        overlay3.style.right = 0;
        overlay3.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay3.style.left = (el_left + element.offsetWidth + highlight_offset) + 'px';

        //overlays bottom-left
        overlay4.style.position = strategy;
        overlay4.style.top = (el_top + element.offsetHeight + highlight_offset) + 'px';
        overlay4.style.width =   el_left + element.offsetWidth + highlight_offset  + 'px';
        overlay4.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay4.style.left = 0;
    }

}
