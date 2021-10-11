
const express = require('express')
var fs = require('fs')
var linebot = require('linebot');
var d = new Date();
var t = d.getHours();

var mis = 3600000 * (23 - t)
setTimeout(() => {
  alarm()
}, mis);


fs.writeFile('./public/namelist.json', "[]", function () {
})
const app = express()
const port = 80

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
const { stringify } = require('querystring')


app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function add(add) {
  fs.readFile('./public/namelist.json', 'utf-8', (err, data) => {
    if (data != "") {
      words = JSON.parse(data)
      JSON.stringify(words)
      words.push(add)
    } else {
      words = add
    }
    console.log(words);
    let added = JSON.stringify(words)
    fs.writeFile('./public/namelist.json', added, function () {
      console.log('輸入成功');
    });
  })
}

function crm(cr) {
  fs.writeFile('./public/cr.txt', cr, function () {
    console.log('班級:' + cr);
  })
}

function de(de) {
  if (de == "namelist") {
    var d = "[]"
    fs.writeFile('./public/namelist.json', d, function () {
      console.log('名單已刪除');
    })
  } else if (de == "cr") {
    var c = ""
    fs.writeFile('./public/cr.txt', c, function () {
      console.log('教室已刪除');
    })
  } else if (de == "all") {
    var d = "[]"
    var c = ""
    fs.writeFile('./public/namelist.json', d, function () {
      console.log('名單已刪除');
    })
    fs.writeFile('./public/cr.txt', c, function () {
      console.log('教室已刪除');
    })


  }
}

function alarm() {
  setInterval(function () { de("all") }, 86400000)
}


var privateKey = fs.readFileSync('ssl/private.key');
var certificate = fs.readFileSync('ssl/certificate.crt');
var credentials = { key: privateKey, cert: certificate };

var https = require('https');
const ms = require('ms');

setTimeout(() => {
  app.post("/pp", function (req, res) {
    var recieved = req.body
    // console.log(recieved)
    add(recieved)
    // res.send("成功傳送");
  })
  app.post("/cr", function (req, res) {
    var cr = req.body
    console.log(cr["class"])
    crm(cr["class"])
    // res.send("成功傳送");
  })

  app.post("/de", function (req, res) {
    var del = req.body
    de(del["mode"])
    // res.send("成功傳送");
  })


}, 2000)

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443);


// var bot = linebot({
//   channelId: '1656500764',
//   channelSecret: '97f8a39342b43086112b70bd3dcf5823',
//   channelAccessToken: '7UVHKLaR8HOxb+Y4F8bf9afmCOSFj7Lgp+hU53dhbOX0hMmDIYD7erqeplF5i2T+E3Rvt8JVYw2jzzbuCYeZaxLW5CSYwBBFTyIMshimkEmqvBoJIN2CdvqOT0x8A9lC5knfygq0niBQIRyFgtA5rwdB04t89/1O/w1cDnyilFU='
// });

// bot.on('message', function (event) {
//   // event.message.text是使用者傳給bot的訊息
//   // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
//   event.reply(event.message.text).then(function (data) {
//     // 當訊息成功回傳後的處理
//     console.log("成功")
//   }).catch(function (error) {
//     // 當訊息回傳失敗後的處理
//     console.log("失敗")

//   });
// });

// bot.listen('/linewebhook', 3000, function () {
//   console.log('[BOT已準備就緒]');
// });
