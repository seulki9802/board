import { useState, useEffect } from "react";
import $ from "jquery"

function PostAdd() {

  const [user, setUser] = useState(''); //user 로그인 상태 확인
  const [membership, setMembership] = useState(false); //회원글쓰기 할지 말지 결정
  const [show, setShow] = useState(false); //글쓰는 창 보여줄지 말지

  //로그인 상태인지 서버에게 확인
  useEffect(() => {
    $.ajax({
      method: 'post',
      url: '/sign/check'
    }).done(function(result){
      //로그인 상태면 유저 아이디가 user에 담김
      setUser(result);
    }).fail(function(xhr, textStatus, errorThrown){
      //비로그인 상태면 ''가 user에 담김
      setUser(xhr.responseText);
    })
  }, [])

  //글 발행 함수
  function postAdd() {

    var userID, data;

    //회원글쓰기인지 아닌지
    membership ? userID = user : userID = ''
    data = { user: userID, title: $('input[name=title]').val(), date: new Date() };

    $.ajax({
      method: 'post',
      url: '/post/add',
      data: data
    }).done(function(result){
      setShow(false);
    }).fail(function(xhr, textStatus, errorThrown){
      console.log('fail');
    })

  }

  //회원 글쓰기 버튼 클릭
  function member() {
    //회원 아닌 사람이 클릭하면 물리치기
    if(!user) return alert('회원 전용입니다.');

    setShow(true);
    setMembership(true);
  }

  //익명 글쓰기 버튼 클릭
  function nonMember() {
    setShow(true);
    setMembership(false);
  }

  return(
    <>
      {/* 글쓰기 버튼 */}
      <div className="Board-add-btn">
        <button onClick={ member }>회원전용 글쓰기</button>
        <button onClick={ nonMember }>익명 글쓰기</button>
      </div>
      
      {/* 글쓰는 창 */}
      {show?
        <div className="Board-post-add">
          <input name='title' />
          <button onClick={ postAdd }>add</button>
          <button onClick={ () => setShow(false) }>exit</button>
        </div>
      :null}
    </>
  )
}

export default PostAdd;
