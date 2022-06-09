import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';

function SignIn() {

  let navigate = useNavigate();

  function signin() {

    var id = $('.SignIn input[name=id]').val(),
        pw = $('.SignIn input[name=pw]').val();

    $.ajax({
      method: 'post',
      url: '/sign/in',
      data: { id: id, pw: pw }
    }).done(function(result){
      navigate('/');
    }).fail(function(xhr, textStatus, errorThrown){
      alert('아이디 비빌번호를 확인해주세요.')
    })

  }

  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <input name='id'/><br/>
      <input name='pw'/><br/>
      <button onClick={ signin }>sign in</button>

      <hr/>

      아이디가 없으신가요?
      <Link to='/signup'>sign up</Link>
    </div>
      
  );
}
export default SignIn;
