!function(){"use strict";var e={n:function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(t,{a:t}),t},d:function(r,t){for(var n in t)e.o(t,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:t[n]})},o:function(e,r){return Object.prototype.hasOwnProperty.call(e,r)}},r=window.wp.domReady;e.n(r)()((()=>{const e=document.getElementsByClassName("otter-masonry");Array.from(e).forEach((e=>{const r=e.querySelector(".wp-block-gallery"),t=/columns-(\d)/,n=Number(e.dataset.margin)||0;let o=Array.from(r.classList).find((e=>{if(null!==t.exec(e))return!0}));o=t.exec(o),o=o?Number(o[1]):3,r.removeAttribute("class"),window.Macy({container:e.querySelector(".blocks-gallery-grid"),trueOrder:!1,waitForImages:!1,margin:n,columns:o})}))}))}();