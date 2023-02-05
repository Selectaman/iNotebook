
import {  useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=> {
    const host = 'https://inotebook-4o7m.onrender.com'
    let notesInitial = [];
    const fetchNotes = async()=> {
        let notesfetch = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          })
          const json = await notesfetch.json()
          setNotes(json);
    }

    const [notes, setNotes] = useState(notesInitial);
    // Add a note
    const addNote = async(title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },            
            body: JSON.stringify({title, description, tag})
          });
          const note =await response.json();

        setNotes(notes.concat(note));
    }

    //delete a note
    const deleteNote = async(id)=> {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
             
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
         

        const newNotes = notes.filter((note)=> {return note._id!==id})
        setNotes(newNotes);
    }

    // update a note
    const updateNote = async(id, title, description, tag)=> {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },            
            body: JSON.stringify({user: id, title, description, tag})
          });

          // eslint-disable-next-line
           const json = await response.json();


        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let i=0; i<  newNotes.length ; i++){
            if(newNotes[i]._id===id){
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    



    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchNotes}}>
             {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;