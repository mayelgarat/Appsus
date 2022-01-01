import { noteService } from "../services/NoteService.js"
import { DynamicNoteCmps } from "./DynamicNoteCmps.jsx";
// // import { eventBusService } from "../services/event-bus.service.js"
// // import { NoteDetails } from "./NoteDetails.jsx";

export class NoteAddImg extends React.Component {
    state = {
        note: {
            imgUrl: '',
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


    onSaveImgNote = (ev) => {
        ev.preventDefault()
        const { note } = this.state;
        const imgUrl = note.imgUrl;
        const imgTitle = note.title;
        noteService.createImgNote(imgUrl, imgTitle).then(this.props.loadNotes).then(() => {
            this.props.onCloseAddImgNoteModal()
        })
    }
    render() {
        return (
            <section>
                <div>
                    <h1>Add new note</h1>
                    <form className="imgUrl-note-form" onSubmit={this.onSaveImgNote}>
                        <input
                            placeholder="Enter imgUrl"
                            name="imgUrl"
                            onChange={this.handleChange}>
                        </input>
                        <input
                            placeholder="Enter title"
                            name="title"
                            onChange={this.handleChange}>
                        </input>
                        <button className="add-note-btn">Add img note</button>
                    </form>
                </div>
            </section>
        )
    }
}