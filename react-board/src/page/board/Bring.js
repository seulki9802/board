import { useEffect } from "react";
import io from 'socket.io-client';
import $ from 'jquery';

const socket = io.connect('http://localhost:7777')

function Bring (posts, setPosts) {

  //기존 글 가져오기
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

  //새 글 실시간으로 가져오기
  useEffect(() => {
    socket.on('add', function(data) {
      if (data === 'fail') return alert('fail')
      setPosts([...posts, data])
    })

    socket.on('delete', function(data) {
      setPosts(posts.filter( post => post._id != data._id ))
    })
  })
  
}
  
export default Bring;
  