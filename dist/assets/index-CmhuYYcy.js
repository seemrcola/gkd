import{_ as B}from"./index-Br87ZoBF.js";import{_ as I}from"./Card.vue_vue_type_script_setup_true_lang-D0KoHxV7.js";import{c as m}from"./utils-CytzSlOG.js";import{d as p,a as r,c as l,l as f,n as h,u as a,p as w,q as N,e as d,F as b,i as C,b as c,w as i,g as v,t as u,f as A}from"./index-CSbb4QqH.js";const D=p({__name:"CardContent",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("div",{class:h(a(m)("p-6 pt-0",e.class))},[f(s.$slots,"default")],2))}}),L=p({__name:"CardDescription",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("p",{class:h(a(m)("text-sm text-muted-foreground",e.class))},[f(s.$slots,"default")],2))}}),P=p({__name:"CardHeader",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("div",{class:h(a(m)("flex flex-col gap-y-1.5 p-6",e.class))},[f(s.$slots,"default")],2))}}),V=p({__name:"CardTitle",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("h3",{class:h(a(m)("text-2xl font-semibold leading-none tracking-tight",e.class))},[f(s.$slots,"default")],2))}});/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=({size:t,strokeWidth:e=2,absoluteStrokeWidth:s,color:n,iconNode:g,name:o,class:x,...$},{slots:k})=>w("svg",{..._,width:t||_.width,height:t||_.height,stroke:n||_.stroke,"stroke-width":s?Number(e)*24/Number(t):e,class:["lucide",`lucide-${q(o??"icon")}`],...$},[...g.map(y=>w(...y)),...k.default?[k.default()]:[]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(t,e)=>(s,{slots:n})=>w(F,{...s,iconNode:e,name:t},n);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=R("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),T={class:"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50"},z={class:"container mx-auto p-6"},E={class:"max-w-3xl mx-auto space-y-8"},H={class:"space-y-4"},K={class:"flex gap-2 flex-wrap"},Z={class:"sr-only"},Q=p({__name:"index",setup(t){const e=[{id:1,title:"picture-in-picture",description:"画中画出基础案例",path:"/pip",tags:["picture-in-picture","documentPictureInPicture API"]},{id:2,title:"mention",description:"一个基础的 提及 组件（尚不完善）",path:"/mention",tags:["mention","可编辑div","range"]},{id:3,title:"face",description:"人脸识别基础案例",path:"/face",tags:["face","face-api","canvas","svg"]},{id:4,title:"gif-player",description:"一个基础的 gif 播放器 可控制暂停/播放/进度条",path:"/gif",tags:["gif","canvas","imageDecoder"]}];return(s,n)=>{const g=N("router-link");return r(),l("div",T,[d("div",z,[d("div",E,[d("div",H,[(r(),l(b,null,C(e,o=>c(a(I),{key:o.id,class:"group transition-all hover:shadow-lg backdrop-blur-sm bg-white/80 border-slate-200/60"},{default:i(()=>[c(a(P),null,{default:i(()=>[c(a(V),{class:"flex items-center justify-between"},{default:i(()=>[v(u(o.title)+" ",1),c(a(S),{class:"w-5 h-5 transition-transform group-hover:translate-x-1"})]),_:2},1024),c(a(L),null,{default:i(()=>[v(u(o.description),1)]),_:2},1024)]),_:2},1024),c(a(D),null,{default:i(()=>[d("div",K,[(r(!0),l(b,null,C(o.tags,x=>(r(),A(a(B),{key:x,variant:"secondary",size:"sm",class:"text-xs"},{default:i(()=>[v(u(x),1)]),_:2},1024))),128))])]),_:2},1024),c(g,{to:o.path,class:"absolute inset-0"},{default:i(()=>[d("span",Z,"查看"+u(o.title),1)]),_:2},1032,["to"])]),_:2},1024)),64))])])])])}}});export{Q as default};
