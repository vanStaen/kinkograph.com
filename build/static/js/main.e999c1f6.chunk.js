(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{110:function(e,t,r){},111:function(e,t,r){},130:function(e,t,r){},131:function(e,t,r){},132:function(e,t,r){},133:function(e,t,r){},134:function(e,t,r){},136:function(e,t,r){},137:function(e,t,r){},138:function(e,t,r){},142:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(24),s=r.n(c),i=(r(110),r(21)),o=r(97),u=r(20),l=(r(111),r(1)),d=function(e){var t=Object(n.useState)(1),r=Object(i.a)(t,2),a=r[0],c=r[1],s=Object(n.useCallback)((function(t){t.preventDefault();var r=t.key.toLowerCase();if("backspace"===r)a>1&&(document.getElementById(a-1).value="",c(a-1));else if(r.length>1);else if(document.getElementById(a).value=r,c(a+1),a+1===7){c(1);var n=document.getElementById(1).value+document.getElementById(2).value+document.getElementById(3).value+document.getElementById(4).value+document.getElementById(5).value+document.getElementById(6).value;setTimeout((function(){document.getElementById(1).focus(),document.getElementById(1).value="",document.getElementById(2).value="",document.getElementById(3).value="",document.getElementById(4).value="",document.getElementById(5).value="",document.getElementById(6).value="",c(1),e.login(n)}),500)}}),[e,a]),o=function(e){var t=parseInt(e.target.id,10),r=a;""===document.getElementById(1).value?c(r=1):""===document.getElementById(2).value?c(r=2):""===document.getElementById(3).value?c(r=3):""===document.getElementById(4).value?c(r=4):""===document.getElementById(5).value?c(r=5):""===document.getElementById(6).value&&c(r=6),document.getElementById(t).blur(),document.getElementById(r).focus()};return Object(n.useEffect)((function(){return document.addEventListener("keydown",s),function(){document.removeEventListener("keydown",s)}}),[s]),Object(l.jsx)("div",{children:Object(l.jsxs)("form",{children:[Object(l.jsx)("input",{id:"1",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",style:{marginLeft:"20px"},autoComplete:"new-password"}),Object(l.jsx)("input",{id:"2",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"3",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"4",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"5",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"6",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,style:{width:"40px"},autoComplete:"new-password"})]})})},p=r(6),f=r.n(p),h=r(11),b=r(74),j=r(50),m=r(61),v=r(7),x=r(23),g=r.n(x),O=function(){var e=Object(h.a)(f.a.mark((function e(t,r){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={pageNumber:t,pageSize:r},e.next=3,g()({url:"https://kinkograph.herokuapp.com/pictures/page",method:"POST",data:n});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}if(401!==a.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(a.status));case 10:return e.abrupt("return",a.data);case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),w=function(){var e=Object(h.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({url:"https://kinkograph.herokuapp.com/pictures/total/",method:"POST"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.abrupt("return",t.data[0].count);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(h.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(k.pageNumber,k.PAGE_SIZE);case 3:(t=e.sent).length<k.PAGE_SIZE?k.lastPageReached=!0:k.lastPageReached=!1,k.setAllPictures(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(h.a)(f.a.mark((function e(t){var r,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=7;break}return r=k.pageNumber+1,k.setPageNumber(r),e.next=5,y(r);case 5:e.next=11;break;case 7:return n=k.pageNumber-1,k.setPageNumber(n),e.next=11,y(n);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=new function e(){var t=this;Object(m.a)(this,e),this.PAGE_SIZE=100,this.pageNumber=1,this.lastPageReached=!1,this.showOverlay=!1,this.allPictures=[],this.selected=null,this.totalPictures=0,this.filter=[],this.isGalleryLoading=!0,this.setPageNumber=function(e){t.pageNumber=e},this.setLastPageReached=function(e){t.lastPageReached=e},this.setShowOverlay=function(e){t.showOverlay=e},this.changeSelected=function(){var e=Object(h.a)(f.a.mark((function e(r){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.selected,a=t.allPictures.length-1,!r){e.next=12;break}if(n!==a){e.next=9;break}return e.next=6,_(!0);case 6:t.selected=0,e.next=10;break;case 9:t.selected=n+1;case 10:e.next=19;break;case 12:if(0!==n){e.next=18;break}return e.next=15,_(!1);case 15:t.selected=a,e.next=19;break;case 18:t.selected=n-1;case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setSelected=function(){var e=Object(h.a)(f.a.mark((function e(r){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.allPictures.findIndex((function(e){return e.id===r.id}));case 2:n=e.sent,t.selected=n;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setAllPictures=function(e){t.allPictures=e},this.setTotalPictures=function(e){t.totalPictures=e},this.addFilter=function(e){t.filter.push(e)},this.deleteFilter=function(e){var r=t.filter.findIndex((function(t){return t===e}));t.filter.splice(r,1)},this.setIsGalleryLoading=function(e){t.isGalleryLoading=e},Object(v.m)(this,{pageNumber:v.n,setPageNumber:v.f,lastPageReached:v.n,setLastPageReached:v.f,showOverlay:v.n,setShowOverlay:v.f,selected:v.n,setSelected:v.f,changeSelected:v.f,allPictures:v.n,setAllPictures:v.f,totalPictures:v.n,setTotalPictures:v.f,filter:v.n,addFilter:v.f,deleteFilter:v.f,isGalleryLoading:v.n,setIsGalleryLoading:v.f})},E=r(146),N=(r(130),function(e){var t=function(t){var r=document.getElementById("tag_".concat(e.picture.id)),n=document.getElementById("pic_".concat(e.picture.id));t?(r.style.visibility="visible",r.style.opacity=1,n.style.filter="brightness(50%) grayscale(1)"):(r.style.visibility="hidden",r.style.opacity=0,n.style.filter="brightness(100%) grayscale(0)")};return Object(l.jsx)(n.Fragment,{children:Object(l.jsxs)("div",{className:"picture__container",onClick:function(){k.setShowOverlay(!0),k.setSelected(e.picture)},onMouseEnter:function(){return t(!0)},onMouseLeave:function(){return t(!1)},children:[Object(l.jsx)("img",{id:"pic_".concat(e.picture.id),className:"picture ".concat(!e.picture.tags&&"picture__bluryGray"),src:e.picture.url_thumb,alt:e.picture.id},e.picture.id),Object(l.jsx)("div",{className:"picture__tagMissing",children:!e.picture.tags&&"TAGS MISSING"}),Object(l.jsxs)("div",{id:"tag_".concat(e.picture.id),className:"picture__tagShow",children:[Object(l.jsx)(E.a,{}),Object(l.jsxs)("div",{className:"picture__id",children:["#",e.picture.id]})]})]})})}),S=r(147),P=r(148),C=r(52),I=r(149),T=new function e(){var t=this;Object(m.a)(this,e),this.favorites=[],this.addToFavorite=function(e){t.favorites.push(e)},this.deleteFromFavorite=function(e){var r=t.favorites.findIndex((function(t){return t===e}));t.favorites.splice(r,1)},Object(v.m)(this,{favorites:v.n,addToFavorite:v.f,deleteFromFavorite:v.f})},B=(r(131),Object(j.a)((function(e){var t=Object(n.useState)(!0),r=Object(i.a)(t,2),a=r[0],c=r[1],s=Object(n.useRef)(!1),o=k.allPictures[k.selected],u=T.favorites.findIndex((function(e){return e===o.id}))>=0,d=1===k.pageNumber&&0===k.selected,p=k.lastPageReached&&k.allPictures.length===k.selected+1,j=function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),r=new Promise((function(e,r){var n=new Image;n.src=t,n.onload=function(){return e(t.url)},n.onerror=function(e){return r(e)}})),e.next=4,r;case 4:c(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){o&&j(o.url_med)}),[o]);var m=function(e){var t=document.getElementById("closeButton");e?(t.style.visibility="hidden",t.style.opacity=0):(t.style.visibility="visible",t.style.opacity=1)},v=Object(n.useCallback)((function(e){var t=document.getElementById("heart"),r=document.getElementById("unheart");u?(r.style.visibility="visible",r.style.opacity=.5,r.style.fontSize="30em",setTimeout((function(){r.style.visibility="hidden",r.style.opacity=0,r.style.fontSize="1em"}),500),T.deleteFromFavorite(e)):(t.style.visibility="visible",t.style.opacity=.5,t.style.fontSize="50em",setTimeout((function(){t.style.visibility="hidden",t.style.opacity=0,t.style.fontSize="1em"}),500),T.addToFavorite(e))}),[u]),x=Object(n.useCallback)((function(e){e.preventDefault();var t=e.key.toLowerCase(),r=document.getElementById("nextButton"),n=document.getElementById("previousButton");!1===s.current&&(s.current=!0,"arrowdown"!==t&&"arrowright"!==t||p?"arrowup"!==t&&"arrowleft"!==t||d?"enter"===t?v(o.id):"escape"===t&&k.setShowOverlay(!1):(n.style.backgroundColor="rgba(255,255,255,.15)",k.changeSelected(!1),setTimeout((function(){n.style.backgroundColor="rgba(255,255,255, 0)"}),100)):(r.style.backgroundColor="rgba(255,255,255,.15)",k.changeSelected(!0),setTimeout((function(){r.style.backgroundColor="rgba(255,255,255, 0)"}),100)),setTimeout((function(){s.current=!1}),100))}),[o,v,d,p]);return Object(n.useEffect)((function(){return document.addEventListener("keydown",x),function(){document.removeEventListener("keydown",x)}}),[x]),Object(l.jsxs)("div",{className:"overlay__overlay",children:[Object(l.jsx)("div",{className:"overlay__background",onClick:function(){k.setShowOverlay(!1)}}),!d&&Object(l.jsx)("div",{className:"overlay__columnLeft",id:"previousButton",onClick:function(){k.changeSelected(!1)},children:Object(l.jsx)(S.a,{})}),!p&&Object(l.jsx)("div",{className:"overlay__columnRight",id:"nextButton",onMouseEnter:function(){return m(!0)},onMouseLeave:function(){return m(!1)},onClick:function(){k.changeSelected(!0)},children:Object(l.jsx)(P.a,{})}),Object(l.jsx)("div",{className:"overlay__closeButton",id:"closeButton",onClick:function(){k.setShowOverlay(!1)},children:Object(l.jsx)(C.a,{})}),a?Object(l.jsx)(b.a,{className:"overlay__spinner"}):Object(l.jsxs)("div",{className:"overlay__pictureContainer",onDoubleClick:function(){v(o.id)},children:[Object(l.jsxs)("div",{className:"overlay__infoAction",children:[o&&Object(l.jsxs)("div",{className:"overlay__info",children:["#",o.id]}),Object(l.jsx)("div",{className:"overlay__action",children:u?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("span",{role:"img","aria-label":"heart",style:{fontSize:".75em"},children:"\u2764\ufe0f"})," ","Marked as favorite!"]}):"Doubleclick/Enter to mark as favorite."})]}),Object(l.jsxs)("div",{className:"overlay__pictureHover",children:[Object(l.jsx)("div",{className:"overlay__pictureWatermark",children:"KINKOGRAPH"}),Object(l.jsx)(I.a,{id:"heart",className:"overlay__heart"}),Object(l.jsx)(C.a,{id:"unheart",className:"overlay__heart"})]}),o&&Object(l.jsx)("img",{className:"overlay__picture",src:o.url_med,alt:o.id},"img__".concat(o.id)),o&&Object(l.jsx)("div",{className:"overlay__tags",children:JSON.parse(o.tags).map((function(e){return Object(l.jsxs)(n.Fragment,{children:[Object(l.jsxs)("span",{onClick:function(){return function(e){k.setShowOverlay(!1),k.addFilter(e)}(e)},children:["#",e]}),"\xa0"]})}))})]})]})}))),F=(r(132),Object(j.a)((function(){return Object(l.jsxs)("div",{className:"galleryHeader__main",children:[Object(l.jsx)("div",{className:"galleryHeader__left",children:T.favorites.length?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsxs)("div",{className:"galleryHeader__BigFont galleryHeader__favorite",children:[T.favorites.length," picture",T.favorites.length>1&&"s"]}),Object(l.jsxs)("div",{className:"galleryHeader__SmallFont",children:["marked as favorite",T.favorites.length>1&&"s"]})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("div",{className:"galleryHeader__BigFont galleryHeader__favorite",children:"Hello Cl\xe9ment,"}),Object(l.jsx)("div",{className:"galleryHeader__SmallFont",children:"What inspire you today?"})]})}),Object(l.jsx)("div",{className:"galleryHeader__center",children:0===k.filter.length?Object(l.jsx)("div",{className:"kinkograph__title",children:"kinkograph"}):k.filter.map((function(e){return Object(l.jsxs)("span",{children:["#",e," "]})}))}),Object(l.jsxs)("div",{className:"galleryHeader__right",children:[Object(l.jsxs)("div",{className:"galleryHeader__BigFont",children:[Object(l.jsxs)("b",{children:["Page ",k.pageNumber]}),Object(l.jsxs)("span",{style:{fontSize:"0.7em"},children:[" ","/"," ",Math.floor(k.totalPictures/k.PAGE_SIZE,0)]})]}),Object(l.jsxs)("div",{className:"galleryHeader__SmallFont",children:[(k.pageNumber-1)*k.PAGE_SIZE+1,"-",Math.min(k.pageNumber*k.PAGE_SIZE,k.totalPictures)," ","of ",k.totalPictures]})]})]})}))),L=(r(133),Object(j.a)((function(){var e=Object(n.useRef)(!1),t=Object(n.useCallback)(Object(h.a)(f.a.mark((function e(){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(k.pageNumber,k.PAGE_SIZE);case 3:return t=e.sent,e.next=6,w();case 6:return r=e.sent,t.length<k.PAGE_SIZE?k.setLastPageReached(!0):k.setLastPageReached(!1),e.next=10,Promise.all(t.map((function(e){return t=e,new Promise((function(e,r){var n=new Image;n.src=t.url_thumb,n.onload=function(){return e(t.url)},n.onerror=function(e){return r(e)}}));var t})));case 10:k.setAllPictures(t),k.setTotalPictures(r),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:k.setIsGalleryLoading(!1);case 18:case"end":return e.stop()}}),e,null,[[0,14]])}))),[]);Object(n.useEffect)((function(){t()}),[t]);var r=Object(n.useCallback)((function(e){if(k.setIsGalleryLoading(!0),e){var r=k.pageNumber+1;k.setPageNumber(r),t(r)}else{var n=k.pageNumber-1;k.setPageNumber(n),t(n)}}),[t]),a=Object(n.useCallback)((function(e){var t,r=.8*window.innerHeight,n=window.scrollY;"down"===e?t=n+r:"up"===e&&(t=Math.max(n-r,0)),window.scroll({top:t,left:0,behavior:"smooth"})}),[]),c=Object(n.useCallback)((function(t){if(!k.showOverlay){t.preventDefault();var n=t.key.toLowerCase();!1===e.current&&(e.current=!0,"arrowright"!==n||k.lastPageReached?"arrowleft"===n&&k.pageNumber>1?r(!1):"arrowdown"===n?a("down"):"arrowup"===n&&a("up"):r(!0),setTimeout((function(){e.current=!1}),100))}}),[a,r]);return Object(n.useEffect)((function(){return document.addEventListener("keydown",c),function(){document.removeEventListener("keydown",c)}}),[c]),Object(l.jsxs)("div",{className:"gallery",children:[Object(l.jsx)(F,{}),k.isGalleryLoading?Object(l.jsxs)("div",{className:"App__flex",children:[Object(l.jsx)(b.a,{className:"Gallery__spinner"}),Object(l.jsx)("div",{className:"gallery__spinnerText",children:"loading"})]}):Object(l.jsxs)(n.Fragment,{children:[k.showOverlay&&Object(l.jsx)(B,{}),Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"gallery__main",children:k.allPictures.map((function(e,r){return Object(l.jsx)(N,{picture:e,reload:t},e.id)}))}),Object(l.jsx)("div",{className:"gallery__next",children:Object(l.jsxs)("div",{className:"gallery__nextTextContainer",children:[1===k.pageNumber?"Previous":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return r(!1)},children:"Previous"})," |\xa0",k.lastPageReached?"Next":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return r(!0)},children:"Next"})]})})]})]})]})}))),D=r(154),A=r(155),G=r(102),M=r(153),U=r(144),z=r(145),H=r(150),R=r(151),Z=r(152);function J(e){return void 0===e||null===e?null:e.charAt(0).toUpperCase()+e.slice(1)}var W=function(){var e=Object(h.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({url:"https://kinkograph.herokuapp.com/tags/",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.abrupt("return",t.data);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(h.a)(f.a.mark((function e(t){var r,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={tag_name:t},e.next=3,g()({url:"https://kinkograph.herokuapp.com/tags/",method:"POST",data:r});case 3:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=10;break}if(401!==n.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(n.status));case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(h.a)(f.a.mark((function e(t,r){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={tags:JSON.stringify(t)},e.next=3,g()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(r),method:"PATCH",data:n});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}if(401!==a.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(a.status));case 10:return e.abrupt("return",a.data);case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),V=function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(t),method:"DELETE"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=(r(134),function(e){var t=Object(n.useState)([]),r=Object(i.a)(t,2),a=r[0],c=r[1],s=Object(n.useState)([]),o=Object(i.a)(s,2),u=o[0],d=o[1],p=Object(n.useState)(!1),b=Object(i.a)(p,2),j=b[0],m=b[1],v=U.a.Option,x=Object(n.useCallback)(Object(h.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W();case 3:t=e.sent,d(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),[]),g=Object(n.useCallback)((function(t){e.setShowUploader&&e.setShowUploader(!0),e.setShowDrawer(!1),t&&e.reload()}),[e]);Object(n.useEffect)((function(){x(),null!==JSON.parse(e.picture.tags)&&c(JSON.parse(e.picture.tags))}),[x,e.picture.tags]);var O=Object(n.useCallback)(function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.map((function(e){return J(e)})),c(r);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),w=Object(n.useCallback)(Object(h.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a.length>0)){t.next=6;break}return t.next=3,a.map(function(){var e=Object(h.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(u.findIndex((function(e){return e===J(t)}))<0)){e.next=6;break}return e.next=4,K(t);case 4:"success"===e.sent.value&&console.log("".concat(t," was added to the lists of tags."));case 6:return e.abrupt("return",void 0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:return t.next=5,Y(a,e.picture.id);case 5:g(!0);case 6:case"end":return t.stop()}}),t)}))),[a,u,g,e.picture.id]),y=Object(n.useCallback)(function(){var e=Object(h.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==j){e.next=6;break}return e.next=3,V(t);case 3:g(!0),e.next=8;break;case 6:m(!0),setTimeout((function(){m(!1)}),2e3);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[j,g]);return Object(l.jsxs)(z.a,{title:Object(l.jsxs)("span",{className:"Drawer__Title",children:["Edit picture id #",e.picture.id]}),placement:"left",closable:!0,onClose:function(){return g(!1)},visible:e.showDrawer,width:"42.5%",children:[Object(l.jsx)("div",{className:"Drawer__font",children:"Preview:"}),Object(l.jsx)("img",{className:"Drawer_picture",src:e.picture.url_med,alt:e.picture.id,style:{maxWidth:"100%",maxHeight:window.innerHeight/2.5}},e.picture.id),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("div",{className:"Drawer__font",children:"Tags:"}),Object(l.jsx)(U.a,{mode:"tags",allowClear:!1,style:{width:"100%"},placeholder:"Add some tags",onChange:O,defaultValue:null!==e.picture.tags?JSON.parse(e.picture.tags):void 0,children:u.map((function(e){return Object(l.jsx)(v,{children:J(e.tag_name)},J(e.tag_name))}))}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"Drawer__buttonContainer",children:[Object(l.jsxs)("div",{className:a.length<1?"Drawer__buttonDisabled":"Drawer__button",onClick:w,children:[Object(l.jsx)(H.a,{})," \xa0 Save"]}),Object(l.jsx)("div",{className:j?"Drawer__buttonConfirmAction":"Drawer__button",onClick:function(){return y(e.picture.key)},children:j?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(R.a,{})," ARE YOU SURE",Object(l.jsx)(Z.a,{})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(R.a,{}),"\xa0 Delete"]})})]})]},"drawer".concat(e.picture.id))}),Q=(r(136),function(e){var t=Object(n.useState)(!1),r=Object(i.a)(t,2),a=r[0],c=r[1],s=Object(n.useState)(!1),o=Object(i.a)(s,2),u=o[0],d=o[1],p=function(t){if(null===e.totalMissingTag){c(t);var r=document.getElementById(e.picture.id);r.style.filter=t?"brightness(50%) blur(2px)":"brightness(100%) blur(0px)"}},f=function(){setTimeout((function(){e.setShowUploader(!1)}),300),d(!0)};return Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(q,{picture:e.picture,showDrawer:u,setShowDrawer:d,reload:e.reload,setShowUploader:e.setShowUploader}),Object(l.jsxs)("div",{className:"EditPictures__missingPicture",children:[null===e.totalMissingTag?a&&Object(l.jsx)("div",{className:"EditPictures__missingPictureOverText",onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:f,children:Object(l.jsx)(M.a,{})}):Object(l.jsxs)("div",{className:"EditPictures__missingPictureRest",children:["+",e.totalMissingTag]}),Object(l.jsx)("img",{className:e.totalMissingTag&&"EditPictures__bluryGray",id:e.picture.id,src:e.picture.url_thumb,alt:e.picture.id,width:e.size,height:e.size,onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:f})]})]})}),X=function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("file",t),e.prev=2,e.next=5,g.a.post("https://kinkograph.herokuapp.com/pictures",r);case 5:return e.abrupt("return","success");case 8:return e.prev=8,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return","error");case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(h.a)(f.a.mark((function e(t){var r,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={name:t},e.next=3,g()({url:"https://kinkograph.herokuapp.com/pictures/duplicate",method:"POST",data:r});case 3:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=10;break}if(401!==n.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(n.status));case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({url:"https://kinkograph.herokuapp.com"+"/pictures/tagsmissing/".concat(t),method:"GET"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({url:"https://kinkograph.herokuapp.com/pictures/tagsmissingcount/",method:"GET"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data[0].count);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=(r(137),function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),r=t[0],a=t[1],c=Object(n.useState)(!1),s=Object(i.a)(c,2),o=s[0],u=s[1],d=Object(n.useState)([]),p=Object(i.a)(d,2),j=p[0],m=p[1],v=Object(n.useState)(!0),x=Object(i.a)(v,2),g=x[0],O=x[1],w=Object(n.useState)([0,0]),y=Object(i.a)(w,2),_=y[0],k=y[1],E=Object(n.useState)(void 0),N=Object(i.a)(E,2),S=N[0],P=N[1],C=Object(n.useState)(null),I=Object(i.a)(C,2),T=I[0],B=I[1],F=Object(n.useCallback)(function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(t);case 2:r=e.sent,G.a[r]({message:"Upload ".concat(r),description:"File: ".concat(t.name)});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),L=Object(n.useCallback)(Object(h.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te();case 3:t=e.sent,B(t-S),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[S]),M=Object(n.useCallback)((function(){var e=window.innerWidth,t=window.innerHeight,r=Math.floor(.4*e),n=Math.floor(.75*t),a=Math.floor(r/184)*Math.floor(n/180);return P(a),a}),[]),U=Object(n.useCallback)(Object(h.a)(f.a.mark((function e(){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M();case 3:return t=e.sent,e.next=6,ee(t);case 6:return r=e.sent,e.next=9,L();case 9:m(r),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])}))),[L,M]),z=Object(n.useCallback)(function(){var e=Object(h.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a(!0),!t.target.files[0]){e.next=12;break}return r=t.target.files[0].name.split(".")[0],e.next=5,$(r);case 5:if(0!==e.sent.length){e.next=11;break}return e.next=9,F(t.target.files[0]);case 9:e.next=12;break;case 11:G.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(t.target.files[0].name,"'")});case 12:a(!1),setTimeout((function(){U(S)}),500);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[U,S,F]);Object(n.useEffect)((function(){return U(),window.addEventListener("resize",M),function(){window.removeEventListener("resize",M)}}),[U,M]);var H=function(){var e=Object(h.a)(f.a.mark((function e(t){var r,n,c,s,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),t.stopPropagation(),r=t.dataTransfer.files,n=r.length,k([0,n]),c=0;case 6:if(!(c<n)){e.next=24;break}if(a(!0),k([c,n]),!r[c]){e.next=21;break}return s=r[c],i=s.name.split(".")[0],e.next=14,$(i);case 14:if(0!==e.sent.length){e.next=20;break}return e.next=18,F(s);case 18:e.next=21;break;case 20:G.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(i,"'")});case 21:c++,e.next=6;break;case 24:k([0,0]),a(!1),setTimeout((function(){U(S)}),1e3);case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"Uploader__container",children:[Object(l.jsx)("div",{className:"Uploader__formContainer",children:g&&Object(l.jsx)("div",{className:"Uploader__formContent",style:j.length?{width:"50vw"}:{width:"100vw"},children:Object(l.jsxs)("form",{onSubmit:F,children:[Object(l.jsx)("input",{type:"file",className:"inputfile",name:"inputfile",id:"file",onChange:z}),r?Object(l.jsxs)("label",{htmlFor:"file",style:j.length?{width:"35vw"}:{width:"75vw"},children:[Object(l.jsx)(b.a,{className:"Uploader__spinner"}),_[1]?Object(l.jsxs)("p",{className:"form-upload-text",children:[_[0]," of ",_[1]]}):Object(l.jsx)("p",{className:"form-upload-text",children:"Loading"})]}):Object(l.jsx)("label",{htmlFor:"file",onDrop:H,onDragOver:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},onDragEnter:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!0)}(e)},onDragLeave:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!1)}(e)},style:j.length?{width:"35vw"}:{width:"75vw"},children:o?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(A.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Drop your files here ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"Multiple files supported"})]}),Object(l.jsx)("p",{className:"form-upload-text"})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(D.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Click, or drag here a file ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"jpg and png file only"})]})]})})]})})}),j.length>0&&Object(l.jsx)("div",{className:"Uploader__missingContainer",children:Object(l.jsx)("div",{className:"Uploader__missingContent",children:j.map((function(e,t){return Object(l.jsx)(Q,{picture:e,size:150,setShowUploader:O,reload:U,totalMissingTag:t+1===S?T:null},e.id)}))})})]})}),ne=(r(138),function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),r=t[0],a=t[1];return Object(l.jsx)(o.a,{children:Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("div",{className:"App__main",children:Object(l.jsxs)(u.c,{children:[Object(l.jsx)(u.a,{path:"/admin",children:Object(l.jsx)(re,{})}),Object(l.jsx)(u.a,{path:"/",children:Object(l.jsx)("div",{className:"App__flex",children:r?Object(l.jsx)(L,{}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("div",{className:"App__title",children:"\xa0kinkograph"}),Object(l.jsx)(d,{login:function(e){"555666"===e&&a(!0)}}),Object(l.jsx)("div",{className:"spacer"})]})})})]})})})})}),ae=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,156)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;r(e),n(e),a(e),c(e),s(e)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(ne,{})}),document.getElementById("root")),ae()}},[[142,1,2]]]);
//# sourceMappingURL=main.e999c1f6.chunk.js.map