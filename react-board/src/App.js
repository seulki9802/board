import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $ from 'jquery';

import NavBar from './page/NavBar';
import Board from './page/board/Board';
import SignIn from './page/sign/SignIn';
import SignUp from './page/sign/SignUp';
import My from './page/My';

import './App.css';

function App() {

  const [user, setUser] = useState('');

  //로그인 했던! 상태인지 확인(첫방문 or 새로고침)
  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/sign/check'
    }).done(function(result){
      setUser(result); //로그인 상태면 유저 아이디가 user에 담김
    }).fail(function(xhr, textStatus, errorThrown){
      setUser(xhr.responseText); //비로그인 상태면 ''가 user에 담김
    })
  }, [])

  return (
    <div className="App">

      <BrowserRouter>

        <NavBar user={ user } />
        <Routes>
          <Route path='/' element={ <Board user={ user } /> } />
          <Route path='/signin' element={ <SignIn setUser={ setUser }/> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/my' element={ <My user={ user }/> } />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
