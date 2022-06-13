import { useState, useEffect } from "react";
import $ from "jquery";

import heart from '../../assets/heart.png'

function MyPost({ user }) {

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
      <div className="My-posts">

        {[...posts].reverse().map((post, index) => {
          
          return (
            <div key={ post._id } className='My-post'>
              
              <img src={ heart } alt="heart"/> {post.like}
              <button onClick={ postDelete } data-id={ post._id } >delete</button><br/>

              { post._id }<br/>
              { post.user }<br/>
              <strong>{post.title}</strong><hr/>
              { post.content }<hr/>
              <small>{ post.date }</small>

            </div>
          )
        })}

      </div>
  );
}

export default MyPost;
