import 'https://unpkg.com/wicked-elements@3.1.1/min.js';

const pool = new Map();

const Parax = class {
    constructor(el){
		this.el = el;
        pool.set(el, this);
        this.positionChange();
        let style = getComputedStyle(this.el);

		this.speed = parseFloat(style.getPropertyValue('--parax-speed'));

		//let direction = parseFloat(style.getPropertyValue('--parax-direction'));
		//if (isNaN(direction)) direction = 180;
		//this.angle = (direction + 90) / 180 * Math.PI;

        if (pool.size === 1) addGlobalListeners();
    }
    positionChange(){
		this.oRect = vpRectWithoutTransform(this.el);
		this.oRect.centerY = this.oRect.top + this.oRect.height/2;
    }
    onScroll(pageCenterY, pageCenterX){ // this has to be very fast, can it be improved?
		const centerDiff = pageCenterY - this.oRect.centerY;
		const yRoute = (this.speed-1) * -centerDiff;

		//const y = yRoute * Math.sin(this.angle);
		//const x = yRoute * Math.cos(this.angle);

		// todo, only transform if visible?
		//this.el.style.setProperty('transform', 'translate3d('+x+'px,'+y+'px,0)');
		this.el.style.setProperty('transform', 'translate3d('+0+'px,'+yRoute+'px,0)');
		//this.el.style.setProperty('--parax-y', yRoute);
    }
};


function calcViewportRects(e){
    pool.forEach(obj => obj.positionChange());
}
function onScroll(e){
    const pageCenterY = document.scrollingElement.scrollTop + winHeight/2;
    const pageCenterX = document.scrollingElement.scrollLeft + winWidth/2;
    requestAnimationFrame(()=>{
        pool.forEach(obj => obj.onScroll(pageCenterY, pageCenterX));
    });
}

function addGlobalListeners(){
	addEventListener('resize',calcViewportRects);
	addEventListener('DOMContentLoaded',calcViewportRects);
    addEventListener('load',calcViewportRects);
	addEventListener('resize', onScroll);
	addEventListener('load', onScroll);
	document.addEventListener('scroll', onScroll);
}
// function removeGlobalListeners(){
// 	removeEventListener('resize',calcViewportRects);
// 	removeEventListener('DOMContentLoaded',calcViewportRects);
//  removeEventListener('load',calcViewportRects);
// 	removeEventListener('resize', onScroll);
// 	removeEventListener('load', onScroll);
// 	document.removeEventListener('scroll', onScroll);
// }

// cache innerHeight, Is that of any use?
let winHeight = innerHeight;
let winWidth = innerWidth;
addEventListener('resize',(e)=>{
	winHeight = innerHeight;
	winWidth = innerWidth;
});


/* helpers */
function vpRectWithoutTransform(el){
    let rect = {
        left  : 0,
        top   : 0,
        width : el.offsetWidth,
        height: el.offsetHeight,
    }
    do {
        rect.left += el.offsetLeft;
        rect.top  += el.offsetTop;
        el = el.offsetParent;
    } while (el);
    return rect;
}

wickedElements.define(
    '[parax]', {
        init() {
            new Parax(this.element);
		},
        connected() {}, // todo
        disconnected() {}, // todo
        //observedAttributes: ['parax'], // todo
        //attributeChanged(name, oldValue, newValue) {}, // todo
    }
);
