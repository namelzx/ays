(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9b7d7e8","chunk-521f3390","chunk-206e9b7e"],{"1e4a":function(t,e,i){"use strict";var l=i("5bc6"),n=i.n(l);n.a},"20bb":function(t,e,i){"use strict";var l=i("933d"),n=i.n(l);n.a},"277e":function(t,e,i){"use strict";i.d(e,"e",(function(){return n})),i.d(e,"f",(function(){return s})),i.d(e,"g",(function(){return a})),i.d(e,"h",(function(){return o})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return d})),i.d(e,"d",(function(){return c})),i.d(e,"b",(function(){return u}));var l=i("b775");function n(t){return Object(l["a"])({url:"admin/Permissions/index",method:"post",data:t})}function s(){return Object(l["a"])({url:"/admin/Permissions/getLists",method:"post"})}function a(t){return Object(l["a"])({url:"/admin/Permissions/getinfo",method:"get",params:{id:t}})}function o(t){return Object(l["a"])({url:"/admin/Permissions/save",method:"post",data:t})}function r(t){return Object(l["a"])({url:"/admin/Permissions/del",method:"get",params:{id:t}})}function d(t,e,i){var n={val:t,field:e,value:i};return Object(l["a"])({url:"/admin/Permissions/change",method:"post",data:n})}function c(t){return Object(l["a"])({url:"/admin/Permissions/delall",method:"post",data:t})}function u(t){return Object(l["a"])({url:"/admin/Permissions/changeall",method:"post",data:t})}},"5bc6":function(t,e,i){},"5d51":function(t,e,i){"use strict";i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a}));var l=i("b775");function n(){return Object(l["a"])({url:"/admin/roles/getLists",method:"post"})}function s(t){return Object(l["a"])({url:"/admin/roles/getinfo",method:"get",params:{id:t}})}function a(t){return Object(l["a"])({url:"/admin/roles/save",method:"post",data:t})}},6724:function(t,e,i){"use strict";i("8d41");var l="@@wavesContext";function n(t,e){function i(i){var l=Object.assign({},e.value),n=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},l),s=n.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var a=s.getBoundingClientRect(),o=s.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(a.width,a.height)+"px",s.appendChild(o)),n.type){case"center":o.style.top=a.height/2-o.offsetHeight/2+"px",o.style.left=a.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(i.pageY-a.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(i.pageX-a.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=n.color,o.className="waves-ripple z-active",!1}}return t[l]?t[l].removeHandle=i:t[l]={removeHandle:i},i}var s={bind:function(t,e){t.addEventListener("click",n(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[l].removeHandle,!1),t.addEventListener("click",n(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[l].removeHandle,!1),t[l]=null,delete t[l]}},a=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(a)),s.install=a;e["a"]=s},8433:function(t,e,i){"use strict";i.r(e);var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{width:"60%",title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"100%",height:"50vh","overflow-y":"scroll"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"岗位名称",prop:"title"}},[i("el-input",{attrs:{clearable:""},model:{value:t.temp.title,callback:function(e){t.$set(t.temp,"title",e)},expression:"temp.title"}})],1),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"md"},[i("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[i("el-checkbox-group",{attrs:{indeterminate:t.isIndeterminate},on:{change:t.handleCheckedCitiesChange},model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.getPremiss,(function(e,l){return i("el-collapse-item",{attrs:{name:e.name}},[i("span",{staticClass:"collapse-title",attrs:{slot:"title"},slot:"title"},[e.title?i("el-checkbox",{attrs:{label:e.id}},[t._v(t._s(e.title))]):t._e()],1),t._v(" "),t._l(e.children,(function(e,l){return i("div",{staticClass:"ch-2"},[e.title?i("el-checkbox",{attrs:{label:e.id}},[t._v(t._s(e.title))]):t._e(),t._v(" "),e.roles?i("el-checkbox-group",{model:{value:t.rolesList,callback:function(e){t.rolesList=e},expression:"rolesList"}},t._l(e.roles,(function(l,n){return e.roles?i("div",{staticClass:"o-2-or"},[i("div",{staticClass:"or-title"},[i("el-checkbox",[t._v(t._s(l.title))])],1),t._v(" "),i("div",{staticClass:"or-child-item"},t._l(l.children,(function(e,l){return i("div",{staticClass:"or-child"},[i("el-checkbox",{attrs:{label:e.id}},[t._v(t._s(e.title))])],1)})),0)]):t._e()})),0):t._e(),t._v(" "),t._l(e.children,(function(l,n){return e.children?i("div",[i("el-checkbox",{attrs:{label:l.id}},[t._v(t._s(l.title))])],1):t._e()}))],2)}))],2)})),1)],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{loading:t.btnLoading,type:"primary"},on:{click:function(e){return t.saveData()}}},[t._v("保存")])],1)],1)},n=[],s=(i("28a5"),i("bd43")),a=i("277e"),o=i("f382"),r={name:"RolesForm",data:function(){return{loading:!0,checkList:[],rolesList:[],activeNames:void 0,btnLoading:!1,ruleList:[],checked:!0,temp:{id:0,title:"",status:1,rules:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"添加"},rules:{title:[{required:!0,message:"名称必填",trigger:"blur"}]},isIndeterminate:!0,defaultChecked:[],defaultProps:{children:"children",label:"title"}}},computed:{getRulesList:function(){return o["a"].listToTreeMulti(this.ruleList)},getPremiss:function(){for(var t=o["a"].listToTreeMulti(this.ruleList),e=0;e<t.length;e++)for(var i=t[e].children,l=0;l<i.length;l++)67===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:"全部订单",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"删除"},{id:"o-"+i[l].id+"-3",title:"新增"},{id:"o-"+i[l].id+"-4",title:"导出"},{id:"o-"+i[l].id+"-5",title:"修改"},{id:"o-"+i[l].id+"-6",title:"回访查看"},{id:"o-"+i[l].id+"-7",title:"回访编辑"},{id:"o-"+i[l].id+"-8",title:"售后查看"},{id:"o-"+i[l].id+"-9",title:"售后编辑"},{id:"o-"+i[l].id+"-10",title:"驳回"}]},i[l].roles[1]={title:"环节订单",children:[{id:"o-h-1",title:"待处理"},{id:"o-h-2",title:"待确认(业务员)"},{id:"o-h-3",title:"待确认(门店)"},{id:"o-h-4",title:"待安装"},{id:"o-h-5",title:"已安装"},{id:"o-h-6",title:"财审1"},{id:"o-h-7",title:"财审2"},{id:"o-h-8",title:"待结算"}]}),68===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:" ",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"导出"},{id:"o-"+i[l].id+"-3",title:"新增"},{id:"o-"+i[l].id+"-4",title:"删除"},{id:"o-"+i[l].id+"-5",title:"核销"}]}),69===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:" ",children:[{id:"o-"+i[l].id+"-1",title:"接触绑定"},{id:"o-"+i[l].id+"-2",title:"更换绑定"}]}),70===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:"安装单",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"导出"}]},i[l].roles[1]={title:"营销单",children:[{id:"o-"+i[l].id+"h-1",title:"查询"},{id:"o-"+i[l].id+"h-2",title:"导出"}]}),92===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:" ",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"导出"},{id:"o-"+i[l].id+"-3",title:"解封同步"},{id:"o-"+i[l].id+"-4",title:"拉黑"},{id:"o-"+i[l].id+"-5",title:"拉白"},{id:"o-"+i[l].id+"-6",title:"改基本信息"},{id:"o-"+i[l].id+"-7",title:"修改绑定"},{id:"o-"+i[l].id+"-8",title:"门店信息"},{id:"o-"+i[l].id+"-9",title:"资产营收"},{id:"o-"+i[l].id+"-10",title:"安装订单"},{id:"o-"+i[l].id+"-11",title:"营销订单"},{id:"o-"+i[l].id+"-12",title:"用户评价"},{id:"o-"+i[l].id+"-13",title:"优惠卷"},{id:"o-"+i[l].id+"-14",title:"项目"},{id:"o-"+i[l].id+"-15",title:"抵扣卷"},{id:"o-"+i[l].id+"-16",title:"产品"},{id:"o-"+i[l].id+"-17",title:"动态"}]}),72===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:" ",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"导出"}]}),96===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:"全部订单",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"删除"},{id:"o-"+i[l].id+"-3",title:"新增"},{id:"o-"+i[l].id+"-4",title:"导出"},{id:"o-"+i[l].id+"-5",title:"修改"}]},i[l].roles[1]={title:"环节订单",children:[{id:"o-"+i[l].id+"-h-1",title:"待初审"},{id:"o-"+i[l].id+"-h-2",title:"待财审1"},{id:"o-"+i[l].id+"-h-3",title:"待财审2"},{id:"o-"+i[l].id+"-h-4",title:"待结算"}]}),97===i[l].id&&(i[l].roles=[],i[l].roles[0]={title:"全部订单",children:[{id:"o-"+i[l].id+"-1",title:"查询"},{id:"o-"+i[l].id+"-2",title:"删除"},{id:"o-"+i[l].id+"-3",title:"新增"},{id:"o-"+i[l].id+"-4",title:"导出"},{id:"o-"+i[l].id+"-5",title:"修改"}]},i[l].roles[1]={title:"环节订单",children:[{id:"o-"+i[l].id+"-h-1",title:"待初审"},{id:"o-"+i[l].id+"-h-2",title:"待财审1"},{id:"o-"+i[l].id+"-h-3",title:"待财审2"},{id:"o-"+i[l].id+"-h-5",title:"待结算"}]});return t}},watch:{dialogFormVisible:function(){this.resetTemp()}},created:function(){this.getRules()},destroyed:function(){},methods:{handleCheckedCitiesChange:function(t){},getRules:function(){var t=this;Object(s["f"])().then((function(e){t.ruleList=e.data}))},resetTemp:function(){this.temp={id:0,title:"",status:1,rules:""}},checkHandle:function(t){var e=this.$refs.tree.getHalfCheckedKeys().join(","),i=this.$refs.tree.getCheckedKeys().join(",");e.length&&i.length?this.temp.rules=e+","+i:e.length&&0===i.length?this.temp.rules=e:0===e.length&&i.length?this.temp.rules=i:this.temp.rules=""},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.currentIndex=-1,this.loading=!1,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},handleUpdate:function(t){var e=this;this.loading=!0,this.dialogStatus="update",this.dialogFormVisible=!0;var i=this;Object(a["g"])(t).then((function(t){if(1===t.status){if(i.checkList=[],i.rolesList=[],i.temp.id=t.data.id,i.temp.title=t.data.title,i.temp.status=t.data.status,i.temp.rules=t.data.rules,null!==t.data.rules){for(var l=t.data.rules.split(","),n=[],s=0;s<l.length;s++)n[s]=parseInt(l[s]);i.checkList=n}if(null!==t.data.btn){for(var a=t.data.btn.split(","),o=[],r=0;r<a.length;r++)o[r]=a[r];i.rolesList=o}e.loading=!1}})),this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},saveData:function(){var t=this;this.btnLoading=!0,this.$refs["dataForm"].validate((function(e){if(e){var i=t,l=t.temp;t.temp.rules=t.checkList.join(","),t.temp.btn=t.rolesList.join(","),Object(a["h"])(l).then((function(e){1===e.status?(l.id||(l.id=e.data.id),t.$emit("updateRow",l),i.dialogFormVisible=!1,i.$message.success(e.msg)):i.$message.error(e.msg),i.btnLoading=!1})).catch((function(e){t.btnLoading=!1}))}else t.btnLoading=!1}))}}},d=r,c=(i("1e4a"),i("2877")),u=Object(c["a"])(d,l,n,!1,null,"00150ea5",null);e["default"]=u.exports},"8d41":function(t,e,i){},"933d":function(t,e,i){},bd43:function(t,e,i){"use strict";i.d(e,"e",(function(){return n})),i.d(e,"f",(function(){return s})),i.d(e,"g",(function(){return a})),i.d(e,"h",(function(){return o})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return d})),i.d(e,"d",(function(){return c})),i.d(e,"b",(function(){return u}));var l=i("b775");function n(t){return Object(l["a"])({url:"/admin/rules/index",method:"post",data:t})}function s(){return Object(l["a"])({url:"/admin/rules/getLists",method:"post"})}function a(t){return Object(l["a"])({url:"/admin/rules/getinfo",method:"get",params:{id:t}})}function o(t){return Object(l["a"])({url:"/admin/rules/save",method:"post",data:t})}function r(t){return Object(l["a"])({url:"/admin/rules/del",method:"get",params:{id:t}})}function d(t,e,i){var n={val:t,field:e,value:i};return Object(l["a"])({url:"/admin/rules/change",method:"post",data:n})}function c(t){return Object(l["a"])({url:"/admin/rules/delall",method:"post",data:t})}function u(t){return Object(l["a"])({url:"/admin/rules/changeall",method:"post",data:t})}},d808:function(t,e,i){"use strict";i.r(e);var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"100%",height:"50vh","overflow-y":"scroll"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[i("el-form-item",{attrs:{label:"名称",prop:"title"}},[i("el-input",{attrs:{clearable:""},model:{value:t.temp.title,callback:function(e){t.$set(t.temp,"title",e)},expression:"temp.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"状态"}},[i("el-radio-group",{model:{value:t.temp.status,callback:function(e){t.$set(t.temp,"status",e)},expression:"temp.status"}},[i("el-radio",{attrs:{label:1}},[t._v("正常")]),t._v(" "),i("el-radio",{attrs:{label:0}},[t._v("禁用")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"权限"}},[i("el-tree",{ref:"tree",attrs:{data:t.getRulesList,"default-checked-keys":t.defaultChecked,props:t.defaultProps,"default-expand-all":"","show-checkbox":"","check-strictly":"","node-key":"id"},on:{check:t.checkHandle}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{loading:t.btnLoading,type:"primary"},on:{click:function(e){return t.saveData()}}},[t._v("保存")])],1)],1)},n=[],s=(i("28a5"),i("bd43")),a=i("5d51"),o=i("f382"),r={name:"RolesForm",data:function(){return{btnLoading:!1,ruleList:[],temp:{id:0,title:"",status:1,rules:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"添加"},rules:{title:[{required:!0,message:"名称必填",trigger:"blur"}]},defaultChecked:[],defaultProps:{children:"children",label:"title"}}},computed:{getRulesList:function(){return console.log(o["a"].listToTreeMulti(this.ruleList)),o["a"].listToTreeMulti(this.ruleList)}},watch:{dialogFormVisible:function(){this.resetTemp()}},created:function(){this.getRules()},destroyed:function(){},methods:{getRules:function(){var t=this;Object(s["f"])().then((function(e){t.ruleList=e.data}))},resetTemp:function(){this.temp={id:0,title:"",status:1,rules:""}},checkHandle:function(t){var e=this.$refs.tree.getHalfCheckedKeys().join(","),i=this.$refs.tree.getCheckedKeys().join(",");e.length&&i.length?this.temp.rules=e+","+i:e.length&&0===i.length?this.temp.rules=e:0===e.length&&i.length?this.temp.rules=i:this.temp.rules=""},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.currentIndex=-1,this.$refs.tree.setCheckedKeys([]),this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},handleUpdate:function(t){var e=this;this.dialogStatus="update",this.dialogFormVisible=!0;var i=this;Object(a["b"])(t).then((function(t){1===t.status&&(i.temp.id=t.data.id,i.temp.title=t.data.title,i.temp.status=t.data.status,i.temp.rules=t.data.rules,e.$refs.tree.setCheckedKeys(i.temp.rules.split(",")))})),this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},saveData:function(){var t=this;this.btnLoading=!0,this.$refs["dataForm"].validate((function(e){if(e){var i=t,l=t.temp;Object(a["c"])(l).then((function(e){1===e.status?(l.id||(l.id=e.data.id),t.$emit("updateRow",l),i.dialogFormVisible=!1,i.$message.success(e.msg)):i.$message.error(e.msg),i.btnLoading=!1})).catch((function(e){t.btnLoading=!1}))}else t.btnLoading=!1}))}}},d=r,c=i("2877"),u=Object(c["a"])(d,l,n,!1,null,null,null);e["default"]=u.exports},e075:function(t,e,i){"use strict";i.r(e);var l,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[t.showSearch?i("div",{staticClass:"filter-container"},[i("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:t.listQuery}},[i("el-form-item",{attrs:{label:""}},[i("el-input",{attrs:{placeholder:"名称",clearable:"",size:"small"},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:""}},[i("el-select",{attrs:{placeholder:"状态",clearable:"",size:"small"},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},[i("el-option",{attrs:{label:"全部",value:"-1"}}),t._v(" "),i("el-option",{attrs:{label:"正常",value:"1"}}),t._v(" "),i("el-option",{attrs:{label:"禁用",value:"0"}})],1)],1),t._v(" "),i("el-form-item",[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.handleFilter}},[t._v("搜索")])],1),t._v(" "),i("el-form-item",[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"warning",icon:"el-icon-refresh",size:"small"},on:{click:t.handleFilterClear}},[t._v("重置\n        ")])],1)],1)],1):t._e(),t._v(" "),i("el-row",{staticStyle:{"margin-bottom":"10px"}},[i("el-col",{attrs:{xs:24,sm:24,lg:24}},[i("el-tooltip",{attrs:{content:"刷新",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"warning",icon:"el-icon-refresh",circle:""},on:{click:t.handleFilterClear}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"添加",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"success",icon:"el-icon-plus",circle:""},on:{click:t.handleCreate}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"搜索",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",circle:""},on:{click:function(e){t.showSearch=!t.showSearch}}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"删除",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{loading:t.deleting,disabled:t.buttonDisabled,type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.handleDeleteAll()}}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"更多",placement:"top"}},[i("el-dropdown",{staticStyle:{"margin-left":"10px"},attrs:{trigger:"click",placement:"bottom"},on:{command:t.handleCommand}},[i("el-button",{attrs:{disabled:t.buttonDisabled,type:"Info",circle:""}},[i("i",{staticClass:"el-icon-more"})]),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{attrs:{command:"1"}},[t._v("设为正常")]),t._v(" "),i("el-dropdown-item",{attrs:{command:"0"}},[t._v("设为禁用")])],1)],1)],1)],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),i("el-table-column",{attrs:{label:"ID",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"名称","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"link-type",on:{click:function(i){return t.handleUpdate(e.$index,e.row.id)}}},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"状态",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{class:{"el-icon-success text-green":1==e.row.status,"el-icon-error text-red":0==e.row.status},on:{click:function(i){return t.handleModifyStatus(e.$index,e.row.id,e.row.status)}}},[t._v(t._s(t._f("statusFilter")(e.row.status)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"80px","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tooltip",{attrs:{content:"编辑",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.handleUpdate(e.$index,e.row.id)}}},[t._v("\n            编辑\n          ")])],1),t._v(" "),i("el-tooltip",{attrs:{content:"删除",placement:"top"}},[i("el-button",{attrs:{loading:e.row.delete,type:"danger",size:"mini"},on:{click:function(i){return t.handleDelete(e.$index,e.row.id)}}},[t._v("删除\n          ")])],1)]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.psize,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("permissionsForm",{ref:"fromRoles",on:{updateRow:t.updateRow}})],1)},s=[],a=(i("ac6a"),i("277e")),o=i("6724"),r=i("ed08"),d=i("d808"),c=i("8433"),u={name:"Roles",components:{rolesForm:d["default"],permissionsForm:c["default"]},directives:{waves:o["a"]},filters:{statusFilter:function(t){var e={0:"禁用",1:"正常"};return e[t]}},data:function(){return{tableKey:0,list:null,total:null,selectedRows:null,listLoading:!0,showSearch:!1,listQuery:{page:1,psize:10,status:"-1",title:""},buttonDisabled:!0,deleting:!1,pickerOptions:r["j"],currentIndex:-1}},watch:{},created:function(){l=this,l.fetchList()},methods:{fetchList:function(){l.listLoading=!0,Object(a["e"])(this.listQuery).then((function(t){l.list=t.data.data,l.total=t.data.total,l.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.fetchList()},handleFilterClear:function(){this.listQuery={page:1,psize:10,status:"-1",title:""},this.fetchList()},handleSizeChange:function(t){this.listQuery.psize=t,this.fetchList()},handleCurrentChange:function(t){this.listQuery.page=t,this.fetchList()},handleModifyStatus:function(t,e,i){this.list[t]["status"]=1-i,Object(a["a"])(e,"status",1-i).then((function(t){}))},handleSelectionChange:function(t){t.length>0?this.buttonDisabled=!1:this.buttonDisabled=!0,this.selectedRows=t},handleCreate:function(){this.$refs.fromRoles.handleCreate()},handleUpdate:function(t,e){this.currentIndex=t,this.$refs.fromRoles.handleUpdate(e)},updateRow:function(t){this.currentIndex>=0&&t.id>0?this.list.splice(this.currentIndex,1,t):(this.list.length>=10&&this.list.pop(),this.list.push(t),this.total=this.total+1),this.currentIndex=-1},handleDelete:function(t,e){var i=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.$set(i.list[t],"delete",!0),Object(a["c"])(e).then((function(e){1===e.status?(i.list.splice(t,1),i.total=i.total-1,i.$notify.success(e.msg)):i.$notify.error(e.msg),i.$set(i.list[t],"delete",!1)})).catch((function(e){i.$set(i.list[t],"delete",!1)}))})).catch((function(){i.$message({type:"info",message:"已取消删除"})}))},handleDeleteAll:function(){var t=this;this.selectedRows.length>0?this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.deleting=!0;var e=Object(r["e"])(t.selectedRows,"id"),i=e.join(",");Object(a["d"])({ids:i}).then((function(i){if(1===i.status){var l=[];t.list.forEach((function(t,i,n){e.indexOf(t.id)>-1&&l.push(i)}));for(var n=l.length-1;n>=0;n--)t.list.splice(l[n],1);t.total=t.total-l.length,t.$message.success(i.msg)}else t.$message.error(i.msg);t.deleting=!1})).catch((function(e){t.deleting=!1}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})})):t.$message.error("请选择要删除的数据")},handleCommand:function(t){var e=this;if(this.selectedRows.length>0){var i=Object(r["e"])(this.selectedRows,"id"),l=i.join(",");Object(a["b"])({val:l,field:"status",value:t}).then((function(l){1===l.status?(e.list.forEach((function(l,n,s){i.indexOf(l.id)>-1&&(e.list[n]["status"]=t)})),e.$message.success(l.msg)):e.$message.error(l.msg)})).catch((function(t){}))}else e.$message.error("请选择要操作的数据")}}},h=u,f=(i("20bb"),i("2877")),m=Object(f["a"])(h,n,s,!1,null,null,null);e["default"]=m.exports},f382:function(t,e,i){"use strict";i("ac6a");var l=i("ed08");function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"pid",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"children",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,r=[];return t&&t.forEach((function(d){if(d[s]===e){null!==o&&(d=Object(l["g"])(d,o));var c=n(t,d[i],i,s,a,o);c.length&&(d[a]=c),r.push(d)}})),r}function s(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"pid",n=[];return t&&t.forEach((function(a){if(a[i]===e){n.unshift(a[l]);var o=s(t,a[l],i,l);o.length&&(n=n.concat(o))}})),n}function a(t,e,i,n){return t&&t.map((function(t){t[e]===i?Object(l["g"])(t,n):a(t.children,e,i,n)})),t}var o={listToTreeMulti:n,getParentsId:s,upadteArr:a};e["a"]=o}}]);