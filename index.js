const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const schema = require('./models')
const baza = require('./baza')
const https = require('https')
const fs = require('fs')
//const axios = require('axios')
const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT = process.env.PORT || 3001
const sms_key='EEFXf2iaAIKuYgxEJffxHfZQN97H'
const email='ushajindi@gmail.com'
const number='79269735497'
const url=`https://${email}:${sms_key}@gate.smsaero.ru/v2/sms/send?number=${number}&text=uraa&sign=SMS Aero`


const app = express()
app.use(cors())
app.use(bodyParser())

app.get('/', async (req, res) => {
    const klient = await schema.find({})
    const sendData = klient.map(el => {
        return el.data
    })
    const uniqueArray = sendData.filter(function (item, pos) {
        return sendData.indexOf(item) == pos;
    })
    uniqueArray.sort()
    const fData = uniqueArray.map(el => {
        const kdata = klient.filter(ele => {
                if (ele.data === el) {
                    return ele
                }
            }
        )
        return {data: el, info: kdata}
    })

    res.send(fData)
})
/*app.get('/t',urlencodedParser,(req,res)=>{
    axios.get('https://email:api_key@gate.smsaero.ru/v2/sms/send?number=79000000000&text=youtext&sign=SMS Aero').then((data)=>{
        console.log(data.data)
    })
})*/
app.post('/', urlencodedParser, (req, res) => {
    console.log(req.body.fvalue)
    const klien = new schema({
        name: req.body.fvalue.name,
        tel: req.body.fvalue.tel,
        address: req.body.fvalue.address,
        data: req.body.fvalue.data,
        service: req.body.fvalue.service,
        time: req.body.fvalue.time
    })
    const kbaza = new baza({
        name: req.body.fvalue.name,
        tel: req.body.fvalue.tel,
    })
    klien.save()
    kbaza.save()
    res.send(200)


})
const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/rshakh.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/rshakh.ru/fullchain.pem'),
}, app);
const start = async () => {
    try {
        await mongoose.connect('mongodb://avto:1212@127.0.0.1:27017/avto', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        /*  app.listen(PORT,()=>{
              console.log('server started'+PORT)
          })*/
        httpsServer.listen(3001, () => {
            console.log('HTTPS Server running on port 3001');
        });

    } catch (e) {
        console.log(e)
    }
}
start()