export class UpperFilter extends React.Component {
  state = {
    filterBy: {
      isRead: null,
      text: "",
    },
  };


  handleChange = ({ target }) => {
    const field = target.name;
    if (field === "isRead") {
     var value;
      if (target.value === "true")  value = (target.value === "true");
      else if (target.value === "false")  value = (!target.value === "false");
      else  value = null;
    } else value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  render() {
    return (
      <section className="header-filter">
        <input
          className="input-filter-header"
          name="text"
          placeholder=" Search by text"
          onChange={this.handleChange}
        ></input>
        <div>
        <label>Filter By:</label>
        <select
          className="filter-by-header"
          name="isRead"
          onChange={this.handleChange}
        >
          <option value={null}>All</option>
          <option value={true}>Read</option>
          <option value={false}>Unread</option>
        </select>
        </div>
      </section>
    );
  }
}
