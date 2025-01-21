import{_ as B}from"./index-BRHOjNFr.js";import{_ as N}from"./Card.vue_vue_type_script_setup_true_lang-FN2zJOy6.js";import{c as m}from"./utils-CytzSlOG.js";import{d as u,a as r,c as l,h,n as f,u as a,i as k,j as T,e as d,F as b,k as C,b as c,w as i,g as x,t as p,f as I}from"./index-DqH3r9ME.js";const L=u({__name:"CardContent",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("div",{class:f(a(m)("p-6 pt-0",e.class))},[h(s.$slots,"default")],2))}}),V=u({__name:"CardDescription",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("p",{class:f(a(m)("text-sm text-muted-foreground",e.class))},[h(s.$slots,"default")],2))}}),A=u({__name:"CardHeader",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("div",{class:f(a(m)("flex flex-col gap-y-1.5 p-6",e.class))},[h(s.$slots,"default")],2))}}),D=u({__name:"CardTitle",props:{class:{}},setup(t){const e=t;return(s,n)=>(r(),l("h3",{class:f(a(m)("text-2xl font-semibold leading-none tracking-tight",e.class))},[h(s.$slots,"default")],2))}});/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=({size:t,strokeWidth:e=2,absoluteStrokeWidth:s,color:n,iconNode:g,name:o,class:w,...$},{slots:v})=>k("svg",{..._,width:t||_.width,height:t||_.height,stroke:n||_.stroke,"stroke-width":s?Number(e)*24/Number(t):e,class:["lucide",`lucide-${F(o??"icon")}`],...$},[...g.map(y=>k(...y)),...v.default?[v.default()]:[]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=(t,e)=>(s,{slots:n})=>k(R,{...s,iconNode:e,name:t},n);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=S("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),z={class:"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50"},E={class:"container mx-auto p-6"},H={class:"max-w-3xl mx-auto space-y-8"},K={class:"space-y-4"},Z={class:"flex gap-2 flex-wrap"},G={class:"sr-only"},Q=u({__name:"index",setup(t){const e=[{id:1,title:"picture-in-picture",description:"画中画",path:"/pip",tags:["shadcn","Tailwind","picture-in-picture"]},{id:2,title:"mention",description:"mention",path:"/mention",tags:["shadcn","Tailwind","mention"]},{id:3,title:"face",description:"人脸识别基础案例",path:"/face",tags:["shadcn","Tailwind","face","face-api"]}];return(s,n)=>{const g=T("router-link");return r(),l("div",z,[d("div",E,[d("div",H,[d("div",K,[(r(),l(b,null,C(e,o=>c(a(N),{key:o.id,class:"group transition-all hover:shadow-lg backdrop-blur-sm bg-white/80 border-slate-200/60"},{default:i(()=>[c(a(A),null,{default:i(()=>[c(a(D),{class:"flex items-center justify-between"},{default:i(()=>[x(p(o.title)+" ",1),c(a(q),{class:"w-5 h-5 transition-transform group-hover:translate-x-1"})]),_:2},1024),c(a(V),null,{default:i(()=>[x(p(o.description),1)]),_:2},1024)]),_:2},1024),c(a(L),null,{default:i(()=>[d("div",Z,[(r(!0),l(b,null,C(o.tags,w=>(r(),I(a(B),{key:w,variant:"secondary",size:"sm",class:"text-xs"},{default:i(()=>[x(p(w),1)]),_:2},1024))),128))])]),_:2},1024),c(g,{to:o.path,class:"absolute inset-0"},{default:i(()=>[d("span",G,"查看"+p(o.title),1)]),_:2},1032,["to"])]),_:2},1024)),64))])])])])}}});export{Q as default};
