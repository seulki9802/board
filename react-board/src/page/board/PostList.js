function PostList({ posts, setPost, setShow }) {

  function postClick(e) {
    var i = posts.length - 1 - e.target.id
    setPost(posts[i])
    setShow(true)
  }
  
  return(
    <div className="PostList">
      {[...posts].reverse().map((post, index) => {
        return (
          <div key={ post.id } className="Post-box" id={ index } onClick={ postClick } >
            {post.title}
          </div>
        )
      })}
    </div>
  )
}

export default PostList;
