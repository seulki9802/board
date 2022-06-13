import { useState } from 'react';

import Post from './Post'
import Notice from './Notice'


function My({ user }) {

  const [newNoti, setNewNoti] = useState(0);

  return (
    <div className='My'>

      <h2>Hello, { user }!</h2>
      
      <h3>내가 쓴 글</h3>
      <Post user={ user } />

      <h3>알림 보기 +{ newNoti }</h3>
      <Notice user={ user } setNewNoti={ setNewNoti } />

    </div>
  );
}

export default My;
