import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard({ user, handleLogout }) {

    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const config = {
            headers: { authorization: `bearer ${user.token}`}
        }

        const allnotes = await axios.get('http://localhost:3001/api/notes', config);

        setNotes(allnotes.data.notes);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = async (event) => {
        event.preventDefault();

        console.log('Adding a new note...');
        
        // prepare the new note
        const note = {
            content: newNote,
            important: Math.random() > 0.5,
        }

        // prepare the token object
        const config = {
            headers: { authorization: `bearer ${user.token}`}
        }

        try {
            const response = await axios.post('http://localhost:3001/api/notes', note, config);

            console.log('note saved successfully');
            console.log(response);

            setNotes([...notes, newNote]);

            setNewNote('');
        } catch(error){
            console.error('note save failed', error);
        }
    }

    return (
        <div>
            <p>{user.name} logged in! <button onClick={handleLogout}>logout</button></p>

            <h3>Create a New Note</h3>
            <form onSubmit={addNote}>
                <input 
                    type='text'
                    placeholder='enter a note...'
                    value={newNote}
                    onChange={({target}) => setNewNote(target.value)}
                />

                <button type='submit'>save note</button>
            </form>

            <ul>
                {
                    notes.map((note, index) => 
                        <li key={index}>{note.content}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default Dashboard;