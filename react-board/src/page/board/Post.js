import $ from "jquery"

function Post({ post, setShow }) {

  function postDelete() {

    $.ajax({
      method: 'post',
      url: '/post/delete',
      data: { _id: post._id, user: post.user }
    }).done(function(result){
      setShow(false);
    }).fail(function(xhr, textStatus, errorThrown){
      alert(xhr.responseText);
    })

  }

  return(
    <div className="Board-post">

      {post._id}<br/>
      {post.user}<br/>
      {post.title}<br/>
      {post.date}<br/>

      <button onClick={ () => setShow(false) }>exit</button>
      <button onClick={ postDelete }>delte</button>
    </div>
  )
}
  
export default Post;
  