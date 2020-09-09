// lib


const pool = new Map();

window.Parax = class {
    constructor(el){
        this.el = el;
        pool.set(el, this);
        this.positionChange();
        let style = getComputedStyle(this.el);
        this.speed = style.getPropertyValue('--parax-speed') || .5;
        if (pool.size === 1) addGlobalListeners();
    }
    positionChange(){
        this.oRect = vpRectWithoutTransform(this.el);
    }
    onScroll(top, left){
        const moveBy = (this.speed - 1) * -top;
        this.el.style.setProperty('transform', 'translate3d(0, '+moveBy+'px, 0)');
    }
};


function calcViewportRects(e){
    pool.forEach(obj => obj.positionChange());
}
function onScroll(e){
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollLeft = document.scrollingElement.scrollTop;
    requestAnimationFrame(()=>{
            pool.forEach(obj => obj.onScroll(scrollTop, scrollLeft));
    });
}

function addGlobalListeners(){
	addEventListener('resize',calcViewportRects);
	addEventListener('DOMContentLoaded',calcViewportRects);
    addEventListener('load',calcViewportRects);
	document.addEventListener('scroll', onScroll);
	addEventListener('resize', onScroll);
	addEventListener('load', onScroll);
}
/*
function removeGlobalListeners(){
	removeEventListener('resize',calcViewportRects);
	removeEventListener('DOMContentLoaded',calcViewportRects);
    removeEventListener('load',calcViewportRects);
	document.removeEventListener('scroll', onScroll);
	removeEventListener('resize', onScroll);
	removeEventListener('load', onScroll);
}
*/

/*
// cache innerHeight, bringt das was?
let winHeight = innerHeight;
let winWidth = innerWidth;
addEventListener('resize',(e)=>{
	winHeight = innerHeight;
	winWidth = innerWidth;
});

window.parax = function(el, offset){
	this.viewport = el;
	//this.content = el.c1Find('> .-content');
	this.content = el.querySelector(':scope > .-content');
	this.offset = offset;
	this.content.style.top    = - offset / 2 + 'px';
	this.content.style.bottom = - offset / 2 + 'px';

	//this.content.style.transition = 'transform 10ms linear'; // performs very bad in edge / ie

	var self = this;

	// cached position
	function calcViewportRect(){
		var rect = el.getBoundingClientRect();
		self.cachedViewportRect = {
			top: rect.top + pageYOffset,
			height: rect.height,
		};
	}
	calcViewportRect();
	addEventListener('resize',calcViewportRect);
	addEventListener('DOMContentLoaded',calcViewportRect);
	addEventListener('load',calcViewportRect);

	// positionize
	function positionize(e){
		// if (!self.viewport.offsetParent) { ... } // disconnected from the dom // todo: takes long!
		self.positionize(e);
	}
	positionize();
	document.addEventListener('scroll', positionize);
	addEventListener('resize', positionize);
	addEventListener('load', positionize);
	this.content.addEventListener('load',positionize);

}
parax.prototype = {
	positionize:function(e){
		var part = this.partVisible(e);
		//if (part < -0.1 || part > 1.1) return;
		var faktor = (part - .5)*2; // -1 bis 1;
		var value = faktor*(this.offset/2);
		//value = Math.round( value * 10) / 10;
		value = Math.round(value);
		var content = this.content;
		requestAnimationFrame(function(){
			content.style.transform = 'translate3d(0, '+value+'px, 0)';
		});
	},
	partVisible: function(e){
		var pageY = e && e.pageY ? e.pageY : pageYOffset; // firefox
		var rect = this.cachedViewportRect;
		var totalPixels = winHeight + rect.height;
		var activePixel = winHeight - (rect.top - pageY);
		return activePixel / totalPixels; // 0 = element under the bottom, 1 = element above the top
	}
}
*/

/*
c1.onElement('[parax]', function(el){
	var wrapper = el.c1Find('> .-viewport');
	if (!wrapper) return;
	new parax(wrapper, 360)
});
*/



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


/*
c1.onElement('[parax]', {
    immediate: el=>{
        new parax(el);
    }
})
*/

self.wickedElements=function(e){"use strict";var t="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},n=function(e){return"querySelectorAll"in e},r=[].filter,i=Object.create,o=Object.keys,u=new WeakMap,a=new Set,l=[],c={},s={},f=function(e,t){for(var n=u.get(t),r=0,i=e.length;r<i;r++){var o=e[r],a=o.target,l=o.attributeName,c=o.oldValue,s=a.getAttribute(l);n.attributeChanged(l,c,s)}},d=function(e){var t=new WeakMap,i=function(t){var i=e.query;if(i.length)for(var u=0,a=t.length;u<a;u++)o(r.call(t[u].addedNodes,n),!0,i),o(r.call(t[u].removedNodes,n),!1,i)},o=function n(r,i,o){for(var a,l,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Set,s=function(s,f,d,h){if(!c.has(f=r[d])){if(c.add(f),i)for(var v,g=u(f),b=0,p=o.length;b<p;b++)g.call(f,v=o[b])&&(t.has(f)||t.set(f,new Set),(s=t.get(f)).has(v)||(s.add(v),e.handle(f,i,v)));else t.has(f)&&(s=t.get(f),t.delete(f),s.forEach((function(t){e.handle(f,i,t)})));n(f.querySelectorAll(o),i,o,c)}a=s,l=f},f=0,d=r.length;f<d;f++)s(a,l,f)},u=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector},a=function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];o(t,n,e.query)},l=new MutationObserver(i),c=e.root||document,s=e.query;return l.observe(c,{childList:!0,subtree:!0}),s.length&&a(c.querySelectorAll(s)),{drop:function(e){for(var n=0,r=e.length;n<r;n++)t.delete(e[n])},flush:function(){i(l.takeRecords())},observer:l,parse:a}}({query:l,handle:function(e,t,n){var r=c[n],o=r.m,a=r.l,l=r.o,s=o.get(e)||function(e,t,n,r){for(var o=i(r,{element:{enumerable:!0,value:e}}),a=0,l=n.length;a<l;a++)e.addEventListener(n[a].t,o,n[a].o);t.set(e,o),o.init&&o.init();var c=r.observedAttributes;if(c){var s=new MutationObserver(f);s.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:c.map((function(t){return e.hasAttribute(t)&&o.attributeChanged(t,null,e.getAttribute(t)),t}))}),u.set(s,o)}return o}(e,o,a,l),d=t?"connected":"disconnected";d in s&&s[d]()}}),h=d.drop,v=d.flush,g=d.parse,b=function(e,t){if(-1<l.indexOf(e))throw new Error("duplicated: "+e);v();for(var n=[],r=i(null),u=o(t),f=0,d=u.length;f<d;f++){var h=u[f];if(/^on/.test(h)&&!/Options$/.test(h)){var b=t[h+"Options"]||!1,m=h.toLowerCase(),w=m.slice(2);n.push({t:w,o:b}),r[w]=h,m!==h&&(w=h.slice(2,3).toLowerCase()+h.slice(3),r[w]=h,n.push({t:w,o:b}))}}n.length&&(t.handleEvent=function(e){this[r[e.type]](e)}),l.push(e),c[e]={m:new WeakMap,l:n,o:t},g(document.querySelectorAll(e)),p(e),a.has(e)||s[e]._()},p=function(e){if(!(e in s)){var n,r=new t((function(e){n=e}));s[e]={_:n,$:r}}return s[e].$};return e.define=b,e.defineAsync=function(e,t,n){a.add(e),b(e,{init:function(){a.has(e)&&(a.delete(e),t().then((function(t){var r=t.default;l.splice(l.indexOf(e),1),h(document.querySelectorAll(e)),(n||b)(e,r)})))}})},e.get=function(e){return(c[e]||u).o},e.upgrade=function(e){l.length&&(v(),g([e]))},e.whenDefined=p,e}({});


wickedElements.define(
    '[parax]', {
        init() {
            this.parax = new Parax(this.element);
        },
        //connected() {}, // todo
        //disconnected() {}, // todo
        //observedAttributes: ['parax'], // todo
        //attributeChanged(name, oldValue, newValue) {}, // todo
    }
);