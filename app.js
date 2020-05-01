const notes = require('./notes');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
});

yargs.command({
    command: 'remove',
    describe: 'remove a Note',
    builder: {
        title: {
            describe: 'Note Title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
});

yargs.command({
    command: 'read',
    describe: 'read a Note',
    handler: () => {
        console.log('reading a note..');
    }
});

yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler: () => notes.listNotes()
});

yargs.parse();