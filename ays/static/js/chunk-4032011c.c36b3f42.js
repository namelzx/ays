(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4032011c","chunk-51d3a341"],{"121a":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s})),a.d(e,"d",(function(){return i})),a.d(e,"c",(function(){return r}));var n=a("b775");function o(){return Object(n["a"])({url:"/tools/CarTools/CarBrand",method:"get"})}function s(){return Object(n["a"])({url:"/tools/CarTools/getBrand",method:"get"})}function i(t){return Object(n["a"])({url:"/tools/CarTools/getSeries",method:"get",params:{brand_id:t}})}function r(t){return Object(n["a"])({url:"/tools/CarTools/getModel",method:"get",params:{series_id:t}})}},"17d0":function(t,e,a){"use strict";a.d(e,"d",(function(){return o})),a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return r}));var n=a("b775");function o(t){return Object(n["a"])({url:"/admin/Salesman/GetDataByList",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/admin/Salesman/PostDataByAdd",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/admin/Salesman/del",method:"get",params:{id:t}})}function r(){return Object(n["a"])({url:"/admin/Salesman/GetSaleByAll",method:"get"})}},"31cf":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"d",(function(){return s})),a.d(e,"e",(function(){return i})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return l}));var n=a("b775");function o(t){return Object(n["a"])({url:"/admin/Ecshopclass/GetDataByList",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/admin/Ecshopclass/PostDataByAdd",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/admin/Ecshopclass/PostDataByUpSort",method:"post",data:t})}function r(t){return Object(n["a"])({url:"/admin/Ecshopclass/GetIdByDelete",method:"post",data:t})}function l(){return Object(n["a"])({url:"/admin/Ecshopclass/GetecshopByList",method:"get"})}},"33ea":function(t,e,a){"use strict";var n=a("4516"),o=a.n(n);o.a},4516:function(t,e,a){},"8df6":function(t,e,a){},"97cb":function(t,e,a){"use strict";function n(t,e,a,n){var o=void 0!==window.screenLeft?window.screenLeft:screen.left,s=void 0!==window.screenTop?window.screenTop:screen.top,i=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,r=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,l=i/2-a/2+o,c=r/2-n/2+s,d=window.open(t,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+a+", height="+n+", top="+c+", left="+l);window.focus&&d.focus()}a.d(e,"a",(function(){return n}))},c6ed:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-dia"},[a("div",{staticClass:"dia-content"},[a("div",{staticClass:"c-data"},[a("div",{staticClass:"c-content"},[a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("状态")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.status,callback:function(e){t.$set(t.postFrom,"status",e)},expression:"postFrom.status"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("支付单号")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.id,callback:function(e){t.$set(t.postFrom,"id",e)},expression:"postFrom.id"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("购买平台")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.lazada_title,callback:function(e){t.$set(t.postFrom,"lazada_title",e)},expression:"postFrom.lazada_title"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("购买单号")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.buy_order_no,callback:function(e){t.$set(t.postFrom,"buy_order_no",e)},expression:"postFrom.buy_order_no"}})],1)])])]),t._v(" "),a("div",{staticClass:"c-data"},[a("div",{staticClass:"c-content"},[a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("类别")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-select",{attrs:{size:"mini",disabled:"",filterable:"",placeholder:"请选择"},model:{value:t.postFrom.retype,callback:function(e){t.$set(t.postFrom,"retype",e)},expression:"postFrom.retype"}},t._l(t.retype,(function(t){return a("el-option",{attrs:{label:t.label,value:t.value}})})),1)],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("开户行")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.bank,callback:function(e){t.$set(t.postFrom,"bank",e)},expression:"postFrom.bank"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("账号")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.bank_account,callback:function(e){t.$set(t.postFrom,"bank_account",e)},expression:"postFrom.bank_account"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("姓名")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.bank_name,callback:function(e){t.$set(t.postFrom,"bank_name",e)},expression:"postFrom.bank_name"}})],1)])])]),t._v(" "),a("div",{staticClass:"c-data"},[a("div",{staticClass:"c-content"},[a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("费用")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.cost,callback:function(e){t.$set(t.postFrom,"cost",e)},expression:"postFrom.cost"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("申请日期")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.create_time,callback:function(e){t.$set(t.postFrom,"create_time",e)},expression:"postFrom.create_time"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("结算日期")]),t._v(" "),a("div",{staticClass:"c-input"},[t.postFrom.settlement_time?a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"尚未结算"},model:{value:t.postFrom.settlement_time,callback:function(e){t.$set(t.postFrom,"settlement_time",e)},expression:"postFrom.settlement_time"}}):a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"尚未结算"}})],1)]),t._v(" "),a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("客服")]),t._v(" "),a("div",{staticClass:"c-input"},[t.postFrom.pre?a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.pre.realName,callback:function(e){t.$set(t.postFrom.pre,"realName",e)},expression:"postFrom.pre.realName"}}):a("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.pre,callback:function(e){t.$set(t.postFrom,"pre",e)},expression:"postFrom.pre"}})],1)])])]),t._v(" "),a("div",{staticClass:"i-desc"},[a("div",{staticClass:"ct-item"},[a("span",{staticClass:"label"},[t._v("备注")]),t._v(" "),a("div",{staticClass:"c-input"},[a("el-input",{staticStyle:{resize:"none"},attrs:{type:"textarea",rows:3,size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.note,callback:function(e){t.$set(t.postFrom,"note",e)},expression:"postFrom.note"}})],1)])]),t._v(" "),a("div",{staticStyle:{display:"flex","flex-direction":"row"}},[t.imglist.length>0?a("div",{staticClass:"imglist"},t._l(t.imglist,(function(e){return e?a("img",{staticStyle:{width:"80px",height:"80px"},attrs:{src:e},on:{click:function(a){return t.handleImg(e)}}}):t._e()})),0):t._e(),t._v(" "),t.videolist.length>0?a("div",{staticClass:"videolist",staticStyle:{display:"flex","flex-direction":"row"}},t._l(t.videolist,(function(e){return e?a("video",{staticStyle:{width:"80px",height:"80px"},attrs:{controls:"",src:e}}):t._e()})),0):t._e()])])])},o=[],s=(a("28a5"),a("db72")),i=(a("7f7f"),a("121a")),r=a("17d0"),l=a("ef6c"),c=a("2f62"),d=a("e692"),u=a("f8b7"),m=a("31cf"),p=a("ed08"),h=a("97cb"),f={logcontent:"",openid:"oQJN40ldFZYLvqoIZm3NGwFu8oKA",lazada_id:"",lazada_list:"",lazada_index:"",buy_order_no:"12123",buy_account:"199",buy_product_id:"",no_price:"199",contact:"梁泽祥",tel:"18677947067",city_code:void 0,city_desc:"",number_plate:"A871237",car_model:void 0,car_index:"",car_model_id:""},b={name:"sendOrder",data:function(){return{img:[],colors:["#99A9BF","#F7BA2A","#FF9900"],imglist:[],videolist:[],value2:5,shopQuery:{cityCode:void 0,shopname:void 0,tel:void 0},retype:[{label:"售后退款",value:"售后退款"},{label:"返现奖励",value:"返现奖励"},{label:"其他",value:"其他"}],innerVisible:!1,checked:!0,tableKey:0,CarModellist:[],lazada:[],salesman:[],holder:[{label:"有",value:1},{label:"无",value:2}],ygj:[{label:"有",value:1},{label:"随机发",value:2},{label:"供应商代发",value:3}],device:[],carl:[],list:null,total:null,cityoptions:l["regionDataPlus"],selectedRows:null,listLoading:!0,showSearch:!1,options:[],shop:[],listQuery:{page:1,limit:10,status:"-1",title:""},props:{lazy:!0,lazyLoad:function(t,e){var a=t.level;if(0===a&&Object(i["b"])().then((function(t){for(var a=t.data,n=[],o=0;o<a.length;o++)n.push({label:a[o].name,value:a[o].brandid});e(n)})),1===a&&Object(i["d"])(t.data.value).then((function(t){for(var a=t.data,n=[],o=0;o<a.length;o++)n.push({label:a[o].factory_name+" "+a[o].series_name,value:a[o].series_id});e(n)})),2===a&&Object(i["c"])(t.data.value).then((function(t){for(var n=t.data,o=[],s=0;s<n.length;s++)o.push({label:n[s].label,value:n[s].value,leaf:a>=2});e(o)})),3===a){var n=[];e(n)}}},buttonDisabled:!0,deleting:!1,pickerOptions:p["j"],currentIndex:-1,regionHiera:[]}},computed:Object(s["a"])({},Object(c["b"])(["userinfo","brand"])),props:{postFrom:{type:Object,default:function(){return Object.assign({},f)}},Stitle:{type:String,default:""},is_disabled:{type:Boolean,default:!0},dialogVisible:{type:Boolean,default:!1}},created:function(){var t=this;this.postFrom.eva&&(this.postFrom.eva.img.constructor===String?this.img=this.postFrom.eva.img.split(","):this.img=this.postFrom.eva.img),this.imglist=this.postFrom.imglist.split(","),this.postFrom.videolist&&(this.videolist=this.postFrom.videolist.split(",")),Object(m["c"])().then((function(e){t.lazada=e.data})),Object(d["b"])().then((function(e){t.shop=e.data})),Object(r["a"])().then((function(e){t.salesman=e.data}))},methods:{handleImg:function(t){Object(h["a"])(t,"图片预览","500","400")},handleShop:function(t){this.postFrom.shop_id=t;for(var e=0;e<this.shop.length;e++)if(t===this.shop[e].id)return this.postFrom.shop_location=this.shop[e].cityName+" "+this.shop[e].location,void(this.postFrom.shop_tel=this.shop[e].tel)},handleClose:function(){this.$emit("handleClose")},updateRow:function(){var t=this;this.postFrom.city_code=this.postFrom.city_code.join(","),this.postFrom.car_model=this.postFrom.car_model.join(","),"待处理"===this.postFrom.status&&(this.postFrom.status=1,this.postFrom.logcontent="待确认(业务员) "+this.userinfo.realName+"派单  已通知"),"待确认(业务)"===this.postFrom.status&&(this.postFrom.status=2,this.postFrom.logcontent="待确认(门店) "+this.userinfo.realName+"同意派单,"),"待确认(门店)"===this.postFrom.status&&(this.postFrom.status=3,this.postFrom.logcontent="待安装 "+this.userinfo.realName+"已接单,"),"待安装"===this.postFrom.status&&(this.postFrom.status=4,this.postFrom.logcontent="已安装 "+this.userinfo.realName+"安装完成,"),"已安装"===this.postFrom.status&&(this.postFrom.status=5,this.postFrom.logcontent="财审1 "+this.userinfo.realName+"确认安装,"),"财审1"===this.postFrom.status&&(this.postFrom.status=6,this.postFrom.logcontent="财审2 "+this.userinfo.realName+"审核通过,"),"财审2"===this.postFrom.status&&(this.postFrom.status=7,this.postFrom.logcontent="待结算 "+this.userinfo.realName+"结算通过,"),Object(u["g"])(this.postFrom).then((function(e){t.$emit("handleClose"),t.postFrom=Object.assign({},f),t.postFrom.city_code=t.postFrom.city_code.splice(","),t.postFrom.car_model=t.postFrom.car_model.splice(",")}))}}},v=b,_=(a("fa34"),a("33ea"),a("2877")),F=Object(_["a"])(v,n,o,!1,null,"2694e047",null);e["default"]=F.exports},e692:function(t,e,a){"use strict";a.d(e,"B",(function(){return o})),a.d(e,"g",(function(){return s})),a.d(e,"a",(function(){return i})),a.d(e,"o",(function(){return r})),a.d(e,"b",(function(){return l})),a.d(e,"t",(function(){return c})),a.d(e,"l",(function(){return d})),a.d(e,"d",(function(){return u})),a.d(e,"s",(function(){return m})),a.d(e,"e",(function(){return p})),a.d(e,"k",(function(){return h})),a.d(e,"i",(function(){return f})),a.d(e,"n",(function(){return b})),a.d(e,"j",(function(){return v})),a.d(e,"h",(function(){return _})),a.d(e,"m",(function(){return F})),a.d(e,"u",(function(){return y})),a.d(e,"r",(function(){return g})),a.d(e,"q",(function(){return O})),a.d(e,"p",(function(){return j})),a.d(e,"v",(function(){return C})),a.d(e,"w",(function(){return B})),a.d(e,"c",(function(){return w})),a.d(e,"f",(function(){return k}));var n=a("b775");function o(t){return Object(n["a"])({url:"/admin/shop/GetAuditShopByList",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/admin/shop/GetInstallByList",method:"get",params:t})}function i(t){return Object(n["a"])({url:"/admin/shop/GetDataByList",method:"get",params:t})}function r(t){return Object(n["a"])({url:"/admin/shop/PostDataByAudit",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/admin/shop/GetDataByAll",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/admin/shop/PostDataByUpdate",method:"post",data:t})}function d(t){return Object(n["a"])({url:"/admin/shop/GetShopByRunning",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/admin/shop/GetEnvByList",method:"get",params:t})}function m(t){return Object(n["a"])({url:"/admin/shop/PostDataByUpBind",method:"post",data:t})}function p(t){return Object(n["a"])({url:"/admin/shop/GetIDByDetails",method:"get",params:{id:t}})}function h(t){return Object(n["a"])({url:"/admin/shop/GetProjectByList",method:"get",params:{id:t}})}function f(t){return Object(n["a"])({url:"/admin/shop/GetProjectByAdd",method:"post",data:t})}function b(t){return Object(n["a"])({url:"/admin/shop/PostBussByUpdate",method:"post",data:t})}function v(t){return Object(n["a"])({url:"/admin/shop/GetProjectByDel",method:"get",params:{id:t}})}function _(t){return Object(n["a"])({url:"/admin/shop/GetProjectBy",method:"get",params:{id:t}})}function F(t){return Object(n["a"])({url:"/admin/shop/PostBlackByUpdate",method:"post",data:t})}function y(t){return Object(n["a"])({url:"/admin/shop/PostWhiteByUpdate",method:"post",data:t})}function g(t){return Object(n["a"])({url:"/admin/shop/PostDataByRecommended",method:"post",data:t})}function O(t){return Object(n["a"])({url:"/admin/shop/PostDataByCityAll",method:"post",data:t})}function j(t){return Object(n["a"])({url:"/admin/shop/PostDataByBuildAll",method:"post",data:t})}function C(t){return Object(n["a"])({url:"/admin/shop/PostbalanceByUpdate",method:"post",data:t})}function B(t){return Object(n["a"])({url:"/admin/shop/PostensureByUpdate",method:"post",data:t})}function w(t){return Object(n["a"])({url:"/admin/shop/GetDataBydownload",method:"post",data:t})}function k(t){return Object(n["a"])({url:"/admin/shop/delete",method:"get",params:{id:t}})}},f8b7:function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s})),a.d(e,"g",(function(){return i})),a.d(e,"i",(function(){return r})),a.d(e,"h",(function(){return l})),a.d(e,"j",(function(){return c})),a.d(e,"f",(function(){return d})),a.d(e,"m",(function(){return u})),a.d(e,"e",(function(){return m})),a.d(e,"d",(function(){return p})),a.d(e,"c",(function(){return h}));var n=a("b775");function o(t){return Object(n["a"])({url:"/admin/Order/GetDataByList",method:"get",params:t})}function s(t){return Object(n["a"])({url:"/admin/Order/GetIdByOrderLog",method:"get",params:{id:t}})}function i(t){return Object(n["a"])({url:"/admin/Order/PostDataByAdd",method:"post",data:t})}function r(t){return Object(n["a"])({url:"/admin/Order/PostNoteByAdd",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/admin/Order/PostDataBySale",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/admin/Order/PostReturnedByAdd",method:"post",data:t})}function d(t){return Object(n["a"])({url:"/admin/Order/GetTypeBySale",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/admin/Order/GetIdByDelete",method:"get",params:t})}function m(t){return Object(n["a"])({url:"/admin/Order/GetQueryBydownload",method:"get",params:t})}function p(t){return Object(n["a"])({url:"/admin/Payorder/GetIdByinstdetails",method:"get",params:{order_id:t}})}function h(t){return Object(n["a"])({url:"/admin/Payorder/GetIdByinstOrderLog",method:"get",params:{order_id:t}})}},fa34:function(t,e,a){"use strict";var n=a("8df6"),o=a.n(n);o.a}}]);