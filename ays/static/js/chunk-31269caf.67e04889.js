(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31269caf"],{"1bbd":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main"},[i("div",{staticClass:"filter-container dn"},[i("el-form",{attrs:{inline:!0,model:t.listQuery}},[i("el-row",[i("el-col",{attrs:{span:5}},[i("el-form-item",{attrs:{label:"安装单号:"}},[i("el-input",{attrs:{size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter()}},model:{value:t.listQuery.order_id,callback:function(e){t.$set(t.listQuery,"order_id",e)},expression:"listQuery.order_id"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:5}},[i("el-form-item",{attrs:{label:"日期:"}},[i("el-date-picker",{staticStyle:{width:"350px"},attrs:{size:"mini",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["12:00:00"]},model:{value:t.listQuery.startTime,callback:function(e){t.$set(t.listQuery,"startTime",e)},expression:"listQuery.startTime"}})],1)],1)],1)],1),t._v(" "),i("el-button",{staticClass:"filter-search",attrs:{type:"primary",size:"mini"},on:{click:t.headSearch}},[t._v("搜索")])],1),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"new-table"},[i("div",{staticClass:"tab"},[i("div",{staticClass:"list-item",class:2===t.listQuery.sstatus?"selected":"",staticStyle:{width:"15%"},on:{click:function(e){return t.handleStatusChange(2)}}},[i("span",[t._v("待处理")]),t._v(" "),i("span",{staticClass:"price"},[t._v(t._s(t.total2))])]),t._v(" "),i("div",{staticClass:"list-item",class:1===t.listQuery.sstatus?"selected":"",staticStyle:{width:"15%"},on:{click:function(e){return t.handleStatusChange(1)}}},[i("span",[t._v("已处理")]),t._v(" "),i("span",{staticClass:"price"},[t._v(t._s(t.total3))])]),t._v(" "),i("div",{staticClass:"list-item",class:"all"===t.listQuery.sstatus?"selected":"",on:{click:function(e){return t.handleStatusChange("all")}}},[i("span",[t._v("全部")]),t._v(" "),i("span",{staticClass:"price"},[t._v(t._s(t.total1))])])]),t._v(" "),i("div",{staticClass:"tab_warp"},[i("div",{staticClass:"warp_list"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[i("el-table-column",{attrs:{label:"安装单",width:"180","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"日期",width:"220","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("parseTime")(e.row.video_create_time)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"300",prop:"address",label:"门店","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.shop?i("span",[t._v(t._s(e.row.shop.shopname))]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"video_count",label:"视频数量","header-align":"center",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v(t._s(t._f("StrText")(e.row.is_video_status)))])]}}])})],1)],1),t._v(" "),t.total3<0?i("div",{staticClass:"no-data"},[t._v("当前暂无数据")]):t._e()])]),t._v(" "),i("el-dialog",{attrs:{title:"视频处理",visible:t.dialogVisible,width:"25%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[t._l(t.video,(function(e,a){return i("div",{key:a,staticClass:"video"},[2===t.is_video_status?i("el-checkbox",{model:{value:e.status,callback:function(i){t.$set(e,"status",i)},expression:"item.status"}}):t._e(),t._v(" "),i("video",{staticStyle:{width:"200px",height:"100px"},attrs:{src:e.url,controls:"controls"}})],1)})),t._v(" "),i("div",{staticClass:"vi-bootm"},[i("el-row",[2===t.is_video_status?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.headDownload}},[t._v("下载")]):t._e(),t._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:t.handleClose}},[t._v("取消")])],1)],1)],2),t._v(" "),i("div",{staticClass:"pageclass"},[i("div",{staticClass:"pagination-container page"},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1)},s=[],n=i("b7be"),l=(i("ed08"),{name:"instal",data:function(){return{listQuery:{order_id:null,page:1,limit:10,startTime:void 0,sstatus:"all"},total:0,total1:0,total2:0,total3:0,listLoading:!0,tableData:[],dialogVisible:!1,video:[],is_video_status:void 0,order_id:void 0}},filters:{StrText:function(t){return 1===t?"已处理":"待处理"}},created:function(){this.fetchList()},methods:{fetchList:function(){var t=this;this.listLoading=!0,Object(n["b"])(this.listQuery).then((function(e){t.listLoading=!1,t.tableData=e.data.data.data,t.total=e.data.data.total,t.total1=e.data.total1,t.total2=e.data.total2,t.total3=e.data.total3,console.log(e,"0909")}))},handleFilter:function(){this.listQuery.page=1,this.fetchList()},handleSizeChange:function(t){this.listQuery.limit=t,this.fetchList()},handleCurrentChange:function(t){this.listQuery.page=t,this.fetchList()},handleStatusChange:function(t){this.listQuery.page=1,this.listQuery.sstatus=t,this.fetchList()},headSearch:function(){this.listQuery.page=1,this.fetchList()},handleClose:function(){this.dialogVisible=!1},handleEdit:function(t,e){this.dialogVisible=!0,this.video=e.video,this.is_video_status=e.is_video_status,console.log(e.is_video_status),this.order_id=e.id},open:function(){this.$message({message:"请先选中视频！",type:"warning"})},open2:function(){this.$message({message:"恭喜你，已开始下载！",type:"success"})},open4:function(){this.$message.error("下载视频，请重新下载。")},headDownload:function(){for(var t=this,e=(this.order_id,[]),i=this.video.length,a=0,s=0;s<this.video.length;s++)!0===this.video[s].status?(a++,e.push(this.video[s].id)):console.log("还没选择");var l={ids:[],id:""};l.ids=e.join(","),l.id=this.order_id,i===a?Object(n["d"])(l).then((function(e){if(console.log(e),2e4===e.code){for(var i=0;i<t.video.length;i++)window.location.href=t.video[i].url;t.dialogVisible=!1,t.open2(),t.fetchList()}else t.open4()})):this.open()}}}),o=l,r=(i("9d80"),i("2877")),d=Object(r["a"])(o,a,s,!1,null,"f176bcb0",null);e["default"]=d.exports},"9d80":function(t,e,i){"use strict";var a=i("a14e"),s=i.n(a);s.a},a14e:function(t,e,i){},b7be:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"d",(function(){return n})),i.d(e,"a",(function(){return l})),i.d(e,"c",(function(){return o}));var a=i("b775");function s(t){return Object(a["a"])({url:"/admin/Ordervideo/GetDataBylist",method:"get",params:t})}function n(t){return Object(a["a"])({url:"/admin/Ordervideo/PostDataByUpdate",method:"post",params:t})}function l(t){return Object(a["a"])({url:"/admin/Shopdemand/GetDataByShopDemanList",method:"get",params:t})}function o(t){return Object(a["a"])({url:"/admin/Shopdemand/PostDataByUpdate",method:"get",params:{id:t}})}}}]);