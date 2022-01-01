import { utilService } from "../../../services/utilService.js";
import { storageService } from "../../../services/storageService.js";

export const mailService = {
  query,
  read,
  toggleRead,
  toggleStar,
  createEmail,
  deleteEmail,
  moveToTrash,
  createDraft
};

const KEY = "emailDB";
const emails = [
  {
    id: utilService.makeId(),
    from: "Alon Dai - Coding Academy",
    subject: "יום מעולה!",
    body: "😎 היום הכי קשה בקורס! לא נהיה זמינים משעה 14:00 עקב ישיבה ",
    isRead: false,
    sentAt: Date.now(),
    to: "user@appsus.com",
    isStar: true,
    isTrash: false,
    isDraft: false

  },  {
    id: utilService.makeId(),
    from: "Lee Segal",
    subject: "Hello!",
    body: "How is your day going?",
    isRead: true,
    sentAt: Date.now(),
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  }, {
    id: utilService.makeId(),
    from: "Alon Dai - Coding Academy",
    subject: "אנחנו יוצאים לתרגול ",
    body: " כל מי שלא שלח לנו עם מי הוא יעבוד בספרינט אנחנו נשבץ היום ונשלח בערב את כל השיבוצים. בשעה שלוש לא נהיה זמינים בתור עקב ישיבה.",
    isRead: false,
    sentAt: Date.now(),
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "May Elgarat",
    subject: "Hello!",
    body: "How is your day going?",
    isRead: true,
    sentAt: Date.now(),
    to: "user@appsus.com",
    isStar: true,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Yaron Biton - Coding Academy",
    subject: "YESSS!",
    body: "איזה אפליקציה מרגשת",
    isRead: true,
    sentAt: "01.02.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },{
    id: utilService.makeId(),
    from: "donotreplay",
    subject: "your order is waiting for you at b market Herzliya",
    body: "We want to wish a Happy Birthday",
    isRead: false,
    sentAt: "05.24.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "May Elgarat",
    subject: "Hi how are you?",
    body: "Can you please check my latest update in git Hub",
    isRead: false,
    sentAt: "01.01.2022",
    to: "user@appsus.com",
    isStar: true,
    isTrash: false,
    isDraft: false

  }, {
    id: utilService.makeId(),
    from: "Gal Gadot",
    subject: "Superwomen!!",
    body: "Superwomen",
    isRead: false,
    sentAt: Date.now(),
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Lee Segal",
    subject: "מוקי אמר שהפרויקט שלנו קיבל 100",
    body: "We want to wish a Happy Birthday",
    isRead: true,
    sentAt: "05.24.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "donotreplay",
    subject: "your order is waiting for you at b market Herzliya",
    body: "We want to wish a Happy Birthday",
    isRead: false,
    sentAt: "05.24.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: "Check out our Spring",
    body: "",
    isRead: true,
    sentAt: "05.24.2021",
    to: "Coding - Academy",
    isStar: false,
    isTrash: false,
    isDraft: false

  },{
    id: utilService.makeId(),
    from: "donotreplay",
    subject: "your order is waiting for you at b market Herzliya",
    body: "We want to wish a Happy Birthday",
    isRead: false,
    sentAt: "05.24.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Wolt",
    subject: "Purchase receipt: MacDonald's 29.12.2021",
    body: "חשבונית מס . קבלה (מקור) מספר #545454545",
    isRead: true,
    sentAt: "11.29.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Wolt",
    subject: "Purchase receipt: MacDonald's 29.12.2021",
    body: "חשבונית מס . קבלה (מקור) מספר #545454545",
    isRead: true,
    sentAt: "11.29.2021",
    to: "user@appsus.com",
    isStar: true,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Wolt",
    subject: "Purchase receipt: MacDonald's 29.12.2021",
    body: "חשבונית מס . קבלה (מקור) מספר #545454545",
    isRead: true,
    sentAt: "11.29.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },{
    id: utilService.makeId(),
    from: "donotreplay",
    subject: "your order is waiting for you at b market Herzliya",
    body: "We want to wish a Happy Birthday",
    isRead: false,
    sentAt: "05.24.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Zara",
    subject: "Return request accepted",
    body: "your request has been accepted Order No. 545454",
    isRead: true,
    sentAt: "02.01.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false,
   
  },
  {
    id: utilService.makeId(),
    from: "Zara",
    subject: "Return request accepted",
    body: "your request has been accepted Order No. 545454",
    isRead: true,
    sentAt: "02.01.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "Zara",
    subject: "Return request accepted",
    body: "your request has been accepted Order No. 545454",
    isRead: true,
    sentAt: "02.01.2021",
    to: "user@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false,


  },
  {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: "Hello",
    body: "please pull i have update my changes on git",
    isRead: true,
    sentAt: "02.01.2021",
    to: "lee@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: "heyyyyy",
    body: "please push you new update on git",
    isRead: true,
    sentAt: "02.01.2021",
    to: "may@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: "Whatsaupppppp",
    body: "Call ME",
    isRead: true,
    sentAt: "02.01.2021",
    to: "may@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
  {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: "Whatsaupppppp",
    body: "Call ME",
    isRead: true,
    sentAt: "02.01.2021",
    to: "may@appsus.com",
    isStar: false,
    isTrash: false,
    isDraft: false

  },
];

function createEmail(newEmail) {
  const email = {
    id: utilService.makeId(),
    from: "user@appsus.com",
    subject: newEmail.subject,
    body: newEmail.body,
    isRead: false,
    sentAt: Date.now(),
    to: newEmail.to,
    isStar: false,
    isTrash: false,
    isDraft: false
  };
  const storageEmails = _loadEmailsFromStorage();
  storageEmails.unshift(email);
  _saveEmailsToStorage(storageEmails);
  return Promise.resolve();
}

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

_saveEmails();
function _saveEmails() {
  const emailsStorage = _loadEmailsFromStorage();
  if (!emailsStorage || !emailsStorage.length) {
    _saveEmailsToStorage(emails);
  }
  return emailsStorage;
}

function toggleStar(emailId) {
  const emails = _loadEmailsFromStorage();
  const idx = emails.findIndex((email) => email.id === emailId);
  emails[idx].isStar = !emails[idx].isStar;
  _saveEmailsToStorage(emails);
  return Promise.resolve();
}

function toggleRead(emailId) {
  const emails = _loadEmailsFromStorage();
  const idx = emails.findIndex((email) => email.id === emailId);
  emails[idx].isRead = !emails[idx].isRead;
  _saveEmailsToStorage(emails);
  return Promise.resolve();
}

function read(emailId) {
  const emails = _loadEmailsFromStorage();
  const idx = emails.findIndex((email) => email.id === emailId);
  emails[idx].isRead = true;
  _saveEmailsToStorage(emails);
  return Promise.resolve();
}

function moveToTrash(emailId) {
  let emails = _loadEmailsFromStorage();
  const idx = emails.findIndex((email) => email.id === emailId);
  if (emails[idx].isTrash) {
    deleteEmail(emailId);
    return;
  }
  emails[idx].isTrash = true;
  _saveEmailsToStorage(emails);
  return Promise.resolve();
}

function deleteEmail(emailId) {
  let emails = _loadEmailsFromStorage();
  emails = emails.filter((email) => email.id !== emailId);
  _saveEmailsToStorage(emails);
  return Promise.resolve();
}

function query(filterBy = null) {
  const emails = _loadEmailsFromStorage();
  if (!filterBy) return Promise.resolve(emails);
  const filteredEmails = _getFilteredEmails(emails, filterBy);
  return Promise.resolve(filteredEmails);
}
function createDraft(newMail) {
  const mail = {
      id: utilService.makeId(),
      subject: (newMail.subject) ? newMail.subject : 'No subject',
      body: (newMail.body) ? newMail.body : 'No content',
      isRead: true,
      sentAt: Date.now(),
      to: newMail.to,
      from: "user@appsus.com",
      isTrash: false,
      isStarred: false,
      isDraft: true,
      
  }
}

function _getFilteredEmails(emails, filterBy) {
  let { status, text, isRead, isStared, lables } = filterBy;
  let filterEmails;
  if (isRead === null) {
    filterEmails = emails;
  } else {
    filterEmails = emails.filter((email) => {
      return isRead === email.isRead;
    });
  }
  filterEmails = filterEmails.filter((currEmail) => {
    return (
      currEmail.subject.includes(text) ||
      currEmail.from.includes(text) ||
      currEmail.body.includes(text)
    );
  });
  if (isStared !== null) {
    filterEmails = filterEmails.filter((email) => {
      return email.isStar;
    });
  }
  if (status === "inbox") {
    filterEmails = filterEmails.filter((email) => {
      return email.to === "user@appsus.com" && !email.isTrash;
    });
  }
  if (status === "sent") {
    filterEmails = filterEmails.filter((email) => {
      return email.from === "user@appsus.com" && !email.isTrash;
    });
  }
  if (status === "trash") {
    filterEmails = filterEmails.filter((email) => {
      return email.isTrash;
    });
  }
  if(status === "draft"){
    filterEmails = filterEmails.filter((email) => {
      return email.isDraft;
    });
  }
  return filterEmails;

  // return (
  // email.status.includes(status) &&
  // txt.includes(email.subject) || txt.includes(email.body) || txt.includes(email.from)
  //  &&
  //  isRead=== email.isRead
  //  && isStared===email.isStar
  // );
  // }

  return emails;
}

function _saveEmailsToStorage(emails) {
  storageService.saveToStorage(KEY, emails);
}

function _loadEmailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
