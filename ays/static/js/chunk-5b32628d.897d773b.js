(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b32628d"],{2017:function(e,o,t){"use strict";var s=t("b12d"),n=t.n(s);n.a},"9ed6":function(e,o,t){"use strict";t.r(o);var s=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("Login Form")])]),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),t("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.username,callback:function(o){e.$set(e.loginForm,"username",o)},expression:"loginForm.username"}})],1),e._v(" "),t("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(o){e.capsTooltip=o},expression:"capsTooltip"}},[t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),t("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(o){e.capsTooltip=!1}},nativeOn:{keyup:[function(o){return e.checkCapslock(o)},function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.handleLogin(o)}]},model:{value:e.loginForm.password,callback:function(o){e.$set(e.loginForm,"password",o)},expression:"loginForm.password"}}),e._v(" "),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(o){return o.preventDefault(),e.handleLogin(o)}}},[e._v("Login")])],1)],1)},n=[],r=(t("ac6a"),t("456d"),t("61f7"),{name:"Login",data:function(){var e=function(e,o,t){o.length<6?t(new Error("密码不可少于6位数")):t()};return{loginForm:{username:"",password:""},loginRules:{password:[{required:!0,trigger:"blur",validator:e}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){var o=e.query;o&&(this.redirect=o.redirect,this.otherQuery=this.getOtherQuery(o))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=e.shiftKey,t=e.key;t&&1===t.length&&(this.capsTooltip=!!(o&&t>="a"&&t<="z"||!o&&t>="A"&&t<="Z")),"CapsLock"===t&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(o){if(!o)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(){e.$router.push({path:"/order/install",query:e.otherQuery}),e.loading=!1})).catch((function(){e.loading=!1}))}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(o,t){return"redirect"!==t&&(o[t]=e[t]),o}),{})}}}),a=r,i=(t("2017"),t("e30e"),t("2877")),l=Object(i["a"])(a,s,n,!1,null,"7f8b7974",null);o["default"]=l.exports},b12d:function(e,o,t){},e30e:function(e,o,t){"use strict";var s=t("fffa"),n=t.n(s);n.a},fffa:function(e,o,t){}}]);