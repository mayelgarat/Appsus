export function DynamicNoteCmps(props) {
    const { note, info, onToggleDoneTodo } = props
    const todos = info.todos;
    const embedUrl = (url) => {
        return url.replace('https://www.youtube.com/watch?v=', '')
    }
    switch (props.type) {
        case 'note-txt':
            return <div><h2 className="note-txt-title" >{note.info.txt} </h2>  </div>
        case 'note-img':
            return <div> <img className="note-img" src={`${note.info.url}`} />
                <h1 className="note-img-title" >{note.info.title} </h1></div>
        case 'note-todos':
            return <div>
                <h1 className="note-todos-title" >{note.info.label} </h1>
                <ul> {todos.map(((todo, idx) => {
                    return <li className={`${todo.doneAt ? "todo-li-done" : ""}`} key={idx} onClick={() => onToggleDoneTodo(todo.id, note.id)}>{todo.txt}
                    </li>
                }))}
                </ul>
            </div>
        case 'note-video':
            return <div><h1 className="note-video-title" >{note.info.title} </h1>
                <iframe className="note-video" src={`https://www.youtube.com/embed/${embedUrl(note.info.url)}`} width="70%" /> </div>
        default:
            return <React.Fragment></React.Fragment>
    }
}
