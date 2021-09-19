// Hardcoding this product id for now
const productId = 'product.43a2b7f1-321c-4dee-a06c-87a588885e41';

let reviewRating = 0;
const MAX_STARS = 5;

const fetchProduct = async () => {
    const response = await $.get('/api/product', {
        'productId': productId,
        'shouldLoadReviews': true,
    });

    setProductData(response.product);

    $('#product-screen').show();
    $('#loading-screen').hide();
};

const setProductData = (product) => {
    // Round the overall rating to one decimal place
    const overallRating = Math.round(product.overallRating * product.maxAllowedStars * 10) / 10;

    $('#product-name').html(product.name);
    $('#product-overall-rating').html(overallRating);

    $('#product-overall-stars').empty();
    fillInStars('product-overall-stars', product.numStars, product.maxAllowedStars);

    setProductReviews(product.loadedReviews);
};

const setProductReviews = (reviewsList) => {
    if (!reviewsList || reviewsList.length === 0) {
        $('#no-reviews-message').show();
        return;
    }

    $('#product-reviews-list').empty();
    for (const [index, review] of reviewsList.entries()) {
        const reviewListItemId = `review-${index}`;
        const reviewStarsId = `review-stars-list-${index}`;
        const reviewListItem = `<li id='${reviewListItemId}' class='review-list-item'><div id='${reviewStarsId}'></div><p id='review-rating-${index}' class='review-rating'></p><p id='review-text-${index}' class='review-text'></p></li>`;
        $('#product-reviews-list').append(reviewListItem);
        fillInStars(reviewStarsId, review.numStars, review.maxAllowedStars);
        
        const rating = Math.round(review.rating * review.maxAllowedStars);
        $(`#review-rating-${index}`).html(rating);
        if (review.text) {
            $(`#review-text-${index}`).html(review.text)
        }
    }
};

const fillInStars = (listId, numVisibleStars, numTotalStars, starSpansAlreadyExist) => {
    let starCounter = 1;
    while (starCounter <= numTotalStars) {
        const spanId = `${listId}-star-${starCounter}`;
        if (!starSpansAlreadyExist) {
            $(`#${listId}`).append(`<span id='${spanId}' class='fa fa-star'></span>`);
        }
        if (starCounter <= numVisibleStars) {
            $(`#${spanId}`).addClass('filled-in-star');
        } else {
            $(`#${spanId}`).removeClass('filled-in-star');
        }
        starCounter += 1;
    }
};

const goToReviewPage = () => {
    clearReviewData();
    $('#product-screen').hide();
    $('#add-review-screen').show();
};

const clearReviewData = () => {
    reviewRating = 0;
    reviewText = '';

    const starSpansAlreadyExist = true;
    fillInStars('add-review-stars', 0, MAX_STARS, starSpansAlreadyExist)
    $('#add-review-text').val('');
};

const setRating = (rating) => {
    reviewRating = rating;
    const starSpansAlreadyExist = true;
    fillInStars('add-review-stars', rating, MAX_STARS, starSpansAlreadyExist);
};

const submitReview = async () => {
    if (reviewRating === 0) {
        window.alert('You must select a star rating to leave a review');
        return;
    }

    const reviewData = {
        'productId': productId,
        'numStars': reviewRating,
        'maxAllowedStars': MAX_STARS,
        'shouldLoadReviews': true,
    };

    const reviewText = $('#add-review-text').val();
    if (reviewText && reviewText.trim()) {
        reviewData['text'] = reviewText.trim();
    }

    const response = await $.post('/api/review', reviewData);
    
    setProductData(response.product);

    $('#add-review-screen').hide();
    $('#product-screen').show();
}

fetchProduct();
