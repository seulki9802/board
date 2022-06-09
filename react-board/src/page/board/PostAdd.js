import { useState, useEffect } from "react";
import $ from "jquery"

function PostAdd() {

  const [user, setUser] = useState(''); //user 로그인 상태 확인
  const [membership, setMembership] = useState(false); //회원글쓰기 할지 말지 결정
  const [className, setClassName] = useState('Post-add-modal');
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

    var title = $('input[name=title]').val(),
        content = $('textarea[name=content]').val();

    if (!title) return alert('제목을 작성하세요.');
    if (!content) return alert('내용을 작성하세요.');
    if (title.length > 15) return alert('제목을 15자 이내로 작성해주세요.')
    if (content.length > 300) return alert('내용을 100자 이내로 작성해주세요.')

    var userID, data;

    //회원글쓰기인지 아닌지
    membership ? userID = user : userID = ''
    data = {
      user: userID,
      title: title,
      content: content,
      date: new Date()
    };

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
    setClassName('Post-add-modal Post-add-modal-user')
  }

  //익명 글쓰기 버튼 클릭
  function nonMember() {
    setShow(true);
    setMembership(false);
    setClassName('Post-add-modal');
  }

  return(
    <>
      {/* 글쓰기 버튼 */}
      <div className="Post-add-btn-group">
        <button onClick={ member }>회원전용 글쓰기</button>
        <button onClick={ nonMember }>익명 글쓰기</button>
      </div>
      
      {/* 글쓰는 창 */}
      {show?
        <div className={ className }>
          <input className="Post-modal-input-title" name='title' placeholder="제목은 15자 이내로 작성 가능합니다."/>
          <textarea className="Post-modal-input-content" name='content' placeholder="내용은 300자 이내로 작성 가능합니다" />
          <div className="Post-modal-btn-group">
            <button onClick={ postAdd }>add</button>
            <button onClick={ () => setShow(false) }>exit</button>
          </div>
        </div>
      :null}
    </>
  )
}

export default PostAdd;
