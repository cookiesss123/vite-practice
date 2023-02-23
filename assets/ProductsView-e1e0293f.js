import{M as U}from"./modal-4b4bab9a.js";import{_ as P,o as r,c as a,b as t,t as m,g as n,v as d,F as f,h as v,i as V,j as k,r as x,d as w,n as M}from"./index-01685dd6.js";const{VITE_URL:h,VITE_PATH:_}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"cookiesss",BASE_URL:"/vite-practice/",MODE:"production",DEV:!1,PROD:!0},C={props:["id","openModal","getProducts"],data(){return{products:[],myModal:{},tempProduct:{imagesUrl:[]}}},methods:{show(){this.myModal.show()},hide(){this.myModal.hide()},updateProduct(){this.tempProduct.id?this.$http.put(`${h}/api/${_}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct}).then(l=>{console.log(l.data.message),this.getProducts(),this.hide(),this.$swal({icon:"success",title:l.data.message,showConfirmButton:!1,timer:700})}).catch(l=>{console.log(l.response.data.message)}):this.tempProduct.id||this.$http.post(`${h}/api/${_}/admin/product`,{data:this.tempProduct}).then(l=>{console.log(l.data.message),this.getProducts(),this.hide(),this.$swal({icon:"success",title:l.data.message,showConfirmButton:!1,timer:700})}).catch(l=>{console.log(l.response.data.message)})}},watch:{id(){this.id!=="新增"&&this.id?(this.tempProduct=Object.values(this.products).filter(l=>l.id===this.id),this.tempProduct={...this.tempProduct[0]},this.show(),this.openModal("")):this.id==="新增"&&(this.tempProduct={imagesUrl:[]},this.show(),console.log(this.id),this.openModal(""))}},mounted(){this.myModal=new U(this.$refs.productModal),this.getProducts()}},E={class:"modal fade",ref:"productModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},T={class:"modal-dialog modal-xl"},I={class:"modal-content"},L={class:"modal-header bg-dark"},R={class:"modal-title text-white",id:"exampleModalLabel"},A=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),B={class:"modal-body"},D={action:"",class:"row"},$={class:"col-4"},H=t("label",{for:"imgUrl",class:"form-label"}," 輸入圖片網址 ",-1),O=t("br",null,null,-1),N=["src"],S=t("br",null,null,-1),j=t("br",null,null,-1),z=["onUpdate:modelValue"],F=t("br",null,null,-1),q=["src"],G=["onClick"],J={key:0,class:"mt-3 d-flex"},K={class:"col-8"},Q={class:"row gy-3"},W={class:"col-12"},X=t("label",{for:"title",class:"form-label"}," 標題 ",-1),Y={class:"col-6"},Z=t("label",{for:"category",class:"form-label"},"分類",-1),tt={class:"col-6"},ot=t("label",{for:"unit",class:"form-label"},"單位",-1),et={class:"col-6"},st=t("label",{for:"origin_price",class:"form-label"},"原價",-1),lt={class:"col-6"},it=t("label",{for:"price",class:"form-label"},"售價",-1),nt={class:"col-12"},dt=t("hr",null,null,-1),ct=t("label",{for:"description",class:"form-label"},"產品描述",-1),rt={class:"col-12"},at=t("label",{for:"content",class:"form-label"},"說明內容",-1),ut={class:"col-12"},mt={class:"form-check"},pt=["value"],ht=t("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),_t={class:"modal-footer"},bt=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"關閉",-1);function gt(l,e,u,y,o,c){return r(),a("div",E,[t("div",T,[t("div",I,[t("div",L,[t("h5",R,m(o.tempProduct.title),1),A]),t("div",B,[t("form",D,[t("div",$,[H,n(t("input",{type:"text",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=s=>o.tempProduct.imageUrl=s)},null,512),[[d,o.tempProduct.imageUrl]]),O,t("img",{src:o.tempProduct.imageUrl,alt:"",width:"300"},null,8,N),S,j,(r(!0),a(f,null,v(o.tempProduct.imagesUrl,(s,i)=>(r(),a("div",{key:i+s},[n(t("input",{type:"text",class:"form-control","onUpdate:modelValue":p=>o.tempProduct.imagesUrl[i]=p},null,8,z),[[d,o.tempProduct.imagesUrl[i]]]),F,t("img",{src:s,alt:"",width:"300"},null,8,q),t("button",{type:"button",class:"btn btn-outline-danger",onClick:p=>o.tempProduct.imagesUrl.splice(i,1)},"移除",8,G)]))),128)),o.tempProduct.imagesUrl&&o.tempProduct.imagesUrl[o.tempProduct.imagesUrl.length-1]||o.tempProduct.imagesUrl&&o.tempProduct.imagesUrl.length===0||!o.tempProduct.imagesUrl?(r(),a("div",J,[t("button",{type:"button",class:"btn btn-outline-primary mx-auto w-100",onClick:e[1]||(e[1]=s=>o.tempProduct.imagesUrl.push(""))},"新增圖片")])):V("",!0)]),t("div",K,[t("div",Q,[t("div",W,[X,n(t("input",{type:"text",id:"title",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=s=>o.tempProduct.title=s)},null,512),[[d,o.tempProduct.title]])]),t("div",Y,[Z,n(t("input",{type:"text",id:"category",class:"form-control","onUpdate:modelValue":e[3]||(e[3]=s=>o.tempProduct.category=s)},null,512),[[d,o.tempProduct.category]])]),t("div",tt,[ot,n(t("input",{type:"text",id:"unit",class:"form-control","onUpdate:modelValue":e[4]||(e[4]=s=>o.tempProduct.unit=s)},null,512),[[d,o.tempProduct.unit]])]),t("div",et,[st,n(t("input",{type:"text",id:"origin_price",class:"form-control","onUpdate:modelValue":e[5]||(e[5]=s=>o.tempProduct.origin_price=s)},null,512),[[d,o.tempProduct.origin_price,void 0,{number:!0}]])]),t("div",lt,[it,n(t("input",{type:"text",id:"price",class:"form-control","onUpdate:modelValue":e[6]||(e[6]=s=>o.tempProduct.price=s)},null,512),[[d,o.tempProduct.price,void 0,{number:!0}]])]),t("div",nt,[dt,ct,n(t("textarea",{name:"",id:"description",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":e[7]||(e[7]=s=>o.tempProduct.description=s)},null,512),[[d,o.tempProduct.description]])]),t("div",rt,[at,n(t("textarea",{name:"",id:"content",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":e[8]||(e[8]=s=>o.tempProduct.content=s)},null,512),[[d,o.tempProduct.content]])]),t("div",ut,[t("div",mt,[n(t("input",{class:"form-check-input",type:"checkbox",value:o.tempProduct.is_enabled,id:"is_enabled","onUpdate:modelValue":e[9]||(e[9]=s=>o.tempProduct.is_enabled=s),"true-value":"1","false-value":"0"},null,8,pt),[[k,o.tempProduct.is_enabled]]),ht])])])])])]),t("div",_t,[bt,t("button",{type:"button",class:"btn btn-primary",onClick:e[10]||(e[10]=(...s)=>c.updateProduct&&c.updateProduct(...s))},"確定編輯")])])])],512)}const Pt=P(C,[["render",gt]]),{VITE_URL:b,VITE_PATH:g}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"cookiesss",BASE_URL:"/vite-practice/",MODE:"production",DEV:!1,PROD:!0},ft={components:{ProductModal:Pt},data(){return{products:[],productId:""}},methods:{getProducts(){const l=this.$loading.show(),e=document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e,this.$http.get(`${b}/api/${g}/admin/products/all`).then(u=>{console.log(u.data.products),this.products=u.data.products,l.hide()}).catch(u=>{console.log(u.response.data.message)})},openModal(l){this.productId=l,this.getProducts()},deleteProduct(l){this.$http.delete(`${b}/api/${g}/admin/product/${l}`).then(e=>{console.log(e.data.message),this.getProducts(),this.$swal({icon:"success",title:e.data.message,showConfirmButton:!1,timer:700})}).catch(e=>{console.log(e.response.data.message)})}},mounted(){this.getProducts()}},vt=t("h1",null,"產品列表",-1),yt={class:"d-flex"},Ut={class:"table"},Vt=t("thead",null,[t("tr",null,[t("th",null,"分類"),t("th",null,"產品名稱"),t("th",null,"原價"),t("th",null,"售價"),t("th",null,"是否啟用"),t("th",null,"編輯")])],-1),kt={class:"btn-group"},xt=["onClick"],wt=["onClick"];function Mt(l,e,u,y,o,c){const s=x("ProductModal");return r(),a("div",null,[vt,t("div",yt,[t("button",{type:"button",class:"btn btn-primary ms-auto mx-5",onClick:e[0]||(e[0]=i=>c.openModal("新增"))},"建立新的產品")]),t("table",Ut,[Vt,t("tbody",null,[(r(!0),a(f,null,v(o.products,i=>(r(),a("tr",{key:i.id},[t("td",null,m(i.category),1),t("td",null,m(i.title),1),t("td",null,m(i.origin_price),1),t("td",null,m(i.price),1),t("td",{class:M({"text-success":i.is_enabled,"fw-bold":i.is_enabled})},m(`${i.is_enabled?"啟用":"未啟用"}`),3),t("td",null,[t("div",kt,[t("button",{type:"button",class:"btn btn-sm btn-outline-primary",onClick:p=>c.openModal(i.id)},"編輯",8,xt),t("button",{type:"button",class:"btn btn-sm btn-outline-danger",onClick:p=>c.deleteProduct(i.id)},"刪除",8,wt)])])]))),128))])]),w(s,{ref:"modal",id:o.productId,"open-modal":c.openModal,"get-products":c.getProducts},null,8,["id","open-modal","get-products"])])}const Tt=P(ft,[["render",Mt]]);export{Tt as default};
