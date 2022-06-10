import heart from '../../assets/heart.png'

function Posts({ posts, setPost, setShow }) {

  function postClick(e) {
    //보여줄 포스트 인덱스(역순)
    var i = posts.length - 1 - e.target.id
    setPost(posts[i])

    //post 한 개 보여줄 거임
    setShow(true)
  }

  //회원이 쓴건지 아닌지 구별
  var className;
  return(
    <>
      {[...posts].reverse().map((post, index) => {
        post.user? className="Post-box-user" : className="Post-box"
        
        return (
          <div key={ post._id } className={ className } id={ index } onClick={ postClick } >

            <span className="Post-box-userID">{ post.user }</span>

            { post.title } <br/>
            { post.content.substr(0, 25) }
            { post.content.length > 25 ? ',,' : null}


            <div className='Post-box-heart'>
              <img src={ heart } alt="heart" /> {post.like}
            </div>

          </div>
        )
      })}
    </>
  )
}

export default Posts;
