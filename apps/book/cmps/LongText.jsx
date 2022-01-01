export class LongText extends React.Component {
  state = {
    isLongTxtShown: this.props.isLongTxtShown,
    text: this.props.text,
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="description-container">
        <p>
          {" "}
          <span>Description:</span>
        </p>
        <div>
          {this.state.isLongTxtShown && (
            <React.Fragment>
              <p className="txt">{this.state.text.substring(0, 100)} </p>
              <button
                className="read-btn"
                onClick={() => {
                  this.setState({ isLongTxtShown: false });
                }}
              >
                Continue reading...
              </button>
            </React.Fragment>
          )}
          {!this.state.isLongTxtShown && <p>{this.state.text}</p>}
        </div>
      </div>
    );
  }
}

// {isLongTxtShown ? (
//   <button className="read-btn">read more...</button>
//   <p>{this.props.text.substring(0, 100)}</p>
// ) : (
//  {text}
// )}
