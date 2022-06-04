import $ from "jquery"

function Post({ post, setShow }) {

  function postDelete() {

    $.ajax({
      method: 'post',
      url: '/post/delete',
      data: { _id: post._id }
    }).done(function(result){
      setShow(false);
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail');
    })

  }

  return(
    <div className="Board-post">

      {post._id}<br/>
      {post.title}<br/>
      {post.date}<br/>

      <button onClick={ () => setShow(false) }>exit</button>
      <button onClick={ postDelete }>delte</button>
    </div>
  )
}
  
export default Post;
  