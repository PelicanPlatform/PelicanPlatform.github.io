(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[959,834,781,277],{61268:function(e,t,r){Promise.resolve().then(r.t.bind(r,48984,23)),Promise.resolve().then(r.t.bind(r,57477,23)),Promise.resolve().then(r.t.bind(r,58115,23))},58115:function(e,t,r){var n=Object.create,a=Object.defineProperty,l=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,i=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,f=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of o(t))u.call(e,i)||i===r||a(e,i,{get:()=>t[i],enumerable:!(n=l(t,i))||n.enumerable});return e},s=(e,t,r)=>(r=null!=e?n(i(e)):{},f(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)),d={};((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(d,{Balancer:()=>N,Provider:()=>E,default:()=>S}),e.exports=f(a({},"__esModule",{value:!0}),d);var c=s(r(86006)),p=s(r(86006)),_="undefined"==typeof window?p.default.useEffect:p.default.useLayoutEffect,b=0,v=()=>++b,h=!1;function m(){let[e,t]=p.default.useState(h?v:void 0);return _(()=>{void 0===e&&t(v()),h=!0},[]),void 0===e?e:`rwb-${e.toString(32)}`}var y="__wrap_b",w="__wrap_n",g="__wrap_o",O=(e,t,r)=>{let n=(r=r||document.querySelector(`[data-br="${e}"]`)).parentElement,a=e=>r.style.maxWidth=e+"px";r.style.maxWidth="";let l=n.clientWidth,o=n.clientHeight,i=l/2-.25,u=l+.5,f;if(l){for(a(i),i=Math.max(r.scrollWidth,i);i+1<u;)a(f=Math.round((i+u)/2)),n.clientHeight===o?u=f:i=f;a(u*t+l*(1-t))}r.__wrap_o||"undefined"!=typeof ResizeObserver&&(r.__wrap_o=new ResizeObserver(()=>{self.__wrap_b(0,+r.dataset.brr,r)})).observe(n)},P=O.toString(),$=(e,t,r="")=>(r&&(r=`self.${w}!=1&&${r}`),c.default.createElement("script",{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:(e?"":`self.${w}=self.${w}||(self.CSS&&CSS.supports("text-wrap","balance")?1:2);self.${y}=${P};`)+r},nonce:t})),x=c.default.createContext({preferNative:!0,hasProvider:!1}),E=({preferNative:e=!0,nonce:t,children:r})=>{let n=c.default.useMemo(()=>({preferNative:e,hasProvider:!0}),[e]);return c.default.createElement(x.Provider,{value:n},$(!1,t),r)},N=({ratio:e=1,preferNative:t,nonce:r,children:n,...a})=>{let l=p.default.useMemo(()=>"useId"in p.default?p.default.useId:m,[])(),o=c.default.useRef(),i=c.default.useContext(x),u=null!=t?t:i.preferNative,f=a.as||"span";return _(()=>{u&&1===self[w]||o.current&&(self[y]=O)(0,e,o.current)},[n,u,e]),_(()=>{if(!(u&&1===self[w]))return()=>{if(!o.current)return;let e=o.current[g];e&&(e.disconnect(),delete o.current[g])}},[u]),c.default.createElement(c.default.Fragment,null,c.default.createElement(f,{...a,"data-br":l,"data-brr":e,ref:o,style:{display:"inline-block",verticalAlign:"top",textDecoration:"inherit",textWrap:u?"balance":"initial"},suppressHydrationWarning:!0},n),$(i.hasProvider,r,`self.${y}("${l}",${e})`))},S=N}},function(e){e.O(0,[549,837,205,477,984,253,769,744],function(){return e(e.s=61268)}),_N_E=e.O()}]);