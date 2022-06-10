import Post from './Post'
import Notice from './Notice'


function My({ user }) {

  return (
    <div className='My'>

      <h1>Hello, { user }!</h1>
      
      <h3>내가 쓴 글 보기</h3>
      <Post user={ user } />

      <h3>알림 보기</h3>
      <Notice />

    </div>
  );
}

export default My;
