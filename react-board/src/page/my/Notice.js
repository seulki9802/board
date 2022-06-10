import { useState, useEffect } from "react";
import $ from "jquery";

function My({ user }) {

  const [notification, setNotification] = useState([])

  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/my/notification'
    }).done(function(result){
      setNotification(result);
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail');
    })
  }, [])


  return (
    <div className='My-Notice'>

      {notification.map((noti) => {
        if (!noti.from) noti.from = '익명의 누군가'
        return(
          noti.kind === 'like'
          ? <h3>{ noti.from }님이 { noti.where}번 글에 좋아요를 눌렀습니다.</h3>
          : <h3>{ noti.from }님이 { noti.where}반 글에 댓글을 달았습니다.</h3>
        )
      })}



    </div>
  );
}

export default My;
