(this.webpackJsonpview=this.webpackJsonpview||[]).push([[12],{100:function(e,t,n){e.exports={logo:"styles_logo__3cKcF",container:"styles_container__2oyZY","bar-1":"styles_bar-1__1BMPA",animation:"styles_animation__ST-CD","bar-2":"styles_bar-2__1N_JJ","bar-3":"styles_bar-3__23G03"}},101:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var r=n(46),i=n(229),a=n(231),s=n(204),o=n(232),c=n(233),d=n(226),l=n(0),j=n.n(l),h=n(99),b=n.n(h),u=n(47),x=n(48),O=n(49),p=n(50),f=n(100),m=n.n(f),w=n(3),g=function(e){Object(O.a)(n,e);var t=Object(p.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(x.a)(n,[{key:"render",value:function(){return Object(w.jsx)("div",{className:m.a.logo,children:Object(w.jsxs)("div",{className:m.a.container,children:[Object(w.jsx)("div",{className:m.a["bar-1"]}),Object(w.jsx)("div",{className:m.a["bar-2"]}),Object(w.jsx)("div",{className:m.a["bar-3"]})]})})}}]),n}(j.a.Component),v=n(51);function y(){var e=Object(l.useState)(window.innerWidth),t=Object(r.a)(e,2),n=t[0],j=t[1],h=Object(l.useState)(!1),u=Object(r.a)(h,2),x=u[0],O=u[1];window.addEventListener("resize",(function(){j(window.innerWidth)}));var p=Object(l.useRef)(null);return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(i.a,{sx:{backgroundColor:"#ffff",maxWidth:"100vw"},children:Object(w.jsx)(a.a,{children:Object(w.jsxs)(s.a,{direction:"row",justifyContent:"space-between",width:"100%",alignItems:"center",children:[Object(w.jsxs)(o.a,{sx:{borderRadius:"10px"},onClick:function(){window.location.href="/"},children:[Object(w.jsx)(g,{}),Object(w.jsx)(c.a,{sx:{marginLeft:"0.3rem"},variant:"h6",color:"primary",fontFamily:"Poppins, sans-serif",fontWeight:"bolder",letterSpacing:"1px",children:"Live poll"})]}),n>780&&Object(w.jsxs)(s.a,{className:b.a["links-container"],direction:"row",justifyContent:"space-between",alignItems:"center",spacing:3,children:[Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/create",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Create"})}),Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/#",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Explore"})}),Object(v.a)()&&!window.location.pathname.includes("dashboard")&&Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/dashboard",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Dashboard"})}),!Object(v.a)()&&Object(w.jsxs)(s.a,{direction:"row",justifyContent:"space-between",alignItems:"center",spacing:4,sx:{marginLeft:"500px"},children:[Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/signup",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Sign up"})}),Object(w.jsx)(d.a,{href:"#",onClick:function(){window.location.href="/signin"},variant:"contained",sx:{textTransform:"none"},size:"small",children:"Sign in"})]})]}),n<=780&&Object(w.jsxs)(s.a,{id:"nav-bar","data-open":x,className:b.a["links-container"],direction:"column",justifyContent:"space-between",ref:p,alignItems:"flex-start",spacing:1.5,children:[Object(w.jsx)(c.a,{sx:{font:"inherit",marginLeft:"0.3rem"},variant:"body1",children:Object(w.jsx)("a",{href:"/create",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Create"})}),Object(w.jsx)("span",{}),Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/#",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Explore"})}),Object(w.jsx)("span",{}),Object(v.a)()&&!window.location.pathname.includes("dashboard")&&Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/dashboard",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Dashboard"})}),!Object(v.a)()&&Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(c.a,{sx:{font:"inherit"},variant:"body1",children:Object(w.jsx)("a",{href:"/signup",style:{color:"inherit",textDecoration:"none",font:"inherit"},children:"Sign Up"})}),Object(w.jsx)("span",{}),Object(w.jsx)(d.a,{variant:"contained",onClick:function(){window.location.href="/signin"},sx:{textTransform:"none"},size:"small",children:"Sign In"})]})]}),Object(w.jsxs)("div",{className:b.a.menu,id:"menu","data-open":x,onClick:function(e){O(!x)},children:[Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{})]})]})})})})}},159:function(e,t,n){e.exports={container:"signin_container__7pokD",wrapper:"signin_wrapper__1xg3Z",icon:"signin_icon__YW39M"}},218:function(e,t,n){"use strict";n.r(t),n.d(t,"Signin",(function(){return O}));var r=n(46),i=n(0),a=n(159),s=n.n(a),o=n(129),c=n(132),d=n(221),l=n(136),j=n(226),h=n(101),b=n(14),u=n(51),x=n(3),O=function(){var e=Object(i.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],O=Object(i.useState)(""),p=Object(r.a)(O,2),f=p[0],m=p[1],w=Object(i.useState)(""),g=Object(r.a)(w,2),v=g[0],y=g[1],C=Object(i.useState)(!1),_=Object(r.a)(C,2),k=_[0],S=_[1],E=Object(i.useState)("info"),L=Object(r.a)(E,2),N=L[0],I=L[1],M=Object(i.useState)(""),D=Object(r.a)(M,2),B=D[0],Z=D[1],T=Object(i.useState)(""),V=Object(r.a)(T,2),W=V[0],H=V[1],P=Object(i.useState)(!1),R=Object(r.a)(P,2),q=R[0],J=R[1],z=Object(i.useState)(!1),A=Object(r.a)(z,2),F=A[0],U=A[1],Y=Object(i.useState)(!1),G=Object(r.a)(Y,2),K=G[0],Q=G[1];return Object(x.jsxs)("div",{className:s.a.container,children:[Object(x.jsx)(h.a,{}),Object(x.jsxs)("div",{children:[Object(x.jsx)(o.a,{mountOnEnter:!0,unmountOnExit:!0,in:k,children:Object(x.jsxs)(c.a,{severity:N,title:W,children:[B," "]})}),Object(x.jsxs)("div",{className:s.a.wrapper,children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{className:s.a.icon,children:Object(x.jsx)("svg",{width:"39",height:"51",viewBox:"0 0 39 51",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(x.jsx)("path",{d:"M34.0206 16.941H31.6005V12.1007C31.6005 5.42111 26.1794 0 19.4998 0C12.8202 0 7.39909 5.42111 7.39909 12.1007V16.941H4.97895C2.3168 16.941 0.138672 19.1191 0.138672 21.7812V45.9826C0.138672 48.6448 2.3168 50.8229 4.97895 50.8229H34.0206C36.6828 50.8229 38.8609 48.6448 38.8609 45.9826V21.7812C38.8609 19.1191 36.6828 16.941 34.0206 16.941ZM12.2394 12.1007C12.2394 8.08326 15.4824 4.84028 19.4998 4.84028C23.5172 4.84028 26.7602 8.08326 26.7602 12.1007V16.941H12.2394V12.1007ZM34.0206 45.9826H4.97895V21.7812H34.0206V45.9826ZM19.4998 38.7222C22.1619 38.7222 24.3401 36.5441 24.3401 33.8819C24.3401 31.2198 22.1619 29.0417 19.4998 29.0417C16.8376 29.0417 14.6595 31.2198 14.6595 33.8819C14.6595 36.5441 16.8376 38.7222 19.4998 38.7222Z",fill:"white"})})}),Object(x.jsx)("p",{children:"Sign In"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)(d.a,{id:"user_name",value:n,onChange:function(e){a(e.target.value)},label:"user name",variant:"outlined",required:!0,placeholder:"user name",maxRows:1,error:q,rows:1,type:"email",InputProps:{startAdornment:Object(x.jsx)(l.a,{position:"start",children:Object(x.jsxs)("svg",{width:"19",height:"21",viewBox:"0 0 19 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(x.jsx)("path",{d:"M17.0618 19.0782V17.0741C17.0618 16.0112 16.6396 14.9917 15.8879 14.2401C15.1363 13.4884 14.1168 13.0661 13.0538 13.0661H5.0378C3.97481 13.0661 2.95535 13.4884 2.20371 14.2401C1.45206 14.9917 1.02979 16.0112 1.02979 17.0741V19.0782",stroke:"#9C19E0",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),Object(x.jsx)("path",{d:"M9.04561 9.05812C11.2592 9.05812 13.0536 7.26367 13.0536 5.0501C13.0536 2.83653 11.2592 1.04208 9.04561 1.04208C6.83205 1.04208 5.0376 2.83653 5.0376 5.0501C5.0376 7.26367 6.83205 9.05812 9.04561 9.05812Z",stroke:"#9C19E0",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})})}}),Object(x.jsx)(d.a,{id:"password",value:f,onChange:function(e){m(e.target.value)},label:"password",variant:"outlined",required:!0,placeholder:"password",maxRows:1,error:F,rows:1,type:"password",InputProps:{startAdornment:Object(x.jsx)(l.a,{position:"start",children:Object(x.jsx)("svg",{width:"19",height:"18",viewBox:"0 0 19 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(x.jsx)("path",{d:"M11.8361 5.46797L14.6513 2.65277M16.2599 1.04409L14.6513 2.65277L16.2599 1.04409ZM8.53023 8.77381C8.94554 9.1836 9.27569 9.67149 9.50168 10.2094C9.72766 10.7473 9.845 11.3246 9.84696 11.908C9.84891 12.4915 9.73544 13.0695 9.51306 13.6089C9.29069 14.1484 8.96382 14.6384 8.55126 15.051C8.1387 15.4636 7.64861 15.7904 7.1092 16.0128C6.56979 16.2352 5.99173 16.3487 5.40828 16.3467C4.82484 16.3448 4.24755 16.2274 3.70964 16.0014C3.17174 15.7754 2.68385 15.4453 2.27406 15.03C1.46822 14.1956 1.02231 13.0781 1.03239 11.9182C1.04247 10.7583 1.50773 9.64873 2.32795 8.8285C3.14817 8.00828 4.25774 7.54303 5.41766 7.53295C6.57759 7.52287 7.69507 7.96877 8.52942 8.77462L8.53023 8.77381ZM8.53023 8.77381L11.8361 5.46797L8.53023 8.77381ZM11.8361 5.46797L14.2491 7.88099L17.0643 5.0658L14.6513 2.65277L11.8361 5.46797Z",stroke:"#9C19E0",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})}}),Object(x.jsx)(d.a,{id:"retyped_password",value:v,onChange:function(e){y(e.target.value)},label:"Retype password",variant:"outlined",required:!0,placeholder:"Retype password",maxRows:1,error:K,rows:1,type:"password"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)(j.a,{onClick:function(){S(!1),J(!1),U(!1),Q(!1),function(){var e,t,r,i,a,s,o;return n.includes(" ")?(null===(e=document.getElementById("user_name"))||void 0===e||e.focus(),J(!0),S(!0),I("warning"),Z("No empty spaces are allowed."),H("Error!"),!1):f.includes(" ")?(null===(t=document.getElementById("password"))||void 0===t||t.focus(),U(!0),S(!0),I("warning"),Z("No empty spaces are allowed."),H("Error!"),!1):n.length<=8?(null===(r=document.getElementById("user_name"))||void 0===r||r.focus(),J(!0),S(!0),I("warning"),Z("Number of character in User Name should be greater than 8."),H("Error!"),!1):f.length<=8?(null===(i=document.getElementById("password"))||void 0===i||i.focus(),J(!0),S(!0),I("warning"),Z("Number of character in Password should be greater than 8."),H("Error!"),!1):n===" ".repeat(n.length)||n.length<=0?(null===(a=document.getElementById("user_name"))||void 0===a||a.focus(),J(!0),S(!0),I("error"),Z("Username is required!"),H("Error!"),Q(!0),!1):f===" ".repeat(f.length)||f.length<=0?(null===(s=document.getElementById("password"))||void 0===s||s.focus(),U(!0),S(!0),I("error"),Z("Password is required!"),H("Error!"),Q(!0),!1):v===" ".repeat(v.length)||v.length<=0?(null===(o=document.getElementById("retyped_password"))||void 0===o||o.focus(),Q(!0),S(!0),I("error"),Z("Confirm password field is empty!"),H("Error!"),Q(!0),!1):v===f||(y(""),S(!0),I("error"),Z("Those passwords didn't match,Try again."),H("Mismatch!"),Q(!0),!1)}()&&fetch("".concat(b.b,"/register"),{method:"POST",body:JSON.stringify({username:n,password:f}),mode:"cors",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){e.json().then((function(e){if(e.msg){if(e.error)return S(!0),I("warning"),Z(e.msg),void Q(!0);S(!0),I("success"),Z(e.msg),H("Success"),Object(u.h)(!0),window.location.href="/dashboard"}}))}))},sx:{textTransform:"none"},variant:"contained",size:"medium",children:"Sign In"}),Object(x.jsx)("a",{href:"signup",children:"I Already have an account? Sign Up"})]})]})]})]})};t.default=O},99:function(e,t,n){e.exports={"links-container":"navbar_links-container__YEkT3",menu:"navbar_menu__2TCgy"}}}]);
//# sourceMappingURL=12.fe8752d2.chunk.js.map