const {Schema,model}=require('mongoose')

const baza=new Schema({
    name:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    }
})

module.exports=model("Baza",baza)