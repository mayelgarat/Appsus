// import { noteService } from '../services/NoteService.js'
// import { NoteFilter } from '../cmps/NoteFilter.jsx'

export class NoteFilter extends React.Component {
    render() {
        return <React.Fragment>
            <button className="filter-btn" id='type-note-img' onClick={this.props.onSetFilterType}>Img</button>
            <button className="filter-btn" id='type-note-txt' onClick={this.props.onSetFilterType}>txt</button>
            <button className="filter-btn" id='type-note-todos' onClick={this.props.onSetFilterType}>todos</button>
            <button className="filter-btn" id='type-note-video' onClick={this.props.onSetFilterType}>video</button>
            <button className="filter-btn" id='type-remove-filter' onClick={this.props.onSetFilterType}>all</button>
            {/* <button class="filter-btn" title="images notes" id='type-note-img' onClick={this.props.onSetFilter}><i class="far fa-image"></i></button>
            <button class="filter-btn" title="text notes" id='type-note-txt' onClick={this.props.onSetFilter}><i class="fas fa-file-alt"></i></button>
            <button class="filter-btn" title="todos notes" id='type-note-todos' onClick={this.props.onSetFilter}><i class="fas fa-clipboard-check"></i></button>
            <button class="filter-btn" title="video notes" id='type-note-video' onClick={this.props.onSetFilter}><i class="fab fa-youtube"></i></button>
            <button class="filter-btn all" title="all notes" id='type-remove-filter' onClick={this.props.onSetFilter}>all</button> */}
        </React.Fragment>
    }
}