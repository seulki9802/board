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









//비밀번호 암호화
const bcrypt = require('bcrypt')

//passport 사용해서 쿠키관리
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { sendStatus } = require('express/lib/response');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    done(null, id)
}); 

//회원가입하기
app.post('/sign/up', function(req, res) {

    //이미 존재하는 이이디인지 확인하기
    db.collection('member').findOne({ id: req.body.id }, function(error, result) {
        if (result) return res.status(400).send('이미 존재하는 아이디입니다.');

        //회원 추가하기
        req.body.pw = bcrypt.hashSync(req.body.pw, 10); //암호화
        db.collection('member').insertOne(req.body, function(error, result) {
            if (error) return res.status(400).send('error');
            res.sendStatus(200);
        })
    })
})

//로그인 하기(passport 사용)
app.post('/sign/in', passport.authenticate('local'), function(req, res){
    res.sendStatus(200);
});

//로그인 하기
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false
}, function(id, pw, done){
    
    db.collection('member').findOne({ id: id }, function(error, result) {
        if (!result) return done(null, false);
        bcrypt.compare(pw, result.pw, (error, same) => { //복호화
            if (!same) return done(null, false);
            done(null, result)
        })
    })
}))


//로그인 상태인지 확인하기(쿠키쿠키쿠키)
app.post('/sign/check', function(req, res) {
    if (req.user) return res.status(200).send(req.user);
    res.status(400).send(req.user);
})











//기존의 글들 갖다주기
app.post('/post/get', function(req, res) {

    db.collection('post').find().toArray(function(error, result){
        if (error) return res.sendStatus(400);
        res.send(result)
    })

})


//글 변경 사항 실시간으로 보여주기
io.on('connection', function(socket){

    //클라이언트가 새 글 씀
    app.post('/post/add', function(req, res) {

        req.body.like = parseInt(req.body.like)
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

                            //클라이언트에게 실시간으로 새 글 보여주기
                            io.emit('add', data)
                            
                    })
                })
            })
        })
    })


    //클라이언트가 글 삭제함
    app.post('/post/delete', function(req, res) {

        //글 삭제 권한 있는지 확인
        var user = req.body.user;
        if ( user && user != req.user ) return res.status(400).send('너는 글 작성자가 아니십니다.');

        //글 삭제하기
        req.body._id = parseInt(req.body._id)
        var data = req.body

        db.collection('post').deleteOne(data, function(error, result) {
            if (error) return res.sendStatus(400);
            res.sendStatus(200);

            //클라이언트에게 실시간으로 삭제된 글 알려주기
            io.emit('delete', data._id)
        })
        
    })

    //좋아요 누름
    app.post('/post/like', function(req, res) {

        var postID = parseInt(req.body._id)
        
        //좋아요 올리기
        db.collection('post').updateOne({ _id: postID}, { $inc: { like : 1 } }, function(error, result) {
            if (error) return res.sendStatus(400);
            res.sendStatus(200);

            //좋아요 오른 거 실시간으로 알려주기
            io.emit('like', postID)

            //좋아요 알림 등록
            var noticData = {
                to: req.body.to, //누구에게
                from: req.user, //누가
                kind: 'like', //어떤 알림xq
                where: req.body._id,
                date: req.body.date //언제
            }
            db.collection('notification').insertOne(noticData)
        })
    })
    
})









app.post('/my/get', function(req, res) {

    db.collection('post').find({ user : req.user }).toArray(function(error, result){
        if (error) return res.sendStatus(400);
        res.send(result);
    })
})

app.post('/my/notification', function(req, res) {

    db.collection('notification').find({ to: req.user }).sort({ "_id" : -1 }).toArray(function(error, result) {
        if (error) return res.sendStatus(400);
        res.send(result);

        db.collection('notification').updateMany({ to: req.user }, { $set: { check: 1 } })
    })

})