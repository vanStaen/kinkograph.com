(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{114:function(e,t,r){},115:function(e,t,r){},134:function(e,t,r){},135:function(e,t,r){},137:function(e,t,r){},138:function(e,t,r){},139:function(e,t,r){},140:function(e,t,r){},141:function(e,t,r){},142:function(e,t,r){},146:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(24),c=r.n(s),i=(r(114),r(21)),o=r(102),u=r(20),l=(r(115),r(1)),d=function(e){var t=Object(n.useState)(1),r=Object(i.a)(t,2),a=r[0],s=r[1],c=Object(n.useCallback)((function(t){t.preventDefault();var r=t.key.toLowerCase();if("backspace"===r)a>1&&(document.getElementById(a-1).value="",s(a-1));else if(r.length>1);else if(document.getElementById(a).value=r,s(a+1),a+1===7){s(1);var n=document.getElementById(1).value+document.getElementById(2).value+document.getElementById(3).value+document.getElementById(4).value+document.getElementById(5).value+document.getElementById(6).value;setTimeout((function(){document.getElementById(1).focus(),document.getElementById(1).value="",document.getElementById(2).value="",document.getElementById(3).value="",document.getElementById(4).value="",document.getElementById(5).value="",document.getElementById(6).value="",s(1),e.login(n)}),500)}}),[e,a]),o=function(e){var t=parseInt(e.target.id,10),r=a;""===document.getElementById(1).value?s(r=1):""===document.getElementById(2).value?s(r=2):""===document.getElementById(3).value?s(r=3):""===document.getElementById(4).value?s(r=4):""===document.getElementById(5).value?s(r=5):""===document.getElementById(6).value&&s(r=6),document.getElementById(t).blur(),document.getElementById(r).focus()};return Object(n.useEffect)((function(){return document.addEventListener("keydown",c),function(){document.removeEventListener("keydown",c)}}),[c]),Object(l.jsx)("div",{children:Object(l.jsxs)("form",{children:[Object(l.jsx)("input",{id:"1",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",style:{marginLeft:"20px"},autoComplete:"new-password"}),Object(l.jsx)("input",{id:"2",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"3",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"4",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"5",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,autoComplete:"new-password"}),Object(l.jsx)("input",{id:"6",className:"PinInput__input",placeholder:"_",maxLength:"1",min:"1",max:"1",onClick:o,style:{width:"40px"},autoComplete:"new-password"})]})})},p=r(80),h=r(40),f=r(6),b=r.n(f),j=r(12),m=r(63),g=r(7),v=r(22),x=r.n(v),O=function(){var e=Object(j.a)(b.a.mark((function e(t,r){var n,a,s,c=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>2&&void 0!==c[2]?c[2]:"",a={pageNumber:t,pageSize:r,filter:n},e.next=4,x()({url:"https://kinkograph.herokuapp.com/pictures/page",method:"POST",data:a});case 4:if(!(200!==(s=e.sent).status&201!==s.status)){e.next=11;break}if(401!==s.status){e.next=10;break}throw new Error("Error! Unauthorized(401)");case 10:throw new Error("Error! Status ".concat(s.status));case 11:return e.abrupt("return",s.data);case 12:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(b.a.mark((function e(){var t,r,n,a=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:"",r={filter:t},e.next=4,x()({url:"https://kinkograph.herokuapp.com/pictures/total/",method:"POST",data:r});case 4:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=11;break}if(401!==n.status){e.next=10;break}throw new Error("Error! Unauthorized(401)");case 10:throw new Error("Error! Status ".concat(n.status));case 11:return e.abrupt("return",n.data[0].count);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(j.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x()({url:"https://kinkograph.herokuapp.com/tags/",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.abrupt("return",t.data);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(j.a)(b.a.mark((function e(t){var r,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={filter:t},e.next=3,x()({url:"https://kinkograph.herokuapp.com/tags/filter",method:"POST",data:r});case 3:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=10;break}if(401!==n.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(n.status));case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=new function e(){var t=this;Object(m.a)(this,e),this.PAGE_SIZE=100,this.pageNumber=1,this.lastPageReached=!1,this.showOverlay=!1,this.allPictures=[],this.selected=null,this.totalPictures=0,this.filter=[],this.isGalleryLoading=!0,this.galleryNeedsRefresh=!0,this.showFilterSelect=!1,this.tags=[],this.fetchPictures=Object(j.a)(b.a.mark((function e(){var r,n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(t.pageNumber,t.PAGE_SIZE,t.filter);case 3:return r=e.sent,e.next=6,w(t.filter);case 6:return n=e.sent,r.length<t.PAGE_SIZE?t.lastPageReached=!0:t.lastPageReached=!1,e.next=10,_(t.filter);case 10:return a=e.sent,e.next=13,Promise.all(r.map((function(e){return t=e,new Promise((function(e,r){var n=new Image;n.src=t.url_thumb,n.onload=function(){return e(t.url)},n.onerror=function(e){return r(e)}}));var t})));case 13:t.tags=a,t.setAllPictures(r),t.setTotalPictures(n),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(0),console.log(e.t0);case 21:t.isGalleryLoading=!1;case 22:case"end":return e.stop()}}),e,null,[[0,18]])}))),this.nextPageHandler=function(){var e=Object(j.a)(b.a.mark((function e(r){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return n=t.pageNumber+1,t.pageNumber=n,e.next=5,t.fetchPictures(n);case 5:e.next=11;break;case 7:return a=t.pageNumber-1,t.pageNumber=a,e.next=11,t.fetchPictures(a);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setPageNumber=function(e){t.pageNumber=e},this.setLastPageReached=function(e){t.lastPageReached=e},this.setShowOverlay=function(e){t.showOverlay=e},this.changeSelected=function(){var e=Object(j.a)(b.a.mark((function e(r){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.selected,a=t.allPictures.length-1,!r){e.next=12;break}if(n!==a){e.next=9;break}return e.next=6,t.nextPageHandler(!0);case 6:t.selected=0,e.next=10;break;case 9:t.selected=n+1;case 10:e.next=19;break;case 12:if(0!==n){e.next=18;break}return e.next=15,t.nextPageHandler(!1);case 15:t.selected=a,e.next=19;break;case 18:t.selected=n-1;case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setSelected=function(){var e=Object(j.a)(b.a.mark((function e(r){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.allPictures.findIndex((function(e){return e.id===r.id}));case 2:n=e.sent,t.selected=n;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setAllPictures=function(e){t.allPictures=e},this.setTotalPictures=function(e){t.totalPictures=e},this.addFilter=function(e){t.filter.push(e),t.pageNumber=1},this.deleteFilter=function(e){var r=t.filter.findIndex((function(t){return t===e}));t.filter.splice(r,1),t.pageNumber=1},this.setFilter=function(e){t.filter=e,t.pageNumber=1,t.galleryLoading=!0,t.galleryNeedsRefresh=!0},this.setIsGalleryLoading=function(e){t.isGalleryLoading=e},this.setGalleryNeedsRefresh=function(e){t.galleryNeedsRefresh=e},this.setShowFilterSelect=function(e){t.showFilterSelect=e},Object(g.m)(this,{pageNumber:g.n,setPageNumber:g.f,lastPageReached:g.n,setLastPageReached:g.f,showOverlay:g.n,setShowOverlay:g.f,selected:g.n,setSelected:g.f,changeSelected:g.f,allPictures:g.n,setAllPictures:g.f,totalPictures:g.n,setTotalPictures:g.f,filter:g.n,addFilter:g.f,deleteFilter:g.f,setFilter:g.f,isGalleryLoading:g.n,setIsGalleryLoading:g.f,galleryNeedsRefresh:g.n,setGalleryNeedsRefresh:g.f,showFilterSelect:g.n,setShowFilterSelect:g.f,fetchPictures:g.f,nextPageHandler:g.f,tags:g.n})},N=r(151),E=new function e(){var t=this;Object(m.a)(this,e),this.user={name:"there"},this.favorites=[],this.addToFavorite=function(e){t.favorites.findIndex((function(t){return t===e}))<0&&t.favorites.push(e)},this.deleteFromFavorite=function(e){var r=t.favorites.findIndex((function(t){return t===e}));t.favorites.splice(r,1)},Object(g.m)(this,{user:g.n,favorites:g.n,addToFavorite:g.f,deleteFromFavorite:g.f})},S=(r(134),Object(h.a)((function(e){var t=E.favorites.findIndex((function(t){return t===e.picture.id})),r=function(t){var r=document.getElementById("tag_".concat(e.picture.id)),n=document.getElementById("pic_".concat(e.picture.id));t?(r.style.visibility="visible",r.style.opacity=1,n.style.filter="brightness(50%) grayscale(1)"):(r.style.visibility="hidden",r.style.opacity=0,n.style.filter="brightness(100%) grayscale(0)")};return Object(l.jsx)(n.Fragment,{children:Object(l.jsxs)("div",{className:"picture__container",onClick:function(){k.setShowOverlay(!0),k.setSelected(e.picture)},onMouseEnter:function(){return r(!0)},onMouseLeave:function(){return r(!1)},children:[Object(l.jsx)("img",{id:"pic_".concat(e.picture.id),className:"picture \n          ".concat(!e.picture.tags&&"picture__bluryGray"," \n          ").concat(t>=0&&"halo"," "),src:e.picture.url_thumb,alt:e.picture.id},e.picture.id),Object(l.jsx)("div",{className:"picture__tagMissing",children:!e.picture.tags&&"TAGS MISSING"}),Object(l.jsxs)("div",{id:"tag_".concat(e.picture.id),className:"picture__tagShow",children:[Object(l.jsx)(N.a,{}),Object(l.jsxs)("div",{className:"picture__id",children:["#",e.picture.id]})]})]})})}))),P=r(152),C=r(153),I=r(52),F=r(154),T=r(150),B=(r(135),Object(h.a)((function(e){var t=Object(n.useState)(!0),r=Object(i.a)(t,2),a=r[0],s=r[1],c=Object(n.useRef)(!1),o=k.allPictures[k.selected],u=E.favorites.findIndex((function(e){return e===o.id}))>=0,d=1===k.pageNumber&&0===k.selected,h=k.lastPageReached&&k.allPictures.length===k.selected+1,f=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),r=new Promise((function(e,r){var n=new Image;n.src=t,n.onload=function(){return e(t.url)},n.onerror=function(e){return r(e)}})),e.next=4,r;case 4:s(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){o&&f(o.url_med)}),[o]);var m=function(e){var t=document.getElementById("closeButton");e?(t.style.visibility="hidden",t.style.opacity=0):(t.style.visibility="visible",t.style.opacity=1)},g=Object(n.useCallback)((function(e){var t=document.getElementById("heart"),r=document.getElementById("unheart");u?(r.style.visibility="visible",r.style.opacity=.5,r.style.fontSize="30em",setTimeout((function(){r.style.visibility="hidden",r.style.opacity=0,r.style.fontSize="1em"}),500),E.deleteFromFavorite(e)):(t.style.visibility="visible",t.style.opacity=.5,t.style.fontSize="50em",setTimeout((function(){t.style.visibility="hidden",t.style.opacity=0,t.style.fontSize="1em"}),500),E.addToFavorite(e))}),[u]),v=Object(n.useCallback)((function(e){e.preventDefault();var t=e.key.toLowerCase(),r=document.getElementById("nextButton"),n=document.getElementById("previousButton");!1===c.current&&(c.current=!0,"arrowdown"!==t&&"arrowright"!==t||h?"arrowup"!==t&&"arrowleft"!==t||d?"enter"===t?g(o.id):"escape"===t&&k.setShowOverlay(!1):(n.style.backgroundColor="rgba(255,255,255,.15)",k.changeSelected(!1),setTimeout((function(){n.style.backgroundColor="rgba(255,255,255, 0)"}),100)):(r.style.backgroundColor="rgba(255,255,255,.15)",k.changeSelected(!0),setTimeout((function(){r.style.backgroundColor="rgba(255,255,255, 0)"}),100)),setTimeout((function(){c.current=!1}),100))}),[o,g,d,h]);return Object(n.useEffect)((function(){return document.addEventListener("keydown",v),function(){document.removeEventListener("keydown",v)}}),[v]),Object(l.jsxs)("div",{className:"overlay__overlay",children:[Object(l.jsx)("div",{className:"overlay__background",onClick:function(){k.setShowOverlay(!1)}}),!d&&Object(l.jsx)("div",{className:"overlay__columnLeft",id:"previousButton",onClick:function(){k.changeSelected(!1)},children:Object(l.jsx)(P.a,{})}),!h&&Object(l.jsx)("div",{className:"overlay__columnRight",id:"nextButton",onMouseEnter:function(){return m(!0)},onMouseLeave:function(){return m(!1)},onClick:function(){k.changeSelected(!0)},children:Object(l.jsx)(C.a,{})}),Object(l.jsx)(T.a,{placement:"bottomLeft",title:Object(l.jsxs)("span",{children:[Object(l.jsx)("b",{children:"TIP: "})," The keys \u2190 and \u2192 will let you navigate through the pictures. You can use the ",Object(l.jsx)("i",{children:"esc"})," key, or click outside the picture to go back to the gallery."]}),children:Object(l.jsx)("div",{className:"overlay__closeButton",id:"closeButton",onClick:function(){k.setShowOverlay(!1)},children:Object(l.jsx)(I.a,{})})}),a?Object(l.jsx)(p.a,{className:"overlay__spinner"}):Object(l.jsxs)("div",{className:"overlay__pictureContainer",onDoubleClick:function(){g(o.id)},children:[Object(l.jsxs)("div",{className:"overlay__infoAction",children:[o&&Object(l.jsxs)("div",{className:"overlay__info",children:["#",o.id]}),Object(l.jsx)("div",{className:"overlay__action",children:u?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("span",{role:"img","aria-label":"heart",style:{fontSize:".75em"},children:"\u2764\ufe0f"})," ","Marked as favorite!"]}):"Doubleclick/Enter to mark as favorite."})]}),Object(l.jsxs)("div",{className:"overlay__pictureHover",children:[Object(l.jsx)("div",{className:"overlay__pictureWatermark",children:"KINKOGRAPH"}),Object(l.jsx)(F.a,{id:"heart",className:"overlay__heart"}),Object(l.jsx)(I.a,{id:"unheart",className:"overlay__heart"})]}),o&&Object(l.jsx)("img",{className:"overlay__picture",src:o.url_med,alt:o.id},"img__".concat(o.id)),o&&Object(l.jsx)("div",{className:"overlay__tags",children:JSON.parse(o.tags).map((function(e){return Object(l.jsxs)(n.Fragment,{children:[Object(l.jsxs)("span",{onClick:function(){return function(e){k.setShowOverlay(!1),k.setIsGalleryLoading(!0),k.addFilter(e),k.setGalleryNeedsRefresh(!0)}(e)},children:["#",e]}),"\xa0"]})}))})]})]})}))),L=r(148);function D(e){return void 0===e||null===e?null:e.charAt(0).toUpperCase()+e.slice(1)}r(137);var H=Object(h.a)((function(){var e=L.a.Option,t=Object(n.useCallback)(function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.map((function(e){return D(e)})),console.log(r),k.setFilter(r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(l.jsxs)("div",{className:"galleryHeader__main",children:[Object(l.jsx)("div",{className:"galleryHeader__left",children:E.favorites.length?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsxs)("div",{className:"galleryHeader__BigFont galleryHeader__favorite",children:[E.favorites.length," picture",E.favorites.length>1&&"s"]}),Object(l.jsxs)("div",{className:"galleryHeader__SmallFont",children:["marked as favorite",E.favorites.length>1&&"s"]})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsxs)("div",{className:"galleryHeader__BigFont galleryHeader__favorite",children:["Hello ",E.user.name,","]}),Object(l.jsx)("div",{className:"galleryHeader__SmallFont",children:"What will inspire you today?"})]})}),Object(l.jsx)("div",{className:"galleryHeader__center",children:k.filter.length>0||k.showFilterSelect?Object(l.jsx)(L.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select a filter",defaultValue:k.filter,onChange:t,className:"galleryHeader__selectFilter",children:k.tags.map((function(t){return Object(l.jsx)(e,{children:D(t)},D(t))}))}):Object(l.jsxs)("div",{className:"galleryHeader__setFilter",onClick:function(){k.setShowFilterSelect(!0)},children:["{click here to"," ",Object(l.jsx)("span",{className:"galleryHeader__wordFilter",children:"filter"})," the results}"]})}),Object(l.jsx)("div",{className:"galleryHeader__right",children:Object(l.jsx)(T.a,{placement:"bottomRight",title:Object(l.jsxs)("span",{children:[Object(l.jsx)("b",{children:"TIP: "}),"You can use the \u2190 and \u2192 keys to navigate through the pages, and the \u2191 and \u2193 keys to scroll the page."]}),children:Object(l.jsxs)("div",{className:"galleryHeader__pageInfo",children:[Object(l.jsxs)("div",{className:"galleryHeader__BigFont",children:[Object(l.jsxs)("b",{children:["Page ",k.pageNumber]}),Object(l.jsxs)("span",{style:{fontSize:"0.7em"},children:[" ","/"," ",Math.ceil(k.totalPictures/k.PAGE_SIZE,0)]})]}),Object(l.jsxs)("div",{className:"galleryHeader__SmallFont",children:[(k.pageNumber-1)*k.PAGE_SIZE+1,"-",Math.min(k.pageNumber*k.PAGE_SIZE,k.totalPictures)," ","of ",k.totalPictures]})]})})})]})})),R=(r(138),Object(h.a)((function(){var e=Object(n.useRef)(!1);Object(n.useEffect)((function(){k.galleryNeedsRefresh&&(k.fetchPictures(),k.setGalleryNeedsRefresh(!1))}),[k.galleryNeedsRefresh]);var t=Object(n.useCallback)((function(e){var t,r=.8*window.innerHeight,n=window.scrollY;"down"===e?t=n+r:"up"===e&&(t=Math.max(n-r,0)),window.scroll({top:t,left:0,behavior:"smooth"})}),[]),r=Object(n.useCallback)((function(r){var n=r.key.toLowerCase();"arrowright"!==n&&"arrowleft"!==n&&"arrowdown"!==n&&"arrowup"!==n||(r.preventDefault(),k.showOverlay||!1===e.current&&(e.current=!0,"arrowright"!==n||k.lastPageReached?"arrowleft"===n&&k.pageNumber>1?(k.setShowFilterSelect(!1),k.nextPageHandler(!1)):"arrowdown"===n?t("down"):"arrowup"===n&&t("up"):(k.setShowFilterSelect(!1),k.nextPageHandler(!0)),setTimeout((function(){e.current=!1}),100)))}),[t]);return Object(n.useEffect)((function(){return document.addEventListener("keydown",r),function(){document.removeEventListener("keydown",r)}}),[r]),Object(l.jsxs)("div",{className:"gallery",children:[Object(l.jsx)(H,{}),k.isGalleryLoading?Object(l.jsxs)("div",{className:"App__flex",children:[Object(l.jsx)(p.a,{className:"Gallery__spinner"}),Object(l.jsx)("div",{className:"gallery__spinnerText",children:"loading"})]}):Object(l.jsxs)(n.Fragment,{children:[k.showOverlay&&Object(l.jsx)(B,{}),Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"gallery__main",children:k.allPictures.map((function(e,t){return Object(l.jsx)("div",{className:"gallery__picSpacer",children:Object(l.jsx)(S,{picture:e},e.id)})}))}),Object(l.jsx)("div",{className:"gallery__next",children:Object(l.jsxs)("div",{className:"gallery__nextTextContainer",children:[1===k.pageNumber?"Previous":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return k.nextPageHandler(!1)},children:"Previous"})," |\xa0",k.lastPageReached?"Next":Object(l.jsx)("span",{className:"gallery__nextText",onClick:function(){return k.nextPageHandler(!0)},children:"Next"})]})})]})]})]})}))),G=r(159),U=r(160),M=r(106),z=r(158),A=r(149),J=r(155),Z=r(156),W=r(157),Y=function(){var e=Object(j.a)(b.a.mark((function e(t){var r,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={tag_name:t},e.next=3,x()({url:"https://kinkograph.herokuapp.com/tags/",method:"POST",data:r});case 3:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=10;break}if(401!==n.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(n.status));case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(j.a)(b.a.mark((function e(t,r){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={tags:JSON.stringify(t)},e.next=3,x()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(r),method:"PATCH",data:n});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}if(401!==a.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(a.status));case 10:return e.abrupt("return",a.data);case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),V=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x()({url:"https://kinkograph.herokuapp.com"+"/pictures/".concat(t),method:"DELETE"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=(r(139),function(e){var t=Object(n.useState)([]),r=Object(i.a)(t,2),a=r[0],s=r[1],c=Object(n.useState)([]),o=Object(i.a)(c,2),u=o[0],d=o[1],p=Object(n.useState)(!1),h=Object(i.a)(p,2),f=h[0],m=h[1],g=L.a.Option,v=Object(n.useCallback)(Object(j.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y();case 3:t=e.sent,d(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),[]),x=Object(n.useCallback)((function(t){e.setShowUploader&&e.setShowUploader(!0),e.setShowDrawer(!1),t&&e.reload()}),[e]);Object(n.useEffect)((function(){v(),null!==JSON.parse(e.picture.tags)&&s(JSON.parse(e.picture.tags))}),[v,e.picture.tags]);var O=Object(n.useCallback)(function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.map((function(e){return D(e)})),s(r);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),w=Object(n.useCallback)(Object(j.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a.length>0)){t.next=6;break}return t.next=3,a.map(function(){var e=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(u.findIndex((function(e){return e===D(t)}))<0)){e.next=6;break}return e.next=4,Y(t);case 4:"success"===e.sent.value&&console.log("".concat(t," was added to the lists of tags."));case 6:return e.abrupt("return",void 0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:return t.next=5,K(a,e.picture.id);case 5:x(!0);case 6:case"end":return t.stop()}}),t)}))),[a,u,x,e.picture.id]),_=Object(n.useCallback)(function(){var e=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==f){e.next=6;break}return e.next=3,V(t);case 3:x(!0),e.next=8;break;case 6:m(!0),setTimeout((function(){m(!1)}),2e3);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[f,x]);return Object(l.jsxs)(A.a,{title:Object(l.jsxs)("span",{className:"Drawer__Title",children:["Edit picture id #",e.picture.id]}),placement:"left",closable:!0,onClose:function(){return x(!1)},visible:e.showDrawer,width:"42.5%",children:[Object(l.jsx)("div",{className:"Drawer__font",children:"Preview:"}),Object(l.jsx)("img",{className:"Drawer_picture",src:e.picture.url_med,alt:e.picture.id,style:{maxWidth:"100%",maxHeight:window.innerHeight/2.5}},e.picture.id),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("div",{className:"Drawer__font",children:"Tags:"}),Object(l.jsx)(L.a,{mode:"tags",allowClear:!1,style:{width:"100%"},placeholder:"Add some tags",onChange:O,defaultValue:null!==e.picture.tags?JSON.parse(e.picture.tags):void 0,children:u.map((function(e){return Object(l.jsx)(g,{children:D(e.tag_name)},D(e.tag_name))}))}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"Drawer__buttonContainer",children:[Object(l.jsxs)("div",{className:a.length<1?"Drawer__buttonDisabled":"Drawer__button",onClick:w,children:[Object(l.jsx)(J.a,{})," \xa0 Save"]}),Object(l.jsx)("div",{className:f?"Drawer__buttonConfirmAction":"Drawer__button",onClick:function(){return _(e.picture.key)},children:f?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(Z.a,{})," ARE YOU SURE",Object(l.jsx)(W.a,{})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(Z.a,{}),"\xa0 Delete"]})})]})]},"drawer".concat(e.picture.id))}),Q=(r(140),function(e){var t=Object(n.useState)(!1),r=Object(i.a)(t,2),a=r[0],s=r[1],c=Object(n.useState)(!1),o=Object(i.a)(c,2),u=o[0],d=o[1],p=function(t){if(null===e.totalMissingTag){s(t);var r=document.getElementById(e.picture.id);r.style.filter=t?"brightness(50%) blur(2px)":"brightness(100%) blur(0px)"}},h=function(){setTimeout((function(){e.setShowUploader(!1)}),300),d(!0)};return Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)(q,{picture:e.picture,showDrawer:u,setShowDrawer:d,reload:e.reload,setShowUploader:e.setShowUploader}),Object(l.jsxs)("div",{className:"EditPictures__missingPicture",children:[null===e.totalMissingTag?a&&Object(l.jsx)("div",{className:"EditPictures__missingPictureOverText",onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:h,children:Object(l.jsx)(z.a,{})}):Object(l.jsxs)("div",{className:"EditPictures__missingPictureRest",children:["+",e.totalMissingTag]}),Object(l.jsx)("img",{className:e.totalMissingTag&&"EditPictures__bluryGray",id:e.picture.id,src:e.picture.url_thumb,alt:e.picture.id,width:e.size,height:e.size,onMouseEnter:function(){return p(!0)},onMouseLeave:function(){return p(!1)},onClick:h})]})]})}),X=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("file",t),e.prev=2,e.next=5,x.a.post("https://kinkograph.herokuapp.com/pictures",r);case 5:return e.abrupt("return","success");case 8:return e.prev=8,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return","error");case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(j.a)(b.a.mark((function e(t){var r,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={name:t},e.next=3,x()({url:"https://kinkograph.herokuapp.com/pictures/duplicate",method:"POST",data:r});case 3:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=10;break}if(401!==n.status){e.next=9;break}throw new Error("Error! Unauthorized(401)");case 9:throw new Error("Error! Status ".concat(n.status));case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x()({url:"https://kinkograph.herokuapp.com"+"/pictures/tagsmissing/".concat(t),method:"GET"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x()({url:"https://kinkograph.herokuapp.com/pictures/tagsmissingcount/",method:"GET"});case 2:if(!(200!==(r=e.sent).status&201!==r.status)){e.next=9;break}if(401!==r.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(r.status));case 9:return e.abrupt("return",r.data[0].count);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=(r(141),function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),r=t[0],a=t[1],s=Object(n.useState)(!1),c=Object(i.a)(s,2),o=c[0],u=c[1],d=Object(n.useState)([]),h=Object(i.a)(d,2),f=h[0],m=h[1],g=Object(n.useState)(!0),v=Object(i.a)(g,2),x=v[0],O=v[1],w=Object(n.useState)([0,0]),y=Object(i.a)(w,2),_=y[0],k=y[1],N=Object(n.useState)(void 0),E=Object(i.a)(N,2),S=E[0],P=E[1],C=Object(n.useState)(null),I=Object(i.a)(C,2),F=I[0],T=I[1],B=Object(n.useCallback)(function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(t);case 2:r=e.sent,M.a[r]({message:"Upload ".concat(r),description:"File: ".concat(t.name)});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),L=Object(n.useCallback)(Object(j.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te();case 3:t=e.sent,T(t-S),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[S]),D=Object(n.useCallback)((function(){var e=window.innerWidth,t=window.innerHeight,r=Math.floor(.4*e),n=Math.floor(.75*t),a=Math.floor(r/184)*Math.floor(n/180);return P(a),a}),[]),H=Object(n.useCallback)(Object(j.a)(b.a.mark((function e(){var t,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D();case 3:return t=e.sent,e.next=6,ee(t);case 6:return r=e.sent,e.next=9,L();case 9:m(r),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])}))),[L,D]),R=Object(n.useCallback)(function(){var e=Object(j.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a(!0),!t.target.files[0]){e.next=12;break}return r=t.target.files[0].name.split(".")[0],e.next=5,$(r);case 5:if(0!==e.sent.length){e.next=11;break}return e.next=9,B(t.target.files[0]);case 9:e.next=12;break;case 11:M.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(t.target.files[0].name,"'")});case 12:a(!1),setTimeout((function(){H(S)}),500);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[H,S,B]);Object(n.useEffect)((function(){return H(),window.addEventListener("resize",D),function(){window.removeEventListener("resize",D)}}),[H,D]);var z=function(){var e=Object(j.a)(b.a.mark((function e(t){var r,n,s,c,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),t.stopPropagation(),r=t.dataTransfer.files,n=r.length,k([0,n]),s=0;case 6:if(!(s<n)){e.next=24;break}if(a(!0),k([s,n]),!r[s]){e.next=21;break}return c=r[s],i=c.name.split(".")[0],e.next=14,$(i);case 14:if(0!==e.sent.length){e.next=20;break}return e.next=18,B(c);case 18:e.next=21;break;case 20:M.a.warning({message:"Duplicate? ",description:"There is already a file named '".concat(i,"'")});case 21:s++,e.next=6;break;case 24:k([0,0]),a(!1),setTimeout((function(){H(S)}),1e3);case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"Uploader__container",children:[Object(l.jsx)("div",{className:"Uploader__formContainer",children:x&&Object(l.jsx)("div",{className:"Uploader__formContent",style:f.length?{width:"50vw"}:{width:"100vw"},children:Object(l.jsxs)("form",{onSubmit:B,children:[Object(l.jsx)("input",{type:"file",className:"inputfile",name:"inputfile",id:"file",onChange:R}),r?Object(l.jsxs)("label",{htmlFor:"file",style:f.length?{width:"35vw"}:{width:"75vw"},children:[Object(l.jsx)(p.a,{className:"Uploader__spinner"}),_[1]?Object(l.jsxs)("p",{className:"form-upload-text",children:[_[0]," of ",_[1]]}):Object(l.jsx)("p",{className:"form-upload-text",children:"Loading"})]}):Object(l.jsx)("label",{htmlFor:"file",onDrop:z,onDragOver:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},onDragEnter:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!0)}(e)},onDragLeave:function(e){return function(e){e.preventDefault(),e.stopPropagation(),u(!1)}(e)},style:f.length?{width:"35vw"}:{width:"75vw"},children:o?Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(U.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Drop your files here ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"Multiple files supported"})]}),Object(l.jsx)("p",{className:"form-upload-text"})]}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("p",{className:"form-upload-drag-icon",children:Object(l.jsx)(G.a,{})}),Object(l.jsxs)("p",{className:"form-upload-hint",children:["Click, or drag here a file ",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"jpg and png file only"})]})]})})]})})}),f.length>0&&Object(l.jsx)("div",{className:"Uploader__missingContainer",children:Object(l.jsx)("div",{className:"Uploader__missingContent",children:f.map((function(e,t){return Object(l.jsx)(Q,{picture:e,size:150,setShowUploader:O,reload:H,totalMissingTag:t+1===S?F:null},e.id)}))})})]})}),ne=(r(142),function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),r=t[0],a=t[1];return Object(l.jsx)(o.a,{children:Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("div",{className:"App__main",children:Object(l.jsxs)(u.c,{children:[Object(l.jsx)(u.a,{path:"/admin",children:Object(l.jsx)(re,{})}),Object(l.jsx)(u.a,{path:"/",children:Object(l.jsx)("div",{className:"App__flex",children:r?Object(l.jsx)(R,{}):Object(l.jsxs)(n.Fragment,{children:[Object(l.jsx)("div",{className:"App__title",children:"\xa0kinkograph"}),Object(l.jsx)(d,{login:function(e){"555666"===e&&a(!0)}}),Object(l.jsx)("div",{className:"spacer"})]})})})]})})})})}),ae=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,161)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))};c.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(ne,{})}),document.getElementById("root")),ae()}},[[146,1,2]]]);
//# sourceMappingURL=main.564165f8.chunk.js.map