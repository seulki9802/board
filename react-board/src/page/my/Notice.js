import { useState, useEffect } from "react";
import $ from "jquery";

function Notice({ user, setNewNoti }) {

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

  var newNoti = 0;
  return (
    <>
      <div className='My-notification'>

        {notification.map((noti) => {

          if (!noti.from) noti.from = '익명의 누군가'
          if (noti.from === user) noti.from += '(나)'
          if (!noti.check) newNoti += 1

          return(
            <>
            { noti.from }님이 { noti.where }번 글에 좋아요를 눌렀습니다.
            <small>({ noti.date })</small>
            {noti.check? null: <samll className="My-noti-new">new</samll>}
            <br/>
            </>
          )

        })}

        { setNewNoti(newNoti) }

      </div>
    </>
  );
}

export default Notice;
