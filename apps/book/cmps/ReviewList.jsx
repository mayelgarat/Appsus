import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, showStars, onRemoveReview }) {
    if(!reviews) return "no review"
    return <div>{reviews.map(review => <ReviewPreview key={review.id} review={review} showStars={showStars} onRemoveReview={onRemoveReview}></ReviewPreview>)}</div>
}