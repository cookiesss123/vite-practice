import{_ as r,R as d,a as _,r as i,o as u,c as h,b as s,d as t,w as e,e as v,f as n}from"./index-64557ebe.js";const{VITE_URL:m}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"cookiesss",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},p={components:{RouterView:d,RouterLink:_},data(){return{}},methods:{checkAdmin(){this.$http.post(`${m}/api/user/check`).then(a=>{this.$swal({icon:"success",title:"驗證成功",showConfirmButton:!1,timer:1e3}),console.log(a)}).catch(a=>{console.log(a.response.data.message),this.$router.push("/login"),this.$swal({icon:"error",title:a.response.data.message,showConfirmButton:!1,timer:1e3})})},logout(){document.cookie=`cookiesssToken=;expires=${new Date}`,this.$swal({title:"已登出",showConfirmButton:!1,timer:1e3})}},mounted(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a,this.checkAdmin()}},k={class:"navbar navbar-expand-lg navbar-dark bg-dark fs-5"},f={class:"container-fluid"},g=s("h1",{class:"navbar-brand text-primary"},"現在在後台",-1),b=s("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[s("span",{class:"navbar-toggler-icon"})],-1),w={class:"collapse navbar-collapse",id:"navbarNav"},$={class:"navbar-nav"},R={class:"nav-item"},V={class:"nav-item"},x={class:"nav-item"},B={class:"nav-item"},T={class:"nav-item"},C={class:"navbar-nav"},E={class:"nav-item"},L={class:"nav-item"};function N(a,A,D,I,U,c){const o=i("RouterLink"),l=i("RouterView");return u(),h("div",null,[s("nav",k,[s("div",f,[g,b,s("div",w,[s("ul",$,[s("li",R,[t(o,{to:"/admin/products",class:"nav-link"},{default:e(()=>[n("產品")]),_:1})]),s("li",V,[t(o,{to:"/admin/orders",class:"nav-link"},{default:e(()=>[n("訂單")]),_:1})]),s("li",x,[t(o,{to:"/admin/coupons",class:"nav-link"},{default:e(()=>[n("優惠券")]),_:1})]),s("li",B,[t(o,{to:"/admin/posts",class:"nav-link"},{default:e(()=>[n("貼文")]),_:1})]),s("li",T,[t(o,{to:"/login",class:"nav-link",onClick:v(c.logout,["prevent"])},{default:e(()=>[n("登出")]),_:1},8,["onClick"])])])]),s("ul",C,[s("li",E,[t(o,{to:"/blog",class:"nav-link"},{default:e(()=>[n("Blog")]),_:1})]),s("li",L,[t(o,{to:"/carts",class:"nav-link"},{default:e(()=>[n("購物車")]),_:1})])])])]),t(l)])}const M=r(p,[["render",N]]);export{M as default};
