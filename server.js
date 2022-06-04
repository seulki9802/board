require('dotenv').config()

const { response } = require('express');
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const { Server } = require('socket.io');
// const cors = require('cors');
const io = new Server(http);

app.use('/', express.static(__dirname + '/react-board/build'));

const bodyParser = require('body-parser');
const res = require('express/lib/response');
app.use(bodyParser.urlencoded({extended : true}));


const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(process.env.DB_URL, function(error, client){
    if(error) return console.log(error)

    db = client.db('board');
    http.listen(process.env.PORT, function(){
        console.log('listening on ' + process.env.PORT);
    });
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/react-board/build/index.html');
});

app.get('/post/get', function(req, res) {

    db.collection('post').find().toArray(function(error, result){
        if (error) return res.sendStatus(400);
        res.send(result)
    })

})

//보드에 들어오면
io.on('connection', function(socket){
    
    //클라이언트가 새 글 씀
    socket.on('client-send', function(data){

        // 디비 확인하고 저장
        db.collection('count').findOne({ name: 'count' }, function(error, result) {
            data.id = result.count
            
            db.collection('post').findOne({ id: result.count }, function(error, result) {
                if (result) return io.emit('sever-send', 'fail')

                db.collection('count').updateOne({ name : 'count' }, { $inc: { count : 1 } }, function(error, reuslt){
                    if (error) return io.emit('sever-send', 'fail')
                
                    db.collection('post').insertOne(data, function(error, result) {
                        if (error) return io.emit('sever-send', 'fail')

                            //클라이언트에게 새 글 보여주기
                            io.emit('server-send', data)
                            
                    })
                })
            })
        })
        
    })
    
})