import { noteService } from "../services/NoteService.js"
import { DynamicNoteCmps } from "./DynamicNoteCmps.jsx";
// // import { eventBusService } from "../services/event-bus.service.js"
// // import { NoteDetails } from "./NoteDetails.jsx";

export class NoteAddTodos extends React.Component {
    state = {
        note: {
            title: '',
            todos: []
        }
    }
    // handleChange = ({ target }) => {
    //     const field = target.name;
    //     const value = target.value;
    //     this.setState((prevState) => ({
    //         note: { ...prevState.note, [field]: value }
    //     }))
    // }

    // onSaveVideoNote = (ev) => {
    //     ev.preventDefault()
    //     const { note } = this.state;
    //     // const videoUrl = note.videoUrl;
    //     const { title, todos } = this.state.note
    //     // const videoTitle = note.title;
    //     noteService.createTodosNote(title, todos).then(this.props.loadNotes)
    // }
    render() {
        return (
            <section>
                <div className="note-modal">
                    <h1>Add note</h1>
                    <form className="videoUrl-note-form" onSubmit={this.onSaveVideoNote}>
                        <input
                            placeholder="Enter Todo"
                            name="videoUrl"
                            onChange={this.handleChange}>
                        </input>

                        {/* <button onClick={this.props.onAddNote}>Add todo</button> */}
                        {/* <button onClick={this.props.onAddNote}>Add note</button> */}
                    </form>
                </div>
            </section>
        )
    }
}