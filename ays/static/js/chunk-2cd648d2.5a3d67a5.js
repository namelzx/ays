(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cd648d2"],{"301c":function(t,e,i){"use strict";var n=i("90c9"),a=i.n(n);a.a},6724:function(t,e,i){"use strict";i("8d41");var n="@@wavesContext";function a(t,e){function i(i){var n=Object.assign({},e.value),a=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=a.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var s=l.getBoundingClientRect(),o=l.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",l.appendChild(o)),a.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(i.pageY-s.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(i.pageX-s.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=a.color,o.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=i:t[n]={removeHandle:i},i}var l={bind:function(t,e){t.addEventListener("click",a(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",a(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},s=function(t){t.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(s)),l.install=s;e["a"]=l},"8d41":function(t,e,i){},"90c9":function(t,e,i){},ac20:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"form filter-container"},[i("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:t.listQuery}},[i("el-form-item",{attrs:{label:"产品分类:"}},[i("el-select",{attrs:{size:"mini",placeholder:"请选择"},on:{change:t.handleFilter},model:{value:t.listQuery.class_id,callback:function(e){t.$set(t.listQuery,"class_id",e)},expression:"listQuery.class_id"}},t._l(t.classlist,(function(t){return i("el-option",{key:t.id,attrs:{label:t.field_title,value:t.id}})})),1)],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.handleCreate}},[t._v("新增")])],1)],1)],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[i("el-table-column",{attrs:{label:"产品名称","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"产品分类","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.classif?i("span",[t._v(t._s(e.row.classif.field_title))]):i("span",[t._v("未分类")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"质保时间","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.quality_time))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"一级","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.one))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"二级","min-width":"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.tow))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"150px","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tooltip",{attrs:{content:"编辑",placement:"top"}},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.handleUpdate(e.row)}}},[t._v("\n            编辑\n          ")])],1),t._v(" "),i("el-tooltip",{attrs:{content:"删除",placement:"top"}},[i("el-button",{attrs:{type:"warning",size:"mini",plain:""},on:{click:function(i){return t.handleDelete(e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.psize,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.postStatusText[t.StatusText],visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-main"},[i("el-form",{ref:"form",attrs:{model:t.postFrom,"label-width":"100px"}},[i("div",{staticClass:"main-tag"},[i("el-row",{attrs:{gutter:20}},[i("el-col",[i("el-form-item",{attrs:{label:"产品名称"}},[i("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.title,callback:function(e){t.$set(t.postFrom,"title",e)},expression:"postFrom.title"}})],1)],1),t._v(" "),i("el-col",[i("el-form-item",{attrs:{label:"产品分类"}},[i("el-select",{attrs:{size:"mini",placeholder:"请选择"},on:{change:t.handleFilter},model:{value:t.postFrom.class_id,callback:function(e){t.$set(t.postFrom,"class_id",e)},expression:"postFrom.class_id"}},t._l(t.classlist,(function(t){return i("el-option",{key:t.id,attrs:{label:t.field_title,value:t.id}})})),1)],1)],1),t._v(" "),i("el-col",[i("el-form-item",{attrs:{label:"质保时间"}},[i("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.quality_time,callback:function(e){t.$set(t.postFrom,"quality_time",e)},expression:"postFrom.quality_time"}})],1)],1),t._v(" "),i("el-col",[i("el-form-item",{attrs:{label:"一级"}},[i("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.one,callback:function(e){t.$set(t.postFrom,"one",e)},expression:"postFrom.one"}})],1)],1),t._v(" "),i("el-col",[i("el-form-item",{attrs:{label:"二级"}},[i("el-input",{attrs:{size:"mini"},model:{value:t.postFrom.tow,callback:function(e){t.$set(t.postFrom,"tow",e)},expression:"postFrom.tow"}})],1)],1)],1)],1)])],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){"create"===t.StatusText?t.createData():t.updateData()}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)])],1)},a=[],l=i("db6d"),s=i("c4c8"),o=i("6724"),r=(i("ed08"),{name:"audit",data:function(){return{form:{},input:"",tableKey:0,rejectedFrom:{shop_id:void 0,desc:void 0},postStatusText:{create:"产品新增",edit:"产品修改"},StatusText:"create",postFrom:{},listLoading:!0,total:0,checkList:[],dialogVisible:!1,innerVisible:!1,listQuery:{page:1,limit:10,status:"1",title:""},classlist:[],list:[]}},components:{InputForm:l["a"],waves:o["a"]},created:function(){this.fetchList(),this.getclass()},methods:{getclass:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i={pid:e};Object(s["a"])(i).then((function(e){t.classlist=e.data}))},fetchList:function(){var t=this;this.listLoading=!0,Object(s["j"])(this.listQuery).then((function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.fetchList()},handleFilterClear:function(){this.listQuery={page:1,psize:10,status:"1",title:""},this.fetchList()},handleClose:function(){this.dialogVisible=!this.dialogVisible},handleSizeChange:function(t){this.listQuery.psize=t,this.fetchList()},handleCurrentChange:function(t){this.listQuery.page=t,this.fetchList()},handleCreate:function(){this.postFrom={title:"",class_id:"",quality_time:"",one:"",tow:""},this.dialogVisible=!this.dialogVisible,this.StatusText="create"},createData:function(){var t=this;Object(s["h"])(this.postFrom).then((function(e){t.dialogVisible=!t.dialogVisible,t.fetchList()}))},handleUpdate:function(t){console.log(t),this.StatusText="edit",this.dialogVisible=!this.dialogVisible,this.postFrom=t},updateData:function(){var t=this;Object(s["h"])(this.postFrom).then((function(e){t.dialogVisible=!t.dialogVisible}))},handleDelete:function(t){var e=this,i=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var e=i.list.indexOf(t);Object(s["i"])(t.id).then((function(t){1===t.status?(i.list.splice(e,1),i.total=i.total-1,i.$notify.success(t.msg)):i.$notify.error(t.msg)})).catch((function(t){}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}}),c=r,u=(i("301c"),i("2877")),d=Object(u["a"])(c,n,a,!1,null,"7604681f",null);e["default"]=d.exports},c4c8:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"f",(function(){return l})),i.d(e,"g",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return r})),i.d(e,"j",(function(){return c})),i.d(e,"i",(function(){return u})),i.d(e,"h",(function(){return d})),i.d(e,"d",(function(){return p})),i.d(e,"e",(function(){return f}));var n=i("b775");function a(t){return Object(n["a"])({url:"/admin/ProductClass/GetDataByList",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/admin/ProductClass/PostDataByAdd",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/admin/ProductClass/PostDataByUpSort",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/admin/ProductClass/GetIdByDelete",method:"post",data:t})}function r(t){return Object(n["a"])({url:"/admin/ProductClass/GetDataByAll",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/admin/Product/GetDataByList",method:"post",data:t})}function u(t){return Object(n["a"])({url:"/admin/Product/GetIdByDelete",method:"post",data:{id:t}})}function d(t){return Object(n["a"])({url:"/admin/Product/PostDataByAdd",method:"post",data:t})}function p(t){return Object(n["a"])({url:"/admin/Product/GetDataByAll",method:"post",data:t})}function f(t){return Object(n["a"])({url:"/admin/Product/GetProductByTree",method:"post",data:t})}}}]);