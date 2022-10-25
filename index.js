const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const schema=require('./models')
const baza=require('./baza')

const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT=process.env.PORT || 3001


const app=express()
app.use(cors())
app.use(bodyParser())

app.get('/',async (req,res)=>{
    const klient=await schema.find({})
    const sendData=klient.map(el=>{
        return el.data
    })
    const uniqueArray = sendData.filter(function(item, pos) {
        return sendData.indexOf(item) == pos;
    })
    uniqueArray.sort()
    const fData=uniqueArray.map(el=>{
        const kdata=klient.filter(ele=> {
                if (ele.data === el) {
                    return ele
                }
            }
        )
        return {data: el,info:kdata}
    })

    res.send(fData)
})

app.post('/',urlencodedParser,(req,res)=>{
    console.log(req.body.fvalue)
    const klien=new schema({
        name:req.body.fvalue.name,
        tel:req.body.fvalue.tel,
        address:req.body.fvalue.address,
        data:req.body.fvalue.data,
        service:req.body.fvalue.service,
        time:req.body.fvalue.time
    })
    const kbaza=new baza({
        name:req.body.fvalue.name,
        tel:req.body.fvalue.tel,
    })
    klien.save()
    kbaza.save()
    res.send(200)

})

const start = async()=>{
    try {
        await mongoose.connect('mongodb://u1ijtdzaxqh31n1uieqz:LQDWOvjdKV55f3II583w@biowfxysma4kfbo-mongodb.services.clever-cloud.com:27017/biowfxysma4kfbo',{
            useNewUrlParser:true,
            useFindAndModify:false,
           useUnifiedTopology: true,
        })
        app.listen(PORT,()=>{
            console.log('server started'+PORT)
        })

    }
    catch (e) {
        console.log(e)
    }
}
start()