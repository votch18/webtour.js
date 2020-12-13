# WebTour JS

A light-weight user's step-by-step guide for your website using Vanilla JS. 

> ## Features
>
> - **User's walkthrough** - can be used to guide user's to your website using modals and popovers.
> - **Slideshow** - webtour can be used as slideshow within your website.
> - **Highlight element** - can highlight specific element on the page without modifying the element position and style.
> - **Dynamic element** - can target dynamically created element.
> - **Auto scroll** - scroll automatically to popover's position.
> - **Keyboard control** - allows control using next, back and esc keys.
> - **Update position on resize**

## How does WebTour highlight works?

WebTour highlight works by adding overlay to the page except for the highlighted element. It is basically an overlay with a hole showing the element that is highlighted. WebTour can highlight even on modals.

## Installation

Include the files from `dist` directory.
```html
<link rel="stylesheet" href="/dist/webtour.min.css">
<script src="/dist/webtour.min.js"></script>
```

## Basic usage and [Demo](https://votch18.github.io/webtour.js/)

### Highlight an element

```javascript
const wt = new WebTour();
wt.highlight('#target');
```

### Step-by-step guide

```javascript
const wt = new WebTour();
const steps = [
    {
        element: '#step_1',            //target element (if not defined then the popover will act like a modal at the center of the screen)
        title: 'Popover title',         //this is option if you don't want to add title
        content: 'Popover content',     //can be string or html string
        placement: 'right-start',       //top, top-start, top-end, left, left-start, left-end, right, right-start, right-end, bottom, bottom-start, bottom-end
    },
    ...
];

wt.setSteps(steps);
wt.start();
```

### Actions

WebTour has onNext and onPrevious actions.

```javascript
const wt = new WebTour();
const steps = [
    {
        element: '#step_1',           
        title: 'Popover title',        
        content: 'Popover content',     
        placement: 'left-start',     
        onNext: function () {  //or ()=> {}
            //perform actions here
        },
        onPrevious: function () {
            //undo actions here
        }
    },    
    {
        element: '#step_2',           
        title: 'Popover title',        
        content: 'Popover content',     
        placement: 'right-start',     
        onNext: function () { 
            //for dynamic elements - pause and resume onNext action
            wt.isPaused = true;                 //pause tour
            wt.showLoader();                    //display a loader

            //perform actions here
            document.querySelector('#button').click();

            //wait for the dynamic element 
            const isPresent = setInterval(function(){
                const nextTarget = document.querySelector('#step_3');
                if (nextTarget){
                    clearInterval(isPresent);   //important to prevent your tour to not iterate until end
                    wt.moveNext();              //go to next step - equivalent to  wt.isPuased = false; wt.next();
                }
            }, 100)
        },

        //dynamically created target element
         {
            element: '#step_3',           
            title: 'Popover title',        
            content: 'Popover content',     
            placement: 'left-start',    
        },
    },
    ...
];

wt.setSteps(steps);
wt.start();
```

### Options

```javascript
const wt = new WebTour({
    offset: 20,             //distance from popover to target element
    borderRadius: 3,        //popover border radius
    allowClose: true,       //close on click outside
    highlight: true,        //show overlay
    highlightOffset: 5,     //overlay offset from target element
    keyboard: true,         //enable/disable keyboard controll
    width: '300px',         //specify popover's width
    zIndex: 10050,          //specify z-index 
    removeArrow: false,     //show/hide popover arrow
});
```

### Functions

```javascript
wt.start(startIndex = 0)    //start the tour
wt.setSteps(steps)          //requires array of step object { element, title, content, placement } - provide one option
wt.render(step);            //requires step object { element, title, content, placement } - provide one option
wt.next();                  //trigger next action
wt.previous();              //trigger previous
wt.moveNext();              //resume tour and move next
wt.movePrevious();          //resume tour and move previous
```

## About

This library is created out of frustration of using existing user's walkthrough library that does not support dynamic element targeting. 

## TODO:

- **Floating popover positioning** *(top-center, top-start, top-end, middle-center (default), midle-left, middle-right, bottom-left, bottom-center, bottom-end)*
- Add option to hide buttons
- Add option close button
- Add hints









