(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f24b0080","chunk-3016671c"],{"0013":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{position:"absolute",width:"100%"}},[e("div",{staticClass:"head"},[e("el-row",{attrs:{gutter:20}},[e("el-cascader",{ref:"car",staticStyle:{width:"40%"},attrs:{size:"mini",props:t.props,filterable:"",clearable:"","change-on-select":""},on:{"visible-change":t.elCascaderCar,"expand-change":t.elCascaderCar,change:t.handleModel},model:{value:t.postFrom.car_model,callback:function(i){t.$set(t.postFrom,"car_model",i)},expression:"postFrom.car_model"}}),t._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.importCarLamp()}}},[t._v("批量导入")]),t._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.importDow}},[t._v("下载模板")])],1)],1),t._v(" "),e("div",{staticClass:"table"},t._l(t.list,(function(i,a){return e("div",{staticClass:"list",on:{click:function(e){return t.handleView(i)}}},[i.carmodel?e("div",{staticClass:"title"},[t._v(t._s(i.carmodel.carseries.series_name)+"\n                "+t._s(i.carmodel.model_name)+"\n            ")]):t._e(),t._v(" "),e("div",{staticClass:"light"},[e("div",[t._v("近光:"),e("span",[t._v(t._s(i.dipped_title?i.dipped_title:"无"))])]),t._v(" "),e("div",[t._v("远光:"),e("span",[t._v(t._s(i.high_title?i.high_title:"无"))])]),t._v(" "),e("div",[t._v("雾灯:"),e("span",[t._v(t._s(i.fog_title?i.fog_title:"无"))])]),t._v(" "),e("div",[t._v("转向辅助:"),e("span",[t._v(t._s(i.auxiliary_title?i.auxiliary_title:"无"))])])]),t._v(" "),e("div",{staticClass:"plan"},[e("div",{staticClass:"title"},[t._v("灯改方案:")]),t._v(" "),e("div",{staticClass:"desc"},[e("span",[t._v(t._s(i.plan?i.plan:"无"))])])]),t._v(" "),e("div",{staticClass:"plan"},[e("div",{staticClass:"title"},[t._v("配货方案:")]),t._v(" "),e("div",{staticClass:"p-plan"},[e("div",{staticClass:"light",staticStyle:{"margin-top":"0"}},[e("div",[t._v("支架:"),e("span",[t._v(t._s(i.holder?i.holder:"无"))])]),t._v(" "),e("div",[t._v("易改件:"),e("span",[t._v(t._s(i.ygj?i.ygj:"无"))])]),t._v(" "),e("div",[t._v("解码:"),e("span",[t._v(t._s(i.is_code?i.is_code:"无"))])]),t._v(" "),e("div",[t._v("装饰罩:"),e("span",[t._v(t._s(i.decorate_text?i.decorate_text:"无"))])])])])])])})),0),t._v(" "),e("InfoDta",{ref:"infodata",on:{updateRow:t.updateRow}}),t._v(" "),e("el-dialog",{staticClass:"w-dia",attrs:{title:"批量导入方案",visible:t.importVisible,width:"70%","before-close":t.handleClose},on:{"update:visible":function(i){t.importVisible=i}}},[e("upload-excel-component",{attrs:{"on-success":t.handleSuccess,"before-upload":t.beforeUpload}})],1),t._v(" "),e("div",{staticClass:"pageclass"},[e("div",{staticClass:"pagination-container page"},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1)},s=[],o=(e("ac6a"),e("7f7f"),e("121a")),n=e("ae8a"),r=e("3796"),l=e("84be"),c=(e("e692"),{name:"index",data:function(){return{total:0,car:"",importVisible:!1,list:[],postFrom:{},regionHiera:[],listQuery:{limit:10,page:1},props:{lazy:!0,lazyLoad:function(t,i){var e=t.level;t.label;if(console.log(t),0===e&&Object(o["b"])().then((function(t){for(var e=t.data,a=[],s=0;s<e.length;s++)a.push({label:e[s].name,value:e[s].brandid});i(a)})),1===e&&Object(o["d"])(t.data.value).then((function(t){for(var e=t.data,a=[],s=0;s<e.length;s++)a.push({label:e[s].factory_name+" "+e[s].series_name,value:e[s].series_id});i(a)})),2===e&&Object(o["c"])(t.data.value).then((function(t){for(var a=t.data,s=[],o=0;o<a.length;o++)s.push({label:a[o].label,value:a[o].value,leaf:e>=2});i(s)})),3===e){var a=[];i(a)}}}}},created:function(){var t=this;Object(o["b"])().then((function(i){t.regionHiera=i.data}))},components:{InfoDta:l["default"],UploadExcelComponent:r["a"]},methods:{importDow:function(){var t="https://pdpt.oss-cn-beijing.aliyuncs.com/%E6%94%B9%E7%81%AF%E6%96%B9%E6%A1%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx";window.location.href=t},handleClose:function(){this.importVisible=!1},importCarLamp:function(){this.importVisible=!0},beforeUpload:function(t){var i=t.size/1024/1024<1;return!!i||(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSizeChange:function(t){this.listQuery.limit=t,this.fetchList()},handleCurrentChange:function(t){this.listQuery.page=1,this.fetchList()},handleSuccess:function(t){var i=this,e=t.results,a=t.header;this.tableData=e,console.log(e),Object(n["d"])(e).then((function(t){i.importVisible=!1,i.$message.success(t.data.msg)})),this.tableHeader=a},updateRow:function(t){this.fetchList()},handleView:function(t){this.$refs.infodata.handleView(t)},elCascaderCar:function(){var t=this;setTimeout((function(){document.querySelectorAll(".el-cascader-node__label").forEach((function(i){i.onclick=function(){this.previousElementSibling.click(),t.$refs.car.dropDownVisible=!1}})),document.querySelectorAll(".el-cascader-panel .el-radio").forEach((function(i){i.onclick=function(){t.$refs.car.dropDownVisible=!1}}))}),100)},handleModel:function(t){var i=t;void 0!==i?(this.listQuery.model_id=i,this.fetchList()):this.list=[]},fetchList:function(){var t=this;Object(n["b"])(this.listQuery).then((function(i){t.list=i.data.data,t.total=i.data.total}))}}}),d=c,u=(e("853a"),e("2877")),p=Object(u["a"])(d,a,s,!1,null,"296c461b",null);i["default"]=p.exports},1:function(t,i){},"121a":function(t,i,e){"use strict";e.d(i,"a",(function(){return s})),e.d(i,"b",(function(){return o})),e.d(i,"d",(function(){return n})),e.d(i,"c",(function(){return r}));var a=e("b775");function s(){return Object(a["a"])({url:"/tools/CarTools/CarBrand",method:"get"})}function o(){return Object(a["a"])({url:"/tools/CarTools/getBrand",method:"get"})}function n(t){return Object(a["a"])({url:"/tools/CarTools/getSeries",method:"get",params:{brand_id:t}})}function r(t){return Object(a["a"])({url:"/tools/CarTools/getModel",method:"get",params:{series_id:t}})}},2:function(t,i){},"28e4":function(t,i,e){},3:function(t,i){},"35d9":function(t,i,e){"use strict";e.d(i,"a",(function(){return s})),e.d(i,"d",(function(){return o})),e.d(i,"e",(function(){return n})),e.d(i,"b",(function(){return r})),e.d(i,"c",(function(){return l}));var a=e("b775");function s(t){return Object(a["a"])({url:"/admin/Led/GetDataByList",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/Led/PostDataByAdd",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/admin/Led/PostDataByUpSort",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/admin/Led/GetIdByDelete",method:"post",data:t})}function l(){return Object(a["a"])({url:"/admin/Led/GetLedByTree",method:"get"})}},"84be":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("el-dialog",{staticClass:"w-dia",attrs:{title:"信息修改",visible:t.dialogVisible,width:"50%","before-close":t.handleClose},on:{"update:visible":function(i){t.dialogVisible=i}}},[e("div",{staticClass:"dia-content"},[e("div",{staticClass:"c-data"},[e("div",{staticClass:"c-content"},[e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("近光")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-cascader",{attrs:{size:"mini",options:t.led,clearable:"",props:{checkStrictly:!0},clearable:""},model:{value:t.postFrom.dipped_id,callback:function(i){t.$set(t.postFrom,"dipped_id",i)},expression:"postFrom.dipped_id"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("转向辅助")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-cascader",{attrs:{size:"mini",options:t.led,clearable:"",props:{checkStrictly:!0},clearable:""},model:{value:t.postFrom.auxiliary_id,callback:function(i){t.$set(t.postFrom,"auxiliary_id",i)},expression:"postFrom.auxiliary_id"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("双光透镜")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-cascader",{attrs:{size:"mini",options:t.led,clearable:"",props:{checkStrictly:!0},clearable:""},model:{value:t.postFrom.through_id,callback:function(i){t.$set(t.postFrom,"through_id",i)},expression:"postFrom.through_id"}})],1)])])]),t._v(" "),e("div",{staticClass:"c-data"},[e("div",{staticClass:"c-content"},[e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("远光")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-cascader",{attrs:{size:"mini",options:t.led,clearable:"",props:{checkStrictly:!0},clearable:""},model:{value:t.postFrom.high_id,callback:function(i){t.$set(t.postFrom,"high_id",i)},expression:"postFrom.high_id"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("雾灯")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-cascader",{attrs:{size:"mini",options:t.led,clearable:"",props:{checkStrictly:!0},clearable:""},model:{value:t.postFrom.fog_id,callback:function(i){t.$set(t.postFrom,"fog_id",i)},expression:"postFrom.fog_id"}})],1)])])]),t._v(" "),e("div",{staticClass:" plan"},[e("span",{staticClass:"label"},[t._v("灯改方案")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",autosize:{minRows:6,maxRows:8},size:"mini",placeholder:"请输入内容"},model:{value:t.postFrom.plan,callback:function(i){t.$set(t.postFrom,"plan",i)},expression:"postFrom.plan"}})],1)]),t._v(" "),e("div",{staticClass:"c-data"},[e("div",{staticClass:"c-title"},[t._v("配货方案")]),t._v(" "),e("div",{staticClass:"c-content"},[e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("支架")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.holder,callback:function(i){t.$set(t.postFrom,"holder",i)},expression:"postFrom.holder"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("装饰罩")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.decorate_text,callback:function(i){t.$set(t.postFrom,"decorate_text",i)},expression:"postFrom.decorate_text"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("近光转接线")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.low_beam,callback:function(i){t.$set(t.postFrom,"low_beam",i)},expression:"postFrom.low_beam"}})],1)])])]),t._v(" "),e("div",{staticClass:"c-data"},[e("div",{staticClass:"c-title"},[t._v(" ")]),t._v(" "),e("div",{staticClass:"c-content"},[e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("易改件")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.ygj,callback:function(i){t.$set(t.postFrom,"ygj",i)},expression:"postFrom.ygj"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("解码")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.is_code,callback:function(i){t.$set(t.postFrom,"is_code",i)},expression:"postFrom.is_code"}})],1)]),t._v(" "),e("div",{staticClass:"ct-item"},[e("span",{staticClass:"label"},[t._v("远光转接线")]),t._v(" "),e("div",{staticClass:"c-input"},[e("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.in_the,callback:function(i){t.$set(t.postFrom,"in_the",i)},expression:"postFrom.in_the"}})],1)])])])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.handleSave()}}},[t._v("确认修改")]),t._v(" "),e("el-button",{attrs:{size:"mini"},on:{click:t.handleClose}},[t._v("关闭")])],1)])],1)},s=[],o=(e("28a5"),e("db72")),n=e("ae8a"),r=e("35d9"),l=e("2f62"),c={name:"SendOrder",data:function(){return{led:[],dialogVisible:!1,postFrom:{},ygj:[{label:"无",value:"无"},{label:"随货发",value:"随货发"},{label:"供应商代发",value:"供应商代发"},{label:"支架",value:"支架"}]}},computed:Object(o["a"])({},Object(l["b"])(["userinfo","brand"])),created:function(){this.getled()},mounted:function(){console.log(this.userinfo)},methods:{getled:function(){var t=this;Object(r["c"])().then((function(i){t.led=i.data}))},handleSave:function(){var t=this;this.postFrom.high_id=this.postFrom.high_id.join(","),this.postFrom.dipped_id=this.postFrom.dipped_id.join(","),this.postFrom.fog_id=this.postFrom.fog_id.join(","),this.postFrom.auxiliary_id=this.postFrom.auxiliary_id.join(","),this.postFrom.through_id=this.postFrom.through_id.join(","),Object(n["c"])(this.postFrom).then((function(i){console.log(i),t.$message.success("更新成功"),t.dialogVisible=!1,t.$emit("updateRow",t.postFrom.model_id)}))},handleView:function(t){if(this.dialogVisible=!0,this.postFrom=t,null!==t.dipped_id){t.dipped_id.constructor===String&&(this.postFrom.dipped_id=this.postFrom.dipped_id.split(","));var i=this.postFrom.dipped_id;this.postFrom.dipped_id=[];for(var e=0;e<i.length;e++)this.postFrom.dipped_id.push(parseInt(i[e]))}if(null!==t.auxiliary_id){t.auxiliary_id.constructor===String&&(this.postFrom.auxiliary_id=this.postFrom.auxiliary_id.split(","));var a=this.postFrom.auxiliary_id;this.postFrom.auxiliary_id=[];for(var s=0;s<a.length;s++)this.postFrom.auxiliary_id.push(parseInt(a[s]))}if(null!==t.high_id){t.high_id.constructor===String&&(this.postFrom.high_id=this.postFrom.high_id.split(","));var o=this.postFrom.high_id;this.postFrom.high_id=[];for(var n=0;n<o.length;n++)this.postFrom.high_id.push(parseInt(o[n]))}if(null!==t.fog_id){t.fog_id.constructor===String&&(this.postFrom.fog_id=this.postFrom.fog_id.split(","));var r=this.postFrom.fog_id;this.postFrom.fog_id=[];for(var l=0;l<r.length;l++)this.postFrom.fog_id.push(parseInt(r[l]))}if(null!==t.through_id){t.through_id.constructor===String&&(this.postFrom.through_id=this.postFrom.through_id.split(","));var c=this.postFrom.through_id;this.postFrom.through_id=[];for(var d=0;d<c.length;d++)this.postFrom.through_id.push(parseInt(c[d]))}},handleClose:function(){this.dialogVisible=!1}}},d=c,u=(e("eb08"),e("2877")),p=Object(u["a"])(d,a,s,!1,null,null,null);i["default"]=p.exports},"853a":function(t,i,e){"use strict";var a=e("28e4"),s=e.n(a);s.a},ae8a:function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return o})),e.d(i,"d",(function(){return n})),e.d(i,"a",(function(){return r}));var a=e("b775");function s(t){return Object(a["a"])({url:"/admin/CarLamp/GetModelIdByInfo",method:"get",params:t})}function o(t){return Object(a["a"])({url:"/admin/CarLamp/PostDataBySave",method:"post",data:t})}function n(t){return Object(a["a"])({url:"/admin/CarLamp/importCarLamp",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/admin/CarLamp/GetCarlampInfo",method:"get",params:{model_id:t}})}},bfa4:function(t,i,e){},e692:function(t,i,e){"use strict";e.d(i,"C",(function(){return s})),e.d(i,"g",(function(){return o})),e.d(i,"a",(function(){return n})),e.d(i,"o",(function(){return r})),e.d(i,"b",(function(){return l})),e.d(i,"t",(function(){return c})),e.d(i,"l",(function(){return d})),e.d(i,"d",(function(){return u})),e.d(i,"s",(function(){return p})),e.d(i,"e",(function(){return m})),e.d(i,"k",(function(){return h})),e.d(i,"i",(function(){return f})),e.d(i,"n",(function(){return v})),e.d(i,"j",(function(){return _})),e.d(i,"h",(function(){return b})),e.d(i,"m",(function(){return g})),e.d(i,"v",(function(){return C})),e.d(i,"r",(function(){return y})),e.d(i,"q",(function(){return F})),e.d(i,"p",(function(){return j})),e.d(i,"w",(function(){return O})),e.d(i,"x",(function(){return x})),e.d(i,"c",(function(){return B})),e.d(i,"f",(function(){return w})),e.d(i,"u",(function(){return k}));var a=e("b775");function s(t){return Object(a["a"])({url:"/admin/shop/GetAuditShopByList",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/shop/GetInstallByList",method:"get",params:t})}function n(t){return Object(a["a"])({url:"/admin/shop/GetDataByList",method:"get",params:t})}function r(t){return Object(a["a"])({url:"/admin/shop/PostDataByAudit",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/admin/shop/GetDataByAll",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/admin/shop/PostDataByUpdate",method:"post",data:t})}function d(t){return Object(a["a"])({url:"/admin/shop/GetShopByRunning",method:"get",params:t})}function u(t){return Object(a["a"])({url:"/admin/shop/GetEnvByList",method:"get",params:t})}function p(t){return Object(a["a"])({url:"/admin/shop/PostDataByUpBind",method:"post",data:t})}function m(t){return Object(a["a"])({url:"/admin/shop/GetIDByDetails",method:"get",params:{id:t}})}function h(t){return Object(a["a"])({url:"/admin/shop/GetProjectByList",method:"get",params:{id:t}})}function f(t){return Object(a["a"])({url:"/admin/shop/GetProjectByAdd",method:"post",data:t})}function v(t){return Object(a["a"])({url:"/admin/shop/PostBussByUpdate",method:"post",data:t})}function _(t){return Object(a["a"])({url:"/admin/shop/GetProjectByDel",method:"get",params:{id:t}})}function b(t){return Object(a["a"])({url:"/admin/shop/GetProjectBy",method:"get",params:{id:t}})}function g(t){return Object(a["a"])({url:"/admin/shop/PostBlackByUpdate",method:"post",data:t})}function C(t){return Object(a["a"])({url:"/admin/shop/PostWhiteByUpdate",method:"post",data:t})}function y(t){return Object(a["a"])({url:"/admin/shop/PostDataByRecommended",method:"post",data:t})}function F(t){return Object(a["a"])({url:"/admin/shop/PostDataByCityAll",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/admin/shop/PostDataByBuildAll",method:"post",data:t})}function O(t){return Object(a["a"])({url:"/admin/shop/PostbalanceByUpdate",method:"post",data:t})}function x(t){return Object(a["a"])({url:"/admin/shop/PostensureByUpdate",method:"post",data:t})}function B(t){return Object(a["a"])({url:"/admin/shop/GetDataBydownload",method:"post",data:t})}function w(t){return Object(a["a"])({url:"/admin/shop/delete",method:"get",params:{id:t}})}function k(t){return Object(a["a"])({url:"/admin/shop/PostRecomBySet",method:"post",data:t})}},eb08:function(t,i,e){"use strict";var a=e("bfa4"),s=e.n(a);s.a}}]);