import { fillInStars, productId, reviewData, setProductData } from "./utils.js";

const MAX_STARS = 5;

export const clearReviewData = () => {
    reviewData.rating = 0;
    reviewData.text = '';

    const starSpansAlreadyExist = true;
    fillInStars('add-review-stars', 0, MAX_STARS, starSpansAlreadyExist)
    $('#add-review-text').val('');
};

window.submitReview = async () => {
    if (reviewData.rating === 0) {
        window.alert('You must select a star rating to leave a review');
        return;
    }

    const reviewFields = {
        'productId': productId,
        'numStars': reviewData.rating,
        'maxAllowedStars': MAX_STARS,
        'shouldLoadReviews': true,
    };

    reviewData.text = $('#add-review-text').val();
    if (reviewData.text && reviewData.text.trim()) {
        reviewFields['text'] = reviewData.text.trim();
    }

    const response = await $.post('/api/review', reviewFields);
    
    setProductData(response.product);

    goToProductScreenPage();
};

const goToProductScreenPage = () => {
    $('#add-review-screen').hide();
    $('#product-screen').show();
};

window.setRating = (rating) => {
    reviewData.rating = rating;
    const starSpansAlreadyExist = true;
    fillInStars('add-review-stars', rating, MAX_STARS, starSpansAlreadyExist);
};
