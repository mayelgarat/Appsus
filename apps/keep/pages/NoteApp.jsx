import { noteService } from "../services/NoteService.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteAddTxt } from "../cmps/NoteAddTxt.jsx";
import { NoteAddImg } from "../cmps/NoteAddImg.jsx";
import { NoteAddVideo } from "../cmps/NoteAddVideo.jsx";
import { NoteAddTodo } from "../cmps/NoteAddTodo.jsx";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { MailAdd } from "../../mail/pages/MailAdd.jsx";
import { mailService } from "../../mail/services/mailService.js";
export class NoteApp extends React.Component {
    state = {
        notes: [],
        filterByType: null,
        filterByText: null,
        selectedNote: null,
        // sentNote: null,
        noteToSent: null,
        // addNoteModal: false,
        addTxtNoteModal: false,
        addImgNoteModal: false,
        addVideoNoteModal: false,
        addTodoNoteModal: false

    };
    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        const { filterByType } = this.state;
        noteService.query(filterByType).then((notes) => {
            this.setState({ notes });
        });
    };

    removeNote = (noteId) => {
        noteService.removeNote(noteId).then(() => {
            this.loadNotes();
        });
    };

    onChangeBackground = (noteId, color) => {
        noteService.changeBackground(noteId, color).then(() => {
            this.loadNotes();
        });
    };

    onShowAddTxtNoteModal = () => {
        this.setState({ addTxtNoteModal: true })
    }
    onCloseAddTxtNoteModal = () => {
        this.setState({ addTxtNoteModal: false })
    }
    onShowAddImgNoteModal = () => {
        this.setState({ addImgNoteModal: true })
    }
    onCloseAddImgNoteModal = () => {
        this.setState({ addImgNoteModal: false })
    }
    onShowAddVideoNoteModal = () => {
        this.setState({ addVideoNoteModal: true })
    }
    onCloseAddVideoNoteModal = () => {
        this.setState({ addVideoNoteModal: false })
    }
    onShowAddTodoNoteModal = () => {
        this.setState({ addTodoNoteModal: true })
    }
    onCloseAddTodoNoteModal = () => {
        this.setState({ addTodoNoteModal: false })
    }


    onAddMail = (email) => {
        mailService.createEmail(email);
    };



    onTogglePinNote = (note) => {
        noteService.togglePinNote(note).then(() => {
            this.loadNotes();
        });
    };

    onUnselectedCompose = () => {
        this.setState({ noteToSent: false });
    };



    onSetFilterType = (ev) => {
        let buttonFilterId = ev.target.id;
        let filterByType = buttonFilterId.split("type-")[1];
        if (filterByType === "remove-filter") filterByType = null;
        this.setState({ filterByType }, () => {
            this.loadNotes();
        });
    };

    onSetFilterText = (ev) => {
        ev.preventDefault();
        const txt = ev.target.value;
        noteService.queryByText(txt).then((notes) => {
            this.setState({ filterByText: txt, notes });
        });
    };


    onToggleDoneTodo = (todoId, noteId) => {
        noteService.toggleDone(todoId, noteId).then(() => {
            this.loadNotes()
        })
    }

    onDuplicateNote = (noteId) => {
        noteService.duplicateNote(noteId).then(() => {
            this.loadNotes()
        })
    }



    onSentByEmail = (note) => {
        let txt;
        switch (note.type) {
            case "note-txt":
                txt = note.info.txt;
                break;
            case "note-todos":
                txt = note.info.label;
                break;
            case "note-img":
                txt = note.info.title;
                break;
            case "note-video":
                txt = note.info.title;
                break;
            default:
                break;
        }
        const mail = { subject: txt, body: JSON.stringify(note.info) };
        this.setState({ noteToSent: mail });
        // const url = '/#/mail/new-mail/'
        // const params = new URLSearchParams()
        // params.set('subject', mail.subject)
        // params.set('body', mail.body)
        // console.log('subject', mail.subject)
        // const urlAndParmas = url + '?' + params
        // console.log('urlAndParmas', urlAndParmas)
        // window.location.replace(urlAndParmas)
    };

    render() {

        const { notes, noteToSent } = this.state;
        if (!notes) return <div>Loading...</div>;
        return (
            <React.Fragment>
                {!noteToSent && (
                    <React.Fragment>
                        <div className="filter-container">
                            <div className="filter-by-txt">
                                <p>Filter notes by text:</p>
                                <input
                                    type="text"
                                    id="txt"
                                    placeholder="Search by txt"
                                    onChange={this.onSetFilterText}
                                ></input>
                            </div>
                            <div className="filter-by-type">
                                <p>Filter notes by type:</p>
                                <NoteFilter
                                    loadNotes={this.loadNotes}
                                    onSetFilterType={this.onSetFilterType}
                                />
                            </div>
                        </div>

                        <div className="create-notes-btns">
                            Choose Note Type:
                            <button className="create-note-btn" onClick={this.onShowAddTxtNoteModal}>Create text Note</button>
                            <button className="create-note-btn" onClick={this.onShowAddImgNoteModal}>Create image Note</button>
                            <button className="create-note-btn" onClick={this.onShowAddVideoNoteModal}>Create video Note</button>
                            <button className="create-note-btn" onClick={this.onShowAddTodoNoteModal}>Create todo Note</button>

                        </div>
                        {this.state.addTxtNoteModal && <div className="add-notes-container">
                            <div className="note-modal">
                                <button onClick={this.onCloseAddTxtNoteModal} className="exit-note-modal">x</button>
                                <NoteAddTxt
                                    onAddNote={this.onAddNote}
                                    loadNotes={this.loadNotes}
                                    onCloseAddTxtNoteModal={this.onCloseAddTxtNoteModal}
                                />
                            </div>
                        </div>}
                        {this.state.addImgNoteModal && <div> <div className="note-modal">
                            <button onClick={this.onCloseAddImgNoteModal} className="exit-note-modal">x</button>
                            <NoteAddImg
                                onAddNote={this.onAddNote}
                                loadNotes={this.loadNotes}
                                onCloseAddImgNoteModal={this.onCloseAddImgNoteModal}
                            />
                        </div>
                        </div>}
                        {this.state.addVideoNoteModal && <div>
                            <div className="note-modal">
                                <button onClick={this.onCloseAddVideoNoteModal} className="exit-note-modal">x</button>
                                <NoteAddVideo
                                    onAddNote={this.onAddNote}
                                    loadNotes={this.loadNotes}
                                    onCloseAddVideoNoteModal={this.onCloseAddVideoNoteModal}
                                />
                            </div>
                        </div>}
                        {this.state.addTodoNoteModal && <div>
                            <div className="note-modal">
                                <button onClick={this.onCloseAddTodoNoteModal} className="exit-note-modal">x</button>
                                <NoteAddTodo
                                    onAddNote={this.onAddNote}
                                    loadNotes={this.loadNotes}
                                    onCloseAddTodoNoteModal={this.onCloseAddTodoNoteModal}
                                />
                            </div>
                        </div>}
                        <NoteList
                            onChangeBackground={this.onChangeBackground}
                            removeNote={this.removeNote}
                            onTogglePinNote={this.onTogglePinNote}
                            notes={notes}
                            onSentByEmail={this.onSentByEmail}
                            onToggleDoneTodo={this.onToggleDoneTodo}
                            onDuplicateNote={this.onDuplicateNote}
                        />
                    </React.Fragment>
                )}
                {noteToSent && <MailAdd noteToSent={noteToSent} onUnselectedCompose={this.onUnselectedCompose} onAddMail={this.onAddMail} />}
            </React.Fragment>
        );
    }
}
