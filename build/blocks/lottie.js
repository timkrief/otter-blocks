!function(){"use strict";var t={n:function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,{a:o}),o},d:function(e,o){for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}},e=window.wp.domReady;t.n(e)()((()=>{const t=document.querySelectorAll(".wp-block-themeisle-blocks-lottie"),e=t=>{"false"===t.dataset.loop&&(t.setLooping(!1),-1===t.__direction&&t.seek("100%")),-1===t.__direction&&"true"===t.dataset.loop&&(t.setLooping(!0),Boolean(t.__count)&&t.addEventListener("frame",(e=>{e.target.getLottie().playCount===t.__count&&e.target.getLottie().currentFrame&&t.stop()})))};t.forEach((t=>{t.addEventListener("load",(()=>{const o=t.getAttribute("trigger");return"scroll"===o?window.LottieInteractivity.create({mode:"scroll",player:`#${t.id}`,actions:[{visibility:[0,1],type:"seek",frames:[0,t.getLottie().totalFrames]}]}):"hover"===o?(t.addEventListener("mouseover",(()=>{t.play()})),t.addEventListener("mouseout",(()=>{t.stop()})),e(t),t.stop()):"click"===o?(t.addEventListener("click",(()=>{t.play()})),t.addEventListener("complete",(()=>t.stop())),e(t),t.stop()):e(t)})),t.getAttribute("width")&&(t.style.width=`${t.getAttribute("width")}px`,t.style.height="auto")}))}))}();