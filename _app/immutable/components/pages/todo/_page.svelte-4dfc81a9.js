import{S as j,i as z,s as G,k as f,q as C,a as L,l as p,m as N,r as U,h as w,c as B,n as k,b as S,D as l,_ as F,K as V,B as J,L as Q,M as W,J as K,u as X}from"../../../chunks/index-1af5a604.js";function M(s,e,t){const o=s.slice();return o[7]=e[t],o[8]=e,o[9]=t,o}function O(s){let e,t,o,n,v=s[7].text+"",E,h,m,b,_,T,y,g;function P(){s[5].call(t,s[8],s[9])}function A(){return s[6](s[9])}return{c(){e=f("div"),t=f("input"),o=L(),n=f("span"),E=C(v),h=L(),m=f("span"),b=C("\u274C"),_=L(),T=f("br"),this.h()},l(i){e=p(i,"DIV",{class:!0});var u=N(e);t=p(u,"INPUT",{type:!0,class:!0}),o=B(u),n=p(u,"SPAN",{class:!0});var I=N(n);E=U(I,v),I.forEach(w),h=B(u),m=p(u,"SPAN",{});var c=N(m);b=U(c,"\u274C"),c.forEach(w),u.forEach(w),_=B(i),T=p(i,"BR",{}),this.h()},h(){k(t,"type","checkbox"),k(t,"class","svelte-rmbcvw"),k(n,"class","svelte-rmbcvw"),K(n,"checked",s[7].status),k(e,"class","row svelte-rmbcvw")},m(i,u){S(i,e,u),l(e,t),t.checked=s[7].status,l(e,o),l(e,n),l(n,E),l(e,h),l(e,m),l(m,b),S(i,_,u),S(i,T,u),y||(g=[V(t,"change",P),V(m,"click",A)],y=!0)},p(i,u){s=i,u&2&&(t.checked=s[7].status),u&2&&v!==(v=s[7].text+"")&&X(E,v),u&2&&K(n,"checked",s[7].status)},d(i){i&&w(e),i&&w(_),i&&w(T),y=!1,W(g)}}}function Y(s){let e,t,o,n,v,E,h,m,b,_,T,y,g,P,A,i,u,I=s[1],c=[];for(let a=0;a<I.length;a+=1)c[a]=O(M(s,I,a));return{c(){e=f("div"),t=f("h1"),o=C("Todo List"),n=L(),v=f("hr"),E=L(),h=f("input"),m=L(),b=f("button"),_=C("Add"),T=L(),y=f("center"),g=f("div"),P=f("br"),A=L();for(let a=0;a<c.length;a+=1)c[a].c();this.h()},l(a){e=p(a,"DIV",{class:!0});var d=N(e);t=p(d,"H1",{class:!0});var r=N(t);o=U(r,"Todo List"),r.forEach(w),n=B(d),v=p(d,"HR",{class:!0}),E=B(d),h=p(d,"INPUT",{class:!0,type:!0,placeholder:!0}),m=B(d),b=p(d,"BUTTON",{class:!0});var D=N(b);_=U(D,"Add"),D.forEach(w),T=B(d),y=p(d,"CENTER",{});var H=N(y);g=p(H,"DIV",{class:!0});var R=N(g);P=p(R,"BR",{}),A=B(R);for(let q=0;q<c.length;q+=1)c[q].l(R);R.forEach(w),H.forEach(w),d.forEach(w),this.h()},h(){k(t,"class","svelte-rmbcvw"),k(v,"class","hr svelte-rmbcvw"),k(h,"class","inputClass svelte-rmbcvw"),k(h,"type","text"),k(h,"placeholder","Write something you want to do..."),k(b,"class","svelte-rmbcvw"),k(g,"class","textBackground svelte-rmbcvw"),k(e,"class","background svelte-rmbcvw")},m(a,d){S(a,e,d),l(e,t),l(t,o),l(e,n),l(e,v),l(e,E),l(e,h),F(h,s[0]),l(e,m),l(e,b),l(b,_),l(e,T),l(e,y),l(y,g),l(g,P),l(g,A);for(let r=0;r<c.length;r+=1)c[r].m(g,null);i||(u=[V(h,"input",s[4]),V(b,"click",s[2])],i=!0)},p(a,[d]){if(d&1&&h.value!==a[0]&&F(h,a[0]),d&10){I=a[1];let r;for(r=0;r<I.length;r+=1){const D=M(a,I,r);c[r]?c[r].p(D,d):(c[r]=O(D),c[r].c(),c[r].m(g,null))}for(;r<c.length;r+=1)c[r].d(1);c.length=I.length}},i:J,o:J,d(a){a&&w(e),Q(c,a),i=!1,W(u)}}}function Z(s,e,t){let o="",n=[];function v(){t(1,n=[...n,{text:o,status:!1}]),t(0,o="")}function E(_){n.splice(_,1),t(1,n)}function h(){o=this.value,t(0,o)}function m(_,T){_[T].status=this.checked,t(1,n)}return[o,n,v,E,h,m,_=>E(_)]}class x extends j{constructor(e){super(),z(this,e,Z,Y,G,{})}}export{x as default};