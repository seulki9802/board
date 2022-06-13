import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function SignUp() {

  let navigate = useNavigate();

  function signup() {

    //input id, pw
    var id = $('.SignUp input[name=id]').val(),
        pw = $('.SignUp input[name=pw]').val();

    //next situation -> can't sign up
    const engNum = /^[|a-z|0-9|]+$/,
          eng = /^[|a-z|]+$/,
          num = /^[|0-9|]+$/;

    if (!id) return alert('아이디를 입력하세요.')
    if (!pw) return alert('비밀번호를 입력하세요.')
    if (!(engNum.test(id) && !num.test(id))) return alert('아이디는 영문 또는 영문+숫자만 입력 가능합니다.')
    if (!(engNum.test(pw) && !num.test(pw) && !eng.test(pw))) return alert('비밀번호는 영문+숫자만 입력 가능합니다.')
    if (id.length < 3 ||  id.length > 10) return alert('아이디는 4자 이상 10자 이내로 만들어주세요.')
    if (pw.length < 6 || pw.length > 20) return alert('비밀번호는 6자 이상 20자 이내로 작성해주세요.')

    //requst sign up to server!
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
      <input name='id' placeholder='4~10자 (영문 / 영문 + 숫자)'/><br/>
      <input name='pw' type='password' placeholder='6~20자 (영문 + 숫자)'/><br/>
      <button onClick={ signup }>sign up</button>
    </div>
      
  );
}
export default SignUp;
