(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5391eab5","chunk-51d3a341"],{"121a":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return r}));var o=n("b775");function a(){return Object(o["a"])({url:"/tools/CarTools/CarBrand",method:"get"})}function i(){return Object(o["a"])({url:"/tools/CarTools/getBrand",method:"get"})}function s(t){return Object(o["a"])({url:"/tools/CarTools/getSeries",method:"get",params:{brand_id:t}})}function r(t){return Object(o["a"])({url:"/tools/CarTools/getModel",method:"get",params:{series_id:t}})}},"17d0":function(t,e,n){"use strict";n.d(e,"d",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return r}));var o=n("b775");function a(t){return Object(o["a"])({url:"/admin/Salesman/GetDataByList",method:"post",data:t})}function i(t){return Object(o["a"])({url:"/admin/Salesman/PostDataByAdd",method:"post",data:t})}function s(t){return Object(o["a"])({url:"/admin/Salesman/del",method:"get",params:{id:t}})}function r(){return Object(o["a"])({url:"/admin/Salesman/GetSaleByAll",method:"get"})}},"236b":function(t,e,n){"use strict";var o=n("5404"),a=n.n(o);a.a},"31cf":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return i})),n.d(e,"e",(function(){return s})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return d}));var o=n("b775");function a(t){return Object(o["a"])({url:"/admin/Ecshopclass/GetDataByList",method:"post",data:t})}function i(t){return Object(o["a"])({url:"/admin/Ecshopclass/PostDataByAdd",method:"post",data:t})}function s(t){return Object(o["a"])({url:"/admin/Ecshopclass/PostDataByUpSort",method:"post",data:t})}function r(t){return Object(o["a"])({url:"/admin/Ecshopclass/GetIdByDelete",method:"post",data:t})}function d(){return Object(o["a"])({url:"/admin/Ecshopclass/GetecshopByList",method:"get"})}},5404:function(t,e,n){},"6f8c":function(t,e,n){},"97cb":function(t,e,n){"use strict";function o(t,e,n,o){var a=void 0!==window.screenLeft?window.screenLeft:screen.left,i=void 0!==window.screenTop?window.screenTop:screen.top,s=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,r=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,d=s/2-n/2+a,c=r/2-o/2+i,u=window.open(t,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+n+", height="+o+", top="+c+", left="+d);window.focus&&u.focus()}n.d(e,"a",(function(){return o}))},cb64:function(t,e,n){"use strict";var o=n("6f8c"),a=n.n(o);a.a},e2ee:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"dia-content"},[n("div",{staticClass:"c-data"},[n("div",{staticClass:"c-content"},[n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("状态")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.status))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("开户行")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.bank))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("账号")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.bank_account))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("姓名")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.bank_name))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("备注")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.desc))])])])])]),t._v(" "),n("div",{staticClass:"c-data"},[n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("平台")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.lazada_title))])])]),t._v(" "),n("div",{staticClass:"c-content"},[n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("类别")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.retype))])])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("金额")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.no_price))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("客服")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.proposer))])])]),t._v(" "),n("div",{staticClass:"ct-item"},[n("span",{staticClass:"label"},[t._v("下单日期")]),t._v(" "),n("div",{staticClass:"c-input"},[n("div",[t._v(t._s(t.postFrom.create_time))])])])]),t._v(" "),n("div",{staticStyle:{display:"flex","flex-direction":"row"}},[t.imglist.length>0?n("div",{staticClass:"imglist"},t._l(t.imglist,(function(e){return e?n("img",{staticStyle:{width:"80px",height:"80px"},attrs:{src:e},on:{click:function(n){return t.handleImg(e)}}}):t._e()})),0):t._e(),t._v(" "),t.videolist.length>0?n("div",{staticClass:"videolist",staticStyle:{display:"flex","flex-direction":"row"}},t._l(t.videolist,(function(e){return e?n("video",{staticStyle:{width:"80px",height:"80px"},attrs:{controls:"",src:e}}):t._e()})),0):t._e()])])])},a=[],i=(n("28a5"),n("db72")),s=(n("7f7f"),n("121a")),r=n("17d0"),d=n("ef6c"),c=n("2f62"),u=n("e692"),l=n("f8b7"),m=n("31cf"),p=n("ed08"),h=n("97cb"),f={logcontent:"",openid:"oQJN40ldFZYLvqoIZm3NGwFu8oKA",lazada_id:"",lazada_list:"",lazada_index:"",buy_order_no:"12123",buy_account:"199",buy_product_id:"",no_price:"199",contact:"梁泽祥",tel:"18677947067",city_code:void 0,city_desc:"",number_plate:"A871237",car_model:void 0,car_index:"",car_model_id:""},v={name:"sendOrder",data:function(){return{img:[],colors:["#99A9BF","#F7BA2A","#FF9900"],imglist:[],videolist:[],value2:5,shopQuery:{cityCode:void 0,shopname:void 0,tel:void 0},retype:[{label:"售后退款",value:"售后退款"},{label:"返现奖励",value:"返现奖励"},{label:"其他",value:"其他"}],innerVisible:!1,checked:!0,tableKey:0,CarModellist:[],lazada:[],salesman:[],holder:[{label:"有",value:1},{label:"无",value:2}],ygj:[{label:"有",value:1},{label:"随机发",value:2},{label:"供应商代发",value:3}],device:[],carl:[],list:null,total:null,cityoptions:d["regionDataPlus"],selectedRows:null,listLoading:!0,showSearch:!1,options:[],shop:[],listQuery:{page:1,limit:10,status:"-1",title:""},props:{lazy:!0,lazyLoad:function(t,e){var n=t.level;if(0===n&&Object(s["b"])().then((function(t){for(var n=t.data,o=[],a=0;a<n.length;a++)o.push({label:n[a].name,value:n[a].brandid});e(o)})),1===n&&Object(s["d"])(t.data.value).then((function(t){for(var n=t.data,o=[],a=0;a<n.length;a++)o.push({label:n[a].factory_name+" "+n[a].series_name,value:n[a].series_id});e(o)})),2===n&&Object(s["c"])(t.data.value).then((function(t){for(var o=t.data,a=[],i=0;i<o.length;i++)a.push({label:o[i].label,value:o[i].value,leaf:n>=2});e(a)})),3===n){var o=[];e(o)}}},buttonDisabled:!0,deleting:!1,pickerOptions:p["j"],currentIndex:-1,regionHiera:[]}},computed:Object(i["a"])({},Object(c["b"])(["userinfo","brand"])),props:{postFrom:{type:Object,default:function(){return Object.assign({},f)}},Stitle:{type:String,default:""},is_disabled:{type:Boolean,default:!0},dialogVisible:{type:Boolean,default:!1}},created:function(){var t=this;this.postFrom.eva&&(this.postFrom.eva.img.constructor===String?this.img=this.postFrom.eva.img.split(","):this.img=this.postFrom.eva.img),console.log(this.postFrom.imglist),this.postFrom.imglist&&(this.imglist=this.postFrom.imglist.split(",")),this.postFrom.videolist&&(this.videolist=this.postFrom.videolist.split(",")),Object(m["c"])().then((function(e){t.lazada=e.data})),Object(u["b"])().then((function(e){t.shop=e.data})),Object(r["a"])().then((function(e){t.salesman=e.data}))},methods:{handleImg:function(t){Object(h["a"])(t,"图片预览","500","400")},handleShop:function(t){this.postFrom.shop_id=t;for(var e=0;e<this.shop.length;e++)if(t===this.shop[e].id)return this.postFrom.shop_location=this.shop[e].cityName+" "+this.shop[e].location,void(this.postFrom.shop_tel=this.shop[e].tel)},handleClose:function(){this.$emit("handleClose")},updateRow:function(){var t=this;this.postFrom.city_code=this.postFrom.city_code.join(","),this.postFrom.car_model=this.postFrom.car_model.join(","),"待处理"===this.postFrom.status&&(this.postFrom.status=1,this.postFrom.logcontent="待确认(业务员) "+this.userinfo.realName+"派单  已通知"),"待确认(业务)"===this.postFrom.status&&(this.postFrom.status=2,this.postFrom.logcontent="待确认(门店) "+this.userinfo.realName+"同意派单,"),"待确认(门店)"===this.postFrom.status&&(this.postFrom.status=3,this.postFrom.logcontent="待安装 "+this.userinfo.realName+"已接单,"),"待安装"===this.postFrom.status&&(this.postFrom.status=4,this.postFrom.logcontent="已安装 "+this.userinfo.realName+"安装完成,"),"已安装"===this.postFrom.status&&(this.postFrom.status=5,this.postFrom.logcontent="财审1 "+this.userinfo.realName+"确认安装,"),"财审1"===this.postFrom.status&&(this.postFrom.status=6,this.postFrom.logcontent="财审2 "+this.userinfo.realName+"审核通过,"),"财审2"===this.postFrom.status&&(this.postFrom.status=7,this.postFrom.logcontent="待结算 "+this.userinfo.realName+"结算通过,"),Object(l["g"])(this.postFrom).then((function(e){t.$emit("handleClose"),t.postFrom=Object.assign({},f),t.postFrom.city_code=t.postFrom.city_code.splice(","),t.postFrom.car_model=t.postFrom.car_model.splice(",")}))}}},b=v,_=(n("236b"),n("cb64"),n("2877")),g=Object(_["a"])(b,o,a,!1,null,"1d1982c0",null);e["default"]=g.exports},e692:function(t,e,n){"use strict";n.d(e,"B",(function(){return a})),n.d(e,"g",(function(){return i})),n.d(e,"a",(function(){return s})),n.d(e,"o",(function(){return r})),n.d(e,"b",(function(){return d})),n.d(e,"t",(function(){return c})),n.d(e,"l",(function(){return u})),n.d(e,"d",(function(){return l})),n.d(e,"s",(function(){return m})),n.d(e,"e",(function(){return p})),n.d(e,"k",(function(){return h})),n.d(e,"i",(function(){return f})),n.d(e,"n",(function(){return v})),n.d(e,"j",(function(){return b})),n.d(e,"h",(function(){return _})),n.d(e,"m",(function(){return g})),n.d(e,"u",(function(){return y})),n.d(e,"r",(function(){return O})),n.d(e,"q",(function(){return j})),n.d(e,"p",(function(){return F})),n.d(e,"v",(function(){return B})),n.d(e,"w",(function(){return C})),n.d(e,"c",(function(){return w})),n.d(e,"f",(function(){return G}));var o=n("b775");function a(t){return Object(o["a"])({url:"/admin/shop/GetAuditShopByList",method:"post",data:t})}function i(t){return Object(o["a"])({url:"/admin/shop/GetInstallByList",method:"get",params:t})}function s(t){return Object(o["a"])({url:"/admin/shop/GetDataByList",method:"get",params:t})}function r(t){return Object(o["a"])({url:"/admin/shop/PostDataByAudit",method:"post",data:t})}function d(t){return Object(o["a"])({url:"/admin/shop/GetDataByAll",method:"post",data:t})}function c(t){return Object(o["a"])({url:"/admin/shop/PostDataByUpdate",method:"post",data:t})}function u(t){return Object(o["a"])({url:"/admin/shop/GetShopByRunning",method:"get",params:t})}function l(t){return Object(o["a"])({url:"/admin/shop/GetEnvByList",method:"get",params:t})}function m(t){return Object(o["a"])({url:"/admin/shop/PostDataByUpBind",method:"post",data:t})}function p(t){return Object(o["a"])({url:"/admin/shop/GetIDByDetails",method:"get",params:{id:t}})}function h(t){return Object(o["a"])({url:"/admin/shop/GetProjectByList",method:"get",params:{id:t}})}function f(t){return Object(o["a"])({url:"/admin/shop/GetProjectByAdd",method:"post",data:t})}function v(t){return Object(o["a"])({url:"/admin/shop/PostBussByUpdate",method:"post",data:t})}function b(t){return Object(o["a"])({url:"/admin/shop/GetProjectByDel",method:"get",params:{id:t}})}function _(t){return Object(o["a"])({url:"/admin/shop/GetProjectBy",method:"get",params:{id:t}})}function g(t){return Object(o["a"])({url:"/admin/shop/PostBlackByUpdate",method:"post",data:t})}function y(t){return Object(o["a"])({url:"/admin/shop/PostWhiteByUpdate",method:"post",data:t})}function O(t){return Object(o["a"])({url:"/admin/shop/PostDataByRecommended",method:"post",data:t})}function j(t){return Object(o["a"])({url:"/admin/shop/PostDataByCityAll",method:"post",data:t})}function F(t){return Object(o["a"])({url:"/admin/shop/PostDataByBuildAll",method:"post",data:t})}function B(t){return Object(o["a"])({url:"/admin/shop/PostbalanceByUpdate",method:"post",data:t})}function C(t){return Object(o["a"])({url:"/admin/shop/PostensureByUpdate",method:"post",data:t})}function w(t){return Object(o["a"])({url:"/admin/shop/GetDataBydownload",method:"post",data:t})}function G(t){return Object(o["a"])({url:"/admin/shop/delete",method:"get",params:{id:t}})}},f8b7:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"g",(function(){return s})),n.d(e,"i",(function(){return r})),n.d(e,"h",(function(){return d})),n.d(e,"j",(function(){return c})),n.d(e,"f",(function(){return u})),n.d(e,"m",(function(){return l})),n.d(e,"e",(function(){return m})),n.d(e,"d",(function(){return p})),n.d(e,"c",(function(){return h}));var o=n("b775");function a(t){return Object(o["a"])({url:"/admin/Order/GetDataByList",method:"get",params:t})}function i(t){return Object(o["a"])({url:"/admin/Order/GetIdByOrderLog",method:"get",params:{id:t}})}function s(t){return Object(o["a"])({url:"/admin/Order/PostDataByAdd",method:"post",data:t})}function r(t){return Object(o["a"])({url:"/admin/Order/PostNoteByAdd",method:"post",data:t})}function d(t){return Object(o["a"])({url:"/admin/Order/PostDataBySale",method:"post",data:t})}function c(t){return Object(o["a"])({url:"/admin/Order/PostReturnedByAdd",method:"post",data:t})}function u(t){return Object(o["a"])({url:"/admin/Order/GetTypeBySale",method:"get",params:t})}function l(t){return Object(o["a"])({url:"/admin/Order/GetIdByDelete",method:"get",params:t})}function m(t){return Object(o["a"])({url:"/admin/Order/GetQueryBydownload",method:"get",params:t})}function p(t){return Object(o["a"])({url:"/admin/Payorder/GetIdByinstdetails",method:"get",params:{order_id:t}})}function h(t){return Object(o["a"])({url:"/admin/Payorder/GetIdByinstOrderLog",method:"get",params:{order_id:t}})}}}]);