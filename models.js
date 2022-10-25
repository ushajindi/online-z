const {Schema,model}=require('mongoose')

const schema=new Schema({
    name:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }

})
module.exports=model('kliyent',schema)