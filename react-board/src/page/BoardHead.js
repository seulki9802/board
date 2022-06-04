import { useState } from "react";
import io from 'socket.io-client'
import $ from 'jquery';

const socket = io.connect('http://localhost:7777')

function Board() {

  const [addModal, setAddModal] = useState(false)

  return(
    <div className="Board-haed">

      <div className="Board-head-container">
        <div className="Board-head-title">BOARD</div>
        <div className="Post-add-button" onClick={ () => setAddModal(true) }>+</div>
      </div>

      {addModal? <AddModal setAddModal={ setAddModal } /> :null}

    </div>
  )
}

function AddModal({ setAddModal }) {

  function reqAddPost() {
    const title = $('.Post-add input[name=title]').val(),
          date = new Date()

    var data = { title: title, date: date };
    socket.emit('client-send', data);

    setAddModal(false)
  }

  return(
    <div className="Post-add">
      <input name='title' />
      <button onClick={ reqAddPost }>post</button>
      <button onClick={ () => setAddModal(false) }>exit</button>
    </div>
  )
}



export default Board;
