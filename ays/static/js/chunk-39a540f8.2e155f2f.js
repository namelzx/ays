(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39a540f8","chunk-51d3a341"],{"121a":function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return o})),s.d(e,"d",(function(){return n})),s.d(e,"c",(function(){return l}));var a=s("b775");function i(){return Object(a["a"])({url:"/tools/CarTools/CarBrand",method:"get"})}function o(){return Object(a["a"])({url:"/tools/CarTools/getBrand",method:"get"})}function n(t){return Object(a["a"])({url:"/tools/CarTools/getSeries",method:"get",params:{brand_id:t}})}function l(t){return Object(a["a"])({url:"/tools/CarTools/getModel",method:"get",params:{series_id:t}})}},"17d0":function(t,e,s){"use strict";s.d(e,"d",(function(){return i})),s.d(e,"b",(function(){return o})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return l}));var a=s("b775");function i(t){return Object(a["a"])({url:"/admin/Salesman/GetDataByList",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/Salesman/PostDataByAdd",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/admin/Salesman/del",method:"get",params:{id:t}})}function l(){return Object(a["a"])({url:"/admin/Salesman/GetSaleByAll",method:"get"})}},"31cf":function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"d",(function(){return o})),s.d(e,"e",(function(){return n})),s.d(e,"b",(function(){return l})),s.d(e,"c",(function(){return r}));var a=s("b775");function i(t){return Object(a["a"])({url:"/admin/Ecshopclass/GetDataByList",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/Ecshopclass/PostDataByAdd",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/admin/Ecshopclass/PostDataByUpSort",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/admin/Ecshopclass/GetIdByDelete",method:"post",data:t})}function r(){return Object(a["a"])({url:"/admin/Ecshopclass/GetecshopByList",method:"get"})}},"4e5a":function(t,e,s){"use strict";var a=s("ab46"),i=s.n(a);i.a},"62ae":function(t,e,s){},"97cb":function(t,e,s){"use strict";function a(t,e,s,a){var i=void 0!==window.screenLeft?window.screenLeft:screen.left,o=void 0!==window.screenTop?window.screenTop:screen.top,n=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,l=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,r=n/2-s/2+i,c=l/2-a/2+o,d=window.open(t,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+s+", height="+a+", top="+c+", left="+r);window.focus&&d.focus()}s.d(e,"a",(function(){return a}))},a241:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"w-dia"},[s("div",{staticClass:"dia-content"},[s("div",{staticClass:"c-data"},[s("div",{staticClass:"c-title"},[t._v("车主信息")]),t._v(" "),s("div",{staticClass:"c-content"},[s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("客户OpenID")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.openid,callback:function(e){t.$set(t.postFrom,"openid",e)},expression:"postFrom.openid"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("购买账号")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.buy_account,callback:function(e){t.$set(t.postFrom,"buy_account",e)},expression:"postFrom.buy_account"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v(" 购买平台")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-cascader",{attrs:{size:"mini",options:t.lazada,filterable:"",clearable:"",disabled:t.is_disabled,"change-on-select":""},model:{value:t.postFrom.lazada_list,callback:function(e){t.$set(t.postFrom,"lazada_list",e)},expression:"postFrom.lazada_list"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("购买产品")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.product_titile,callback:function(e){t.$set(t.postFrom,"product_titile",e)},expression:"postFrom.product_titile"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("订单金额")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.no_price,callback:function(e){t.$set(t.postFrom,"no_price",e)},expression:"postFrom.no_price"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("联系人")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.contact,callback:function(e){t.$set(t.postFrom,"contact",e)},expression:"postFrom.contact"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("联系电话")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.tel,callback:function(e){t.$set(t.postFrom,"tel",e)},expression:"postFrom.tel"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("地址")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-cascader",{staticStyle:{width:"100%"},attrs:{size:"mini",disabled:t.is_disabled,options:t.cityoptions},model:{value:t.postFrom.city_code,callback:function(e){t.$set(t.postFrom,"city_code",e)},expression:"postFrom.city_code"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("详细地址")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.city_desc,callback:function(e){t.$set(t.postFrom,"city_desc",e)},expression:"postFrom.city_desc"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("车牌号")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.number_plate,callback:function(e){t.$set(t.postFrom,"number_plate",e)},expression:"postFrom.number_plate"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("车型")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-cascader",{attrs:{size:"mini",options:t.regionHiera,filterable:"",clearable:"",disabled:t.is_disabled,"change-on-select":""},model:{value:t.postFrom.car_model,callback:function(e){t.$set(t.postFrom,"car_model",e)},expression:"postFrom.car_model"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("备注")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.desc,callback:function(e){t.$set(t.postFrom,"desc",e)},expression:"postFrom.desc"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("提交时间")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.create_time,callback:function(e){t.$set(t.postFrom,"create_time",e)},expression:"postFrom.create_time"}})],1)])])]),t._v(" "),s("div",{staticClass:"c-data"},[s("div",{staticClass:"c-title"},[t._v("派单信息")]),t._v(" "),s("div",{staticClass:"c-content"},[s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("购买单号")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.buy_order_no,callback:function(e){t.$set(t.postFrom,"buy_order_no",e)},expression:"postFrom.buy_order_no"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("门店名称")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},on:{change:t.handleShop},model:{value:t.postFrom.shop_id,callback:function(e){t.$set(t.postFrom,"shop_id",e)},expression:"postFrom.shop_id"}},t._l(t.shop,(function(t){return s("el-option",{attrs:{label:t.shopname,value:t.id}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("门店地址")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.shop_location,callback:function(e){t.$set(t.postFrom,"shop_location",e)},expression:"postFrom.shop_location"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("门店电话")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.shop_tel,callback:function(e){t.$set(t.postFrom,"shop_tel",e)},expression:"postFrom.shop_tel"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("主业务员")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.salesman_id,callback:function(e){t.$set(t.postFrom,"salesman_id",e)},expression:"postFrom.salesman_id"}},t._l(t.salesman,(function(e){return s("el-option",{attrs:{label:e.realName,value:e.id,disabled:t.postFrom.in_salesman_id===e.id}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("次业务员")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.in_salesman_id,callback:function(e){t.$set(t.postFrom,"in_salesman_id",e)},expression:"postFrom.in_salesman_id"}},t._l(t.salesman,(function(e){return s("el-option",{attrs:{label:e.realName,value:e.id,disabled:t.postFrom.salesman_id===e.id}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("安装费用")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{disabled:t.is_disabled,size:"mini",placeholder:"请输入内容"},model:{value:t.postFrom.ins_cost,callback:function(e){t.$set(t.postFrom,"ins_cost",e)},expression:"postFrom.ins_cost"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("客服")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.service,callback:function(e){t.$set(t.postFrom,"service",e)},expression:"postFrom.service"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("客服备注")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.service_desc,callback:function(e){t.$set(t.postFrom,"service_desc",e)},expression:"postFrom.service_desc"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("派单时间")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:"",value:t._f("parseTime")(t.postFrom.send_time,"{y}-{m}-{d} {h}:{i}:{s}"),placeholder:"请输入内容"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("核销码")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-input",{attrs:{size:"mini",disabled:"",placeholder:"请输入内容"},model:{value:t.postFrom.verification_code,callback:function(e){t.$set(t.postFrom,"verification_code",e)},expression:"postFrom.verification_code"}})],1)])])]),t._v(" "),s("div",{staticClass:"c-data"},[s("div",{staticClass:"c-title"},[t._v("配件信息")]),t._v(" "),s("div",{staticClass:"c-content"},[s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("支架")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.holder,callback:function(e){t.$set(t.postFrom,"holder",e)},expression:"postFrom.holder"}},t._l(t.holder,(function(t){return s("el-option",{attrs:{label:t.label,value:t.value}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("易改件")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.ygj,callback:function(e){t.$set(t.postFrom,"ygj",e)},expression:"postFrom.ygj"}},t._l(t.ygj,(function(t){return s("el-option",{attrs:{label:t.label,value:t.value}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("装饰罩")]),t._v(" "),s("div",{staticClass:"c-input"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.decorate,callback:function(e){t.$set(t.postFrom,"decorate",e)},expression:"postFrom.decorate"}},t._l(t.ygj,(function(t){return s("el-option",{attrs:{label:t.label,value:t.value}})})),1)],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("解码")]),t._v(" "),s("div",{staticClass:"d_code"},[s("el-select",{attrs:{size:"mini",disabled:t.is_disabled,filterable:"",placeholder:"请选择"},model:{value:t.postFrom.is_code,callback:function(e){t.$set(t.postFrom,"is_code",e)},expression:"postFrom.is_code"}},t._l(t.holder,(function(t){return s("el-option",{attrs:{label:t.label,value:t.value}})})),1),t._v(" "),"无"!==t.postFrom.is_code?s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.code,callback:function(e){t.$set(t.postFrom,"code",e)},expression:"postFrom.code"}}):t._e()],1)])])]),t._v(" "),s("div",{staticClass:"c-data"},[s("div",{staticClass:"c-title"},[t._v("配货方案")]),t._v(" "),s("div",{staticClass:"c-content"},[s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("支架")]),t._v(" "),s("div",[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.holder_text,callback:function(e){t.$set(t.postFrom,"holder_text",e)},expression:"postFrom.holder_text"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("易改件")]),t._v(" "),s("div",[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.ygj_text,callback:function(e){t.$set(t.postFrom,"ygj_text",e)},expression:"postFrom.ygj_text"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("装饰罩")]),t._v(" "),s("div",[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.decorate_text,callback:function(e){t.$set(t.postFrom,"decorate_text",e)},expression:"postFrom.decorate_text"}})],1)]),t._v(" "),s("div",{staticClass:"ct-item"},[s("span",{staticClass:"label"},[t._v("解码")]),t._v(" "),s("div",[s("el-input",{attrs:{size:"mini",disabled:t.is_disabled,placeholder:"请输入内容"},model:{value:t.postFrom.code_text,callback:function(e){t.$set(t.postFrom,"code_text",e)},expression:"postFrom.code_text"}})],1)])])]),t._v(" "),t.postFrom.credentials?s("div",{staticClass:"c-data"},[s("div",{staticClass:"c-title"},[t._v("安装凭证")]),t._v(" "),t.postFrom.credentials?s("div",{staticClass:"c-content"},[s("img",{staticClass:"credentials-img",attrs:{src:t.postFrom.credentials},on:{click:function(e){return t.handleImg(t.postFrom.credentials)}}})]):t._e()]):t._e(),t._v(" "),t.postFrom.eva?s("div",{staticClass:"eva"},[s("div",{staticClass:" eva-title"},[t._v("用户评价")]),t._v(" "),s("div",{staticClass:"rate-score"},[s("div",{staticClass:"product"},[s("div",{staticClass:"item-label"},[t._v("产品:")]),t._v(" "),s("div",{staticClass:"item-rate"},[s("el-rate",{attrs:{disabled:"",colors:["#FF0000","#FF0000","#FF0000"]},model:{value:t.postFrom.eva.product,callback:function(e){t.$set(t.postFrom.eva,"product",e)},expression:"postFrom.eva.product"}})],1)]),t._v(" "),s("div",{staticClass:"product"},[s("div",{staticClass:"item-label"},[t._v("客服:")]),t._v(" "),s("div",{staticClass:"item-rate"},[s("el-rate",{attrs:{disabled:"",colors:["#FF0000","#FF0000","#FF0000"]},model:{value:t.postFrom.eva.service,callback:function(e){t.$set(t.postFrom.eva,"service",e)},expression:"postFrom.eva.service"}})],1)]),t._v(" "),s("div",{staticClass:"product"},[s("div",{staticClass:"item-label"},[t._v("门店:")]),t._v(" "),s("div",{staticClass:"item-rate"},[s("el-rate",{attrs:{disabled:"",colors:["#FF0000","#FF0000","#FF0000"]},model:{value:t.postFrom.eva.shop,callback:function(e){t.$set(t.postFrom.eva,"shop",e)},expression:"postFrom.eva.shop"}})],1)])]),t._v(" "),s("div",{staticClass:"ev-content"},[s("span",[t._v("评论:")]),t._v(t._s(t.postFrom.eva.content))]),t._v(" "),s("div",{staticClass:"rate-img"},t._l(t.img,(function(t,e){return s("div",{key:e,staticClass:"img-item"},[s("img",{attrs:{src:t,alt:""}})])})),0)]):t._e()])])},i=[],o=(s("28a5"),s("db72")),n=s("121a"),l=s("17d0"),r=s("ef6c"),c=s("2f62"),d=s("e692"),u=s("f8b7"),p=s("31cf"),m=s("ed08"),v=s("97cb"),_={logcontent:"",openid:"oQJN40ldFZYLvqoIZm3NGwFu8oKA",lazada_id:"",lazada_list:"",lazada_index:"",buy_order_no:"12123",buy_account:"199",buy_product_id:"",no_price:"199",contact:"梁泽祥",tel:"18677947067",city_code:void 0,city_desc:"",number_plate:"A871237",car_model:void 0,car_index:"",car_model_id:""},b={name:"sendOrder",data:function(){return{img:[],colors:["#99A9BF","#F7BA2A","#FF9900"],value2:5,shopQuery:{cityCode:void 0,shopname:void 0,tel:void 0},innerVisible:!1,checked:!0,tableKey:0,CarModellist:[],lazada:[],salesman:[],holder:[{label:"有",value:1},{label:"无",value:2}],ygj:[{label:"有",value:1},{label:"随机发",value:2},{label:"供应商代发",value:3}],device:[],carl:[],list:null,total:null,cityoptions:r["regionDataPlus"],selectedRows:null,listLoading:!0,showSearch:!1,options:[],shop:[],listQuery:{page:1,limit:10,status:"-1",title:""},buttonDisabled:!0,deleting:!1,pickerOptions:m["j"],currentIndex:-1,regionHiera:[]}},computed:Object(o["a"])({},Object(c["b"])(["userinfo","brand"])),props:{postFrom:{type:Object,default:function(){return Object.assign({},_)}},Stitle:{type:String,default:""},is_disabled:{type:Boolean,default:!0},dialogVisible:{type:Boolean,default:!1}},created:function(){var t=this;this.postFrom.eva&&(this.postFrom.eva.img.constructor===String?this.img=this.postFrom.eva.img.split(","):this.img=this.postFrom.eva.img),void 0===this.brand?Object(n["a"])().then((function(e){t.regionHiera=e.data})):this.regionHiera=this.brand,Object(p["c"])().then((function(e){t.lazada=e.data})),Object(d["b"])().then((function(e){t.shop=e.data})),Object(l["a"])().then((function(e){t.salesman=e.data}))},methods:{handleImg:function(t){Object(v["a"])(t,"图片预览","500","400")},handleShop:function(t){this.postFrom.shop_id=t;for(var e=0;e<this.shop.length;e++)if(t===this.shop[e].id)return this.postFrom.shop_location=this.shop[e].cityName+" "+this.shop[e].location,void(this.postFrom.shop_tel=this.shop[e].tel)},handleClose:function(){this.$emit("handleClose")},updateRow:function(){var t=this;this.postFrom.city_code=this.postFrom.city_code.join(","),this.postFrom.car_model=this.postFrom.car_model.join(","),"待处理"===this.postFrom.status&&(this.postFrom.status=1,this.postFrom.logcontent="待确认(业务员) "+this.userinfo.realName+"派单  已通知"),"待确认(业务)"===this.postFrom.status&&(this.postFrom.status=2,this.postFrom.logcontent="待确认(门店) "+this.userinfo.realName+"同意派单,"),"待确认(门店)"===this.postFrom.status&&(this.postFrom.status=3,this.postFrom.logcontent="待安装 "+this.userinfo.realName+"已接单,"),"待安装"===this.postFrom.status&&(this.postFrom.status=4,this.postFrom.logcontent="已安装 "+this.userinfo.realName+"安装完成,"),"已安装"===this.postFrom.status&&(this.postFrom.status=5,this.postFrom.logcontent="财审1 "+this.userinfo.realName+"确认安装,"),"财审1"===this.postFrom.status&&(this.postFrom.status=6,this.postFrom.logcontent="财审2 "+this.userinfo.realName+"审核通过,"),"财审2"===this.postFrom.status&&(this.postFrom.status=7,this.postFrom.logcontent="待结算 "+this.userinfo.realName+"结算通过,"),Object(u["g"])(this.postFrom).then((function(e){t.$emit("handleClose"),t.postFrom=Object.assign({},_),t.postFrom.city_code=t.postFrom.city_code.splice(","),t.postFrom.car_model=t.postFrom.car_model.splice(",")}))}}},h=b,f=(s("4e5a"),s("cd784"),s("2877")),F=Object(f["a"])(h,a,i,!1,null,"247fc0bb",null);e["default"]=F.exports},ab46:function(t,e,s){},cd784:function(t,e,s){"use strict";var a=s("62ae"),i=s.n(a);i.a},e692:function(t,e,s){"use strict";s.d(e,"B",(function(){return i})),s.d(e,"g",(function(){return o})),s.d(e,"a",(function(){return n})),s.d(e,"o",(function(){return l})),s.d(e,"b",(function(){return r})),s.d(e,"t",(function(){return c})),s.d(e,"l",(function(){return d})),s.d(e,"d",(function(){return u})),s.d(e,"s",(function(){return p})),s.d(e,"e",(function(){return m})),s.d(e,"k",(function(){return v})),s.d(e,"i",(function(){return _})),s.d(e,"n",(function(){return b})),s.d(e,"j",(function(){return h})),s.d(e,"h",(function(){return f})),s.d(e,"m",(function(){return F})),s.d(e,"u",(function(){return C})),s.d(e,"r",(function(){return y})),s.d(e,"q",(function(){return g})),s.d(e,"p",(function(){return j})),s.d(e,"v",(function(){return O})),s.d(e,"w",(function(){return B})),s.d(e,"c",(function(){return x})),s.d(e,"f",(function(){return k}));var a=s("b775");function i(t){return Object(a["a"])({url:"/admin/shop/GetAuditShopByList",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/shop/GetInstallByList",method:"get",params:t})}function n(t){return Object(a["a"])({url:"/admin/shop/GetDataByList",method:"get",params:t})}function l(t){return Object(a["a"])({url:"/admin/shop/PostDataByAudit",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/admin/shop/GetDataByAll",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/admin/shop/PostDataByUpdate",method:"post",data:t})}function d(t){return Object(a["a"])({url:"/admin/shop/GetShopByRunning",method:"get",params:t})}function u(t){return Object(a["a"])({url:"/admin/shop/GetEnvByList",method:"get",params:t})}function p(t){return Object(a["a"])({url:"/admin/shop/PostDataByUpBind",method:"post",data:t})}function m(t){return Object(a["a"])({url:"/admin/shop/GetIDByDetails",method:"get",params:{id:t}})}function v(t){return Object(a["a"])({url:"/admin/shop/GetProjectByList",method:"get",params:{id:t}})}function _(t){return Object(a["a"])({url:"/admin/shop/GetProjectByAdd",method:"post",data:t})}function b(t){return Object(a["a"])({url:"/admin/shop/PostBussByUpdate",method:"post",data:t})}function h(t){return Object(a["a"])({url:"/admin/shop/GetProjectByDel",method:"get",params:{id:t}})}function f(t){return Object(a["a"])({url:"/admin/shop/GetProjectBy",method:"get",params:{id:t}})}function F(t){return Object(a["a"])({url:"/admin/shop/PostBlackByUpdate",method:"post",data:t})}function C(t){return Object(a["a"])({url:"/admin/shop/PostWhiteByUpdate",method:"post",data:t})}function y(t){return Object(a["a"])({url:"/admin/shop/PostDataByRecommended",method:"post",data:t})}function g(t){return Object(a["a"])({url:"/admin/shop/PostDataByCityAll",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/admin/shop/PostDataByBuildAll",method:"post",data:t})}function O(t){return Object(a["a"])({url:"/admin/shop/PostbalanceByUpdate",method:"post",data:t})}function B(t){return Object(a["a"])({url:"/admin/shop/PostensureByUpdate",method:"post",data:t})}function x(t){return Object(a["a"])({url:"/admin/shop/GetDataBydownload",method:"post",data:t})}function k(t){return Object(a["a"])({url:"/admin/shop/delete",method:"get",params:{id:t}})}},f8b7:function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return o})),s.d(e,"g",(function(){return n})),s.d(e,"i",(function(){return l})),s.d(e,"h",(function(){return r})),s.d(e,"j",(function(){return c})),s.d(e,"f",(function(){return d})),s.d(e,"m",(function(){return u})),s.d(e,"e",(function(){return p})),s.d(e,"d",(function(){return m})),s.d(e,"c",(function(){return v}));var a=s("b775");function i(t){return Object(a["a"])({url:"/admin/Order/GetDataByList",method:"get",params:t})}function o(t){return Object(a["a"])({url:"/admin/Order/GetIdByOrderLog",method:"get",params:{id:t}})}function n(t){return Object(a["a"])({url:"/admin/Order/PostDataByAdd",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/admin/Order/PostNoteByAdd",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/admin/Order/PostDataBySale",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/admin/Order/PostReturnedByAdd",method:"post",data:t})}function d(t){return Object(a["a"])({url:"/admin/Order/GetTypeBySale",method:"get",params:t})}function u(t){return Object(a["a"])({url:"/admin/Order/GetIdByDelete",method:"get",params:t})}function p(t){return Object(a["a"])({url:"/admin/Order/GetQueryBydownload",method:"get",params:t})}function m(t){return Object(a["a"])({url:"/admin/Payorder/GetIdByinstdetails",method:"get",params:{order_id:t}})}function v(t){return Object(a["a"])({url:"/admin/Payorder/GetIdByinstOrderLog",method:"get",params:{order_id:t}})}}}]);