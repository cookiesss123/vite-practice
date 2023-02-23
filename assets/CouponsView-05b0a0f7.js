import{M as y}from"./modal-7983d6b2.js";import{_ as f,o as c,c as u,b as o,g as p,v as r,j as $,i as h,r as k,F as w,h as M,d as T,t as i,n as V}from"./index-64557ebe.js";const{VITE_URL:m,VITE_PATH:_}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"cookiesss",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},x={props:["getCoupons","id","coupons","openModal"],data(){return{myModal:{},tempCoupon:{},due_date:""}},methods:{show(){this.myModal.show()},hide(){this.myModal.hide()},addCoupon(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e,this.due_date=new Date(this.due_date).getTime()/1e3,this.tempCoupon.due_date=this.due_date,this.$http.post(`${m}/api/${_}/admin/coupon`,{data:this.tempCoupon}).then(t=>{this.getCoupons(),this.$swal({icon:"success",title:t.data.message,showConfirmButton:!1,timer:1e3}),this.hide()}).catch(t=>{console.log(t.response.data.message)})},updateCoupon(){this.$http.put(`${m}/api/${_}/admin/coupon/${this.tempCoupon.id}`,{data:this.tempCoupon}).then(e=>{this.getCoupons(),this.$swal({icon:"success",title:e.data.message,showConfirmButton:!1,timer:1e3}),this.hide()}).catch(e=>{console.log(e.response.data.message)})}},watch:{id(){if(console.log("id 改變了"),this.id!=="new"&&this.id!==""){this.tempCoupon=this.coupons.filter(t=>t.id===this.id),this.tempCoupon={...this.tempCoupon[0]};const e=new Date(this.tempCoupon.due_date*1e3).toISOString().split("T");this.due_date=e[0],console.log(this.tempCoupon),this.show(),this.openModal("")}}},mounted(){this.myModal=new y(this.$refs.couponModal)}},E={class:"modal fade",ref:"couponModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},I={class:"modal-dialog"},D={class:"modal-content"},U=o("div",{class:"modal-header"},[o("h5",{class:"modal-title",id:"exampleModalLabel"},"新增優惠券"),o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),A={class:"modal-body"},L={class:"row gy-3"},R={class:"col-12"},B=o("label",{for:"title",class:"form-label mb-0"},"標題",-1),P={class:"col-12"},H=o("label",{for:"code",class:"form-label mb-0"},"優惠碼",-1),O={class:"col-12"},S=o("label",{for:"due_date",class:"form-label mb-0"},"到期日",-1),z={class:"col-12"},F=o("label",{for:"percent",class:"form-label mb-0"},"折扣百分比",-1),N={class:"col-12"},j={class:"form-check"},Y=o("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),q={class:"modal-footer"},G=o("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"關閉",-1);function J(e,t,a,g,n,d){return c(),u("div",E,[o("div",I,[o("div",D,[U,o("div",A,[o("div",L,[o("div",R,[B,p(o("input",{type:"text",id:"title",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":t[0]||(t[0]=s=>n.tempCoupon.title=s)},null,512),[[r,n.tempCoupon.title]])]),o("div",P,[H,p(o("input",{type:"text",id:"code",class:"form-control",placeholder:"請輸入優惠碼","onUpdate:modelValue":t[1]||(t[1]=s=>n.tempCoupon.code=s)},null,512),[[r,n.tempCoupon.code]])]),o("div",O,[S,p(o("input",{type:"date",id:"due_date",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=s=>n.due_date=s)},null,512),[[r,n.due_date]])]),o("div",z,[F,p(o("input",{type:"number",id:"percent",class:"form-control",placeholder:"請輸入折扣百分比","onUpdate:modelValue":t[3]||(t[3]=s=>n.tempCoupon.percent=s)},null,512),[[r,n.tempCoupon.percent]])]),o("div",N,[o("div",j,[p(o("input",{class:"form-check-input",type:"checkbox",value:"",id:"is_enabled","true-value":1,"false-value":0,"onUpdate:modelValue":t[4]||(t[4]=s=>n.tempCoupon.is_enabled=s)},null,512),[[$,n.tempCoupon.is_enabled]]),Y])])])]),o("div",q,[G,a.id==="new"?(c(),u("button",{key:0,type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=(...s)=>d.addCoupon&&d.addCoupon(...s))},"新增優惠券")):h("",!0),a.id!=="new"?(c(),u("button",{key:1,type:"button",class:"btn btn-primary",onClick:t[6]||(t[6]=(...s)=>d.updateCoupon&&d.updateCoupon(...s))},"編輯優惠券")):h("",!0)])])])],512)}const K=f(x,[["render",J]]),{VITE_URL:b,VITE_PATH:C}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"cookiesss",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},Q={components:{CouponModal:K},data(){return{coupons:[],couponId:""}},methods:{getCoupons(){const e=this.$loading.show(),t=document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t,this.$http.get(`${b}/api/${C}/admin/coupons`).then(a=>{console.log(a.data.coupons),this.coupons=a.data.coupons,e.hide()}).catch(a=>{console.log(a.response.data.message)})},openModal(e){this.couponId=e,this.couponId==="new"&&this.$refs.modal.show()},deleteCoupon(e){this.$http.delete(`${b}/api/${C}/admin/coupon/${e}`).then(t=>{this.getCoupons(),this.$swal({icon:"success",title:t.data.message,showConfirmButton:!1,timer:1e3}),this.$refs.modal.hide(),console.log(t)}).catch(t=>{console.log(t)})}},mounted(){this.getCoupons()}},W=o("h1",null,"優惠券",-1),X={class:"d-flex"},Z={class:"table"},oo=o("thead",null,[o("tr",null,[o("th",null,"名稱"),o("th",null,"折扣百分比"),o("th",null,"到期日"),o("th",null,"是否啟用"),o("th",null,"編輯")])],-1),to={class:"btn-group"},eo=["onClick"],so=["onClick"];function no(e,t,a,g,n,d){const s=k("CouponModal");return c(),u("div",null,[W,o("div",X,[o("button",{type:"button",class:"btn btn-primary ms-auto mx-5",onClick:t[0]||(t[0]=l=>d.openModal("new"))},"建立新的優惠券")]),o("table",Z,[oo,o("tbody",null,[(c(!0),u(w,null,M(n.coupons,l=>(c(),u("tr",{key:l.id},[o("td",null,i(l.title),1),o("td",null,i(l.percent)+" %",1),o("td",null,i(new Date(l.due_date*1e3).getFullYear())+"/"+i(new Date(l.due_date*1e3).getMonth()+1)+"/"+i(new Date(l.due_date*1e3).getDate()),1),o("td",{class:V({"text-success":l.is_enabled,"fw-bold":l.is_enabled})},i(`${l.is_enabled?"啟用":"未啟用"}`),3),o("td",null,[o("div",to,[o("button",{type:"button",class:"btn btn-sm btn-outline-primary",onClick:v=>d.openModal(l.id)},"編輯",8,eo),o("button",{type:"button",class:"btn btn-sm btn-outline-danger",onClick:v=>d.deleteCoupon(l.id)},"刪除",8,so)])])]))),128))])]),T(s,{ref:"modal","get-coupons":d.getCoupons,id:n.couponId,coupons:n.coupons,"open-modal":d.openModal},null,8,["get-coupons","id","coupons","open-modal"])])}const io=f(Q,[["render",no]]);export{io as default};
