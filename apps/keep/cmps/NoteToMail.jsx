import { eventBusService } from '../../../services/event-bus.service.js'
export class NoteToMail extends React.Component {

    state = {
        note: {}
    }

    removeEventBus = null
    timeoutId = null

    componentDidMount() {
        this.removeEventBus = eventBusService.on('note-to-mail', (note) => {
            clearTimeout(this.timeoutId)
            this.setState({ note }, this.onAutoClose)
        })
    }

    // onAutoClose = () => {
    //     this.timeoutId = setTimeout(() => {
    //         this.onCloseMsg()
    //     }, 3000)
    // }

    // onCloseMsg = () => {
    //     clearTimeout(this.timeoutId)
    //     this.setState({ msg: null })
    // }

    componentWillUnmount() {
        this.removeEventBus()
    }

    render() {
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg ${msg.type}`}>
            <button onClick={this.onCloseMsg}>&times;</button>
            <h2>{msg.txt}</h2>
        </div>
    }

} 