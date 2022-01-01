
export class FilterTxt extends React.Component {
    state = {
        filterBy: {
            txt: ''
        }
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.props.load)
    }


    handleChange = (ev) => {
        ev.preventDefault()
        const { target } = ev
        const field = target.id
        const value = target.value
        console.log('value:', value);
        this.setState({ filterBy: field }, () => {
            this.onSetFilter(this.state.filterBy)
            console.log('this.state.filterBy:', this.state.filterBy);
            this.props.load()
        })
    }


    render() {
        // console.log('this.props:', this.props);
        const { searchBy } = this.props
        return <input type="text" id="type-txt" placeholder={`Search by ${searchBy}`} onChange={this.handleChange}></input>
    }


}