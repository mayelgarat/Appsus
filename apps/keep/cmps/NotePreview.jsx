
import { DynamicNoteCmps } from './DynamicNoteCmps.jsx'
import { utilService } from '../../../services/utilService.js';
// import { NoteColorPalette } from './NoteColorPalette.jsx';
export class NotePreview extends React.Component {
    removeNote = () => {
        const { note } = this.props;
        this.props.removeNote(note.id);
    };

    changeNoteColor = (color) => {
        this.props.onChangeBackground(this.props.note.id, utilService.getNiceRandomColor());
    };


    duplicateNote = () => {
        const { note } = this.props
        this.props.onDuplicateNote(note.id)
    }
    togglePinNote = () => {
        const { note } = this.props
        this.props.onTogglePinNote(note)
    }
    sendByEmail = () => {
        const { note } = this.props
        this.props.onSentByEmail(note)
    }

    render() {
        const { note } = this.props
        if (!note) return <div>Loading...</div>
        return (
            <article className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
                <DynamicNoteCmps note={note} type={note.type} info={note.info} onToggleDoneTodo={this.props.onToggleDoneTodo} />
                <div className="tool-bar">
                    <button className='note-controller' title='delete-note' onClick={this.removeNote}><i className="fas fa-trash"></i></button>
                    <button className='note-controller' title='duplicate-note' onClick={this.duplicateNote}><i className="fas fa-copy"></i></button>
                    <button className='note-controller' title='pin-note' onClick={this.togglePinNote}><i className="fas fa-thumbtack"></i></button>
                    <button className='note-controller' title='change-note-color' onClick={this.changeNoteColor}><i className="fas fa-palette"></i></button>
                    <button className='note-controller' title='send-note-by-email' onClick={this.sendByEmail}><i className="fas fa-at"></i></button>
                    {/* <NoteColorPalette noteId={note.id} changeNoteColor={this.changeNoteColor} /> */}
                </div>
            </article >
        )
    }
}
