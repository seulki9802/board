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


  //회원이 쓴 글인지
  var className = "Post-modal";
  if (post.user) className += ' Post-modal-user'

  return(
    <div className={ className }>

      {post._id}<br/>
      {post.user}<br/>
      {post.title}<br/>
      {post.content}<br/>
      {post.date}<br/>

      <div className="Post-modal-btn-group">
        <button onClick={ () => setShow(false) }>exit</button>
        <button onClick={ postDelete }>delte</button>
      </div>
    </div>
  )
}
  
export default Post;
  