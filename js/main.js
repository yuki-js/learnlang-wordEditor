const Vue=require("vue/dist/vue");
//require("../scss/normalize.css")
require("../scss/style.scss")


const network = require("./network")

const vm = exports.vm=new Vue({
  el:"#app",
  data:{
    
  },
  methods:{
    
  },
  created(){
    
  },
  components:{
    editor:require("../components/editor.js")
  }

});
