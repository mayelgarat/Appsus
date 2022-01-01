import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'

export const noteService = {
    query,
    removeNote,
    addNote,
    createTextNote,
    createImgNote,
    createTodoNote,
    createVideoNote,
    queryByText,
    changeBackground,
    togglePinNote,
    toggleDone,
    duplicateNote

}


const KEY = 'noteDB';
_createNotes();

function query(filterBy = null) {
    //todo - understand async two button press
    const notes = _loadNotesFromStorage()
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _filterNotesByType(notes, filterBy)
    return Promise.resolve(filteredNotes)
}


function queryByText(txt) {
    // const txt = { txt }
    const notes = _loadNotesFromStorage()
    if (!txt) return Promise.resolve(notes)
    const filteredNotes = _filterNotesByText(notes, txt)
    return Promise.resolve(filteredNotes)
}

function _filterNotesByType(notes, filterBy) {
    return notes.filter((note) => note.type === filterBy)
}

function _filterNotesByText(notes, input) {
    return notes.filter((note) => {
        let txt
        switch (note.type) {
            case 'note-txt':
                txt = note.info.txt
                break;
            case 'note-todos':
                txt = note.info.label
                break;
            case 'note-img':
                txt = note.info.title
                break;
            case 'note-video':
                txt = note.info.title
                break;
            default:
                break;
        }
        const res = txt.includes(input)
        console.log(`${txt} includes ${input}`, res)
        return res

    })
}

function togglePinNote(note) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex((n) => {
        return n.id === note.id;
    })
    notes[noteIdx].isPinned = !note.isPinned
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function toggleDone(todoId, noteId) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex((n) => {
        return n.id === noteId;
    })
    let todos = notes[noteIdx].info.todos
    let todoIdx = todos.findIndex((t) => {
        return t.id === todoId;
    })
    let currTodo = todos[todoIdx]
    if (currTodo.doneAt) {
        currTodo.doneAt = null
    } else {
        currTodo.doneAt = Date.now()
    }
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function changeBackground(noteId, color) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(function (note) {
        return note.id === noteId;
    })
    console.log('noteIdx:', noteIdx);
    notes[noteIdx].style.backgroundColor = color
    console.log('notes[noteIdx]:', notes[noteIdx]);
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function _getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    var note = notes.find(function (note) {
        return noteId === note.id
    })
    return note
}

function removeNote(noteId) {
    console.log('noteId', noteId)
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    console.log('filtered notes', notes)
    _saveNotesToStorage(notes);
    return Promise.resolve()
}

function addNote(note) {
    const notes = _loadNotesFromStorage()
    notes.unshift(note)
    _saveNotesToStorage(notes);
    return Promise.resolve()
}


function duplicateNote(noteId) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(function (note) {
        return note.id === noteId;
    })
    let note = notes[noteIdx]
    let noteCopy = { ...note }
    noteCopy.id = utilService.makeId()
    let newNotes = [...notes, noteCopy]
    _saveNotesToStorage(newNotes);
    return Promise.resolve()
}


function createTextNote(txt) {
    const newTxtNote = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt
        }, style: {
            backgroundColor: "#d8b5f6"
        }
    }
    addNote(newTxtNote)
    return Promise.resolve()
}

function createTodoNote(title, todos) {
    const newTodoNote = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt
        }, style: {
            backgroundColor: "#d8b5f6"
        }
    }
}

function createImgNote(imgUrl, title) {
    const newImgNote = {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        info: {
            url: imgUrl,
            title,
        },
        style: {
            backgroundColor: "#f2dce8"
        }
    }
    addNote(newImgNote)
    return Promise.resolve()
}
function createVideoNote(videoUrl, title) {
    const newVideoNote = {
        id: utilService.makeId(),
        type: "note-video",
        isPinned: false,
        info: {
            url: videoUrl,
            title
        },
        style: {
            backgroundColor: "#a6dcd0"
        }
    }
    addNote(newVideoNote)
    return Promise.resolve()
}


function createTodoNote(todo, title) {
    console.log('todo:', todo);
    console.log('title:', title);

    // const txt = todos.map((todo) => todo.txt)
    const newTodosNote = {
        id: utilService.makeId(),
        type: "note-todos",
        isPinned: false,
        info: {
            label: title,
            todos: [
                { id: utilService.makeId(), txt: todo, doneAt: null },
            ]
        },
        style: {
            backgroundColor: "#f8f8b8"
        }

    }
    addNote(newTodosNote)
    return Promise.resolve()
}


function _createNotes() {
    var notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#d8b5f6"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#f2dce8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Yesss!"
                },
                style: {
                    backgroundColor: "#d8b5f6"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { id: utilService.makeId(), txt: "Driving liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#f8f8b8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Pay bills"
                },
                style: {
                    backgroundColor: "#d8b5f6"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://i.pinimg.com/originals/fd/3c/cd/fd3ccd7b49e366b4206f5ac7f8fa8dac.gif",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#f2dce8"
                }
            },

            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Call May"
                },
                style: {
                    backgroundColor: "#d8b5f6"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://cdn.vox-cdn.com/thumbor/a5EcHSnHLRfQyzSFvhmPSnibCq0=/0x0:420x314/1400x1400/filters:focal(136x115:202x181):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/55279403/tenor.0.gif",
                    title: "Watching you"
                },
                style: {
                    backgroundColor: "#f2dce8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Don't Forget!!!",
                    todos: [
                        { id: utilService.makeId(), txt: "milk", doneAt: null },
                        { id: utilService.makeId(), txt: "honey", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "sugar", doneAt: 187111111 },
                    ]
                },
                style: {
                    backgroundColor: "#f8f8b8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/watch?v=MCkTebktHVc",
                    title: "My playlist"
                },
                style: {
                    backgroundColor: "#a6dcd0"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://d.newsweek.com/en/full/520858/supermoon-moon-smartphone-photo-picture.jpg?w=1600&h=1600&q=88&f=bb45f0cd0324ae5e04827f684a9da7e8",
                    title: "moon"
                },
                style: {
                    backgroundColor: "#f2dce8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { id: utilService.makeId(), txt: "Driving liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#f8f8b8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://silentbeacon.com/wp-content/uploads/2020/08/Road-Trip-Safety-Tips-with-car-panic-button.jpg",
                    title: "roadtrip"
                },
                style: {
                    backgroundColor: "#f2dce8"
                }
            },

            {
                id: utilService.makeId(),
                type: "note-video",
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/watch?v=t_Ng2rj7bl0&ab_channel=SucculentSessions",
                    title: "Jasmin Moallem 🌵 Succulent Sessions"
                },
                style: {
                    backgroundColor: "#a6dcd0"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "checklist for vacation",
                    todos: [
                        { id: utilService.makeId(), txt: "Passport", doneAt: null },
                        { id: utilService.makeId(), txt: "Sun lotion", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "sunglasses", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: "#f8f8b8"
                }
            },
        ];
    }
    _saveNotesToStorage(notes);
    return notes;
}



function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}
