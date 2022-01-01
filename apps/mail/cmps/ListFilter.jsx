import { HeaderFilter } from "../pages/UpperFilter";

export function ListFilter({ emails, onGetFilterList, filterBy }) {
  const unreadEmail = emails.filter((email) => !email.isRead);
  const stared = emails.filter((email) => email.isStar);

  return (
    <ul className="mail-count">
      <li
        onClick={() => {
          onGetFilterList("status", "inbox");
        }}
      ><button className="list-btn">Inbox ({unreadEmail.length})</button>
       
      </li>
      <li
        onClick={() => {
          console.log("isStared", filterBy.isStared);
          if (filterBy.isStared === null) onGetFilterList("isStared", true);
          else onGetFilterList("isStared", null);
        }}
      >
        <button className="list-btn">Stared ({stared.length})</button> 
      </li>
      <li
        onClick={() => {
          onGetFilterList("status", "sent");
        }}
      >
       <button className="list-btn">Sent</button> 
      </li>
      <li
        onClick={() => {
          onGetFilterList("status", "trash");
        }}
      >
        <button className="list-btn">Trash</button>
      </li>
      {/* <li
        onClick={() => {
          onGetFilterList("status", "draft");
        }}
      >
        <button className="list-btn">Draft</button>
      </li> */}
    </ul>
  );
}
