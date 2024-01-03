"use strict";(self.webpackChunkboxxerworld_customiser=self.webpackChunkboxxerworld_customiser||[]).push([[369],{9369:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var o=n(4875),a=n(9389),i=n(2791),l=n(7760),r=n(9355),d=n(9740),s=n(184);const u=e=>{let{node:t,texture:n,tasselsTexture:a,tassels:r,hex:d}=e;const[u,c]=(0,i.useState)(),v=(0,i.useRef)(null),p=(0,i.useRef)(null),[m,f]=(0,i.useState)(!1),[b,x]=(0,i.useState)(!1),g=(0,i.useMemo)((()=>Object.fromEntries(Object.entries(n).map((e=>{let[t,n]=e;return[t,n.clone()]})))),[n]),{navItems:h,customProduct:j,setSelectedNav:M,texts:w,updateText:y}=(0,o.b)(),S=(0,i.useMemo)((()=>w.find((e=>e.edit))),[w]),P=(0,i.useMemo)((()=>{var e,n;return null===j||void 0===j||null===(e=j.attributes)||void 0===e||null===(n=e.parts)||void 0===n?void 0:n.find((e=>{var n;return null===e||void 0===e||null===(n=e.modelParts)||void 0===n?void 0:n.data.find((e=>{var n,o;return(null===(n=e.attributes)||void 0===n?void 0:n.nodeId)===t.userData.name||(null===(o=e.attributes)||void 0===o?void 0:o.nodeId)===t.name}))}))}),[j,t]),R=(0,i.useMemo)((()=>h.find((e=>e.id===(null===P||void 0===P?void 0:P.id)))),[P,h]),T=(0,i.useMemo)((()=>h.find((e=>"names"===e.type))),[h]);return(0,i.useEffect)((()=>{if(g&&p.current){let e={};for(const[t,n]of Object.entries(g)){n.wrapS=n.wrapT=l.RepeatWrapping;const o=(new l.Box3).setFromObject(p.current),a=new l.Vector3,i=o.getSize(a),r=i.x*i.y;n.repeat.set(5e-4*r,5e-4*r),e={...e,[t]:n}}c(e)}}),[g]),v.current&&(v.current.needsUpdate=!0),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("mesh",{name:t.name,geometry:t.geometry,ref:p,userData:{name:t.userData.name},onPointerDown:e=>{f(!0)},onPointerMove:e=>{m&&x(!0)},onClick:e=>{var n;if(f(!1),x(!1),!m||b)return;if(null!==S&&void 0!==S&&S.key)return;const o=null===(n=e.intersections.find((e=>e.object.userData.text)))||void 0===n?void 0:n.object.userData.text;if(T&&void 0!==T.index&&o&&o.key)return M(T.index),void y(o.key,{edit:!0});R&&void 0!==R.index&&e.intersections[0].object.name===t.name&&(e.stopPropagation(),M(R.index))},children:r?(0,s.jsx)("meshStandardMaterial",{ref:v,...a,transparent:!0,bumpScale:.15,color:d,side:l.DoubleSide,metalness:-.5}):(0,s.jsx)("meshStandardMaterial",{side:l.DoubleSide,...u,displacementScale:null!==u&&void 0!==u&&u.displacementMap?0:void 0,ref:v})})})},c=e=>{let{node:t,nodeId:n}=e;const a=(0,o.b)((0,i.useCallback)((e=>e.texture(n)),[n])),r=(0,o.b)((0,i.useCallback)((e=>e.optional(n)),[n])),c=(0,o.b)((0,i.useCallback)((e=>e.tassels(n)),[n])),v=(0,d.m)({...a.materials}),p=(0,d.m)({alphaMap:"https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-opacity.jpg",bumpMap:"https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-bump.jpg"},(e=>{const[t,n]=e;n.wrapS=n.wrapT=l.RepeatWrapping,n.flipY=!1,n.repeat.set(1.5,1),n.needsUpdate=!0,t.wrapS=t.wrapT=l.RepeatWrapping,t.flipY=!1,t.repeat.set(1.5,1),t.needsUpdate=!0}));return r?null:(0,s.jsx)(u,{node:t,texture:v,tasselsTexture:p,tassels:c,hex:a.hex})},v=e=>{var t,n,o,a,l,d;let{model:u,addNodes:v}=e;const{nodes:p}=(0,r.L)(null===u||void 0===u||null===(t=u.attributes)||void 0===t||null===(n=t.model)||void 0===n||null===(o=n.data)||void 0===o||null===(a=o.attributes)||void 0===a?void 0:a.url);return(0,i.useEffect)((()=>(delete p.Scene,v(p),()=>{v(p,!0)})),[p]),(0,s.jsx)(s.Fragment,{children:null===u||void 0===u||null===(l=u.attributes)||void 0===l||null===(d=l.parts)||void 0===d?void 0:d.data.map((e=>{var t;return(0,s.jsx)(i.Fragment,{children:(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.nodeId)&&(0,s.jsx)(c,{node:p[e.attributes.nodeId],nodeId:e.attributes.nodeId},e.attributes.nodeId)},e.id)}))})};var p=n(1435);const m=e=>{var t,n,o,a,r,u,c,v,m;let{flag:f,graphic:b,position:x,orientation:g,scale:h=1}=e;const j=null!==f&&void 0!==f&&null!==(t=f.flag)&&void 0!==t&&null!==(n=t.attributes)&&void 0!==n&&null!==(o=n.image.data)&&void 0!==o&&null!==(a=o.attributes)&&void 0!==a&&a.url?[f.flag.attributes.image.data.attributes.url]:null!==b&&void 0!==b&&null!==(r=b.graphic)&&void 0!==r&&null!==(u=r.attributes)&&void 0!==u&&null!==(c=u.image)&&void 0!==c&&null!==(v=c.data)&&void 0!==v&&null!==(m=v.attributes)&&void 0!==m&&m.url?[b.graphic.attributes.image.data.attributes.url]:[],[M]=(0,d.m)(j),w=(0,i.useMemo)((()=>{var e,t;return(null!==(e=M.source.data.width)&&void 0!==e?e:1)/(null!==(t=M.source.data.height)&&void 0!==t?t:1)}),[M]),y=(0,i.useMemo)((()=>{const e=(new l.Euler).fromArray(g),t=l.MathUtils.radToDeg(e.z),n=(null===f||void 0===f?void 0:f.decalRotation)||(null===b||void 0===b?void 0:b.decalRotation),o=t+(null!==n&&void 0!==n?n:0);return e.z=l.MathUtils.degToRad(o),e}),[null===f||void 0===f?void 0:f.decalRotation,null===b||void 0===b?void 0:b.decalRotation,g]),S=(0,i.useMemo)((()=>new l.Vector3(1*w*h,1*h,4)),[h]);return M?(0,s.jsx)(p._,{position:x,rotation:y,scale:S,children:(0,s.jsx)("meshPhongMaterial",{map:M,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-20,needsUpdate:!0})}):null},f=e=>{var t,n,o,a,r,d,u,c,v;let{text:m={},position:f,orientation:b,scale:x=1}=e;const g=(0,i.useMemo)((()=>{var e;const t=(new l.Euler).fromArray(b),n=l.MathUtils.radToDeg(t.z)+(null!==(e=null===m||void 0===m?void 0:m.decalRotation)&&void 0!==e?e:0);return t.z=l.MathUtils.degToRad(n),t}),[null===m||void 0===m?void 0:m.decalRotation,b]),h=(null!==m&&void 0!==m&&null!==(t=m.material)&&void 0!==t&&null!==(n=t.attributes)&&void 0!==n&&null!==(o=n.images)&&void 0!==o&&o.length&&null!==(a=m.material.attributes.images[0])&&void 0!==a&&null!==(r=a.image.data)&&void 0!==r&&null!==(d=r.attributes)&&void 0!==d&&d.url&&m.material.attributes.images[0].image.data.attributes.url,m.normalMap instanceof l.Texture&&"Luxury"===(null===(u=m.selectedName)||void 0===u||null===(c=u.attributes)||void 0===c?void 0:c.name)?m.normalMap:null),j="2"===(null===(v=m.selectedName)||void 0===v?void 0:v.id),M=!!m.puffPrice,w=!!m.crystalPrice;let y=1;w?y=4:j&&!M?y=.5:j&&M&&(y=3);const S=(0,i.useMemo)((()=>new l.Vector3(3.2*x,.4*x,4)),[x]),P=(0,i.useRef)(null),R=(0,i.useRef)(null);return(0,i.useEffect)((()=>{m.preview&&P.current&&m.preview instanceof l.Texture&&(m.preview.needsUpdate=!0,P.current.needsUpdate=!0)}),[m.preview]),(0,s.jsx)(p._,{ref:R,position:f,rotation:g,scale:S,children:(0,s.jsx)("meshStandardMaterial",{ref:P,transparent:!0,roughness:j&&!w?1:0,depthTest:!0,depthWrite:!1,map:m.preview instanceof l.Texture?m.preview:null,normalMap:h,normalScale:new l.Vector2(y,y)})})},b=e=>{let{geom:t}=e;const n=(0,o.b)((e=>e.flags)),a=(0,o.b)((e=>e.texts)),i=(0,o.b)((e=>e.graphics));return(0,s.jsxs)("mesh",{geometry:t,children:[(0,s.jsx)("meshStandardMaterial",{transparent:!0,colorWrite:!1}),n.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,s.jsx)(m,{flag:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)})),i.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,s.jsx)(m,{graphic:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)})),a.map((e=>{if(e.decalPosition&&e.decalOrientation)return(0,s.jsx)(f,{text:e,position:e.decalPosition,orientation:e.decalOrientation,scale:e.decalScale},e.key)}))]})};var x=n(7133);const g=e=>{let{children:t}=e;const[n,a]=(0,i.useState)(),{customProduct:l}=(0,o.b)();return t({addNodes:function(e,t){if(t){const t={...n};for(const n in e)delete t[n];a({...t})}else a((t=>({...t,...e})))},geom:(0,i.useMemo)((()=>{const e=[];if(n)for(const[a,i]of Object.entries(n)){var t,o;const n=(null!==(t=null===l||void 0===l||null===(o=l.attributes)||void 0===o?void 0:o.parts)&&void 0!==t?t:[]).filter((e=>null===e||void 0===e?void 0:e.optional)).map((e=>{var t;return null===e||void 0===e||null===(t=e.modelParts)||void 0===t?void 0:t.data})).flat().find((e=>{var t;return(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.nodeId)===a}));i.isMesh&&!n&&e.push(i.geometry.clone())}return e.length?x.qf(e):null}),[n])})},h=e=>e.selectedModels,j=(0,i.forwardRef)(((e,t)=>{let{onPointerDown:n,onPointerUp:r,onPointerMove:d,onClick:u}=e;const c=(0,o.b)(h),p=(0,a.H)((e=>e.modelRotation)),m=(0,a.H)((e=>e.addingToCart));return(0,i.useEffect)((()=>{m&&"function"!==typeof t&&null!==t&&void 0!==t&&t.current&&t.current.rotateY(l.MathUtils.degToRad(p))}),[m,p]),(0,s.jsx)("group",{name:"meshGroup",ref:t,onPointerDown:n,onPointerUp:r,onPointerMove:d,onClick:u,dispose:null,children:(0,s.jsx)(g,{children:e=>{let{addNodes:t,geom:n}=e;return(0,s.jsxs)(s.Fragment,{children:[c.map((e=>{var n;return(0,s.jsx)(v,{model:e.model,addNodes:t},null===(n=e.model)||void 0===n?void 0:n.id)})),n&&(0,s.jsx)(b,{geom:n})]})}})})}));j.displayName="Scene";const M=j}}]);
//# sourceMappingURL=369.4035a02f.chunk.js.map