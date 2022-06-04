function PostShow({ post, setShow }) {
  return(
    <div className="Post-add">
      {post.id}<br/>
      {post.title}<br/>
      {post.date}
      <button onClick={ () => setShow(false) }>exit</button>
    </div>
  )
}
  
export default PostShow;
  