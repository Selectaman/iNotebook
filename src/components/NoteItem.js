import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


function NoteItem(props) {


    const {updatenote, note} = props;
    const {deleteNote} = useContext(noteContext);
    const handleClick = ()=>{
        deleteNote(note._id);
        props.showAlert('Successfully Deleted the Note', 'success');
    }
    const handleEdit = () => {
        updatenote(note);
    }
  return (
    <div className="col-md-3">
        <div className="card my-3">
  <div className="card-body">
  <div className="d-flex align-items-center">
  <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={handleEdit}></i>
  </div>
    
    <p className="card-text">{note.description}</p>
    
  </div>
</div> 
    </div>
      

  )
}

export default NoteItem
