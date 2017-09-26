
module.exports=require("./editor.html")({
  data(){
    return {
      
      pastingJson:false,
      jsonArea:"",
      saveJson:false,
      doubleTouch:false
    };
  },
  props:["json"],
  methods:{
    loadPastedJson(){
      let parsed=JSON.parse(this.jsonArea)
      this.json.name=parsed.name
      this.json.author=parsed.author
      this.json.description=parsed.description
      this.json.questions=parsed.questions
      this.attachEvt()
      this.pastingJson=false
    },
    open(){
      let elm=this.$refs.file
      elm.addEventListener("change",(e)=>{
        let fr=new window.FileReader();
        fr.onload=(file)=>{
          let parsed=JSON.parse(file.target.result)
          this.json.name=parsed.name
          this.json.author=parsed.author
          this.json.description=parsed.description
          this.json.questions=parsed.questions
          this.attachEvt()
        }
        fr.readAsText(e.target.files[0])
      })
      var evt = document.createEvent("MouseEvents");  
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, elm);  
      elm.dispatchEvent( evt );  
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
              if(this.doubleTouch){
                this.doubleTouch=false;
                this.inputs[i].blur()
                if(i<this.inputs.length-1){
                  this.inputs[i+1].focus()
                  return;
                }
              }else{
                this.doubleTouch=true;
              }
            }else{
              this.doubleTouch=false
            }
            if(e.keyCode==53&&e.ctrlKey&&e.shiftKey){//C-%
              this.inputs[i].value+="<bold>";
              return
            }
            if(e.keyCode==54&&e.ctrlKey&&e.shiftKey){//C-&
              this.inputs[i].value+="</bold>";
              return
            }
            if(e.keyCode==82&&e.ctrlKey&&e.shiftKey){//C-R
              this.addQuestion()
              return
            }
            
          })
        }
      },300)
    },
    openPrintWord(){
      this.$emit("open-print-word",this.json)
    }
  },
  computed:{
    jsonFile(){
      let sjon = JSON.stringify(this.json)
      localStorage.autoSave=sjon
      return sjon
    }
  },

  mounted(){
    const parsed = JSON.stringify(localStorage.autoSave)
    if(parsed&&parsed.name){
      this.json.name=parsed.name
      this.json.author=parsed.author
      this.json.description=parsed.description
      this.json.questions=parsed.questions
    }
    this.attachEvt()
  }
})
