
module.exports=require("./printWord.html")({
  data(){
    return {
      indexes:[]
    }
  },
  props:["json"],
  methods:{
    randomize(){
      this.$set(this,"indexes",[])
      for(let i=this.json.questions.length-1;i>=0;i--){
        this.indexes.push([i,Math.random()])
      }
      this.indexes.sort((a,b)=>a[1]-b[1])
    },
    tag(v){
      return v.replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/&lt;bold&gt;(.*?)&lt;\/bold&gt;/g,"<b>$1</b>")
    }
  },
  watch:{
    json(){
      this.randomize()
    }
  },
  mounted(){
    this.randomize()
  }
})
