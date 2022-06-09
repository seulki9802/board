import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function SignUp() {

  let navigate = useNavigate();

  function signup() {

    var id = $('.SignUp input[name=id]').val(),
        pw = $('.SignUp input[name=pw]').val();

    
    $.ajax({
      method: 'post',
      url: '/sign/up',
      data: { id: id, pw: pw }
    }).done(function(result){
      alert('회원가입이 완료되었습니다. 로그인을 해주세요.')
      navigate('/signin');
    }).fail(function(xhr, textStatus, errorThrown){
      alert(xhr.responseText)
    })

  }

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <input name='id'/><br/>
      <input name='pw'/><br/>
      <button onClick={ signup }>sign up</button>
    </div>
      
  );
}
export default SignUp;
