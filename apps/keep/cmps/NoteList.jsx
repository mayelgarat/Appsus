import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onTogglePinNote, onToggleDoneTodo, removeNote, onChangeBackground, onSentByEmail, onDuplicateNote }) {
    // no notes for show
    return <section className='note-lists-container'>
        <h1>pinned</h1>
        <div className='note-list'>
            {notes.filter((note) => note.isPinned).map(note => {
                return <NotePreview
                    onChangeBackground={onChangeBackground}
                    removeNote={removeNote}
                    onTogglePinNote={onTogglePinNote}
                    key={note.id}
                    note={note}
                    onSentByEmail={onSentByEmail}
                    onToggleDoneTodo={onToggleDoneTodo}
                    onDuplicateNote={onDuplicateNote}
                />
            })}
        </div>
        <h1>unpinned</h1>
        <div className='note-list'>
            {notes.filter((note) => !note.isPinned).map(note => {
                return <NotePreview
                    onChangeBackground={onChangeBackground}
                    removeNote={removeNote}
                    onTogglePinNote={onTogglePinNote}
                    key={note.id}
                    note={note}
                    onSentByEmail={onSentByEmail}
                    onToggleDoneTodo={onToggleDoneTodo}
                    onDuplicateNote={onDuplicateNote}
                />
            })}
        </div>
    </section>

    // if (!notes.length) return <h1>There are no notes to show</h1>
    // return (
    //     <section className="note-list">
    //         {notes.map(note => <NotePreview key={note.id} note={note} />)}
    //     </section>
    // )
}


