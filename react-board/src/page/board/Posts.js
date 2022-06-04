function PostList({ posts, setPost, setShow }) {

  function postClick(e) {
    var i = posts.length - 1 - e.target.id
    setPost(posts[i])
    setShow(true)
  }

  return(
    <>
      {[...posts].reverse().map((post, index) => {
        return (
          <div key={ post._id } className="Post-box" id={ index } onClick={ postClick } >
            {post.title}
          </div>
        )
      })}
    </>
  )
}

export default PostList;
