
module.exports=require("./editor.html")({
  data(){
    return {
      json:{
        questions:[],
        name:"",
        author:"",
        description:"",
        version:"2.0"
      },
      pastingJson:false,
      jsonArea:"",
      saveJson:false
    };
  },
  methods:{
    loadPastedJson(){
      this.json=JSON.parse(this.jsonArea)
      this.pastingJson=false
    },
    open(){
      let elm=this.$refs.file
      elm.addEventListener("change",(e)=>{
        let fr=new window.FileReader();
        fr.onload=(file)=>{
          this.json=JSON.parse(file.target.result)
        }
        fr.readAsText(e.target.files[0])
      })
      var evt = document.createEvent("MouseEvents");  
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, elm);  
      elm.dispatchEvent( evt );  
    },
    save(){
      console.log(JSON.stringify(this.json))
    },
    addQuestion(){
      this.json.questions.push({
        answer:[""],
        question:""
      });
      this.attachEvt()
    },
    addAnswer(obj){
      obj.push("")
      this.attachEvt()
    },
    attachEvt(){
      setTimeout(()=>{
        this.inputs = document.getElementsByTagName("input")
        for(let i=0;i<this.inputs.length;i++){
          this.inputs[i].addEventListener("keyup",(e)=>{
            
            if(e.keyCode==13||(e.ctrlKey&&e.keyCode==74)){
              this.inputs[i].blur()
              if(i<this.inputs.length-1){
                this.inputs[i+1].focus()
                return;
              }
            }
            if(e.keyCode==53&&e.ctrlKey&&e.shiftKey){//C-%
              this.inputs[i].value+="<bold>";
              return
            }
            if(e.keyCode==54&&e.ctrlKey&&e.shiftKey){//C-&
              this.inputs[i].value+="</bold>";
              return
            }

          })
        }
      },300)
    }
  },
  computed:{
    jsonFile(){
      return JSON.stringify(this.json)
    }
  },
  mounted(){
    this.attachEvt()
    
  }
})
