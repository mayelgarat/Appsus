import { noteService } from "../services/NoteService.js"
// // import { eventBusService } from "../services/event-bus.service.js"
// // import { NoteDetails } from "./NoteDetails.jsx";

export class NoteAddVideo extends React.Component {
    state = {
        note: {
            videoUrl: '',
            title: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, [field]: value }
        }))
    }

    onSaveVideoNote = (ev) => {
        ev.preventDefault()
        const { note } = this.state;
        const videoUrl = note.videoUrl;
        const videoTitle = note.title;
        noteService.createVideoNote(videoUrl, videoTitle).then(this.props.loadNotes).then(() => {
            this.props.onCloseAddVideoNoteModal()
        })
    }
    render() {
        return (
            <section>
                <div>
                    <h1>Add new note</h1>
                    <form className="videoUrl-note-form" onSubmit={this.onSaveVideoNote}>
                        <input
                            placeholder="Enter videoUrl"
                            name="videoUrl"
                            onChange={this.handleChange}>
                        </input>
                        <input
                            placeholder="Enter title"
                            name="title"
                            onChange={this.handleChange}>
                        </input>
                        <button className="add-note-btn">Add video note</button>
                    </form>
                </div>
            </section>
        )
    }
}