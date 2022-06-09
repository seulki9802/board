require('dotenv').config()

const { response } = require('express');
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const { Server } = require('socket.io');
// const cors = require('cors');
const io = new Server(http);

app.use(express.static(__dirname + '/react-board/build'));

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

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/react-board/build/index.html');
});








const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { sendStatus } = require('express/lib/response');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


app.post('/sign/up', function(req, res) {

    db.collection('member').findOne({ id: req.body.id }, function(error, result) {
        if (result) return res.status(400).send('이미 존재하는 아이디입니다.');

        db.collection('member').insertOne(req.body, function(error, result) {
            if (error) return res.status(400).send('error');
            res.sendStatus(200);
        })
    })
})

app.post('/sign/in', passport.authenticate('local'), function(req, res){
    res.sendStatus(200);
});

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function(id, pw, done){
    db.collection('member').findOne({ id: id, pw: pw }, function(error, result) {
        if (!result) return done(null, false);
        done(null, result)
        
    })
}))

app.post('/sign/check', function(req, res) {
    if (req.user) return res.status(200).send(req.user);
    res.status(400).send(req.user);
})


passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    done(null, id)
}); 










app.post('/post/get', function(req, res) {

    db.collection('post').find().toArray(function(error, result){
        if (error) return res.sendStatus(400);
        res.send(result)
    })

})

io.on('connection', function(socket){
    
    //클라이언트가 새 글 씀
    app.post('/post/add', function(req, res) {

        var data = req.body

        // 디비 확인하고 저장
        db.collection('count').findOne({ name: 'count' }, function(error, result) {
            data._id = result.count
            
            db.collection('post').findOne({ _id: result.count }, function(error, result) {
                if (result) return res.sendState(400);
    
                db.collection('count').updateOne({ name : 'count' }, { $inc: { count : 1 } }, function(error, reuslt){
                    if (error) return res.sendState(400);
                
                    db.collection('post').insertOne(data, function(error, result) {
                        if (error) return res.sendState(400);
                            res.sendStatus(200);

                            //클라이언트에게 새 글 보여주기
                            io.emit('add', data)
                            
                    })
                })
            })
        })
    })


    //클라이언트가 글 삭제함
    app.post('/post/delete', function(req, res) {

        var user = req.body.user;
        console.log(user)
        if (user) console.log('user true');
        else console.log('user false');

        if ( user && user != req.user ) return res.status(400).send('너는 글 작성자가 아니십니다.');

        req.body._id = parseInt(req.body._id)
        var data = req.body

        db.collection('post').deleteOne(data, function(error, result) {
            if (error) return res.sendStatus(400);
            res.sendStatus(200);

            io.emit('delete', data)
        })
        
    })
    
})

















// app.post('/sign/in', function(req, res) {

//     db.collection('member').findOne(req.body, function(error, result) {
//         if (!result) return res.status(400).send('아이디 비밀번호를 확인해주세요.');
//         res.sendStatus(200);
//     })
// })