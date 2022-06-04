import $ from "jquery"
import { useState } from "react";

function PostAdd() {

  const [show, setShow] = useState(false);

  function postAdd() {

    var data = { title: $('input[name=title]').val(), date: new Date() };

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
