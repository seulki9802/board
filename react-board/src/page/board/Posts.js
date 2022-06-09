function PostList({ posts, setPost, setShow }) {

  function postClick(e) {
    var i = posts.length - 1 - e.target.id
    setPost(posts[i])
    setShow(true)
  }

  var className;
  return(
    <>
      {[...posts].reverse().map((post, index) => {
        post.user? className="Post-box-user" : className="Post-box"
        
        return (
          <div key={ post._id } className={ className } id={ index } onClick={ postClick } >
            user: {post.user} <br/>
            title: {post.title}
          </div>
        )
      })}
    </>
  )
}

export default PostList;
