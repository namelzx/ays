(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5042337a"],{1832:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-card",{staticClass:"form-container",attrs:{shadow:"never"}},[r("el-form",{ref:"homeAdvertiseFrom",attrs:{model:e.homeAdvertise,rules:e.rules,"label-width":"150px",size:"small"}},[r("el-form-item",{attrs:{label:"批次："}},[r("el-input",{staticClass:"input-width",model:{value:e.homeAdvertise.batch,callback:function(t){e.$set(e.homeAdvertise,"batch",t)},expression:"homeAdvertise.batch"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"数量："}},[r("el-input",{staticClass:"input-width",model:{value:e.homeAdvertise.number,callback:function(t){e.$set(e.homeAdvertise,"number",t)},expression:"homeAdvertise.number"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注："}},[r("div",{attrs:{id:"wangeditor"}},[r("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.homeAdvertise.desc,callback:function(t){e.$set(e.homeAdvertise,"desc",t)},expression:"homeAdvertise.desc"}})],1)]),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("homeAdvertiseFrom")}}},[e._v("提交")]),e._v(" "),e.isEdit?e._e():r("el-button",{on:{click:function(t){return e.resetForm("homeAdvertiseFrom")}}},[e._v("重置")])],1)],1)],1)},a=[],i=(r("7f7f"),r("8256")),o=r("e21e"),s=r("39c5"),u=[{label:"门店广告位",value:1},{label:"用户订单填写广告",value:2},{label:"营销推广广告",value:3}],c={name:null,type:1,images_url:null,is_recomm:null,content:null,status:2,url:null,sort:0},d={name:"HomeAdvertiseDetail",components:{oneImage:s["a"],Tinymce:i["a"]},props:{isEdit:{type:Boolean,default:!1}},data:function(){return{homeAdvertise:null,rules:{name:[{required:!0,message:"请输入广告名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],url:[{required:!0,message:"请输入广告链接",trigger:"blur"}],startTime:[{required:!0,message:"请选择开始时间",trigger:"blur"}],endTime:[{required:!0,message:"请选择到期时间",trigger:"blur"}],pic:[{required:!0,message:"请选择广告图片",trigger:"blur"}]},typeOptions:Object.assign({},u)}},created:function(){var e=this;console.log(this.$route);var t=this.$route.name;"advertising/edit"===t?getBanner(this.$route.params.id).then((function(t){e.homeAdvertise=t.data})):this.homeAdvertise=Object.assign({},c)},methods:{handellicense:function(e){this.homeAdvertise.images_url=e.file.response.data},onSubmit:function(e){var t=this;this.$refs[e].validate((function(r){if(!r)return t.$message({message:"验证失败",type:"error",duration:1e3}),!1;t.$confirm("是否提交数据","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.isEdit?updateHomeAdvertise(t.$route.query.id,t.homeAdvertise).then((function(r){t.$refs[e].resetFields(),t.$message({message:"修改成功",type:"success",duration:1e3}),t.$router.back()})):Object(o["f"])(t.homeAdvertise).then((function(e){t.$message({message:"提交成功",type:"success",duration:1e3})}))}))}))},resetForm:function(e){var t=this;Object(o["f"])(this.homeAdvertise).then((function(e){t.$router.go(-1)}))},catchData:function(e){}},mounted:function(){var e=this;this.editor=new E(this.$refs.editorElem),this.editor.customConfig.onchange=function(t){e.editorContent=t,e.catchData(e.editorContent)},this.editor.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","code","undo","redo"],this.editor.create()}},l=d,m=(r("e2f9"),r("2877")),f=Object(m["a"])(l,n,a,!1,null,"705140c6",null);t["default"]=f.exports},"88e7":function(e,t,r){"use strict";r("7f7f"),r("3b2b"),r("a481");var n={dateFormat:function(e,t){var r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),"S+":e.getMilliseconds()};for(var n in/(y+)/i.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?r[n]:("00"+r[n]).substr((""+r[n]).length)));return t}},a=r("9b15");t["a"]={randomString:function(e){for(var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],r="",n=0;n<e;n++){var a=Math.ceil(35*Math.random());r+=t[a]}return r},createOssClient:function(){return new Promise((function(e,t){var r=new a({region:"oss-cn-beijing",accessKeyId:"LTAI4G7m7lF5SkXU",accessKeySecret:"PbcsuZTY2CMVPjr1K2DGzMejeotVTI",bucket:"kedand"});e(r)}))},ossUploadFile:function(e){var t=e.file,r=this;return new Promise((function(a,i){var o=n.dateFormat(new Date,"yyyyMMdd"),s=n.dateFormat(new Date,"yyyyMMddhhmmss"),u=r.randomString(4),c=t.name.substr(t.name.indexOf(".")),d="video/"+o+"/"+s+"_"+u+c;r.createOssClient().then((function(r){r.multipartUpload(d,t,{progress:function(t){var r={};r.percent=Math.floor(100*t),e.onProgress(r)}}).then((function(r){if(a({name:t.name,url:r.name}),200===r.res.statusCode)return e.onSuccess(r),r;e.onError("上传失败")}),(function(t){e.onError("上传失败"),i(t)}))}))}))}}},cd2b:function(e,t,r){},e21e:function(e,t,r){"use strict";r.d(t,"f",(function(){return a})),r.d(t,"b",(function(){return i})),r.d(t,"e",(function(){return o})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return u})),r.d(t,"a",(function(){return c}));var n=r("b775");function a(e){return Object(n["a"])({url:"/admin/warrantycard/PostDataByAdd",method:"post",data:e})}function i(e){return Object(n["a"])({url:"/admin/warrantycard/GetDataByList",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/admin/warrantycard/GetWarrantyByCode",method:"get",params:e})}function s(e){return Object(n["a"])({url:"/admin/warrantycard/GetIdByDeleteCode",method:"get",params:{id:e}})}function u(e){return Object(n["a"])({url:"/admin/warrantycard/GetUdByDelete",method:"get",params:{id:e}})}function c(e){return Object(n["a"])({url:"/admin/warrantycard/GetCodeByDownload",method:"get",params:{id:e}})}},e2f9:function(e,t,r){"use strict";var n=r("cd2b"),a=r.n(n);a.a}}]);