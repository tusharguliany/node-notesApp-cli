const fs = require('fs');
const chalk = require('chalk');
const fileName = 'notes.json';
const error = chalk.bgRed.white.bold;
const warning = chalk.bgYellow.black.bold;
const success = chalk.bgGreen.black;
const primary = chalk.bgBlue.white;

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(success('Note added successfully.'));
    } else {
        console.log(error('Note title taken'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if (newNotes.length === notes.length) {
        console.log(error('Note with specified title not found.'));
    } else {
        saveNotes(newNotes);
        console.log(success('note removed successfully..'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log(warning('No Notes in JSON'));
    } else {
        console.log(success('Your Notes'));
        notes.forEach(note => console.log(primary(note.title), note.body));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    debugger;
    if (note) {
        console.log(primary(note.title), note.body);
    } else {
        console.log(error('Note with specified title not found.'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(fileName, dataJson);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(fileName);
        const dataJSON = dataBuffer.toString();
        const parsedData = JSON.parse(dataJSON);
        return parsedData;
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}