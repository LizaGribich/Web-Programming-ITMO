(()=>{var e={255:()=>{var e=document.querySelectorAll('input[type="radio"]');function n(){e.forEach((function(e){e.checked&&localStorage.setItem("inputX",e.value)}))}e.forEach((function(e){e.addEventListener("change",n)}));var t=document.getElementById("inputY");t.addEventListener("input",(function(){localStorage.setItem("inputY",t.value)}));var r=document.getElementById("inputR");r.addEventListener("change",(function(){localStorage.setItem("inputR",r.value)})),window.addEventListener("load",(function(){var n,i,o;(n=localStorage.getItem("inputX"))&&e.forEach((function(e){e.value===n&&(e.checked=!0)})),(i=localStorage.getItem("inputY"))&&(t.value=i),(o=localStorage.getItem("inputR"))&&(r.value=o)}))}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}(()=>{"use strict";t(255);var e=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,n=Math.ceil,r=Math.floor,i="[BigNumber Error] ",o=i+"Number primitive has more than 15 significant digits: ",u=1e14,s=14,l=9007199254740991,c=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],f=1e7,a=1e9;function h(e){var n=0|e;return e>0||e===n?n:n-1}function g(e){for(var n,t,r=1,i=e.length,o=e[0]+"";r<i;){for(n=e[r++]+"",t=s-n.length;t--;n="0"+n);o+=n}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function p(e,n){var t,r,i=e.c,o=n.c,u=e.s,s=n.s,l=e.e,c=n.e;if(!u||!s)return null;if(t=i&&!i[0],r=o&&!o[0],t||r)return t?r?0:-s:u;if(u!=s)return u;if(t=u<0,r=l==c,!i||!o)return r?0:!i^t?1:-1;if(!r)return l>c^t?1:-1;for(s=(l=i.length)<(c=o.length)?l:c,u=0;u<s;u++)if(i[u]!=o[u])return i[u]>o[u]^t?1:-1;return l==c?0:l>c^t?1:-1}function d(e,n,t,o){if(e<n||e>t||e!==r(e))throw Error(i+(o||"Argument")+("number"==typeof e?e<n||e>t?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function m(e){var n=e.c.length-1;return h(e.e/s)==n&&e.c[n]%2!=0}function w(e,n){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(n<0?"e":"e+")+n}function v(e,n,t){var r,i;if(n<0){for(i=t+".";++n;i+=t);e=i+e}else if(++n>(r=e.length)){for(i=t,n-=r;--n;i+=t);e+=i}else n<r&&(e=e.slice(0,n)+"."+e.slice(n));return e}const y=function t(y){var E,b,N,O,A,S,I,L,B,x,R=$.prototype={constructor:$,toString:null,valueOf:null},T=new $(1),C=20,M=4,_=-7,D=21,P=-1e7,k=1e7,U=!1,F=1,G=0,q={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},H="0123456789abcdefghijklmnopqrstuvwxyz",j=!0;function $(n,t){var i,u,c,f,a,h,g,p,m=this;if(!(m instanceof $))return new $(n,t);if(null==t){if(n&&!0===n._isBigNumber)return m.s=n.s,void(!n.c||n.e>k?m.c=m.e=null:n.e<P?m.c=[m.e=0]:(m.e=n.e,m.c=n.c.slice()));if((h="number"==typeof n)&&0*n==0){if(m.s=1/n<0?(n=-n,-1):1,n===~~n){for(f=0,a=n;a>=10;a/=10,f++);return void(f>k?m.c=m.e=null:(m.e=f,m.c=[n]))}p=String(n)}else{if(!e.test(p=String(n)))return N(m,p,h);m.s=45==p.charCodeAt(0)?(p=p.slice(1),-1):1}(f=p.indexOf("."))>-1&&(p=p.replace(".","")),(a=p.search(/e/i))>0?(f<0&&(f=a),f+=+p.slice(a+1),p=p.substring(0,a)):f<0&&(f=p.length)}else{if(d(t,2,H.length,"Base"),10==t&&j)return X(m=new $(n),C+m.e+1,M);if(p=String(n),h="number"==typeof n){if(0*n!=0)return N(m,p,h,t);if(m.s=1/n<0?(p=p.slice(1),-1):1,$.DEBUG&&p.replace(/^0\.0*|\./,"").length>15)throw Error(o+n)}else m.s=45===p.charCodeAt(0)?(p=p.slice(1),-1):1;for(i=H.slice(0,t),f=a=0,g=p.length;a<g;a++)if(i.indexOf(u=p.charAt(a))<0){if("."==u){if(a>f){f=g;continue}}else if(!c&&(p==p.toUpperCase()&&(p=p.toLowerCase())||p==p.toLowerCase()&&(p=p.toUpperCase()))){c=!0,a=-1,f=0;continue}return N(m,String(n),h,t)}h=!1,(f=(p=b(p,t,10,m.s)).indexOf("."))>-1?p=p.replace(".",""):f=p.length}for(a=0;48===p.charCodeAt(a);a++);for(g=p.length;48===p.charCodeAt(--g););if(p=p.slice(a,++g)){if(g-=a,h&&$.DEBUG&&g>15&&(n>l||n!==r(n)))throw Error(o+m.s*n);if((f=f-a-1)>k)m.c=m.e=null;else if(f<P)m.c=[m.e=0];else{if(m.e=f,m.c=[],a=(f+1)%s,f<0&&(a+=s),a<g){for(a&&m.c.push(+p.slice(0,a)),g-=s;a<g;)m.c.push(+p.slice(a,a+=s));a=s-(p=p.slice(a)).length}else a-=g;for(;a--;p+="0");m.c.push(+p)}}else m.c=[m.e=0]}function z(e,n,t,r){var i,o,u,s,l;if(null==t?t=M:d(t,0,8),!e.c)return e.toString();if(i=e.c[0],u=e.e,null==n)l=g(e.c),l=1==r||2==r&&(u<=_||u>=D)?w(l,u):v(l,u,"0");else if(o=(e=X(new $(e),n,t)).e,s=(l=g(e.c)).length,1==r||2==r&&(n<=o||o<=_)){for(;s<n;l+="0",s++);l=w(l,o)}else if(n-=u,l=v(l,o,"0"),o+1>s){if(--n>0)for(l+=".";n--;l+="0");}else if((n+=o-s)>0)for(o+1==s&&(l+=".");n--;l+="0");return e.s<0&&i?"-"+l:l}function Y(e,n){for(var t,r,i=1,o=new $(e[0]);i<e.length;i++)(!(r=new $(e[i])).s||(t=p(o,r))===n||0===t&&o.s===n)&&(o=r);return o}function V(e,n,t){for(var r=1,i=n.length;!n[--i];n.pop());for(i=n[0];i>=10;i/=10,r++);return(t=r+t*s-1)>k?e.c=e.e=null:t<P?e.c=[e.e=0]:(e.e=t,e.c=n),e}function X(e,t,i,o){var l,f,a,h,g,p,d,m=e.c,w=c;if(m){e:{for(l=1,h=m[0];h>=10;h/=10,l++);if((f=t-l)<0)f+=s,a=t,g=m[p=0],d=r(g/w[l-a-1]%10);else if((p=n((f+1)/s))>=m.length){if(!o)break e;for(;m.length<=p;m.push(0));g=d=0,l=1,a=(f%=s)-s+1}else{for(g=h=m[p],l=1;h>=10;h/=10,l++);d=(a=(f%=s)-s+l)<0?0:r(g/w[l-a-1]%10)}if(o=o||t<0||null!=m[p+1]||(a<0?g:g%w[l-a-1]),o=i<4?(d||o)&&(0==i||i==(e.s<0?3:2)):d>5||5==d&&(4==i||o||6==i&&(f>0?a>0?g/w[l-a]:0:m[p-1])%10&1||i==(e.s<0?8:7)),t<1||!m[0])return m.length=0,o?(t-=e.e+1,m[0]=w[(s-t%s)%s],e.e=-t||0):m[0]=e.e=0,e;if(0==f?(m.length=p,h=1,p--):(m.length=p+1,h=w[s-f],m[p]=a>0?r(g/w[l-a]%w[a])*h:0),o)for(;;){if(0==p){for(f=1,a=m[0];a>=10;a/=10,f++);for(a=m[0]+=h,h=1;a>=10;a/=10,h++);f!=h&&(e.e++,m[0]==u&&(m[0]=1));break}if(m[p]+=h,m[p]!=u)break;m[p--]=0,h=1}for(f=m.length;0===m[--f];m.pop());}e.e>k?e.c=e.e=null:e.e<P&&(e.c=[e.e=0])}return e}function W(e){var n,t=e.e;return null===t?e.toString():(n=g(e.c),n=t<=_||t>=D?w(n,t):v(n,t,"0"),e.s<0?"-"+n:n)}return $.clone=t,$.ROUND_UP=0,$.ROUND_DOWN=1,$.ROUND_CEIL=2,$.ROUND_FLOOR=3,$.ROUND_HALF_UP=4,$.ROUND_HALF_DOWN=5,$.ROUND_HALF_EVEN=6,$.ROUND_HALF_CEIL=7,$.ROUND_HALF_FLOOR=8,$.EUCLID=9,$.config=$.set=function(e){var n,t;if(null!=e){if("object"!=typeof e)throw Error(i+"Object expected: "+e);if(e.hasOwnProperty(n="DECIMAL_PLACES")&&(d(t=e[n],0,a,n),C=t),e.hasOwnProperty(n="ROUNDING_MODE")&&(d(t=e[n],0,8,n),M=t),e.hasOwnProperty(n="EXPONENTIAL_AT")&&((t=e[n])&&t.pop?(d(t[0],-a,0,n),d(t[1],0,a,n),_=t[0],D=t[1]):(d(t,-a,a,n),_=-(D=t<0?-t:t))),e.hasOwnProperty(n="RANGE"))if((t=e[n])&&t.pop)d(t[0],-a,-1,n),d(t[1],1,a,n),P=t[0],k=t[1];else{if(d(t,-a,a,n),!t)throw Error(i+n+" cannot be zero: "+t);P=-(k=t<0?-t:t)}if(e.hasOwnProperty(n="CRYPTO")){if((t=e[n])!==!!t)throw Error(i+n+" not true or false: "+t);if(t){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw U=!t,Error(i+"crypto unavailable");U=t}else U=t}if(e.hasOwnProperty(n="MODULO_MODE")&&(d(t=e[n],0,9,n),F=t),e.hasOwnProperty(n="POW_PRECISION")&&(d(t=e[n],0,a,n),G=t),e.hasOwnProperty(n="FORMAT")){if("object"!=typeof(t=e[n]))throw Error(i+n+" not an object: "+t);q=t}if(e.hasOwnProperty(n="ALPHABET")){if("string"!=typeof(t=e[n])||/^.?$|[+\-.\s]|(.).*\1/.test(t))throw Error(i+n+" invalid: "+t);j="0123456789"==t.slice(0,10),H=t}}return{DECIMAL_PLACES:C,ROUNDING_MODE:M,EXPONENTIAL_AT:[_,D],RANGE:[P,k],CRYPTO:U,MODULO_MODE:F,POW_PRECISION:G,FORMAT:q,ALPHABET:H}},$.isBigNumber=function(e){if(!e||!0!==e._isBigNumber)return!1;if(!$.DEBUG)return!0;var n,t,o=e.c,l=e.e,c=e.s;e:if("[object Array]"=={}.toString.call(o)){if((1===c||-1===c)&&l>=-a&&l<=a&&l===r(l)){if(0===o[0]){if(0===l&&1===o.length)return!0;break e}if((n=(l+1)%s)<1&&(n+=s),String(o[0]).length==n){for(n=0;n<o.length;n++)if((t=o[n])<0||t>=u||t!==r(t))break e;if(0!==t)return!0}}}else if(null===o&&null===l&&(null===c||1===c||-1===c))return!0;throw Error(i+"Invalid BigNumber: "+e)},$.maximum=$.max=function(){return Y(arguments,-1)},$.minimum=$.min=function(){return Y(arguments,1)},$.random=(O=9007199254740992,A=Math.random()*O&2097151?function(){return r(Math.random()*O)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var t,o,u,l,f,h=0,g=[],p=new $(T);if(null==e?e=C:d(e,0,a),l=n(e/s),U)if(crypto.getRandomValues){for(t=crypto.getRandomValues(new Uint32Array(l*=2));h<l;)(f=131072*t[h]+(t[h+1]>>>11))>=9e15?(o=crypto.getRandomValues(new Uint32Array(2)),t[h]=o[0],t[h+1]=o[1]):(g.push(f%1e14),h+=2);h=l/2}else{if(!crypto.randomBytes)throw U=!1,Error(i+"crypto unavailable");for(t=crypto.randomBytes(l*=7);h<l;)(f=281474976710656*(31&t[h])+1099511627776*t[h+1]+4294967296*t[h+2]+16777216*t[h+3]+(t[h+4]<<16)+(t[h+5]<<8)+t[h+6])>=9e15?crypto.randomBytes(7).copy(t,h):(g.push(f%1e14),h+=7);h=l/7}if(!U)for(;h<l;)(f=A())<9e15&&(g[h++]=f%1e14);for(l=g[--h],e%=s,l&&e&&(f=c[s-e],g[h]=r(l/f)*f);0===g[h];g.pop(),h--);if(h<0)g=[u=0];else{for(u=-1;0===g[0];g.splice(0,1),u-=s);for(h=1,f=g[0];f>=10;f/=10,h++);h<s&&(u-=s-h)}return p.e=u,p.c=g,p}),$.sum=function(){for(var e=1,n=arguments,t=new $(n[0]);e<n.length;)t=t.plus(n[e++]);return t},b=function(){var e="0123456789";function n(e,n,t,r){for(var i,o,u=[0],s=0,l=e.length;s<l;){for(o=u.length;o--;u[o]*=n);for(u[0]+=r.indexOf(e.charAt(s++)),i=0;i<u.length;i++)u[i]>t-1&&(null==u[i+1]&&(u[i+1]=0),u[i+1]+=u[i]/t|0,u[i]%=t)}return u.reverse()}return function(t,r,i,o,u){var s,l,c,f,a,h,p,d,m=t.indexOf("."),w=C,y=M;for(m>=0&&(f=G,G=0,t=t.replace(".",""),h=(d=new $(r)).pow(t.length-m),G=f,d.c=n(v(g(h.c),h.e,"0"),10,i,e),d.e=d.c.length),c=f=(p=n(t,r,i,u?(s=H,e):(s=e,H))).length;0==p[--f];p.pop());if(!p[0])return s.charAt(0);if(m<0?--c:(h.c=p,h.e=c,h.s=o,p=(h=E(h,d,w,y,i)).c,a=h.r,c=h.e),m=p[l=c+w+1],f=i/2,a=a||l<0||null!=p[l+1],a=y<4?(null!=m||a)&&(0==y||y==(h.s<0?3:2)):m>f||m==f&&(4==y||a||6==y&&1&p[l-1]||y==(h.s<0?8:7)),l<1||!p[0])t=a?v(s.charAt(1),-w,s.charAt(0)):s.charAt(0);else{if(p.length=l,a)for(--i;++p[--l]>i;)p[l]=0,l||(++c,p=[1].concat(p));for(f=p.length;!p[--f];);for(m=0,t="";m<=f;t+=s.charAt(p[m++]));t=v(t,c,s.charAt(0))}return t}}(),E=function(){function e(e,n,t){var r,i,o,u,s=0,l=e.length,c=n%f,a=n/f|0;for(e=e.slice();l--;)s=((i=c*(o=e[l]%f)+(r=a*o+(u=e[l]/f|0)*c)%f*f+s)/t|0)+(r/f|0)+a*u,e[l]=i%t;return s&&(e=[s].concat(e)),e}function n(e,n,t,r){var i,o;if(t!=r)o=t>r?1:-1;else for(i=o=0;i<t;i++)if(e[i]!=n[i]){o=e[i]>n[i]?1:-1;break}return o}function t(e,n,t,r){for(var i=0;t--;)e[t]-=i,i=e[t]<n[t]?1:0,e[t]=i*r+e[t]-n[t];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(i,o,l,c,f){var a,g,p,d,m,w,v,y,E,b,N,O,A,S,I,L,B,x=i.s==o.s?1:-1,R=i.c,T=o.c;if(!(R&&R[0]&&T&&T[0]))return new $(i.s&&o.s&&(R?!T||R[0]!=T[0]:T)?R&&0==R[0]||!T?0*x:x/0:NaN);for(E=(y=new $(x)).c=[],x=l+(g=i.e-o.e)+1,f||(f=u,g=h(i.e/s)-h(o.e/s),x=x/s|0),p=0;T[p]==(R[p]||0);p++);if(T[p]>(R[p]||0)&&g--,x<0)E.push(1),d=!0;else{for(S=R.length,L=T.length,p=0,x+=2,(m=r(f/(T[0]+1)))>1&&(T=e(T,m,f),R=e(R,m,f),L=T.length,S=R.length),A=L,N=(b=R.slice(0,L)).length;N<L;b[N++]=0);B=T.slice(),B=[0].concat(B),I=T[0],T[1]>=f/2&&I++;do{if(m=0,(a=n(T,b,L,N))<0){if(O=b[0],L!=N&&(O=O*f+(b[1]||0)),(m=r(O/I))>1)for(m>=f&&(m=f-1),v=(w=e(T,m,f)).length,N=b.length;1==n(w,b,v,N);)m--,t(w,L<v?B:T,v,f),v=w.length,a=1;else 0==m&&(a=m=1),v=(w=T.slice()).length;if(v<N&&(w=[0].concat(w)),t(b,w,N,f),N=b.length,-1==a)for(;n(T,b,L,N)<1;)m++,t(b,L<N?B:T,N,f),N=b.length}else 0===a&&(m++,b=[0]);E[p++]=m,b[0]?b[N++]=R[A]||0:(b=[R[A]],N=1)}while((A++<S||null!=b[0])&&x--);d=null!=b[0],E[0]||E.splice(0,1)}if(f==u){for(p=1,x=E[0];x>=10;x/=10,p++);X(y,l+(y.e=p+g*s-1)+1,c,d)}else y.e=g,y.r=+d;return y}}(),S=/^(-?)0([xbo])(?=\w[\w.]*$)/i,I=/^([^.]+)\.$/,L=/^\.([^.]+)$/,B=/^-?(Infinity|NaN)$/,x=/^\s*\+(?=[\w.])|^\s+|\s+$/g,N=function(e,n,t,r){var o,u=t?n:n.replace(x,"");if(B.test(u))e.s=isNaN(u)?null:u<0?-1:1;else{if(!t&&(u=u.replace(S,(function(e,n,t){return o="x"==(t=t.toLowerCase())?16:"b"==t?2:8,r&&r!=o?e:n})),r&&(o=r,u=u.replace(I,"$1").replace(L,"0.$1")),n!=u))return new $(u,o);if($.DEBUG)throw Error(i+"Not a"+(r?" base "+r:"")+" number: "+n);e.s=null}e.c=e.e=null},R.absoluteValue=R.abs=function(){var e=new $(this);return e.s<0&&(e.s=1),e},R.comparedTo=function(e,n){return p(this,new $(e,n))},R.decimalPlaces=R.dp=function(e,n){var t,r,i,o=this;if(null!=e)return d(e,0,a),null==n?n=M:d(n,0,8),X(new $(o),e+o.e+1,n);if(!(t=o.c))return null;if(r=((i=t.length-1)-h(this.e/s))*s,i=t[i])for(;i%10==0;i/=10,r--);return r<0&&(r=0),r},R.dividedBy=R.div=function(e,n){return E(this,new $(e,n),C,M)},R.dividedToIntegerBy=R.idiv=function(e,n){return E(this,new $(e,n),0,1)},R.exponentiatedBy=R.pow=function(e,t){var o,u,l,c,f,a,h,g,p=this;if((e=new $(e)).c&&!e.isInteger())throw Error(i+"Exponent not an integer: "+W(e));if(null!=t&&(t=new $(t)),f=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return g=new $(Math.pow(+W(p),f?e.s*(2-m(e)):+W(e))),t?g.mod(t):g;if(a=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new $(NaN);(u=!a&&p.isInteger()&&t.isInteger())&&(p=p.mod(t))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||f&&p.c[1]>=24e7:p.c[0]<8e13||f&&p.c[0]<=9999975e7)))return c=p.s<0&&m(e)?-0:0,p.e>-1&&(c=1/c),new $(a?1/c:c);G&&(c=n(G/s+2))}for(f?(o=new $(.5),a&&(e.s=1),h=m(e)):h=(l=Math.abs(+W(e)))%2,g=new $(T);;){if(h){if(!(g=g.times(p)).c)break;c?g.c.length>c&&(g.c.length=c):u&&(g=g.mod(t))}if(l){if(0===(l=r(l/2)))break;h=l%2}else if(X(e=e.times(o),e.e+1,1),e.e>14)h=m(e);else{if(0==(l=+W(e)))break;h=l%2}p=p.times(p),c?p.c&&p.c.length>c&&(p.c.length=c):u&&(p=p.mod(t))}return u?g:(a&&(g=T.div(g)),t?g.mod(t):c?X(g,G,M,void 0):g)},R.integerValue=function(e){var n=new $(this);return null==e?e=M:d(e,0,8),X(n,n.e+1,e)},R.isEqualTo=R.eq=function(e,n){return 0===p(this,new $(e,n))},R.isFinite=function(){return!!this.c},R.isGreaterThan=R.gt=function(e,n){return p(this,new $(e,n))>0},R.isGreaterThanOrEqualTo=R.gte=function(e,n){return 1===(n=p(this,new $(e,n)))||0===n},R.isInteger=function(){return!!this.c&&h(this.e/s)>this.c.length-2},R.isLessThan=R.lt=function(e,n){return p(this,new $(e,n))<0},R.isLessThanOrEqualTo=R.lte=function(e,n){return-1===(n=p(this,new $(e,n)))||0===n},R.isNaN=function(){return!this.s},R.isNegative=function(){return this.s<0},R.isPositive=function(){return this.s>0},R.isZero=function(){return!!this.c&&0==this.c[0]},R.minus=function(e,n){var t,r,i,o,l=this,c=l.s;if(n=(e=new $(e,n)).s,!c||!n)return new $(NaN);if(c!=n)return e.s=-n,l.plus(e);var f=l.e/s,a=e.e/s,g=l.c,p=e.c;if(!f||!a){if(!g||!p)return g?(e.s=-n,e):new $(p?l:NaN);if(!g[0]||!p[0])return p[0]?(e.s=-n,e):new $(g[0]?l:3==M?-0:0)}if(f=h(f),a=h(a),g=g.slice(),c=f-a){for((o=c<0)?(c=-c,i=g):(a=f,i=p),i.reverse(),n=c;n--;i.push(0));i.reverse()}else for(r=(o=(c=g.length)<(n=p.length))?c:n,c=n=0;n<r;n++)if(g[n]!=p[n]){o=g[n]<p[n];break}if(o&&(i=g,g=p,p=i,e.s=-e.s),(n=(r=p.length)-(t=g.length))>0)for(;n--;g[t++]=0);for(n=u-1;r>c;){if(g[--r]<p[r]){for(t=r;t&&!g[--t];g[t]=n);--g[t],g[r]+=u}g[r]-=p[r]}for(;0==g[0];g.splice(0,1),--a);return g[0]?V(e,g,a):(e.s=3==M?-1:1,e.c=[e.e=0],e)},R.modulo=R.mod=function(e,n){var t,r,i=this;return e=new $(e,n),!i.c||!e.s||e.c&&!e.c[0]?new $(NaN):!e.c||i.c&&!i.c[0]?new $(i):(9==F?(r=e.s,e.s=1,t=E(i,e,0,3),e.s=r,t.s*=r):t=E(i,e,0,F),(e=i.minus(t.times(e))).c[0]||1!=F||(e.s=i.s),e)},R.multipliedBy=R.times=function(e,n){var t,r,i,o,l,c,a,g,p,d,m,w,v,y,E,b=this,N=b.c,O=(e=new $(e,n)).c;if(!(N&&O&&N[0]&&O[0]))return!b.s||!e.s||N&&!N[0]&&!O||O&&!O[0]&&!N?e.c=e.e=e.s=null:(e.s*=b.s,N&&O?(e.c=[0],e.e=0):e.c=e.e=null),e;for(r=h(b.e/s)+h(e.e/s),e.s*=b.s,(a=N.length)<(d=O.length)&&(v=N,N=O,O=v,i=a,a=d,d=i),i=a+d,v=[];i--;v.push(0));for(y=u,E=f,i=d;--i>=0;){for(t=0,m=O[i]%E,w=O[i]/E|0,o=i+(l=a);o>i;)t=((g=m*(g=N[--l]%E)+(c=w*g+(p=N[l]/E|0)*m)%E*E+v[o]+t)/y|0)+(c/E|0)+w*p,v[o--]=g%y;v[o]=t}return t?++r:v.splice(0,1),V(e,v,r)},R.negated=function(){var e=new $(this);return e.s=-e.s||null,e},R.plus=function(e,n){var t,r=this,i=r.s;if(n=(e=new $(e,n)).s,!i||!n)return new $(NaN);if(i!=n)return e.s=-n,r.minus(e);var o=r.e/s,l=e.e/s,c=r.c,f=e.c;if(!o||!l){if(!c||!f)return new $(i/0);if(!c[0]||!f[0])return f[0]?e:new $(c[0]?r:0*i)}if(o=h(o),l=h(l),c=c.slice(),i=o-l){for(i>0?(l=o,t=f):(i=-i,t=c),t.reverse();i--;t.push(0));t.reverse()}for((i=c.length)-(n=f.length)<0&&(t=f,f=c,c=t,n=i),i=0;n;)i=(c[--n]=c[n]+f[n]+i)/u|0,c[n]=u===c[n]?0:c[n]%u;return i&&(c=[i].concat(c),++l),V(e,c,l)},R.precision=R.sd=function(e,n){var t,r,i,o=this;if(null!=e&&e!==!!e)return d(e,1,a),null==n?n=M:d(n,0,8),X(new $(o),e,n);if(!(t=o.c))return null;if(r=(i=t.length-1)*s+1,i=t[i]){for(;i%10==0;i/=10,r--);for(i=t[0];i>=10;i/=10,r++);}return e&&o.e+1>r&&(r=o.e+1),r},R.shiftedBy=function(e){return d(e,-9007199254740991,l),this.times("1e"+e)},R.squareRoot=R.sqrt=function(){var e,n,t,r,i,o=this,u=o.c,s=o.s,l=o.e,c=C+4,f=new $("0.5");if(1!==s||!u||!u[0])return new $(!s||s<0&&(!u||u[0])?NaN:u?o:1/0);if(0==(s=Math.sqrt(+W(o)))||s==1/0?(((n=g(u)).length+l)%2==0&&(n+="0"),s=Math.sqrt(+n),l=h((l+1)/2)-(l<0||l%2),t=new $(n=s==1/0?"5e"+l:(n=s.toExponential()).slice(0,n.indexOf("e")+1)+l)):t=new $(s+""),t.c[0])for((s=(l=t.e)+c)<3&&(s=0);;)if(i=t,t=f.times(i.plus(E(o,i,c,1))),g(i.c).slice(0,s)===(n=g(t.c)).slice(0,s)){if(t.e<l&&--s,"9999"!=(n=n.slice(s-3,s+1))&&(r||"4999"!=n)){+n&&(+n.slice(1)||"5"!=n.charAt(0))||(X(t,t.e+C+2,1),e=!t.times(t).eq(o));break}if(!r&&(X(i,i.e+C+2,0),i.times(i).eq(o))){t=i;break}c+=4,s+=4,r=1}return X(t,t.e+C+1,M,e)},R.toExponential=function(e,n){return null!=e&&(d(e,0,a),e++),z(this,e,n,1)},R.toFixed=function(e,n){return null!=e&&(d(e,0,a),e=e+this.e+1),z(this,e,n)},R.toFormat=function(e,n,t){var r,o=this;if(null==t)null!=e&&n&&"object"==typeof n?(t=n,n=null):e&&"object"==typeof e?(t=e,e=n=null):t=q;else if("object"!=typeof t)throw Error(i+"Argument not an object: "+t);if(r=o.toFixed(e,n),o.c){var u,s=r.split("."),l=+t.groupSize,c=+t.secondaryGroupSize,f=t.groupSeparator||"",a=s[0],h=s[1],g=o.s<0,p=g?a.slice(1):a,d=p.length;if(c&&(u=l,l=c,c=u,d-=u),l>0&&d>0){for(u=d%l||l,a=p.substr(0,u);u<d;u+=l)a+=f+p.substr(u,l);c>0&&(a+=f+p.slice(u)),g&&(a="-"+a)}r=h?a+(t.decimalSeparator||"")+((c=+t.fractionGroupSize)?h.replace(new RegExp("\\d{"+c+"}\\B","g"),"$&"+(t.fractionGroupSeparator||"")):h):a}return(t.prefix||"")+r+(t.suffix||"")},R.toFraction=function(e){var n,t,r,o,u,l,f,a,h,p,d,m,w=this,v=w.c;if(null!=e&&(!(f=new $(e)).isInteger()&&(f.c||1!==f.s)||f.lt(T)))throw Error(i+"Argument "+(f.isInteger()?"out of range: ":"not an integer: ")+W(f));if(!v)return new $(w);for(n=new $(T),h=t=new $(T),r=a=new $(T),m=g(v),u=n.e=m.length-w.e-1,n.c[0]=c[(l=u%s)<0?s+l:l],e=!e||f.comparedTo(n)>0?u>0?n:h:f,l=k,k=1/0,f=new $(m),a.c[0]=0;p=E(f,n,0,1),1!=(o=t.plus(p.times(r))).comparedTo(e);)t=r,r=o,h=a.plus(p.times(o=h)),a=o,n=f.minus(p.times(o=n)),f=o;return o=E(e.minus(t),r,0,1),a=a.plus(o.times(h)),t=t.plus(o.times(r)),a.s=h.s=w.s,d=E(h,r,u*=2,M).minus(w).abs().comparedTo(E(a,t,u,M).minus(w).abs())<1?[h,r]:[a,t],k=l,d},R.toNumber=function(){return+W(this)},R.toPrecision=function(e,n){return null!=e&&d(e,1,a),z(this,e,n,2)},R.toString=function(e){var n,t=this,r=t.s,i=t.e;return null===i?r?(n="Infinity",r<0&&(n="-"+n)):n="NaN":(null==e?n=i<=_||i>=D?w(g(t.c),i):v(g(t.c),i,"0"):10===e&&j?n=v(g((t=X(new $(t),C+i+1,M)).c),t.e,"0"):(d(e,2,H.length,"Base"),n=b(v(g(t.c),i,"0"),10,e,r,!0)),r<0&&t.c[0]&&(n="-"+n)),n},R.valueOf=R.toJSON=function(){return W(this)},R._isBigNumber=!0,R[Symbol.toStringTag]="BigNumber",R[Symbol.for("nodejs.util.inspect.custom")]=R.valueOf,null!=y&&$.set(y),$}();function E(e,n){e.textContent=n,e.style.display="block",setTimeout((function(){e.style.display="none"}),3e3)}function b(e,n){var t,r,i=n.x,o=n.y,u=n.R,s=n.result,l=n.currentTime,c=1e4*n.executionTime,f=e.insertRow(1),a=f.insertCell(0),h=f.insertCell(1),g=f.insertCell(2),p=f.insertCell(3),d=f.insertCell(4),m=f.insertCell(5);a.innerHTML=i,h.innerHTML=(5,(r=(t=o.toString()).split(".")).length<2?t:r[0]+"."+r[1].substring(0,5)),g.innerHTML=u,p.innerHTML=s,d.innerHTML=l,m.innerHTML=c.toFixed(3)}document.getElementById("checkButton").addEventListener("click",(function(){var e,n,t,r,i,o=document.getElementById("errorMessage");if(document.querySelector('input[name="X"]:checked'))if(n=new y("-3"),t=new y("5"),r=document.getElementById("inputY").value,(i=new y(r)).isNaN()||i.lte(n)||i.gte(t))E(o,"Введите значение Y в (-3;5)");else{o.style.display="none";var u=(e=document.querySelector('input[name="X"]:checked'),parseFloat(e.value)),s=function(){var e=document.getElementById("inputY").value;return new y(e)}(),l=function(){var e=document.getElementById("inputR").value;return parseFloat(e)}();fetch("https://se.ifmo.ru/~s368051/lab1/web1/backend/hit.php?x=".concat(u,"&y=").concat(s,"&R=").concat(l)).then((function(e){if(!e.ok)throw new Error("Ошибка: "+e.status);return e.text()})).then((function(e){!function(e){console.log(e);var n=JSON.parse(e),t=document.getElementById("result-table"),r=document.getElementById("resultMessage");n.result?E(r,"Попадание!"):E(r,"Промах!"),b(t,n)}(e)})).catch((function(e){console.error("Произошла ошибка:",e)}))}else E(o,"Выберите значение X")})),window.addEventListener("load",(function(){fetch("https://se.ifmo.ru/~s368051/lab1/web1/backend/send.php").then((function(e){if(!e.ok)throw new Error("Ошибка: "+e.status);return e.text()})).then((function(e){!function(e){for(var n=JSON.parse(e),t=document.getElementById("result-table"),r=0;r<n.length;r++)b(t,n[r])}(e)})).catch((function(e){console.error("Произошла ошибка:",e)}))}))})()})();