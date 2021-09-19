const fetchProduct = async () => {
    const productId = 'product.43a2b7f1-321c-4dee-a06c-87a588885e41';
    const response = await $.get('/api/product', {
        'productId': productId,
        'shouldLoadReviews': true,
    });

    // Round the overall rating to one decimal place
    const overallRating = Math.round(response.product.overallRating * response.product.maxAllowedStars * 10) / 10;

    $('#product-name').html(response.product.name);
    $('#product-overall-rating').html(overallRating);
    fillInStars('overall-rating-star', response.product.numStars, response.product.maxAllowedStars);

    setProductReviews(response.product.loadedReviews);

    $('#product-screen').show();
    $('#loading-screen').hide();
};

const setProductReviews = (reviewsList) => {
    if (!reviewsList || reviewsList.length === 0) {
        $('#no-reviews-message').show();
        return;
    }

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

const fillInStars = (listId, numVisibleStars, numTotalStars) => {
    let starCounter = 1;
    while (starCounter <= numTotalStars) {
        const spanId = `${listId}-star-${starCounter}`;
        $(`#${listId}`).append(`<span id='${spanId}' class='fa fa-star'></span>`);
        if (starCounter <= numVisibleStars) {
            $(`#${spanId}`).addClass('filled-in-star');
        }
        starCounter += 1;
    }
};

fetchProduct();
