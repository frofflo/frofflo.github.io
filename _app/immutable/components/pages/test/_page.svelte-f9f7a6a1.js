import{S as K,i as N,s as O,k as f,q as b,a as x,l as _,m as h,r as E,h as l,c as M,n as v,p as C,b as i,D as S,K as q,B as T,M as P}from"../../../chunks/index-44f49dd7.js";function U(r){let t,m,n,a,u,d,s,p,c,y,k,g;return{c(){t=f("h3"),m=b("Sample Text 1"),n=x(),a=f("h2"),u=b("Sample Text 2"),d=x(),s=f("div"),p=x(),c=f("button"),y=b("Click to change color"),this.h()},l(e){t=_(e,"H3",{id:!0,style:!0});var o=h(t);m=E(o,"Sample Text 1"),o.forEach(l),n=M(e),a=_(e,"H2",{id:!0,style:!0});var B=h(a);u=E(B,"Sample Text 2"),B.forEach(l),d=M(e),s=_(e,"DIV",{class:!0,id:!0,style:!0});var H=h(s);H.forEach(l),p=M(e),c=_(e,"BUTTON",{});var I=h(c);y=E(I,"Click to change color"),I.forEach(l),this.h()},h(){v(t,"id","pick"),C(t,"color","red"),v(a,"id","pick1"),C(a,"color","green"),v(s,"class","randColor svelte-e860gy"),v(s,"id","pick2"),C(s,"background-color","blue")},m(e,o){i(e,t,o),S(t,m),i(e,n,o),i(e,a,o),S(a,u),i(e,d,o),i(e,s,o),i(e,p,o),i(e,c,o),S(c,y),k||(g=[q(c,"click",D),q(c,"keypress",D)],k=!0)},p:T,i:T,o:T,d(e){e&&l(t),e&&l(n),e&&l(a),e&&l(d),e&&l(s),e&&l(p),e&&l(c),k=!1,P(g)}}}function D(){var r=["#794e2e","#ac8a5e","#ceb288","#bf9d70","#d5c1a5","#441f15","#9f7547","#552b1d","#8b7269"],t=r[Math.floor(Math.random()*r.length)],m=document.getElementById("pick");m.style.color=t;var n=r[Math.floor(Math.random()*r.length)],a=document.getElementById("pick1");a.style.color=n;var u=r[Math.floor(Math.random()*r.length)],d=document.getElementById("pick2");d.style.backgroundColor=u}class j extends K{constructor(t){super(),N(this,t,null,U,O,{})}}export{j as default};
