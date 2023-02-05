import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const { addNote } = useContext(noteContext);
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert('Successfully added new Note', 'success');
  };
  const handleOnChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={handleOnChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} />
        </div>
        <button disabled={note.title.length < 4 || note.description.length <6} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
