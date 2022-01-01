
import {MailPreview} from './MailPreview.jsx'
export function MailList({ emails, onSelectedEmail, onRemoveMail, onRead, onToggleStar, onMoveToTrash , onToggleRead}) {
  return (
    <section className="mail-list">
      {emails.map(email => <MailPreview key={email.id} onMoveToTrash={onMoveToTrash} onToggleStar={onToggleStar} onToggleRead={onToggleRead} onRead={onRead} onRemoveMail={onRemoveMail}email={email} onSelectedEmail={onSelectedEmail} />)}
    </section>
  )
}
