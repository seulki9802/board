import { useState } from "react";

import Bring from "./Bring";
import Posts from "./Posts";
import Post from "./Post";

function Board () {

  const [posts, setPosts] = useState([]); //글 리스트
  const [post, setPost] = useState(posts[0]) //글
  const [show, setShow] = useState(false); //글 보여줄까

  Bring(posts, setPosts); //글 가져오기

  return(
    <div className="Board-body">

      <Posts posts={ posts } setPost={ setPost } setShow={ setShow }/>
      {show? <Post post={ post } setShow={ setShow } /> :null}

    </div>
  )
}
  
export default Board;
  