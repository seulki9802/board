import { useState, useEffect } from "react";
import $ from "jquery"

function PostAdd() {

  const [user, setUser] = useState(false);

  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/sign/check'
    }).done(function(result){
      setUser(result);
    }).fail(function(xhr, textStatus, errorThrown){
      setUser(xhr.responseText);
    })
  }, [])

  const [show, setShow] = useState(false);

  function postAdd() {

    var data = { user: user, title: $('input[name=title]').val(), date: new Date() };

    $.ajax({
      method: 'post',
      url: '/post/add',
      data: data
    }).done(function(result){
      setShow(false);
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail');
    })

  }

  return(
    <>
      {user?
      <h1>ooooo</h1>
      :<h1>xxxxx</h1>}

      <div className="Board-add-btn" onClick={ () => setShow(true) }>+</div>
      {show?
        <div className="Board-post-add">
          <input name='title' />
          <button onClick={ postAdd }>add</button>
          <button onClick={ () => setShow(false) }>exit</button>
        </div>
      :null}
    </>
  )
}

export default PostAdd;
