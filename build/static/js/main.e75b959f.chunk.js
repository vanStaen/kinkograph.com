(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),c=n(4),m=n.n(c),l=(n(9),n(2)),s=(n(10),n(0)),d=function(e){var t=Object(a.useState)(1),n=Object(l.a)(t,2),i=n[0],c=n[1],m=Object(a.useCallback)((function(t){t.preventDefault();var n=t.key.toLowerCase();if("backspace"===n)i>1&&(document.getElementById(i-1).value="",c(i-1));else if(n.length>1);else if(document.getElementById(i).value=n,c(i+1),i+1===7){c(1);var a=document.getElementById(1).value+document.getElementById(2).value+document.getElementById(3).value+document.getElementById(4).value+document.getElementById(5).value+document.getElementById(6).value;setTimeout((function(){document.getElementById(1).focus(),document.getElementById(1).value="",document.getElementById(2).value="",document.getElementById(3).value="",document.getElementById(4).value="",document.getElementById(5).value="",document.getElementById(6).value="",c(1),e.login(a)}),500)}})),d=function(e){var t=parseInt(e.target.id,10),n=i;""===document.getElementById(1).value?c(n=1):""===document.getElementById(2).value?c(n=2):""===document.getElementById(3).value?c(n=3):""===document.getElementById(4).value?c(n=4):""===document.getElementById(5).value?c(n=5):""===document.getElementById(6).value&&c(n=6),document.getElementById(t).blur(),document.getElementById(n).focus()};return Object(a.useEffect)((function(){return document.addEventListener("keydown",m),function(){document.removeEventListener("keydown",m)}}),[m]),Object(s.jsx)("div",{children:Object(s.jsxs)("form",{children:[Object(s.jsx)("input",{id:"1",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",style:{marginLeft:"20px"},autoComplete:"new-password"}),Object(s.jsx)("input",{id:"2",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:d,autoComplete:"new-password"}),Object(s.jsx)("input",{id:"3",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:d,autoComplete:"new-password"}),Object(s.jsx)("input",{id:"4",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:d,autoComplete:"new-password"}),Object(s.jsx)("input",{id:"5",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:d,autoComplete:"new-password"}),Object(s.jsx)("input",{id:"6",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:d,style:{width:"40px"},autoComplete:"new-password"})]})})},u=(n(12),function(){return Object(s.jsxs)("div",{className:"grid",children:[Object(s.jsx)("div",{className:"item item__landscape",children:"item__landscape"}),Object(s.jsx)("div",{className:"item item__square",children:"item__square"}),Object(s.jsx)("div",{className:"item item__portrait",children:"item__portrait"}),Object(s.jsx)("div",{className:"item item__landscape",children:"item__landscape"}),Object(s.jsx)("div",{className:"item item__square",children:"item__square"}),Object(s.jsx)("div",{className:"item item__portrait",children:"item__portrait"}),Object(s.jsx)("div",{className:"item item__landscape",children:"item__landscape"}),Object(s.jsx)("div",{className:"item item__square",children:"item__square"}),Object(s.jsx)("div",{className:"item item__portrait",children:"item__portrait"}),Object(s.jsx)("div",{className:"item item__landscape",children:"item__landscape"}),Object(s.jsx)("div",{className:"item item__square",children:"item__square"}),Object(s.jsx)("div",{className:"item item__portrait",children:"item__portrait"})]})}),o=(n(13),function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],i=t[1];return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)("div",{className:"App__main",children:n?Object(s.jsx)(u,{}):Object(s.jsxs)("div",{className:"App__flex",children:[Object(s.jsx)("div",{className:"spacer"}),Object(s.jsx)("div",{className:"App__title",children:"\xa0kinkograph"}),Object(s.jsx)(d,{login:function(e){"555666"===e&&i(!0)}})]})})})}),r=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,m=t.getTTFB;n(e),a(e),i(e),c(e),m(e)}))};m.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(o,{})}),document.getElementById("root")),r()}],[[14,1,2]]]);
//# sourceMappingURL=main.e75b959f.chunk.js.map