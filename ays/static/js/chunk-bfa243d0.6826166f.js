(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bfa243d0"],{"277e":function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"f",(function(){return r})),a.d(t,"g",(function(){return o})),a.d(t,"h",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return d})),a.d(t,"d",(function(){return m})),a.d(t,"b",(function(){return u}));var i=a("b775");function n(e){return Object(i["a"])({url:"admin/Permissions/index",method:"post",data:e})}function r(){return Object(i["a"])({url:"/admin/Permissions/getLists",method:"post"})}function o(e){return Object(i["a"])({url:"/admin/Permissions/getinfo",method:"get",params:{id:e}})}function l(e){return Object(i["a"])({url:"/admin/Permissions/save",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/admin/Permissions/del",method:"get",params:{id:e}})}function d(e,t,a){var n={val:e,field:t,value:a};return Object(i["a"])({url:"/admin/Permissions/change",method:"post",data:n})}function m(e){return Object(i["a"])({url:"/admin/Permissions/delall",method:"post",data:e})}function u(e){return Object(i["a"])({url:"/admin/Permissions/changeall",method:"post",data:e})}},"50fc":function(e,t,a){"use strict";a.d(t,"f",(function(){return n})),a.d(t,"g",(function(){return r})),a.d(t,"h",(function(){return o})),a.d(t,"i",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return d})),a.d(t,"e",(function(){return m})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return c}));var i=a("b775");function n(e){return Object(i["a"])({url:"/admin/admin/index",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/admin/admin/getinfo",method:"get",params:{id:e}})}function o(e){return Object(i["a"])({url:"/admin/admin/modify",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/admin/admin/save",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/admin/admin/del",method:"get",params:{id:e}})}function d(e,t,a){var n={val:e,field:t,value:a};return Object(i["a"])({url:"/admin/admin/change",method:"post",data:n})}function m(e){return Object(i["a"])({url:"/admin/admin/delall",method:"post",data:e})}function u(e){return Object(i["a"])({url:"/admin/admin/changeall",method:"post",data:e})}function c(){return Object(i["a"])({url:"/admin/admin/adminall",method:"get"})}},a5f9:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"100%",height:"50vh","overflow-y":"scroll"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{attrs:{label:"岗位",prop:"groupId"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},model:{value:e.temp.groupId,callback:function(t){e.$set(e.temp,"groupId",t)},expression:"temp.groupId"}},e._l(e.roles,(function(e){return a("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"账号",prop:"userName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.temp.userName,callback:function(t){e.$set(e.temp,"userName",t)},expression:"temp.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{clearable:""},model:{value:e.temp.password,callback:function(t){e.$set(e.temp,"password",t)},expression:"temp.password"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像",prop:"img"}},[a("Upload",{attrs:{imageUrl:e.temp.img},on:{HandelFile:e.handelFile}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"realName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.temp.realName,callback:function(t){e.$set(e.temp,"realName",t)},expression:"temp.realName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机"}},[a("el-input",{attrs:{clearable:""},model:{value:e.temp.phone,callback:function(t){e.$set(e.temp,"phone",t)},expression:"temp.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱"}},[a("el-input",{attrs:{clearable:""},model:{value:e.temp.email,callback:function(t){e.$set(e.temp,"email",t)},expression:"temp.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.temp.isEnabled,callback:function(t){e.$set(e.temp,"isEnabled",t)},expression:"temp.isEnabled"}},[a("el-radio",{attrs:{label:1}},[e._v("正常")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("禁用")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{loading:e.btnLoading,type:"primary"},on:{click:function(t){return e.saveData()}}},[e._v("保存")])],1)],1)},n=[],r=a("7618"),o=a("39c5"),l=a("277e"),s=a("50fc"),d=a("ed08"),m=a("61f7"),u=a("f121"),c={name:"AdminForm",components:{Upload:o["a"]},data:function(){var e=function(e,t,a){if(!Object(m["validateEmail"])(t))return a(new Error);a()};return{btnLoading:!1,roles:{},temp:{id:0,groupId:"",userName:"",password:"",realName:"",isEnabled:1,phone:"",email:"",regTime:Object(d["f"])(),img:""},oss_url:"",config:{fileName:"img",limit:1,multiple:!0,accept:"image/*",action:u["a"].uploadUrl.img},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"添加"},rules:{groupId:[{required:!0,message:"角色必选",trigger:"change"}],userName:[{required:!0,message:"账号必填",trigger:"blur"}],email:[{validator:e,message:"邮箱格式错误",trigger:"blur"}]}}},watch:{dialogFormVisible:function(){this.resetTemp()},temp:{handler:function(e,t){},immediate:!0,deep:!0}},created:function(){this.getRoles()},destroyed:function(){},methods:{handelFile:function(e){var t=this;console.log(e),t.temp.img=e.url.data},getRoles:function(){var e=this;Object(l["f"])().then((function(t){e.roles=t.data}))},resetTemp:function(){this.temp={id:0,groupId:"",userName:"",password:"",realName:"",isEnabled:1,phone:"",email:"",regTime:Object(d["f"])(),img:""}},handleCreate:function(){var e=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.currentIndex=-1,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},handleUpdate:function(e){var t=this;this.oss_url=u["a"].oss_url,this.dialogStatus="update",this.dialogFormVisible=!0;var a=this;Object(s["g"])(e).then((function(e){1===e.status&&(a.temp.id=e.data.id,a.temp.groupId=e.data.groupId,a.temp.userName=e.data.userName,a.temp.realName=e.data.realName,a.temp.isEnabled=e.data.isEnabled,a.temp.phone=e.data.phone,a.temp.email=e.data.email,a.temp.password="",a.temp.img=e.data.img)})),this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},saveData:function(){var e=this;this.btnLoading=!0,console.log("更新"),this.$refs["dataForm"].validate((function(t){if(t){var a=e,i=e.temp;"object"===Object(r["a"])(i.img)&&(i.img=i.img.join(",")),Object(s["i"])(i).then((function(t){1===t.status?(i.id||(i.id=t.data.id),e.$emit("updateRow",i),a.dialogFormVisible=!1,a.$message.success(t.msg)):a.$message.error(t.msg),a.btnLoading=!1})).catch((function(t){e.btnLoading=!1}))}else e.btnLoading=!1}))}}},p=c,f=a("2877"),b=Object(f["a"])(p,i,n,!1,null,null,null);t["default"]=b.exports}}]);