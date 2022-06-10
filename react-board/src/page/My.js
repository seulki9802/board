import { useState, useEffect } from "react";
import $ from "jquery";

function My({ user }) {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/my/get',
      data: { user : user }
    }).done(function(result){
      setPosts(result);
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail');
    })
  }, [])

  function postDelete(e) {

    var postID = e.target.dataset.id;

    $.ajax({
      method: 'post',
      url: '/post/delete',
      data: { _id: postID, user: user}
    }).done(function(result){

      setPosts(posts.filter( post => post._id != postID ))

    }).fail(function(xhr, textStatus, errorThrown){

      alert(xhr.responseText);

    })

  }

  return (
    <div className="My">

      <h1>Hello, { user }!</h1>
      <h3>내가 쓴 글 보기</h3>
      <div className="My-posts">

        {[...posts].reverse().map((post, index) => {
          
          return (
            <div key={ post._id } className='My-post'>
              
              <button onClick={ postDelete } data-id={ post._id } >delte</button>

              {post._id}<br/>
              {post.user}<br/>
              {post.title}<br/>
              {post.content}<br/>
              {post.date}<br/>

            </div>
          )
        })}

      </div>
      
      <h3>알림 - 강교용님이 좋아요를 눌렀습니다.</h3>

    </div>
  );
}

export default My;
