export function StarRating ({handleChange, rate}) {

  const onSetRating = (idx) => {
    const target = {name: 'rate', value: idx};
    handleChange({target});
  };

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, idx) => {
          idx += 1;
          return (
            <button
              type="button"
              key={idx}
              className={idx <= rate ? 'on' : 'off'}
              onClick={() => onSetRating(idx)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  
}

//class version
// export class StarRating extends React.Component {
//   state = {
//     rating: 0
//   };

//   onSetRating = (idx) => {
//     this.setState({ rating: idx });
//     const target = {name: 'rating', value: idx};
//     this.props.handleChange({target});
//   };

//   render() {
//     const { rating } = this.state;

//     return (
//       <div className="star-rating">
//         {[...Array(5)].map((star, idx) => {
//           idx += 1;
//           return (
//             <button
//               type="button"
//               key={idx}
//               className={idx <= rating ? 'on' : 'off'}
//               onClick={() => this.onSetRating(idx)}
//             >
//               <span className="star">&#9733;</span>
//             </button>
//           );
//         })}
//       </div>
//     );
//   }
// }
