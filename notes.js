const fs = require('fs');

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title,body) => {
    let notes = fetchNotes();
    let note = {
        title: title,
        body: body
    };
    let duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    if(duplicateNotes.length === 0 ){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}; 

const getAll = () => {
    return fetchNotes();
};

const getNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

const removeNote = (title) => {
    let notes = fetchNotes();
    let newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);
    return notes.length !== newNotes.length;
};

const logNote = (note) => {
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote: addNote,
    getAll: getAll,
    getNote: getNote,
    removeNote: removeNote,
    logNote: logNote
};