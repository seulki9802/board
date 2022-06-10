import $ from "jquery"
import heart from '../../assets/heart.png'


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

  function likeAdd () {

    $.ajax({
      method: 'post',
      url: '/post/like',
      data: { _id: post._id  }
    }).done(function(result){
    }).fail(function(xhr, textStatus, errorThrown){
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

      <div className="Post-modal-heart">
        <img src={ heart } alt="heart" onClick={ likeAdd }/> {post.like}
      </div>


    </div>
  )
}
  
export default Post;
  