(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["edit-exercise"],{"21a6":function(e,t,n){(function(n){var o,a,i;(function(n,s){a=[],o=s,i="function"===typeof o?o.apply(t,a):o,void 0===i||(e.exports=i)})(0,(function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function o(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){l(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function a(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function i(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(o){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var s="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,l=s.saveAs||("object"!=typeof window||window!==s?function(){}:"download"in HTMLAnchorElement.prototype?function(e,t,n){var l=s.URL||s.webkitURL,r=document.createElement("a");t=t||e.name||"download",r.download=t,r.rel="noopener","string"==typeof e?(r.href=e,r.origin===location.origin?i(r):a(r.href)?o(e,t,n):i(r,r.target="_blank")):(r.href=l.createObjectURL(e),setTimeout((function(){l.revokeObjectURL(r.href)}),4e4),setTimeout((function(){i(r)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,s){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,s),n);else if(a(e))o(e,n,s);else{var l=document.createElement("a");l.href=e,l.target="_blank",setTimeout((function(){i(l)}))}}:function(e,t,n,a){if(a=a||open("","_blank"),a&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return o(e,t,n);var i="application/octet-stream"===e.type,l=/constructor/i.test(s.HTMLElement)||s.safari,r=/CriOS\/[\d]+/.test(navigator.userAgent);if((r||i&&l)&&"object"==typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=r?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=e:location=e,a=null},c.readAsDataURL(e)}else{var u=s.URL||s.webkitURL,d=u.createObjectURL(e);a?a.location=d:location.href=d,a=null,setTimeout((function(){u.revokeObjectURL(d)}),4e4)}});s.saveAs=l.saveAs=l,e.exports=l}))}).call(this,n("c8ba"))},ad5e:function(e,t,n){},b1f0:function(e,t,n){"use strict";var o=n("ad5e"),a=n.n(o);a.a},e561:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"edit"},[n("div",{staticClass:"container"},[n("div",{staticClass:"menu"},[n("div",{staticClass:"menu-container"},[n("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[n("md-field",[n("label",[e._v("Elige actividad")]),n("md-file",{on:{"md-change":e.openExerciseFile},model:{value:e.taskFile,callback:function(t){e.taskFile=t},expression:"taskFile"}})],1),n("md-field",[n("label",[e._v("Nombre del fichero")]),n("md-input",{model:{value:e.taskFile,callback:function(t){e.taskFile=t},expression:"taskFile"}})],1),n("md-field",{staticStyle:{width:"75px"}},[n("label",{attrs:{for:"zona"}},[e._v("Zona")]),n("md-select",{attrs:{name:"zona",id:"zona"},model:{value:e.zone1,callback:function(t){e.zone1=t},expression:"zone1"}},[n("md-option",{attrs:{value:"red"}},[e._v("Roja")]),n("md-option",{attrs:{value:"green"}},[e._v("Verde")]),n("md-option",{attrs:{value:"blue"}},[e._v("Azul")]),n("md-option",{attrs:{value:"yellow"}},[e._v("Amarillo")])],1)],1),n("md-button",{staticClass:"md-fab",on:{click:function(t){return e.save(0)}}},[n("md-icon",[e._v("save")])],1)],1)])]),e.task?n("ExecutableCard",{attrs:{task:e.task,edition:!0,id:1}}):e._e()],1),n("div",{staticClass:"container"},[n("div",{staticClass:"menu"},[n("div",{staticClass:"menu-container"},[n("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[n("md-field",[n("label",[e._v("Elige la solución")]),n("md-file",{on:{"md-change":e.openSolutionFile},model:{value:e.taskSolutionFile,callback:function(t){e.taskSolutionFile=t},expression:"taskSolutionFile"}})],1),n("md-field",[n("label",[e._v("Nombre del fichero")]),n("md-input",{model:{value:e.taskSolutionFile,callback:function(t){e.taskSolutionFile=t},expression:"taskSolutionFile"}})],1),n("md-field",{staticStyle:{width:"75px"}},[n("label",{attrs:{for:"zona"}},[e._v("Zona")]),n("md-select",{attrs:{name:"zona",id:"zona"},model:{value:e.zone2,callback:function(t){e.zone2=t},expression:"zone2"}},[n("md-option",{attrs:{value:"red"}},[e._v("Roja")]),n("md-option",{attrs:{value:"green"}},[e._v("Verde")]),n("md-option",{attrs:{value:"blue"}},[e._v("Azul")]),n("md-option",{attrs:{value:"yellow"}},[e._v("Amarillo")])],1)],1),n("md-button",{staticClass:"md-fab",on:{click:function(t){return e.save(1)}}},[n("md-icon",[e._v("save")])],1)],1)])]),e.taskSolution?n("ExecutableCard",{attrs:{task:e.taskSolution,edition:!0,id:2}}):e._e()],1)])},a=[],i=(n("96cf"),n("1da1")),s=n("4b57"),l=n("21a6"),r={title:"Ejercicio titulo",subTitle:"Subtitulo del ejercicio",contentJavascript:"//Javascript \n",contentHtml:"\x3c!-- Html --\x3e \n<!DOCTYPE html> \n ",contentCss:"/*Css*/ \n"},c={components:{ExecutableCard:s["a"]},data:function(){return{task:r,taskSolution:r,taskFile:null,zone1:"red",zone2:"red",taskSolutionFile:null}},methods:{test:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.a();case 2:case"end":return t.stop()}}),t)})))()},openExerciseFile:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.taskFile=e[0],n.t0=JSON,n.next=4,e[0].text();case 4:n.t1=n.sent,t.task=n.t0.parse.call(n.t0,n.t1);case 6:case"end":return n.stop()}}),n)})))()},openSolutionFile:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.taskSolutionFile=e[0],n.t0=JSON,n.next=4,e[0].text();case 4:n.t1=n.sent,t.taskSolution=n.t0.parse.call(n.t0,n.t1);case 6:case"end":return n.stop()}}),n)})))()},save:function(e){0===e?this.task.zone=this.zone1:this.taskSolution.zone=this.zone2;var t=new Blob([0===e?JSON.stringify(this.task):JSON.stringify(this.taskSolution)],{type:"text/plain;charset=utf-8"}),n=0===e?this.taskFile:this.taskSolutionFile;l.saveAs(t,n)}}},u=c,d=(n("b1f0"),n("2877")),f=Object(d["a"])(u,o,a,!1,null,"e8d83642",null);t["default"]=f.exports}}]);
//# sourceMappingURL=edit-exercise.b08e3a6c.js.map