import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';

function SignIn({ setUser }) {

  let navigate = useNavigate();

  function signin() {

    var id = $('.SignIn input[name=id]').val(),
        pw = $('.SignIn input[name=pw]').val();

    $.ajax({
      method: 'post',
      url: '/sign/in',
      data: { id: id, pw: pw }
    }).done(function(result){

      //로그인 되면 서버한테 유저 아이디 가져오기
      $.ajax({
        method: 'post',
        url: '/sign/check'
      }).done(function(result){

        //로그인 상태면 유저 아이디가 user에 담김 (user -> 아이디를 기록해서 로그인 상태인지 확인)
        setUser(result);

        //홈페이지(게시판)로 이동하기
        navigate('/');

      }).fail(function(xhr, textStatus, errorThrown){

        //비로그인 상태면 ''가 user에 담김
        setUser(xhr.responseText);
        alert('다시 한 번 시도해 주세요.')

      })

    }).fail(function(xhr, textStatus, errorThrown){
      alert('아이디 비빌번호를 확인해주세요.')
    })

  }

  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <input name='id'/><br/>
      <input name='pw' type='password' /><br/>
      <button onClick={ signin }>sign in</button>

      <hr/>

      아이디가 없으신가요?
      <Link to='/signup'>sign up</Link>
    </div>
      
  );
}
export default SignIn;
