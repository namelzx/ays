(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17d00a6e"],{"038b":function(e,t,r){},"709b":function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return s})),r.d(t,"e",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"d",(function(){return l}));var n=r("b775");function i(e){return Object(n["a"])({url:"/admin/banner/GetDataByList",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/admin/banner/PostDataByAdd",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/admin/banner/updateStatus",method:"post",data:e})}function a(e){return Object(n["a"])({url:"/admin/banner/GetIdByDelete",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/admin/banner/getBanner",method:"post",params:{id:e}})}},"88e7":function(e,t,r){"use strict";r("7f7f"),r("3b2b"),r("a481");var n={dateFormat:function(e,t){var r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),"S+":e.getMilliseconds()};for(var n in/(y+)/i.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?r[n]:("00"+r[n]).substr((""+r[n]).length)));return t}},i=r("9b15");t["a"]={randomString:function(e){for(var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],r="",n=0;n<e;n++){var i=Math.ceil(35*Math.random());r+=t[i]}return r},createOssClient:function(){return new Promise((function(e,t){var r=new i({region:"oss-cn-beijing",accessKeyId:"LTAI4G7m7lF5SkXU",accessKeySecret:"PbcsuZTY2CMVPjr1K2DGzMejeotVTI",bucket:"kedand"});e(r)}))},ossUploadFile:function(e){var t=e.file,r=this;return new Promise((function(i,s){var o=n.dateFormat(new Date,"yyyyMMdd"),a=n.dateFormat(new Date,"yyyyMMddhhmmss"),l=r.randomString(4),u=t.name.substr(t.name.indexOf(".")),c="video/"+o+"/"+a+"_"+l+u;r.createOssClient().then((function(r){r.multipartUpload(c,t,{progress:function(t){var r={};r.percent=Math.floor(100*t),e.onProgress(r)}}).then((function(r){if(i({name:t.name,url:r.name}),200===r.res.statusCode)return e.onSuccess(r),r;e.onError("上传失败")}),(function(t){e.onError("上传失败"),s(t)}))}))}))}}},"89c1":function(e,t,r){"use strict";var n=r("038b"),i=r.n(n);i.a},b297:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-card",{staticClass:"form-container",attrs:{shadow:"never"}},[r("el-form",{ref:"homeAdvertiseFrom",attrs:{model:e.homeAdvertise,rules:e.rules,"label-width":"150px",size:"small"}},[r("el-form-item",{attrs:{label:"标题：",prop:"name"}},[r("el-input",{staticClass:"input-width",model:{value:e.homeAdvertise.name,callback:function(t){e.$set(e.homeAdvertise,"name",t)},expression:"homeAdvertise.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"广告种类："}},[r("el-radio-group",{model:{value:e.homeAdvertise.type,callback:function(t){e.$set(e.homeAdvertise,"type",t)},expression:"homeAdvertise.type"}},[r("el-radio",{attrs:{label:1}},[e._v("图文")]),e._v(" "),r("el-radio",{attrs:{label:2}},[e._v("链接")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"广告主图："}},[r("oneImage",{attrs:{imageUrl:e.homeAdvertise.images_url},on:{HandelFile:e.handellicense}})],1),e._v(" "),r("el-form-item",{attrs:{label:"排序："}},[r("el-input",{staticClass:"input-width",model:{value:e.homeAdvertise.sort,callback:function(t){e.$set(e.homeAdvertise,"sort",t)},expression:"homeAdvertise.sort"}})],1),e._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2===e.homeAdvertise.type,expression:"homeAdvertise.type===2"}],attrs:{label:"广告链接："}},[r("el-input",{staticClass:"input-width",model:{value:e.homeAdvertise.url,callback:function(t){e.$set(e.homeAdvertise,"url",t)},expression:"homeAdvertise.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"广告位置："}},[r("el-select",{staticClass:"input-width",attrs:{placeholder:"全部",clearable:""},model:{value:e.homeAdvertise.location,callback:function(t){e.$set(e.homeAdvertise,"location",t)},expression:"homeAdvertise.location"}},e._l(e.typeOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===e.homeAdvertise.type,expression:"homeAdvertise.type===1"}],attrs:{label:"详情："}},[r("div",{attrs:{id:"wangeditor"}},[r("Tinymce",{model:{value:e.homeAdvertise.content,callback:function(t){e.$set(e.homeAdvertise,"content",t)},expression:"homeAdvertise.content"}})],1)]),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("homeAdvertiseFrom")}}},[e._v("提交")]),e._v(" "),e.isEdit?e._e():r("el-button",{on:{click:function(t){return e.resetForm("homeAdvertiseFrom")}}},[e._v("重置")])],1)],1)],1)},i=[],s=(r("7f7f"),r("8256")),o=r("709b"),a=r("39c5"),l=[{label:"门店广告位",value:1},{label:"用户订单填写广告",value:2},{label:"营销推广广告",value:3}],u={name:null,type:1,images_url:null,is_recomm:null,content:null,status:2,url:null,sort:0},c={name:"HomeAdvertiseDetail",components:{oneImage:a["a"],Tinymce:s["a"]},props:{isEdit:{type:Boolean,default:!1}},data:function(){return{homeAdvertise:null,rules:{name:[{required:!0,message:"请输入广告名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],url:[{required:!0,message:"请输入广告链接",trigger:"blur"}],startTime:[{required:!0,message:"请选择开始时间",trigger:"blur"}],endTime:[{required:!0,message:"请选择到期时间",trigger:"blur"}],pic:[{required:!0,message:"请选择广告图片",trigger:"blur"}]},typeOptions:Object.assign({},l)}},created:function(){var e=this;console.log(this.$route);var t=this.$route.name;"advertising/edit"===t?Object(o["d"])(this.$route.params.id).then((function(t){e.homeAdvertise=t.data})):this.homeAdvertise=Object.assign({},u)},methods:{handellicense:function(e){this.homeAdvertise.images_url=e.file.response.data},onSubmit:function(e){var t=this;this.$refs[e].validate((function(r){if(!r)return t.$message({message:"验证失败",type:"error",duration:1e3}),!1;t.$confirm("是否提交数据","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.isEdit?updateHomeAdvertise(t.$route.query.id,t.homeAdvertise).then((function(r){t.$refs[e].resetFields(),t.$message({message:"修改成功",type:"success",duration:1e3}),t.$router.back()})):Object(o["b"])(t.homeAdvertise).then((function(e){t.$message({message:"提交成功",type:"success",duration:1e3})}))}))}))},resetForm:function(e){this.$refs[e].resetFields(),this.homeAdvertise=Object.assign({},u)},catchData:function(e){}},mounted:function(){var e=this;this.editor=new E(this.$refs.editorElem),this.editor.customConfig.onchange=function(t){e.editorContent=t,e.catchData(e.editorContent)},this.editor.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","code","undo","redo"],this.editor.create()}},d=c,m=(r("89c1"),r("2877")),h=Object(m["a"])(d,n,i,!1,null,"13b3a0d8",null);t["default"]=h.exports}}]);