export function MailSentDate({ date }) {
  let month = new Date(date).getMonth();
  let day = new Date(date).getDate();
 
  if (
    month === new Date(Date.now()).getMonth() &&
    day === new Date(Date.now()).getDate()
  ) {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return (
      <React.Fragment>
        {hour < 10 ? `0${hour}` : hour}:
        {minutes < 10 ? `0${minutes}` : minutes}
      </React.Fragment>
    );
  } else {
    switch (month) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Fab";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sept";
        break;
      case 9:
        month = "Oct";
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
      default:
      // code block
    }
    return (
      <React.Fragment>
        {day} {month}
      </React.Fragment>
    );
  }
}
