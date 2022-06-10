import { useState, useEffect } from "react";
import io from 'socket.io-client';
import $ from 'jquery';

function Bring (posts, setPosts) {

  //--------기존 글 가져오기--------
  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/post/get'
    }).done(function(result){
      setPosts(result)
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail')
    })
  }, [])


  //--------실시간 변경--------
  const [change, setChange] = useState([]);

  //socket(딱 한 번 접속)
  useEffect(() => {

      const socket = io.connect('http://localhost:7777')
  
      //실시간 add 확인
      socket.on('add', function(data) {
        setChange(['add', data]) //data -> object
      })
    
      //실시간 del 확인
      socket.on('delete', function(data) {
        setChange(['del', data]) //data -> post id
      })
    
      //실시간 like 확인
      socket.on('like', function(data) {
        setChange(['like', data]) //data -> post id
      })

  }, [])

  //실시간으로 설정된(변경된) change에 따라 posts 설정 바꿔주기
  useEffect(() => {

    var act = change[0],
        data = change[1]
    
    if (act === 'add') setPosts([...posts, data]) //data -> object

    else if (act === 'del') setPosts(posts.filter( (post => post._id != data ))) //data -> post id

    else if (act === 'like') { // data -> post id
      var copyPosts = [...posts];

      copyPosts.forEach( (post, index) => {
        if ( post._id === data ) copyPosts[index].like += 1;
      })

      setPosts(copyPosts);
    }

  }, [change])

}
  
export default Bring;
  