(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{45:function(n,s,t){"use strict";t.r(s);var e=function(){var n=this,s=n.$createElement,t=n._self._c||s;return t("div",{staticClass:"us-container"},[t("p",[n._v("你需要这个工具来获取你想要的东西")]),n._v(" "),t("p",{staticClass:"bash"},[n._v("npm install -g makati")]),n._v(" "),t("p",[n._v("你需要免配置的工具来运行你的web前端应用")]),n._v(" "),t("p",{staticClass:"bash"},[n._v("npm install -g webpack-rv")]),n._v(" "),t("p",[n._v("使用简单 不需要那么多解释 "),t("router-link",{attrs:{to:"/list"}},[n._v("去索取你想要的东西")])],1)])};e._withStripped=!0;var a={name:"aboutUs",created(){this.sendCode()},methods:{sendCode(n){this.$store.dispatch("app/setUserInfo",{user:"良好的开端等于成功的一半"})}}},i=(t(64),t(1)),r=Object(i.a)(a,e,[],!1,null,null,null);r.options.__file="src/views/about/us.vue";s.default=r.exports},49:function(n,s,t){var e=t(3),a=t(65);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[n.i,a,""]]);var i={insert:"head",singleton:!1};e(a,i);n.exports=a.locals||{}},64:function(n,s,t){"use strict";var e=t(49);t.n(e).a},65:function(n,s,t){(s=t(4)(!1)).push([n.i,"\n.us-container{\n  padding: 0 50px;\n}\n.us-container p {\n  padding: 20px 0;\n}\n.bash{\n  background: black;\n  border-radius: 5px;\n  color: greenyellow;\n}\n",""]),n.exports=s}}]);