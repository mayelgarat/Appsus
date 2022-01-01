import { noteService } from "../services/NoteService.js"
// // import { eventBusService } from "../services/event-bus.service.js"
// // import { NoteDetails } from "./NoteDetails.jsx";

export class NoteAddTodo extends React.Component {
    state = {
        note: {
            title: '',
            todo: '',
            // todos: [],
        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, [field]: value }
        }))
    }

    onSaveTodoNote = (ev) => {
        ev.preventDefault()
        const { note } = this.state;
        const title = note.title;
        const todo = note.todo;
        noteService.createTodoNote(title, todo).then(this.props.loadNotes).then(() => {
            this.props.onCloseAddTodoNoteModal()
        })
    }
    render() {
        return (
            <section>
                <div>
                    <h1>Add new note</h1>
                    <form className="todo-note-form" onSubmit={this.onSaveTodoNote}>
                        <input
                            placeholder="Enter title"
                            name="title"
                            onChange={this.handleChange}>
                        </input>
                        <div className="new-todo">
                            <input className="todo-input"
                                placeholder="Enter Todo"
                                name="todo"
                                onChange={this.handleChange}>
                            </input>
                            <button
                                className="add-todo-btn"
                            >+</button>
                        </div>
                        <button className="add-note-btn">Add todo note</button>
                    </form>
                </div>
            </section>
        )
    }
}