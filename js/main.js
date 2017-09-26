const Vue=require("vue/dist/vue");
//require("../scss/normalize.css")
require("../scss/style.scss")


const network = require("./network")

const vm = exports.vm=new Vue({
  el:"#app",
  data:{
    json:{
      questions:[],
      name:"",
      author:"",
      description:"",
      version:"2.0"
    },
    printWord:false
  },
  methods:{
    
  },
  created(){
    
  },
  components:{
    editor:require("../components/editor.js"),
    printWord:require("../components/printWord.js")
  }

});
