(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{110:function(e,t,n){},111:function(e,t,n){},113:function(e,t,n){},114:function(e,t,n){},132:function(e,t,n){},133:function(e,t,n){},135:function(e,t,n){},136:function(e,t,n){},137:function(e,t,n){},141:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(23),s=n.n(c),i=(n(110),n(20)),o=n(97),u=n(21),l=(n(111),n(2)),d=function(e){var t=Object(r.useState)(1),n=Object(i.a)(t,2),a=n[0],c=n[1],s=Object(r.useCallback)((function(t){t.preventDefault();var n=t.key.toLowerCase();if("backspace"===n)a>1&&(document.getElementById(a-1).value="",c(a-1));else if(n.length>1);else if(document.getElementById(a).value=n,c(a+1),a+1===7){c(1);var r=document.getElementById(1).value+document.getElementById(2).value+document.getElementById(3).value+document.getElementById(4).value+document.getElementById(5).value+document.getElementById(6).value;setTimeout((function(){document.getElementById(1).focus(),document.getElementById(1).value="",document.getElementById(2).value="",document.getElementById(3).value="",document.getElementById(4).value="",document.getElementById(5).value="",document.getElementById(6).value="",c(1),e.login(r)}),500)}}),[e,a]),o=function(e){var t=parseInt(e.target.id,10),n=a;""===document.getElementById(1).value?c(n=1):""===document.getElementById(2).value?c(n=2):""===document.getElementById(3).value?c(n=3):""===document.getElementById(4).value?c(n=4):""===document.getElementById(5).value?c(n=5):""===document.getElementById(6).value&&c(n=6),document.getElementById(t).blur(),document.getElementById(n).focus()};return Object(r.useEffect)((function(){return document.addEventListener("keydown",s),function(){document.removeEventListener("keydown",s)}}),[s]),Object(l.jsx)("div",{children:Object(l.jsxs)("form",{children:[Object(l.jsx)("input",{id:"1",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",style:{marginLeft:"20px"},autoComplete:"new-password"}),Object(l.jsx)("input",{id:"2",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"3",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"4",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"5",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"6",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,style:{width:"40px"},autoComplete:"new-password"})]})})},p=n(6),f=n.n(p),b=n(13),j=n(74),h=n(73),m=n(60),v=n(9),x=new function e(){var t=this;Object(m.a)(this,e),this.showOverlay=!1,this.allPictures=[],this.selected=null,this.setShowOverlay=function(e){t.showOverlay=e},this.changeSelected=function(e){var n=t.selected,r=t.allPictures.length-1;e?n===r?console.log("Last one of the batch"):t.selected=n+1:0===n?console.log("First one of the batch"):t.selected=n-1},this.setSelected=function(){var e=Object(b.a)(f.a.mark((function e(n){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.allPictures.findIndex((function(e){return e.id===n.id}));case 2:r=e.sent,t.selected=r;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setAllPictures=function(e){t.allPictures=e},Object(v.m)(this,{showOverlay:v.n,selected:v.n,allPictures:v.n,setShowOverlay:v.f,setSelected:v.f,setAllPictures:v.f,changeSelected:v.f})},O=n(145),g=(n(113),function(e){var t=function(t){var n=document.getElementById("tag_".concat(e.picture.id)),r=document.getElementById("pic_".concat(e.picture.id));t?(n.style.visibility="visible",n.style.opacity=1,r.style.filter="brightness(50%) grayscale(1)"):(n.style.visibility="hidden",n.style.opacity=0,r.style.filter="brightness(100%) grayscale(0)")};return Object(l.jsx)(r.Fragment,{children:Object(l.jsxs)("div",{className:"picture__container",onClick:function(){x.setShowOverlay(!0),x.setSelected(e.picture)},onMouseEnter:function(){return t(!0)},onMouseLeave:function(){return t(!1)},children:[Object(l.jsx)("img",{id:"pic_".concat(e.picture.id),className:"picture ".concat(!e.picture.tags&&"picture__bluryGray"),src:e.picture.url_thumb,alt:e.picture.id},e.picture.id),Object(l.jsx)("div",{className:"picture__tagMissing",children:!e.picture.tags&&"TAGS MISSING"}),Object(l.jsxs)("div",{id:"tag_".concat(e.picture.id),className:"picture__tagShow",children:[Object(l.jsx)(O.a,{}),Object(l.jsxs)("div",{className:"picture__id",children:["#",e.picture.id]})]})]})})}),w=n(146),y=n(147),k=n(51),_=n(148),E=new function e(){var t=this;Object(m.a)(this,e),this.favorites=[],this.addToFavorite=function(e){t.favorites.push(e)},this.deleteFromFavorite=function(e){var n=t.favorites.findIndex((function(t){return t===e}));t.favorites.splice(n,1)},Object(v.m)(this,{favorites:v.n,addToFavorite:v.f,deleteFromFavorite:v.f})},N=(n(114),Object(h.a)((function(e){var t=Object(r.useState)(!0),n=Object(i.a)(t,2),a=n[0],c=n[1],s=Object(r.useRef)(!1),o=x.allPictures[x.selected],u=E.favorites.findIndex((function(e){return e===o.id}))>=0,d=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),n=new Promise((function(e,n){var r=new Image;r.src=t,r.onload=function(){return e(t.url)},r.onerror=function(e){return n(e)}})),e.next=4,n;case 4:c(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){o&&d(o.url_med)}),[o]);var p=function(e){var t=document.getElementById("closeButton");e?(t.style.visibility="hidden",t.style.opacity=0):(t.style.visibility="visible",t.style.opacity=1)},h=Object(r.useCallback)((function(e){var t=document.getElementById("heart"),n=document.getElementById("unheart");u?(n.style.visibility="visible",n.style.opacity=.5,n.style.fontSize="30em",setTimeout((function(){n.style.visibility="hidden",n.style.opacity=0,n.style.fontSize="1em"}),500),E.deleteFromFavorite(e)):(t.style.visibility="visible",t.style.opacity=.5,t.style.fontSize="50em",setTimeout((function(){t.style.visibility="hidden",t.style.opacity=0,t.style.fontSize="1em"}),500),E.addToFavorite(e))}),[u]),m=Object(r.useCallback)((function(e){e.preventDefault();var t=e.key.toLowerCase(),n=document.getElementById("nextButton"),r=document.getElementById("previousButton");!1===s.current&&(s.current=!0,"arrowdown"===t||"arrowright"===t?(n.style.backgroundColor="rgba(255,255,255,.15)",x.changeSelected(!0),setTimeout((function(){n.style.backgroundColor="rgba(255,255,255, 0)"}),100)):"arrowup"===t||"arrowleft"===t?(r.style.backgroundColor="rgba(255,255,255,.15)",x.changeSelected(!1),setTimeout((function(){r.style.backgroundColor="rgba(255,255,255, 0)"}),100)):"enter"===t?h(o.id):"escape"===t&&x.setShowOverlay(!1),setTimeout((function(){s.current=!1}),100))}),[o,h]);return Object(r.useEffect)((function(){return document.addEventListener("keydown",m),function(){document.removeEventListener("keydown",m)}}),[m]),Object(l.jsxs)("div",{className:"overlay__overlay",children:[Object(l.jsx)("div",{className:"overlay__background",onClick:function(){x.setShowOverlay(!1)}}),Object(l.jsx)("div",{className:"overlay__columnLeft",id:"previousButton",onClick:function(){x.changeSelected(!1)},children:Object(l.jsx)(w.a,{})}),Object(l.jsx)("div",{className:"overlay__columnRight",id:"nextButton",onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:function(){x.changeSelected(!0)},children:Object(l.jsx)(y.a,{})}),Object(l.jsx)("div",{className:"overlay__closeButton",id:"closeButton",onClick:function(){x.setShowOverlay(!1)},children:Object(l.jsx)(k.a,{})}),a?Object(l.jsx)(j.a,{className:"overlay__spinner"}):Object(l.jsxs)("div",{className:"overlay__pictureContainer",onDoubleClick:function(){h(o.id)},children:[Object(l.jsxs)("div",{className:"overlay__infoAction",children:[o&&Object(l.jsxs)("div",{className:"overlay__info",children:["#",o.id]}),Object(l.jsx)("div",{className:"overlay__action",children:u?Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)("span",{role:"img","aria-label":"heart",style:{fontSize:".75em"},children:"\u2764\ufe0f"})," ","Marked as favorite!"]}):"Doubleclick/Enter to mark as favorite."})]}),Object(l.jsxs)("div",{className:"overlay__pictureHover",children:[Object(l.jsx)("div",{className:"overlay__pictureWatermark",children:"KINKOGRAPH"}),Object(l.jsx)(_.a,{id:"heart",className:"overlay__heart"}),Object(l.jsx)(k.a,{id:"unheart",className:"overlay__heart"})]}),o&&Object(l.jsx)("img",{className:"overlay__picture",src:o.url_med,alt:o.id},o.id),o&&Object(l.jsx)("div",{className:"overlay__tags",children:JSON.parse(o.tags).map((function(e){return Object(l.jsxs)(r.Fragment,{children:[Object(l.jsxs)("span",{children:["#",e]}),"\xa0"]})}))})]})]})}))),S=n(24),C=n.n(S),I=function(){var e=Object(b.a)(f.a.mark((function e(t,n){var r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={pageNumber:t,pageSize:n},e.next=3,C()({url:"https://kinkograph.herokuapp.com/pictures/page",method:"POST",data:r});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}if(401!==a.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(a.status));case 10:return e.abrupt("return",a.data);case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),B=(n(132),Object(h.a)((function(){var e=Object(r.useState)(!0),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)([]),s=Object(i.a)(c,2),o=s[0],u=s[1],d=Object(r.useRef)(!1),p=Object(r.useRef)(1),h=Object(r.useRef)(!1),m=Object(r.useCallback)(Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I(p.current,100);case 3:return(t=e.sent).length<100?h.current=!0:h.current=!1,e.next=7,Promise.all(t.map((function(e){return t=e,new Promise((function(e,n){var r=new Image;r.src=t.url_thumb,r.onload=function(){return e(t.url)},r.onerror=function(e){return n(e)}}));var t})));case 7:x.setAllPictures(t),u(t),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:a(!1);case 15:case"end":return e.stop()}}),e,null,[[0,11]])}))),[]);Object(r.useEffect)((function(){m()}),[m]);var v=Object(r.useCallback)((function(e){if(a(!0),e){var t=p.current+1;p.current=t,m(t)}else{var n=p.current-1;p.current=n,m(n)}}),[m]),O=Object(r.useCallback)((function(e){var t,n=.8*window.innerHeight,r=window.scrollY;"down"===e?t=r+n:"up"===e&&(t=Math.max(r-n,0)),window.scroll({top:t,left:0,behavior:"smooth"})}),[]),w=Object(r.useCallback)((function(e){if(!x.showOverlay){e.preventDefault();var t=e.key.toLowerCase();!1===d.current&&(d.current=!0,"arrowright"!==t||h.current?"arrowleft"===t&&p.current>1?v(!1):"arrowdown"===t?O("down"):"arrowup"===t&&O("up"):v(!0),setTimeout((function(){d.current=!1}),100))}}),[O,v]);return Object(r.useEffect)((function(){return document.addEventListener("keydown",w),function(){document.removeEventListener("keydown",w)}}),[w]),Object(l.jsx)("div",{children:n?Object(l.jsxs)("div",{className:"App__flex",children:[Object(l.jsx)(j.a,{className:"Gallery__spinner"}),Object(l.jsx)("div",{className:"gallery__spinnerText",children:"loading"})]}):Object(l.jsxs)(r.Fragment,{children:[x.showOverlay&&Object(l.jsx)(N,{}),Object(l.jsxs)("div",{className:"gallery",children:[Object(l.jsx)("div",{className:"gallery__main",children:o.map((function(e,t){return Object(l.jsx)(g,{picture:e,reload:m},e.id)}))}),Object(l.jsx)("div",{className:"gallery__next",children:Object(l.jsxs)("div",{className:"gallery__nextTextContainer",children:[1===p.current?"Previous":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return v(!1)},children:"Previous"})," |\xa0",h.current?"Next":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return v(!0)},children:"Next"})]})})]})]})})}))),T=n(153),P=n(154),D=n(102),L=n(152),F=n(143),U=n(144),M=n(149),z=n(150),A=n(151);function G(e){return void 0===e||null===e?null:e.charAt(0).toUpperCase()+e.slice(1)}var R=function(){var e=Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C()({url:"https://kinkograph.herokuapp.com/tags/",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.abrupt("return",t.data);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={tag_name:t},e.next=3,C()({url:"https://kinkograph.herokuapp.com/tags/",method:"POST",data:n});case 3:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=10;break}if(401!==r.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(r.status));case 10:return e.abrupt("return",r.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(b.a)(f.a.mark((function e(t,n){var r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={tags:JSON.stringify(t)},e.next=3,C()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(n),method:"PATCH",data:r});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}if(401!==a.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(a.status));case 10:return e.abrupt("return",a.data);case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),W=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(t),method:"DELETE"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.abrupt("return",n.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=(n(133),function(e){var t=Object(r.useState)([]),n=Object(i.a)(t,2),a=n[0],c=n[1],s=Object(r.useState)([]),o=Object(i.a)(s,2),u=o[0],d=o[1],p=Object(r.useState)(!1),j=Object(i.a)(p,2),h=j[0],m=j[1],v=F.a.Option,x=Object(r.useCallback)(Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R();case 3:t=e.sent,d(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),[]),O=Object(r.useCallback)((function(t){e.setShowUploader&&e.setShowUploader(!0),e.setShowDrawer(!1),t&&e.reload()}),[e]);Object(r.useEffect)((function(){x(),null!==JSON.parse(e.picture.tags)&&c(JSON.parse(e.picture.tags))}),[x,e.picture.tags]);var g=Object(r.useCallback)(function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.map((function(e){return G(e)})),c(n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),w=Object(r.useCallback)(Object(b.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a.length>0)){t.next=6;break}return t.next=3,a.map(function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(u.findIndex((function(e){return e===G(t)}))<0)){e.next=6;break}return e.next=4,H(t);case 4:"success"===e.sent.value&&console.log("".concat(t," was added to the lists of tags."));case 6:return e.abrupt("return",void 0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:return t.next=5,J(a,e.picture.id);case 5:O(!0);case 6:case"end":return t.stop()}}),t)}))),[a,u,O,e.picture.id]),y=Object(r.useCallback)(function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==h){e.next=6;break}return e.next=3,W(t);case 3:O(!0),e.next=8;break;case 6:m(!0),setTimeout((function(){m(!1)}),2e3);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[h,O]);return Object(l.jsxs)(U.a,{title:Object(l.jsxs)("span",{className:"Drawer__Title",children:["Edit picture id #",e.picture.id]}),placement:"left",closable:!0,onClose:function(){return O(!1)},visible:e.showDrawer,width:"42.5%",children:[Object(l.jsx)("div",{className:"Drawer__font",children:"Preview:"}),Object(l.jsx)("img",{className:"Drawer_picture",src:e.picture.url_med,alt:e.picture.id,style:{maxWidth:"100%",maxHeight:window.innerHeight/2.5}},e.picture.id),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("div",{className:"Drawer__font",children:"Tags:"}),Object(l.jsx)(F.a,{mode:"tags",allowClear:!1,style:{width:"100%"},placeholder:"Add some tags",onChange:g,defaultValue:null!==e.picture.tags?JSON.parse(e.picture.tags):void 0,children:u.map((function(e){return Object(l.jsx)(v,{children:G(e.tag_name)},G(e.tag_name))}))}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"Drawer__buttonContainer",children:[Object(l.jsxs)("div",{className:a.length<1?"Drawer__buttonDisabled":"Drawer__button",onClick:w,children:[Object(l.jsx)(M.a,{})," \xa0 Save"]}),Object(l.jsx)("div",{className:h?"Drawer__buttonConfirmAction":"Drawer__button",onClick:function(){return y(e.picture.key)},children:h?Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)(z.a,{})," ARE YOU SURE",Object(l.jsx)(A.a,{})]}):Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)(z.a,{}),"\xa0 Delete"]})})]})]},"drawer".concat(e.picture.id))}),Y=(n(135),function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),a=n[0],c=n[1],s=Object(r.useState)(!1),o=Object(i.a)(s,2),u=o[0],d=o[1],p=function(t){if(null===e.totalMissingTag){c(t);var n=document.getElementById(e.picture.id);n.style.filter=t?"brightness(50%) blur(2px)":"brightness(100%) blur(0px)"}},f=function(){setTimeout((function(){e.setShowUploader(!1)}),300),d(!0)};return Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)(K,{picture:e.picture,showDrawer:u,setShowDrawer:d,reload:e.reload,setShowUploader:e.setShowUploader}),Object(l.jsxs)("div",{className:"EditPictures__missingPicture",children:[null===e.totalMissingTag?a&&Object(l.jsx)("div",{className:"EditPictures__missingPictureOverText",onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:f,children:Object(l.jsx)(L.a,{})}):Object(l.jsxs)("div",{className:"EditPictures__missingPictureRest",children:["+",e.totalMissingTag]}),Object(l.jsx)("img",{className:e.totalMissingTag&&"EditPictures__bluryGray",id:e.picture.id,src:e.picture.url_thumb,alt:e.picture.id,width:e.size,height:e.size,onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:f})]})]})}),V=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("file",t),e.prev=2,e.next=5,C.a.post("https://kinkograph.herokuapp.com/pictures",n);case 5:return e.abrupt("return","success");case 8:return e.prev=8,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return","error");case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={name:t},e.next=3,C()({url:"https://kinkograph.herokuapp.com/pictures/duplicate",method:"POST",data:n});case 3:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=10;break}if(401!==r.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(r.status));case 10:return e.abrupt("return",r.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C()({url:"https://kinkograph.herokuapp.com"+"/pictures/tagsmissing/".concat(t),method:"GET"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.abrupt("return",n.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C()({url:"https://kinkograph.herokuapp.com/pictures/tagsmissingcount/",method:"GET"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.abrupt("return",n.data[0].count);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=(n(136),function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(!1),s=Object(i.a)(c,2),o=s[0],u=s[1],d=Object(r.useState)([]),p=Object(i.a)(d,2),h=p[0],m=p[1],v=Object(r.useState)(!0),x=Object(i.a)(v,2),O=x[0],g=x[1],w=Object(r.useState)([0,0]),y=Object(i.a)(w,2),k=y[0],_=y[1],E=Object(r.useState)(void 0),N=Object(i.a)(E,2),S=N[0],C=N[1],I=Object(r.useState)(null),B=Object(i.a)(I,2),L=B[0],F=B[1],U=Object(r.useCallback)(function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V(t);case 2:n=e.sent,D.a[n]({message:"Upload ".concat(n),description:"File: ".concat(t.name)});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),M=Object(r.useCallback)(Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X();case 3:t=e.sent,F(t-S),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[S]),z=Object(r.useCallback)((function(){var e=window.innerWidth,t=window.innerHeight,n=Math.floor(.4*e),r=Math.floor(.75*t),a=Math.floor(n/184)*Math.floor(r/180);return C(a),a}),[]),A=Object(r.useCallback)(Object(b.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z();case 3:return t=e.sent,e.next=6,Q(t);case 6:return n=e.sent,e.next=9,M();case 9:m(n),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])}))),[M,z]),G=Object(r.useCallback)(function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a(!0),!t.target.files[0]){e.next=12;break}return n=t.target.files[0].name.split(".")[0],e.next=5,q(n);case 5:if(0!==e.sent.length){e.next=11;break}return e.next=9,U(t.target.files[0]);case 9:e.next=12;break;case 11:D.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(t.target.files[0].name,"'")});case 12:a(!1),setTimeout((function(){A(S)}),500);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[A,S,U]);Object(r.useEffect)((function(){return A(),window.addEventListener("resize",z),function(){window.removeEventListener("resize",z)}}),[A,z]);var R=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r,c,s,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),t.stopPropagation(),n=t.dataTransfer.files,r=n.length,_([0,r]),c=0;case 6:if(!(c<r)){e.next=24;break}if(a(!0),_([c,r]),!n[c]){e.next=21;break}return s=n[c],i=s.name.split(".")[0],e.next=14,q(i);case 14:if(0!==e.sent.length){e.next=20;break}return e.next=18,U(s);case 18:e.next=21;break;case 20:D.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(i,"'")});case 21:c++,e.next=6;break;case 24:_([0,0]),a(!1),setTimeout((function(){A(S)}),1e3);case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"Uploader__container",children:[Object(l.jsx)("div",{className:"Uploader__formContainer",children:O&&Object(l.jsx)("div",{className:"Uploader__formContent",style:h.length?{width:"50vw"}:{width:"100vw"},children:Object(l.jsxs)("form",{onSubmit:U,children:[Object(l.jsx)("input",{type:"file",className:"inputfile",name:"inputfile",id:"file",onChange:G}),n?Object(l.jsxs)("label",{htmlFor:"file",style:h.length?{width:"35vw"}:{width:"75vw"},children:[Object(l.jsx)(j.a,{className:"Uploader__spinner"}),k[1]?Object(l.jsxs)("p",{className:"form-upload-text",children:[k[0]," of ",k[1]]}):Object(l.jsx)("p",{className:"form-upload-text",children:"Loading"})]}):Object(l.jsx)("label",{htmlFor:"file",onDrop:R,onDragOver:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},onDragEnter:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!0)}(e)},onDragLeave:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!1)}(e)},style:h.length?{width:"35vw"}:{width:"75vw"},children:o?Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(P.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Drop your files here ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"Multiple files supported"})]}),Object(l.jsx)("p",{className:"form-upload-text"})]}):Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(T.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Click, or drag here a file ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"jpg and png file only"})]})]})})]})})}),h.length>0&&Object(l.jsx)("div",{className:"Uploader__missingContainer",children:Object(l.jsx)("div",{className:"Uploader__missingContent",children:h.map((function(e,t){return Object(l.jsx)(Y,{picture:e,size:150,setShowUploader:g,reload:A,totalMissingTag:t+1===S?L:null},e.id)}))})})]})}),$=(n(137),function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1];return Object(l.jsx)(o.a,{children:Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("div",{className:"App__main",children:Object(l.jsxs)(u.c,{children:[Object(l.jsx)(u.a,{path:"/upload",children:Object(l.jsx)(Z,{})}),Object(l.jsx)(u.a,{path:"/",children:Object(l.jsx)("div",{className:"App__flex",children:n?Object(l.jsx)(B,{}):Object(l.jsxs)(r.Fragment,{children:[Object(l.jsx)("div",{className:"App__title",children:"\xa0kinkograph"}),Object(l.jsx)(d,{login:function(e){"555666"===e&&a(!0)}}),Object(l.jsx)("div",{className:"spacer"})]})})})]})})})})}),ee=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,155)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)($,{})}),document.getElementById("root")),ee()}},[[141,1,2]]]);
//# sourceMappingURL=main.9c65c405.chunk.js.map