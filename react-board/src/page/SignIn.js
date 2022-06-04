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
      alert(xhr.responseText)
    })

  }

  return (
    <div className="SignIn">
      <h3>Sign In</h3>
      <input name='id'/><br/>
      <input name='pw'/><br/>
      <button onClick={ signin }>sign in</button>

      <hr/>

      아이디없ㄷ음?<br/>
      <Link to='/signup'>sign up</Link>
    </div>
      
  );
}
export default SignIn;
