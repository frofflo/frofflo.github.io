import{S as j,i as z,s as G,k as f,q as V,a as B,l as p,m as L,r as w,h as E,c as P,n as k,b as U,D as l,U as F,J as C,B as J,Q as M,K as W,V as K,u as X}from"../../../chunks/index-d8bf5802.js";function O(s,e,t){const o=s.slice();return o[7]=e[t],o[8]=e,o[9]=t,o}function Q(s){let e,t,o,n,v=s[7].text+"",T,h,b,m,_,y,I,g;function A(){s[5].call(t,s[8],s[9])}function D(){return s[6](s[9])}return{c(){e=f("div"),t=f("input"),o=B(),n=f("span"),T=V(v),h=B(),b=f("span"),m=V("\u274C"),_=B(),y=f("br"),this.h()},l(i){e=p(i,"DIV",{class:!0});var u=L(e);t=p(u,"INPUT",{type:!0,class:!0}),o=P(u),n=p(u,"SPAN",{class:!0});var N=L(n);T=w(N,v),N.forEach(E),h=P(u),b=p(u,"SPAN",{});var r=L(b);m=w(r,"\u274C"),r.forEach(E),u.forEach(E),_=P(i),y=p(i,"BR",{}),this.h()},h(){k(t,"type","checkbox"),k(t,"class","svelte-5btr50"),k(n,"class","svelte-5btr50"),K(n,"checked",s[7].status),k(e,"class","row svelte-5btr50")},m(i,u){U(i,e,u),l(e,t),t.checked=s[7].status,l(e,o),l(e,n),l(n,T),l(e,h),l(e,b),l(b,m),U(i,_,u),U(i,y,u),I||(g=[C(t,"change",A),C(b,"click",D)],I=!0)},p(i,u){s=i,u&2&&(t.checked=s[7].status),u&2&&v!==(v=s[7].text+"")&&X(T,v),u&2&&K(n,"checked",s[7].status)},d(i){i&&E(e),i&&E(_),i&&E(y),I=!1,W(g)}}}function Y(s){let e,t,o,n,v,T,h,b,m,_,y,I,g,A,D,i,u,N=s[1],r=[];for(let a=0;a<N.length;a+=1)r[a]=Q(O(s,N,a));return{c(){e=f("div"),t=f("h1"),o=V("Todo List"),n=B(),v=f("hr"),T=B(),h=f("input"),b=B(),m=f("button"),_=V("Add"),y=B(),I=f("center"),g=f("div"),A=f("br"),D=B();for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){e=p(a,"DIV",{class:!0});var d=L(e);t=p(d,"H1",{class:!0});var c=L(t);o=w(c,"Todo List"),c.forEach(E),n=P(d),v=p(d,"HR",{class:!0}),T=P(d),h=p(d,"INPUT",{class:!0,type:!0,placeholder:!0}),b=P(d),m=p(d,"BUTTON",{class:!0});var R=L(m);_=w(R,"Add"),R.forEach(E),y=P(d),I=p(d,"CENTER",{});var H=L(I);g=p(H,"DIV",{class:!0});var S=L(g);A=p(S,"BR",{}),D=P(S);for(let q=0;q<r.length;q+=1)r[q].l(S);S.forEach(E),H.forEach(E),d.forEach(E),this.h()},h(){k(t,"class","svelte-5btr50"),k(v,"class","hr svelte-5btr50"),k(h,"class","inputClass svelte-5btr50"),k(h,"type","text"),k(h,"placeholder","Write something you want to do..."),k(m,"class","svelte-5btr50"),k(g,"class","textBackground svelte-5btr50"),k(e,"class","background svelte-5btr50")},m(a,d){U(a,e,d),l(e,t),l(t,o),l(e,n),l(e,v),l(e,T),l(e,h),F(h,s[0]),l(e,b),l(e,m),l(m,_),l(e,y),l(e,I),l(I,g),l(g,A),l(g,D);for(let c=0;c<r.length;c+=1)r[c].m(g,null);i||(u=[C(h,"input",s[4]),C(m,"click",s[2])],i=!0)},p(a,[d]){if(d&1&&h.value!==a[0]&&F(h,a[0]),d&10){N=a[1];let c;for(c=0;c<N.length;c+=1){const R=O(a,N,c);r[c]?r[c].p(R,d):(r[c]=Q(R),r[c].c(),r[c].m(g,null))}for(;c<r.length;c+=1)r[c].d(1);r.length=N.length}},i:J,o:J,d(a){a&&E(e),M(r,a),i=!1,W(u)}}}function Z(s,e,t){let o="",n=[];function v(){t(1,n=[...n,{text:o,status:!1}]),t(0,o="")}function T(_){n.splice(_,1),t(1,n)}function h(){o=this.value,t(0,o)}function b(_,y){_[y].status=this.checked,t(1,n)}return[o,n,v,T,h,b,_=>T(_)]}class x extends j{constructor(e){super(),z(this,e,Z,Y,G,{})}}export{x as default};