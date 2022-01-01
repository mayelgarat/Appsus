import { noteService } from "../services/NoteService.js"
import { DynamicNoteCmps } from "./DynamicNoteCmps.jsx";
// // import { eventBusService } from "../services/event-bus.service.js"
// // import { NoteDetails } from "./NoteDetails.jsx";

export class NoteAddTxt extends React.Component {
    state = {
        note: {
            txt: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, [field]: value }
        }))
    }


    onSaveTxtNote = (ev) => {
        ev.preventDefault()
        const { note } = this.state;
        const txt = note.txt;
        noteService.createTextNote(txt).then(this.props.loadNotes).then(() => this.props.onCloseAddTxtNoteModal())

    }
    render() {
        return (
            <section>
                <div>
                    <h1>Add new note</h1>
                    <form className="txt-note-form" onSubmit={this.onSaveTxtNote}>
                        <textarea
                            placeholder="Enter note txt"
                            name="txt"
                            onChange={this.handleChange}>
                        </textarea>
                        <button className="add-note-btn">Add txt note</button>
                    </form>
                </div>
            </section>
        )
    }
}
